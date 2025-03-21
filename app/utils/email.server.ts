import { sanitizeFormData } from './validation.server';
import nodemailer from 'nodemailer';

interface EmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * 연락처 이메일 전송 함수 - Nodemailer 사용
 *
 * @param emailData 이메일 데이터
 * @returns Promise<void>
 */
export async function sendEmail(emailData: EmailData): Promise<void> {
  const sanitizedData = sanitizeFormData(emailData);

  let transporter;
  let testAccount;

  const hasSmtpConfig = process.env.SMTP_USER && process.env.SMTP_PASSWORD;

  if (hasSmtpConfig) {
    console.log('실제 SMTP 서버 사용');
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  } else {
    console.log('Ethereal 테스트 계정 사용');
    testAccount = await nodemailer.createTestAccount();
    console.log('테스트 계정 정보:', testAccount);

    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  }

  const mailOptions = {
    from: `"포트폴리오 문의" <${process.env.MAIL_FROM || testAccount?.user || 'noreply@example.com'}>`,
    to: process.env.MAIL_TO || 'contact@example.com',
    replyTo: sanitizedData.email,
    subject: `[포트폴리오 문의] ${sanitizedData.subject}`,
    text: `
이름: ${sanitizedData.name}
이메일: ${sanitizedData.email}
제목: ${sanitizedData.subject}

메시지:
${sanitizedData.message}
		`,
    html: `
			<div>
				<h3>포트폴리오 문의</h3>
				<p><strong>이름:</strong> ${sanitizedData.name}</p>
				<p><strong>이메일:</strong> ${sanitizedData.email}</p>
				<p><strong>제목:</strong> ${sanitizedData.subject}</p>
				<p><strong>메시지:</strong></p>
				<p>${sanitizedData.message.replace(/\n/g, '<br>')}</p>
			</div>
		`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('이메일 발송 완료:', info.messageId);

    if (testAccount) {
      console.log('이메일 미리보기 URL:', nodemailer.getTestMessageUrl(info));
    }
  } catch (error) {
    console.error('이메일 발송 오류:', error);
    throw new Error('이메일 발송에 실패했습니다.');
  }
}
