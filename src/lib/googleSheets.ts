// Mock Google Sheets integration for frontend-only mode
export type SheetType = 'contact' | 'registration' | 'partner' | 'application';

export async function appendContactToSheet(data: any) { return; }
export async function appendRegistrationToSheet(data: any) { return; }
export async function appendPartnerToSheet(data: any) { return; }
export async function appendApplicationToSheet(data: any) { return; }
export async function deleteFromSheet(type: SheetType, recordId: string) { return; }
export async function updateApplicationStatusInSheet(recordId: string, status: string) { return; }

