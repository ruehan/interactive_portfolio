/**
 * 이스터 에그 기능을 위한 유틸리티
 */

// 이스터 에그 활성화를 위한 시퀀스
const KONAMI_CODE = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

// 특별 명령어 정의
const COMMANDS = {
	GAME: "game", // 미니게임 활성화
	MATRIX: "matrix", // 매트릭스 효과
	RAINBOW: "rainbow", // 무지개 효과
	GRAVITY: "gravity", // 중력 효과
};

/**
 * 시퀀스 트래커 인터페이스
 */
export interface ISequenceTracker {
	onKonamiCode(callback: () => void): void;
	registerCommand(command: string, callback: () => void): void;
	getCommandState(): { isActive: boolean; currentInput: string };
}

/**
 * 사용자 입력 시퀀스를 추적하는 클래스
 */
class SequenceTracker implements ISequenceTracker {
	private sequence: string[] = [];
	private callbacks: Map<string, () => void> = new Map();
	private commandInput: string = "";
	private isCommandMode: boolean = false;
	private commandCallbacks: Map<string, () => void> = new Map();

	constructor() {
		this.initKeyListener();
	}

	/**
	 * 키보드 이벤트 리스너 초기화
	 */
	private initKeyListener(): void {
		window.addEventListener("keydown", (e) => {
			// 폼 입력 중일 때는 시퀀스 추적 중지
			if (document.activeElement instanceof HTMLInputElement || document.activeElement instanceof HTMLTextAreaElement || document.activeElement instanceof HTMLSelectElement) {
				return;
			}

			// 명령어 모드 처리
			if (this.isCommandMode) {
				if (e.key === "Enter") {
					this.executeCommand();
					this.resetCommandMode();
				} else if (e.key === "Escape") {
					this.resetCommandMode();
				} else if (e.key === "Backspace") {
					this.commandInput = this.commandInput.slice(0, -1);
				} else if (e.key.length === 1) {
					this.commandInput += e.key.toLowerCase();
				}
				return;
			}

			// 코나미 코드 활성화 단축키 (/)
			if (e.key === "/") {
				this.isCommandMode = true;
				this.commandInput = "";
				e.preventDefault();
				return;
			}

			// 일반 시퀀스 추적
			this.sequence.push(e.key);
			if (this.sequence.length > KONAMI_CODE.length) {
				this.sequence.shift();
			}

			this.checkSequences();
		});
	}

	/**
	 * 등록된 시퀀스가 입력되었는지 확인
	 */
	private checkSequences(): void {
		// 코나미 코드 확인
		const isKonamiCode = this.sequence.join(",") === KONAMI_CODE.join(",");
		if (isKonamiCode && this.callbacks.has("konamiCode")) {
			this.callbacks.get("konamiCode")?.();
			this.sequence = [];
		}
	}

	/**
	 * 명령어 실행
	 */
	private executeCommand(): void {
		const command = this.commandInput.trim().toLowerCase();
		if (this.commandCallbacks.has(command)) {
			this.commandCallbacks.get(command)?.();
		}
	}

	/**
	 * 명령어 모드 리셋
	 */
	private resetCommandMode(): void {
		this.isCommandMode = false;
		this.commandInput = "";
	}

	/**
	 * 코나미 코드 입력 시 실행할 콜백 등록
	 */
	onKonamiCode(callback: () => void): void {
		this.callbacks.set("konamiCode", callback);
	}

	/**
	 * 특정 명령어 입력 시 실행할 콜백 등록
	 */
	registerCommand(command: string, callback: () => void): void {
		this.commandCallbacks.set(command.toLowerCase(), callback);
	}

	/**
	 * 현재 명령어 입력 상태 반환
	 */
	getCommandState(): { isActive: boolean; currentInput: string } {
		return {
			isActive: this.isCommandMode,
			currentInput: this.commandInput,
		};
	}
}

// 싱글톤 인스턴스 생성
let instance: SequenceTracker | null = null;

/**
 * 이스터 에그 트래커 인스턴스 가져오기
 */
export function getEasterEggTracker(): ISequenceTracker {
	if (typeof window === "undefined") {
		// 서버 사이드 렌더링 시 더미 객체 반환
		return {
			onKonamiCode: () => {},
			registerCommand: () => {},
			getCommandState: () => ({ isActive: false, currentInput: "" }),
		} as ISequenceTracker;
	}

	if (!instance) {
		instance = new SequenceTracker();
	}
	return instance;
}

// 명령어 상수 내보내기
export { COMMANDS };
