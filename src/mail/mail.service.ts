import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class MailService {
  private resend: Resend;
  private readonly logger = new Logger(MailService.name);

  constructor(private config: ConfigService) {
    this.resend = new Resend(this.config.get('RESEND_API_KEY'));
  }

  async sendVerificationEmail(email: string, name: string, token: string) {
    const appUrl = this.config.get('APP_URL') ?? 'http://localhost:3000';
    const verifyUrl = `${appUrl}/verify-email?token=${token}`;

    this.logger.log(`Doğrulama linki [${email}]: ${verifyUrl}`);

    const from = this.config.get('MAIL_FROM') ?? 'Takip <onboarding@resend.dev>';

    const { data, error } = await this.resend.emails.send({
      from,
      to: email,
      subject: 'E-posta adresinizi doğrulayın — Takip',
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;">
          <h2 style="color:#4f46e5;">Takip'e Hoş Geldiniz, ${name}!</h2>
          <p>Hesabınızı aktifleştirmek için aşağıdaki butona tıklayın.</p>
          <a href="${verifyUrl}"
             style="display:inline-block;margin:16px 0;padding:12px 24px;background:#4f46e5;color:#fff;border-radius:8px;text-decoration:none;font-weight:600;">
            E-postamı Doğrula
          </a>
          <p style="color:#6b7280;font-size:13px;">Bu link 24 saat geçerlidir. Eğer bu isteği siz yapmadıysanız dikkate almayın.</p>
        </div>
      `,
    });

    if (error) {
      throw new Error(error.message);
    }

    this.logger.log(`Doğrulama maili gönderildi [${email}] -> ${data?.id}`);
  }
}
