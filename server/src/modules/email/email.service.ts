import { Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as path from 'path';
import * as Handlebars from 'handlebars';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;
  private emailTemplate: Handlebars.TemplateDelegate;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const templatePath = path.join(process.cwd(), 'templates', 'confirmation-email.html');
    const templateSource = fs.readFileSync(templatePath, 'utf-8');
    this.emailTemplate = Handlebars.compile(templateSource);
  }

  async sendVerificationEmail(email: string, firstName: string, token: string): Promise<void> {
    const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
    
    const htmlContent = this.emailTemplate({
      firstName,
      verificationLink,
      currentYear: new Date().getFullYear()
    });

    await this.transporter.sendMail({
      to: email,
      subject: 'Vérification de votre adresse e-mail - Financr',
      html: htmlContent,
    });
  }
}