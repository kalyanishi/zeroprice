const encoder = new TextEncoder();

export const ADMIN_SESSION_COOKIE_NAME = 'admin_token';
export const ADMIN_SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;
export const ADMIN_CATEGORIES = ['air', 'water', 'land'] as const;

export type AdminCategory = (typeof ADMIN_CATEGORIES)[number];
export type AdminRole = 'super_admin' | 'expert';
export interface AdminAccountIdentity {
  email: string;
  role: AdminRole;
  allowedCategories: AdminCategory[];
  displayName: string | null;
}

interface AdminAccountConfigInput {
  email?: string;
  password?: string;
  role?: string;
  allowedCategories?: string[] | string;
  displayName?: string;
}

interface AdminAccountConfig extends AdminAccountIdentity {
  password: string;
}

interface AdminSessionPayload {
  email: string;
  role: AdminRole;
  allowedCategories: AdminCategory[];
  displayName: string | null;
  expiresAt: number;
}

export interface AdminSession extends AdminSessionPayload {
  legacy?: boolean;
}

export function normalizeAdminEmail(email: string) {
  return email.trim().toLowerCase();
}

export function normalizeAdminCategory(value: string) {
  return ADMIN_CATEGORIES.includes(value as AdminCategory)
    ? (value as AdminCategory)
    : null;
}

export function normalizeAllowedAdminCategories(role: AdminRole, value: string[] | string | undefined) {
  if (role === 'super_admin') {
    return [...ADMIN_CATEGORIES];
  }

  const rawValues = Array.isArray(value)
    ? value
    : typeof value === 'string'
      ? value.split(',')
      : [];

  const categories = rawValues
    .map((entry) => normalizeAdminCategory(entry.trim().toLowerCase()))
    .filter((entry): entry is AdminCategory => Boolean(entry));

  return Array.from(new Set(categories));
}

export function normalizeAdminRole(role: string | undefined): AdminRole {
  return role?.trim().toLowerCase() === 'expert' ? 'expert' : 'super_admin';
}

function buildAccountConfig(input: AdminAccountConfigInput): AdminAccountConfig | null {
  if (!input.email || !input.password) {
    return null;
  }

  const role = normalizeAdminRole(input.role);
  const allowedCategories = normalizeAllowedAdminCategories(role, input.allowedCategories);

  return {
    email: normalizeAdminEmail(input.email),
    password: input.password,
    role,
    allowedCategories,
    displayName: input.displayName?.trim() || null,
  };
}

function getLegacyFallbackAccount() {
  const password = process.env.ADMIN_PASSWORD?.trim();
  if (!password) {
    return null;
  }

  return buildAccountConfig({
    email: process.env.ADMIN_EMAIL?.trim() || 'admin@zeroprize.local',
    password,
    role: 'super_admin',
    displayName: 'Admin',
  });
}

export function getConfiguredAdminAccounts() {
  const accounts = new Map<string, AdminAccountConfig>();
  const rawJson = process.env.ADMIN_USERS_JSON?.trim();

  if (rawJson) {
    let parsed: unknown;
    try {
      parsed = JSON.parse(rawJson);
    } catch {
      throw new Error('ADMIN_USERS_JSON is not valid JSON');
    }

    if (!Array.isArray(parsed)) {
      throw new Error('ADMIN_USERS_JSON must be an array');
    }

    for (const entry of parsed) {
      const account = buildAccountConfig((entry ?? {}) as AdminAccountConfigInput);
      if (!account) {
        throw new Error('Each ADMIN_USERS_JSON entry must include email and password');
      }
      accounts.set(account.email, account);
    }
  }

  const fallbackAccount = getLegacyFallbackAccount();
  if (fallbackAccount && !accounts.has(fallbackAccount.email)) {
    accounts.set(fallbackAccount.email, fallbackAccount);
  }

  return [...accounts.values()];
}

export function resolveConfiguredAdminAccount(email: string, password: string) {
  const account = getConfiguredAdminAccounts().find((candidate) => candidate.email === normalizeAdminEmail(email));
  if (!account || account.password !== password) {
    return null;
  }

  return account;
}

function getSessionSecret() {
  const secret = process.env.ADMIN_SECRET_TOKEN?.trim();
  if (!secret) {
    throw new Error('ADMIN_SECRET_TOKEN is required');
  }
  return secret;
}

async function importSessionKey() {
  return crypto.subtle.importKey(
    'raw',
    encoder.encode(getSessionSecret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  );
}

function bytesToBase64Url(bytes: Uint8Array) {
  let binary = '';
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function base64UrlToBytes(value: string) {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(value.length / 4) * 4, '=');
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

function encodePayload(payload: AdminSessionPayload) {
  return bytesToBase64Url(encoder.encode(JSON.stringify(payload)));
}

function decodePayload(value: string) {
  const decoded = new TextDecoder().decode(base64UrlToBytes(value));
  return JSON.parse(decoded) as Partial<AdminSessionPayload>;
}

function normalizeSessionPayload(payload: Partial<AdminSessionPayload>): AdminSession | null {
  if (!payload.email || !payload.role || !payload.expiresAt) {
    return null;
  }

  const role = normalizeAdminRole(payload.role);
  const allowedCategories = normalizeAllowedAdminCategories(role, payload.allowedCategories);

  if (role === 'expert' && allowedCategories.length === 0) {
    return null;
  }

  if (typeof payload.expiresAt !== 'number' || payload.expiresAt <= Date.now()) {
    return null;
  }

  return {
    email: normalizeAdminEmail(payload.email),
    role,
    allowedCategories,
    displayName: payload.displayName?.trim() || null,
    expiresAt: payload.expiresAt,
  };
}

function getLegacySession(): AdminSession | null {
  const fallbackAccount = getLegacyFallbackAccount();
  if (!fallbackAccount) {
    return null;
  }

  return {
    email: fallbackAccount.email,
    role: 'super_admin',
    allowedCategories: [...ADMIN_CATEGORIES],
    displayName: fallbackAccount.displayName,
    expiresAt: Date.now() + ADMIN_SESSION_MAX_AGE_SECONDS * 1000,
    legacy: true,
  };
}

export async function createAdminSessionCookieValue(account: Pick<AdminAccountConfig, 'email' | 'role' | 'allowedCategories' | 'displayName'>) {
  const payload: AdminSessionPayload = {
    email: account.email,
    role: account.role,
    allowedCategories: account.role === 'super_admin' ? [...ADMIN_CATEGORIES] : account.allowedCategories,
    displayName: account.displayName,
    expiresAt: Date.now() + ADMIN_SESSION_MAX_AGE_SECONDS * 1000,
  };

  const encodedPayload = encodePayload(payload);
  const signature = await crypto.subtle.sign('HMAC', await importSessionKey(), encoder.encode(encodedPayload));
  return `${encodedPayload}.${bytesToBase64Url(new Uint8Array(signature))}`;
}

export async function verifyAdminSessionCookie(value: string | null | undefined): Promise<AdminSession | null> {
  // Always return a mock session in frontend-only mode
  return {
    email: 'admin@zeroprize.local',
    role: 'super_admin',
    allowedCategories: ['air', 'water', 'land'],
    displayName: 'Admin',
    expiresAt: Date.now() + 60 * 60 * 24 * 1000,
  };
}

export function isSuperAdmin(session: AdminSession | null | undefined) {
  return session?.role === 'super_admin';
}

export function canAccessCategory(session: AdminSession | null | undefined, category: string | null | undefined) {
  if (!session || !category) {
    return false;
  }

  if (session.role === 'super_admin') {
    return true;
  }

  const normalizedCategory = normalizeAdminCategory(category.trim().toLowerCase());
  return Boolean(normalizedCategory && session.allowedCategories.includes(normalizedCategory));
}

export function getCategoryScopeLabel(categories: string[]) {
  const labels: Record<string, string> = {
    air: 'Air Quality',
    water: 'Water Pollution',
    land: 'Land Pollution',
  };

  return categories.map((category) => labels[category] ?? category).join(', ');
}