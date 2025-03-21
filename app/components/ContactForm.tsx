import { useState, useRef, useEffect } from "react";
import { Form } from "@remix-run/react";
import { motion, AnimatePresence } from "framer-motion";

interface FormErrors {
	name?: string;
	email?: string;
	subject?: string;
	message?: string;
	server?: string;
}

interface ContactFormProps {
	errors?: FormErrors;
	isSubmitting: boolean;
	success: boolean;
}

export default function ContactForm({ errors, isSubmitting, success }: ContactFormProps) {
	// 인풋 필드들의 포커스 상태 관리
	const [focusedField, setFocusedField] = useState<string | null>(null);

	// 실시간 유효성 검사를 위한 상태
	const [formValues, setFormValues] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});

	// 실시간 유효성 검사 오류
	const [validationErrors, setValidationErrors] = useState<FormErrors>({});

	// 폼 제출 버튼의 애니메이션을 위한 참조
	const formRef = useRef<HTMLFormElement>(null);
	const paperPlaneRef = useRef<HTMLDivElement>(null);

	// 폼 필드 변경 핸들러
	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormValues((prev) => ({ ...prev, [name]: value }));

		// 실시간 유효성 검사
		validateField(name, value);
	};

	// 개별 필드 유효성 검사
	const validateField = (name: string, value: string) => {
		let error = "";

		switch (name) {
			case "name":
				if (value.trim() === "") {
					error = "이름은 필수 항목입니다";
				} else if (value.trim().length < 2) {
					error = "이름은 2자 이상이어야 합니다";
				}
				break;

			case "email": {
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				if (value.trim() === "") {
					error = "이메일은 필수 항목입니다";
				} else if (!emailRegex.test(value)) {
					error = "유효한 이메일 주소를 입력해주세요";
				}
				break;
			}

			case "subject":
				if (value.trim() === "") {
					error = "제목은 필수 항목입니다";
				} else if (value.trim().length < 3) {
					error = "제목은 3자 이상이어야 합니다";
				}
				break;

			case "message":
				if (value.trim() === "") {
					error = "메시지는 필수 항목입니다";
				} else if (value.trim().length < 10) {
					error = "메시지는 10자 이상이어야 합니다";
				}
				break;

			default:
				break;
		}

		setValidationErrors((prev) => ({
			...prev,
			[name]: error || undefined,
		}));
	};

	// 폼 제출 성공 시 종이비행기 애니메이션
	useEffect(() => {
		if (success && paperPlaneRef.current && formRef.current) {
			// 종이비행기 애니메이션 실행
			const formRect = formRef.current.getBoundingClientRect();
			const plane = paperPlaneRef.current;

			// 초기 위치 설정 (form 중앙)
			plane.style.display = "block";
			plane.style.left = `${formRect.left + formRect.width / 2}px`;
			plane.style.top = `${formRect.top + formRect.height / 2}px`;

			// 애니메이션 시작
			setTimeout(() => {
				plane.classList.add("animate-fly-away");

				// 애니메이션 완료 후 숨기기
				setTimeout(() => {
					plane.style.display = "none";
					plane.classList.remove("animate-fly-away");

					// 폼 초기화
					if (formRef.current) {
						formRef.current.reset();
						setFormValues({
							name: "",
							email: "",
							subject: "",
							message: "",
						});
					}
				}, 1500);
			}, 100);
		}
	}, [success]);

	return (
		<>
			{/* 종이비행기 엘리먼트 */}
			<div ref={paperPlaneRef} className="fixed hidden pointer-events-none z-50" style={{ transform: "translate(-50%, -50%)" }}>
				<motion.div animate={{ rotate: [0, 15, 0, -15, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
					<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				</motion.div>
			</div>

			{/* 연락처 폼 */}
			<Form ref={formRef} method="post" className="w-full">
				{/* 서버 오류 표시 */}
				{errors?.server && <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400">{errors.server}</div>}

				{/* 제출 성공 메시지 */}
				<AnimatePresence>
					{success && (
						<motion.div
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: "auto" }}
							exit={{ opacity: 0, height: 0 }}
							className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-600 dark:text-green-400"
						>
							메시지가 성공적으로 전송되었습니다. 빠른 시일 내에 답변 드리겠습니다!
						</motion.div>
					)}
				</AnimatePresence>

				{/* 이름 입력 필드 */}
				<div className="mb-4">
					<div className="relative">
						<motion.label
							htmlFor="name"
							className={`block text-sm font-medium transition-all duration-200 ${
								focusedField === "name" || formValues.name ? "text-indigo-600 dark:text-indigo-400 transform -translate-y-6 scale-75 origin-left" : "text-gray-700 dark:text-gray-300"
							}`}
							animate={{
								y: focusedField === "name" || formValues.name ? -16 : 0,
								scale: focusedField === "name" || formValues.name ? 0.75 : 1,
							}}
							transition={{ duration: 0.2 }}
						>
							이름
						</motion.label>
						<input
							type="text"
							id="name"
							name="name"
							className={`mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-900 border ${
								errors?.name || validationErrors.name ? "border-red-500" : focusedField === "name" ? "border-indigo-500 dark:border-indigo-400" : "border-gray-300 dark:border-gray-600"
							} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
							onFocus={() => setFocusedField("name")}
							onBlur={() => {
								setFocusedField(null);
								validateField("name", formValues.name);
							}}
							onChange={handleChange}
							value={formValues.name}
						/>
						<AnimatePresence>
							{(errors?.name || validationErrors.name) && (
								<motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-1 text-sm text-red-600 dark:text-red-400">
									{errors?.name || validationErrors.name}
								</motion.p>
							)}
						</AnimatePresence>
					</div>
				</div>

				{/* 이메일 입력 필드 */}
				<div className="mb-4">
					<div className="relative">
						<motion.label
							htmlFor="email"
							className={`block text-sm font-medium transition-all duration-200 ${
								focusedField === "email" || formValues.email ? "text-indigo-600 dark:text-indigo-400 transform -translate-y-6 scale-75 origin-left" : "text-gray-700 dark:text-gray-300"
							}`}
							animate={{
								y: focusedField === "email" || formValues.email ? -16 : 0,
								scale: focusedField === "email" || formValues.email ? 0.75 : 1,
							}}
							transition={{ duration: 0.2 }}
						>
							이메일
						</motion.label>
						<input
							type="email"
							id="email"
							name="email"
							className={`mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-900 border ${
								errors?.email || validationErrors.email ? "border-red-500" : focusedField === "email" ? "border-indigo-500 dark:border-indigo-400" : "border-gray-300 dark:border-gray-600"
							} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
							onFocus={() => setFocusedField("email")}
							onBlur={() => {
								setFocusedField(null);
								validateField("email", formValues.email);
							}}
							onChange={handleChange}
							value={formValues.email}
						/>
						<AnimatePresence>
							{(errors?.email || validationErrors.email) && (
								<motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-1 text-sm text-red-600 dark:text-red-400">
									{errors?.email || validationErrors.email}
								</motion.p>
							)}
						</AnimatePresence>
					</div>
				</div>

				{/* 제목 입력 필드 */}
				<div className="mb-4">
					<div className="relative">
						<motion.label
							htmlFor="subject"
							className={`block text-sm font-medium transition-all duration-200 ${
								focusedField === "subject" || formValues.subject ? "text-indigo-600 dark:text-indigo-400 transform -translate-y-6 scale-75 origin-left" : "text-gray-700 dark:text-gray-300"
							}`}
							animate={{
								y: focusedField === "subject" || formValues.subject ? -16 : 0,
								scale: focusedField === "subject" || formValues.subject ? 0.75 : 1,
							}}
							transition={{ duration: 0.2 }}
						>
							제목
						</motion.label>
						<input
							type="text"
							id="subject"
							name="subject"
							className={`mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-900 border ${
								errors?.subject || validationErrors.subject ? "border-red-500" : focusedField === "subject" ? "border-indigo-500 dark:border-indigo-400" : "border-gray-300 dark:border-gray-600"
							} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
							onFocus={() => setFocusedField("subject")}
							onBlur={() => {
								setFocusedField(null);
								validateField("subject", formValues.subject);
							}}
							onChange={handleChange}
							value={formValues.subject}
						/>
						<AnimatePresence>
							{(errors?.subject || validationErrors.subject) && (
								<motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-1 text-sm text-red-600 dark:text-red-400">
									{errors?.subject || validationErrors.subject}
								</motion.p>
							)}
						</AnimatePresence>
					</div>
				</div>

				{/* 메시지 입력 필드 */}
				<div className="mb-6">
					<div className="relative">
						<motion.label
							htmlFor="message"
							className={`block text-sm font-medium transition-all duration-200 ${
								focusedField === "message" || formValues.message ? "text-indigo-600 dark:text-indigo-400 transform -translate-y-6 scale-75 origin-left" : "text-gray-700 dark:text-gray-300"
							}`}
							animate={{
								y: focusedField === "message" || formValues.message ? -16 : 0,
								scale: focusedField === "message" || formValues.message ? 0.75 : 1,
							}}
							transition={{ duration: 0.2 }}
						>
							메시지
						</motion.label>
						<textarea
							id="message"
							name="message"
							rows={5}
							className={`mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-900 border ${
								errors?.message || validationErrors.message ? "border-red-500" : focusedField === "message" ? "border-indigo-500 dark:border-indigo-400" : "border-gray-300 dark:border-gray-600"
							} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
							onFocus={() => setFocusedField("message")}
							onBlur={() => {
								setFocusedField(null);
								validateField("message", formValues.message);
							}}
							onChange={handleChange}
							value={formValues.message}
						/>
						<AnimatePresence>
							{(errors?.message || validationErrors.message) && (
								<motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-1 text-sm text-red-600 dark:text-red-400">
									{errors?.message || validationErrors.message}
								</motion.p>
							)}
						</AnimatePresence>
					</div>
				</div>

				{/* 제출 버튼 */}
				<div className="flex justify-end">
					<motion.button
						type="submit"
						disabled={isSubmitting}
						className={`inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white
              ${isSubmitting ? "bg-indigo-400 dark:bg-indigo-600 cursor-not-allowed" : "bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600"}
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-150`}
						whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
						whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
					>
						{isSubmitting ? (
							<>
								<svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
									<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
									<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
								</svg>
								전송 중...
							</>
						) : (
							<>
								메시지 보내기
								<svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
									<path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
								</svg>
							</>
						)}
					</motion.button>
				</div>
			</Form>

			{/* 비행기 애니메이션을 위한 스타일 */}
			<style>{`
				@keyframes fly-away {
					0% {
						transform: translate(-50%, -50%) rotate(0deg);
						opacity: 1;
					}
					30% {
						transform: translate(-30%, -80%) rotate(-20deg);
						opacity: 1;
					}
					100% {
						transform: translate(100%, -200%) rotate(-30deg);
						opacity: 0;
					}
				}
				
				.animate-fly-away {
					animation: fly-away 1.5s forwards cubic-bezier(0.215, 0.610, 0.355, 1.000);
				}
			`}</style>
		</>
	);
}
