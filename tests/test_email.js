import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_KEY);

const { data, error } = await resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'dummysubject170@gmail.com',
  subject: 'Hello World',
  html: '<p>Congrats on sending your <strong>first email</strong>!</p>',
});

if (error) {
  console.error('Error:', error);
} else {
  console.log('Sent:', data);
}