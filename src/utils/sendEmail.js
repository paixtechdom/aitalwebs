import emailjs from '@emailjs/browser';

const SERVICE_ID  = 'service_355olyw';   // e.g. service_abc123
const PUBLIC_KEY  = 'lMHE7TiFIDcuzB9za';   // e.g. xK2mN9pQrS

export async function sendContactEmail({ name, email, message }) {
  await emailjs.send(
    SERVICE_ID,
    'contact_template',
    { from_name: name, from_email: email, message },
    PUBLIC_KEY
  );
}

export async function sendSubscribeEmail(email) {
  await emailjs.send(
    SERVICE_ID,
    'subscribe_template',
    { subscriber_email: email },
    PUBLIC_KEY
  );
}