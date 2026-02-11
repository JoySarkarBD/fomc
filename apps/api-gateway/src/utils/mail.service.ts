import { Injectable, Logger } from "@nestjs/common";
import * as nodemailer from "nodemailer";

/**
 * MailService
 *
 * Provides email sending functionality using Nodemailer.
 * Configured via environment variables.
 *
 * Environment Variables:
 * - MAIL_HOST: SMTP server host
 * - MAIL_PORT: SMTP server port
 * - MAIL_USER: SMTP authentication username
 * - MAIL_PASS: SMTP authentication password
 * - MAIL_FROM_NAME: Name for the "from" field in emails
 * - MAIL_FROM_EMAIL: Email for the "from" field
 */
@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private transporter: nodemailer.Transporter;

  constructor() {
    // Initialize Nodemailer transporter with SMTP configuration
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT) || 587,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  /**
   * Send an email.
   *
   * @param options - Mail options
   * @param options.to - Recipient email address
   * @param options.subject - Email subject
   * @param options.html - HTML content of the email
   * @param options.text - Optional plain text content
   * @returns Promise resolving with Nodemailer sent info object
   * @throws Throws an error if sending fails
   */
  async sendMail(options: {
    to: string;
    subject: string;
    html: string;
    text?: string;
  }) {
    try {
      const info = await this.transporter.sendMail({
        from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_EMAIL}>`,
        ...options,
      });

      this.logger.log(`Email sent: ${info.messageId}`);
      return info;
    } catch (error) {
      this.logger.error("Email sending failed", error);
      throw error;
    }
  }
}
