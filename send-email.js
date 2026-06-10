/**
 * Vercel Serverless Function — /api/send-email
 *
 * Proxies email sending to Resend from the server so that:
 *  1. The API key is never exposed to the browser.
 *  2. CORS restrictions on the Resend API are avoided.
 *
 * Set RESEND_API_KEY in your Vercel project's Environment Variables.
 * (Project → Settings → Environment Variables)
 */
export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY environment variable is not set.');
    return res.status(500).json({ error: 'Server misconfiguration' });
  }

  const { subject, html, replyTo } = req.body ?? {};

  if (!subject || !html) {
    return res.status(400).json({ error: 'Missing required fields: subject, html' });
  }

  const body = {
    from: 'Aital Website <onboarding@resend.dev>',
    to: ['aitaltechvolution@gmail.com'],
    subject,
    html,
  };
  if (replyTo) body.reply_to = replyTo;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      console.error(`Resend API error ${response.status}:`, errorText);
      return res.status(502).json({ error: `Resend error: ${response.status}` });
    }

    const data = await response.json();
    return res.status(200).json({ success: true, id: data.id });
  } catch (err) {
    console.error('Failed to reach Resend API:', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}