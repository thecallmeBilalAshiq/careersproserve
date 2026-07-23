/**
 * Email Dispatch Utility for Careers Pro Serve
 * Configured to send email notifications from careersproserve@gmail.com
 */

export interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}

export async function sendNotificationEmail(payload: EmailPayload): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...payload,
        from: 'careersproserve@gmail.com',
      }),
    });

    const data = await res.json();
    return data;
  } catch (err: any) {
    console.error('Failed to send email:', err);
    return { success: false, message: err?.message || 'Email dispatch failed' };
  }
}
