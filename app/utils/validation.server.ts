// 폼 데이터 유형 정의
interface ContactFormData {
	name: string;
	email: string;
	subject: string;
	message: string;
}

// 오류 유형 정의
interface FormErrors {
	name?: string;
	email?: string;
	subject?: string;
	message?: string;
	server?: string;
}

/**
 * 연락처 폼 유효성 검사 함수
 *
 * @param formData 검사할 폼 데이터
 * @returns 유효성 검사 오류 객체
 */
export function validateContactForm(formData: ContactFormData): FormErrors {
	const errors: FormErrors = {};

	// 이름 유효성 검사
	if (!formData.name || formData.name.trim() === "") {
		errors.name = "이름은 필수 항목입니다";
	} else if (formData.name.trim().length < 2) {
		errors.name = "이름은 2자 이상이어야 합니다";
	}

	// 이메일 유효성 검사
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!formData.email || formData.email.trim() === "") {
		errors.email = "이메일은 필수 항목입니다";
	} else if (!emailRegex.test(formData.email)) {
		errors.email = "유효한 이메일 주소를 입력해주세요";
	}

	// 제목 유효성 검사
	if (!formData.subject || formData.subject.trim() === "") {
		errors.subject = "제목은 필수 항목입니다";
	} else if (formData.subject.trim().length < 3) {
		errors.subject = "제목은 3자 이상이어야 합니다";
	}

	// 메시지 유효성 검사
	if (!formData.message || formData.message.trim() === "") {
		errors.message = "메시지는 필수 항목입니다";
	} else if (formData.message.trim().length < 10) {
		errors.message = "메시지는 10자 이상이어야 합니다";
	} else if (formData.message.trim().length > 1000) {
		errors.message = "메시지는 1000자 이하여야 합니다";
	}

	return errors;
}

/**
 * 보안을 위한 입력 필터링/정화 함수
 *
 * @param input 정화할 입력 문자열
 * @returns 정화된 문자열
 */
export function sanitizeInput(input: string): string {
	// HTML 특수 문자 이스케이프
	return input.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

/**
 * 폼 입력값 모두 정화
 *
 * @param formData 정화할 폼 데이터
 * @returns 정화된 폼 데이터
 */
export function sanitizeFormData(formData: ContactFormData): ContactFormData {
	return {
		name: sanitizeInput(formData.name),
		email: sanitizeInput(formData.email),
		subject: sanitizeInput(formData.subject),
		message: sanitizeInput(formData.message),
	};
}
