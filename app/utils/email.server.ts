import { sanitizeFormData } from "./validation.server";

interface EmailData {
	name: string;
	email: string;
	subject: string;
	message: string;
}

/**
 * 연락처 이메일 전송 함수
 *
 * 이 함수는 실제 이메일 발송을 시뮬레이션합니다.
 * 실제 프로덕션 환경에서는 아래 주석 처리된 코드와 같이
 * 실제 이메일 서비스 (Nodemailer, AWS SES, SendGrid 등)를 사용하게 됩니다.
 *
 * @param emailData 이메일 데이터
 * @returns Promise<void>
 */
export async function sendEmail(emailData: EmailData): Promise<void> {
	// 입력 데이터 정화
	const sanitizedData = sanitizeFormData(emailData);

	// 실제 프로덕션 환경에서는 여기에 이메일 전송 로직 구현
	// 예: Nodemailer, AWS SES, SendGrid 등 사용

	console.log("이메일 발송 요청:", {
		to: "contact@example.com",
		from: sanitizedData.email,
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
        <p>${sanitizedData.message.replace(/\n/g, "<br>")}</p>
      </div>
    `,
	});

	// 실제 이메일 발송 시뮬레이션 (지연 시간 추가)
	return new Promise((resolve) => {
		setTimeout(() => {
			console.log("이메일 발송 완료");
			resolve();
		}, 1000);
	});
}

/**
 * 실제 이메일 발송 구현 예시 (Nodemailer 사용)
 * 이 코드는 설명용으로만 제공되며, 실제로는 사용되지 않습니다.
 */
/*
import nodemailer from 'nodemailer';

export async function sendRealEmail(emailData: EmailData): Promise<void> {
  // Nodemailer 트랜스포트 설정
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  // 정화된 데이터로 이메일 보내기
  const sanitizedData = sanitizeFormData(emailData);
  
  await transporter.sendMail({
    from: `"포트폴리오 문의" <${process.env.MAIL_FROM}>`,
    to: process.env.MAIL_TO,
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
        <p>${sanitizedData.message.replace(/\n/g, "<br>")}</p>
      </div>
    `,
  });
}
*/
