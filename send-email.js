export const config = { runtime: 'nodejs' };

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'Server misconfiguration' });

  // Parse body — Vercel may pass it as a string
  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { return res.status(400).json({ error: 'Invalid JSON' }); }
  }

  const { subject, html, replyTo } = body ?? {};
  if (!subject || !html) return res.status(400).json({ error: 'Missing subject or html' });

  const payload = {
    from: 'Aital Website <onboarding@resend.dev>',
    to: ['aitaltechvolution@gmail.com'],
    subject,
    html,
  };
  if (replyTo) payload.reply_to = replyTo;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      console.error(`Resend error ${response.status}:`, errorText);
      return res.status(502).json({ error: `Resend error: ${response.status}` });
    }

    const data = await response.json();
    return res.status(200).json({ success: true, id: data.id });
  } catch (err) {
    console.error('Fetch to Resend failed:', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}