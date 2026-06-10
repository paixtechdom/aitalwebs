/**
 * Sends an email by calling our own Vercel serverless function (/api/send-email).
 * The serverless function holds the Resend API key securely on the server —
 * it is never exposed to the browser.
 *
 * @param {{ subject: string, html: string, replyTo?: string }} opts
 * @returns {Promise<boolean>} true on success
 */
export async function sendEmail({ subject, html, replyTo }) {
  const res = await fetch('/api/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ subject, html, replyTo }),
  });

  if (!res.ok) {
    const err = await res.text().catch(() => 'Unknown error');
    throw new Error(`Email API error ${res.status}: ${err}`);
  }

  return true;
}