/**
 * @fileoverview Mail service for the API Gateway.
 * Sends transactional emails (e.g. password-reset OTPs) via Nodemailer / SMTP.
 */
import { Injectable, Logger } from "@nestjs/common";
import config from "@shared/config/app.config";
import * as nodemailer from "nodemailer";

/** Sends transactional emails (e.g. password-reset OTPs) via SMTP / Nodemailer. */
@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private transporter: nodemailer.Transporter;

  constructor() {
    // Initialize Nodemailer transporter with SMTP configuration
    this.transporter = nodemailer.createTransport({
      host: config.MAIL_HOST,
      port: Number(config.MAIL_PORT) || 587,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: config.MAIL_USER,
        pass: config.MAIL_PASS,
      },
    });
  }

  /**
   * Sends an email using the configured transporter.
   * @param options - An object containing the email options, including recipient, subject, HTML content, and optional text content.
   * @returns A promise that resolves with the result of the email sending operation.
   * @throws An error if the email sending operation fails, which is also logged for troubleshooting purposes.
   */
  async sendMail(options: {
    to: string;
    subject: string;
    html: string;
    text?: string;
  }) {
    try {
      const info = await this.transporter.sendMail({
        from: `"${config.MAIL_FROM_NAME}" <${config.MAIL_FROM_EMAIL}>`,
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
