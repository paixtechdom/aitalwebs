import emailjs from '@emailjs/browser';

const SERVICE_ID         = 'service_355olyw';
const PUBLIC_KEY         = 'lMHE7TiFIDcuzB9za';
const CONTACT_TEMPLATE   = 'template_jki9xfd';
const SUBSCRIBE_TEMPLATE = 'template_gadz6lb';

export async function sendContactEmail({ name, email, message }) {
  await emailjs.send(
    SERVICE_ID,
    CONTACT_TEMPLATE,
    { from_name: name, from_email: email, message },
    PUBLIC_KEY
  );
}

export async function sendSubscribeEmail(email) {
  await emailjs.send(
    SERVICE_ID,
    SUBSCRIBE_TEMPLATE,
    { subscriber_email: email },
    PUBLIC_KEY
  );
}