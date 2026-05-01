import 'server-only';

import { supabaseAdmin } from '@/lib/supabase';
import {
  ADMIN_CATEGORIES,
  type AdminAccountIdentity,
  type AdminCategory,
  type AdminRole,
  normalizeAdminEmail,
  normalizeAdminRole,
  normalizeAllowedAdminCategories,
  resolveConfiguredAdminAccount,
} from '@/lib/admin-auth';

const PASSWORD_HASH_ALGORITHM = 'pbkdf2-sha256';
const PASSWORD_HASH_ITERATIONS = 120_000;
const PASSWORD_SALT_BYTES = 16;
const PASSWORD_KEY_BYTES = 32;

interface AdminUserRow {
  id: string;
  email: string;
  display_name: string | null;
  password_hash: string;
  role: string;
  allowed_categories: string[] | null;
  is_active: boolean;
  created_at: string;
  created_by_email: string | null;
}

export interface ManagedAdminUser {
  id: string;
  email: string;
  displayName: string | null;
  role: AdminRole;
  allowedCategories: AdminCategory[];
  isActive: boolean;
  createdAt: string;
  createdByEmail: string | null;
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

function decodeUtf8(bytes: Uint8Array) {
  return new TextDecoder().decode(bytes);
}

function encodeUtf8(value: string) {
  return new TextEncoder().encode(value);
}

function isAdminUsersTableMissing(error: { message?: string; details?: string } | null) {
  const combined = `${error?.message ?? ''} ${error?.details ?? ''}`.toLowerCase();
  return combined.includes('admin_users') && (combined.includes('does not exist') || combined.includes('could not find the table') || combined.includes('relation'));
}

function toManagedAdminUser(row: AdminUserRow): ManagedAdminUser {
  const role = normalizeAdminRole(row.role);
  return {
    id: row.id,
    email: normalizeAdminEmail(row.email),
    displayName: row.display_name,
    role,
    allowedCategories: normalizeAllowedAdminCategories(role, row.allowed_categories ?? []),
    isActive: row.is_active,
    createdAt: row.created_at,
    createdByEmail: row.created_by_email,
  };
}

async function derivePasswordHash(password: string, salt: Uint8Array<ArrayBuffer>) {
  const keyMaterial = await crypto.subtle.importKey('raw', encodeUtf8(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      hash: 'SHA-256',
      salt,
      iterations: PASSWORD_HASH_ITERATIONS,
    },
    keyMaterial,
    PASSWORD_KEY_BYTES * 8,
  );
  return new Uint8Array(bits);
}

function constantTimeEqual(left: Uint8Array, right: Uint8Array) {
  if (left.length !== right.length) {
    return false;
  }

  let result = 0;
  for (let index = 0; index < left.length; index += 1) {
    result |= left[index] ^ right[index];
  }
  return result === 0;
}

export async function hashAdminPassword(password: string) {
  const salt = new Uint8Array(new ArrayBuffer(PASSWORD_SALT_BYTES));
  crypto.getRandomValues(salt);
  const hash = await derivePasswordHash(password, salt);
  return `${PASSWORD_HASH_ALGORITHM}$${PASSWORD_HASH_ITERATIONS}$${bytesToBase64Url(salt)}$${bytesToBase64Url(hash)}`;
}

export async function verifyAdminPassword(password: string, storedHash: string) {
  const [algorithm, iterationsText, encodedSalt, encodedHash] = storedHash.split('$');
  if (algorithm !== PASSWORD_HASH_ALGORITHM || !iterationsText || !encodedSalt || !encodedHash) {
    return false;
  }

  const iterations = Number(iterationsText);
  if (!Number.isFinite(iterations) || iterations <= 0 || iterations !== PASSWORD_HASH_ITERATIONS) {
    return false;
  }

  const salt = base64UrlToBytes(encodedSalt);
  const expectedHash = base64UrlToBytes(encodedHash);
  const actualHash = await derivePasswordHash(password, salt);
  return constantTimeEqual(actualHash, expectedHash);
}

export async function listManagedAdminUsers() {
  const { data, error } = await supabaseAdmin
    .from('admin_users')
    .select('id, email, display_name, password_hash, role, allowed_categories, is_active, created_at, created_by_email')
    .order('created_at', { ascending: false });

  if (error) {
    if (isAdminUsersTableMissing(error)) {
      return { users: [] as ManagedAdminUser[], storageReady: false };
    }
    throw error;
  }

  return {
    users: (data ?? []).map((row) => toManagedAdminUser(row as AdminUserRow)),
    storageReady: true,
  };
}

export async function getManagedAdminUserByEmail(email: string) {
  const normalizedEmail = normalizeAdminEmail(email);
  const { data, error } = await supabaseAdmin
    .from('admin_users')
    .select('id, email, display_name, password_hash, role, allowed_categories, is_active, created_at, created_by_email')
    .eq('email', normalizedEmail)
    .maybeSingle();

  if (error) {
    if (isAdminUsersTableMissing(error)) {
      return { user: null as (ManagedAdminUser & { passwordHash: string }) | null, storageReady: false };
    }
    throw error;
  }

  if (!data) {
    return { user: null, storageReady: true };
  }

  const mapped = toManagedAdminUser(data as AdminUserRow);
  return {
    user: {
      ...mapped,
      passwordHash: (data as AdminUserRow).password_hash,
    },
    storageReady: true,
  };
}

export async function resolveAdminAccount(email: string, password: string): Promise<AdminAccountIdentity | null> {
  // Always allow login in frontend-only mode
  return {
    email: email || 'admin@zeroprize.local',
    role: 'super_admin',
    allowedCategories: [...ADMIN_CATEGORIES],
    displayName: 'Admin User',
  };
}

export async function createManagedAdminUser(input: {
  email: string;
  password: string;
  role: AdminRole;
  allowedCategories: string[];
  displayName?: string | null;
  createdByEmail?: string | null;
}) {
  const email = normalizeAdminEmail(input.email);
  const role = normalizeAdminRole(input.role);
  const allowedCategories = normalizeAllowedAdminCategories(role, input.allowedCategories);

  if (role === 'expert' && allowedCategories.length === 0) {
    throw new Error('Expert users must be assigned at least one category');
  }

  const passwordHash = await hashAdminPassword(input.password);

  const { data, error } = await supabaseAdmin
    .from('admin_users')
    .insert({
      email,
      display_name: input.displayName?.trim() || null,
      password_hash: passwordHash,
      role,
      allowed_categories: role === 'super_admin' ? [...ADMIN_CATEGORIES] : allowedCategories,
      is_active: true,
      created_by_email: input.createdByEmail?.trim() || null,
    })
    .select('id, email, display_name, password_hash, role, allowed_categories, is_active, created_at, created_by_email')
    .single();

  if (error) {
    if (isAdminUsersTableMissing(error)) {
      throw new Error('Admin user storage is not initialized. Run supabase_admin_users_setup.sql first.');
    }
    if (`${error.message ?? ''}`.toLowerCase().includes('duplicate key')) {
      throw new Error('A dashboard user with this email already exists');
    }
    throw error;
  }

  return toManagedAdminUser(data as AdminUserRow);
}

export async function deleteManagedAdminUser(id: string) {
  const { error } = await supabaseAdmin
    .from('admin_users')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(error.message ?? 'Failed to delete dashboard user');
  }
}

export function getCategoryLabel(category: string) {
  const labels: Record<string, string> = {
    air: 'Air Quality',
    water: 'Water Pollution',
    land: 'Land Pollution',
  };

  return labels[category] ?? decodeUtf8(encodeUtf8(category));
}