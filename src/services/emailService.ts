import nodemailer from 'nodemailer';
import fs from 'fs-extra';
import handlebars from 'handlebars';
import path from 'path';
import { urlVerification } from '../utils/urlVerification';

// ! Para production es "production"
const url_veritication = urlVerification.production;
const url_mobile = 'myapp://verification-success';

const transport = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const loadTemplate = async (templateName: string, data: Record<string, any>) => {
  const templatePath = path.join(__dirname, './emails/templates', `${templateName}.html`);
  const source = await fs.readFile(templatePath, 'utf-8');
  const compiledTemplate = handlebars.compile(source);
  return compiledTemplate(data);
};

export const newAccount = async (name: string, email: string, token: string) => {
  const verificationUrl = `${url_veritication}${token}`;
  const redirectUrl = url_mobile;
  const html = await loadTemplate('newAccount', { name, verificationUrl });
  const message = {
    from: 'support@xiconemi.com',
    to: email,
    subject: 'Verify your email',
    html,
  };

  await transport.sendMail(message);
};
