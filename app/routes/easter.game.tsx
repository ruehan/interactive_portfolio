import { ClientOnly } from '~/components/ClientOnly';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from '@remix-run/react';
import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [
    { title: '숨겨진 미니게임 - 포트폴리오' },
    { name: 'description', content: '비밀 미니게임을 발견하셨네요! 축하합니다!' },
    { name: 'robots', content: 'noindex' }, // 검색 엔진에 표시되지 않도록 설정
  ];
};

// 게임 타입 정의
interface GameItem {
  x: number;
  y: number;
  speed: number;
  size: number;
  color: string;
  used?: boolean; // 아이템 사용 여부 추가
}

interface GameState {
  score: number;
  lives: number;
  items: GameItem[];
  player: {
    x: number;
    y: number;
    size: number;
  };
  gameOver: boolean;
  gameStarted: boolean;
}

export default function GameRoute() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-6">🎮 숨겨진 미니게임</h1>
      <p className="mb-6 text-center max-w-md">
        축하합니다! 비밀 미니게임을 발견하셨습니다. 방향키로 플레이어를 움직여 아이템을 수집하세요!
      </p>

      <ClientOnly fallback={<div className="text-center">게임 로딩 중...</div>}>{() => <Game />}</ClientOnly>

      <div className="mt-8">
        <Link to="/" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors">
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}

function Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    lives: 3,
    items: [],
    player: {
      x: 0,
      y: 0,
      size: 30,
    },
    gameOver: false,
    gameStarted: false,
  });
  const requestRef = useRef<number>();
  const navigate = useNavigate();

  // 게임 초기화
  const initGame = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const width = canvas.width;
    const height = canvas.height;

    setGameState({
      score: 0,
      lives: 3,
      items: Array.from({ length: 10 }, () => ({
        x: Math.random() * (width - 20),
        y: Math.random() * (height - 20),
        speed: 1 + Math.random() * 3,
        size: 10 + Math.random() * 20,
        color: `hsl(${Math.random() * 360}, 80%, 60%)`,
      })),
      player: {
        x: width / 2,
        y: height - 50,
        size: 30,
      },
      gameOver: false,
      gameStarted: true,
    });
  };

  // 게임 업데이트
  const updateGame = () => {
    if (!canvasRef.current || gameState.gameOver) return;

    const canvas = canvasRef.current;
    const width = canvas.width;
    const height = canvas.height;

    // 아이템 이동
    const updatedItems = gameState.items.map(item => {
      const newY = item.y + item.speed;

      // 아이템이 화면 밖으로 나가면 위에서 다시 등장
      if (newY > height) {
        return {
          ...item,
          y: -item.size,
          x: Math.random() * (width - item.size),
        };
      }

      return {
        ...item,
        y: newY,
      };
    });

    // 충돌 감지
    let newScore = gameState.score;
    let newLives = gameState.lives;
    const remainingItems = updatedItems.filter(item => {
      const dx = item.x - gameState.player.x;
      const dy = item.y - gameState.player.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // 충돌 발생
      if (distance < item.size / 2 + gameState.player.size / 2) {
        // 점수 추가
        newScore += Math.floor(item.size);
        return false;
      }

      // 아이템이 화면 아래로 벗어났을 때 생명력 감소
      if (item.y > height && !item.used) {
        newLives -= 1;
        return false;
      }

      return true;
    });

    // 새 아이템 추가
    const newItems = [
      ...remainingItems,
      ...Array.from({ length: 10 - remainingItems.length }, () => ({
        x: Math.random() * (width - 20),
        y: -20 - Math.random() * 100,
        speed: 1 + Math.random() * 3,
        size: 10 + Math.random() * 20,
        color: `hsl(${Math.random() * 360}, 80%, 60%)`,
      })),
    ];

    // 게임 상태 업데이트
    setGameState(prev => ({
      ...prev,
      score: newScore,
      lives: newLives,
      items: newItems,
      gameOver: newLives <= 0,
    }));
  };

  // 게임 렌더링
  const renderGame = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 캔버스 클리어
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 배경 그리기
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 플레이어 그리기
    ctx.fillStyle = '#60a5fa';
    ctx.beginPath();
    ctx.arc(gameState.player.x, gameState.player.y, gameState.player.size / 2, 0, Math.PI * 2);
    ctx.fill();

    // 아이템 그리기
    gameState.items.forEach(item => {
      ctx.fillStyle = item.color;
      ctx.beginPath();
      ctx.arc(item.x, item.y, item.size / 2, 0, Math.PI * 2);
      ctx.fill();
    });

    // 점수 표시
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText(`점수: ${gameState.score}`, 20, 30);

    // 생명력 표시
    ctx.fillText(`생명: ${'❤️'.repeat(gameState.lives)}`, 20, 60);

    // 게임 오버 메시지
    if (gameState.gameOver) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = 'white';
      ctx.font = '30px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('게임 오버!', canvas.width / 2, canvas.height / 2 - 30);
      ctx.fillText(`최종 점수: ${gameState.score}`, canvas.width / 2, canvas.height / 2 + 20);
      ctx.font = '20px Arial';
      ctx.fillText('다시 시작하려면 스페이스 바를 누르세요', canvas.width / 2, canvas.height / 2 + 70);
    }

    // 게임 시작 화면
    if (!gameState.gameStarted) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = 'white';
      ctx.font = '30px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('방향키를 사용하여 아이템을 수집하세요!', canvas.width / 2, canvas.height / 2 - 30);
      ctx.font = '20px Arial';
      ctx.fillText('시작하려면 스페이스 바를 누르세요', canvas.width / 2, canvas.height / 2 + 30);
    }
  };

  // 게임 루프
  const gameLoop = () => {
    updateGame();
    renderGame();
    requestRef.current = requestAnimationFrame(gameLoop);
  };

  // 키보드 이벤트 처리
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;

    // 캔버스 크기 설정
    const updateCanvasSize = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = Math.min(container.clientWidth, 600);
        canvas.height = Math.min(400, window.innerHeight - 300);
      }
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // 키보드 이벤트 리스너
    const keyDownHandler = (e: KeyboardEvent) => {
      const { key } = e;

      if (gameState.gameOver && key === ' ') {
        // 게임 재시작
        initGame();
        return;
      }

      if (!gameState.gameStarted && key === ' ') {
        // 게임 시작
        initGame();
        return;
      }

      // ESC 키로 게임 종료
      if (key === 'Escape') {
        navigate('/');
        return;
      }

      // 방향키 처리
      setGameState(prev => {
        const newPlayerX =
          key === 'ArrowLeft'
            ? Math.max(prev.player.size / 2, prev.player.x - 15)
            : key === 'ArrowRight'
              ? Math.min(canvas.width - prev.player.size / 2, prev.player.x + 15)
              : prev.player.x;

        const newPlayerY =
          key === 'ArrowUp'
            ? Math.max(prev.player.size / 2, prev.player.y - 15)
            : key === 'ArrowDown'
              ? Math.min(canvas.height - prev.player.size / 2, prev.player.y + 15)
              : prev.player.y;

        return {
          ...prev,
          player: {
            ...prev.player,
            x: newPlayerX,
            y: newPlayerY,
          },
        };
      });
    };

    window.addEventListener('keydown', keyDownHandler);

    // 게임 렌더링 시작
    renderGame();

    // 게임 루프 시작
    if (gameState.gameStarted && !gameState.gameOver) {
      requestRef.current = requestAnimationFrame(gameLoop);
    }

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      window.removeEventListener('keydown', keyDownHandler);

      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [gameState.gameStarted, gameState.gameOver, navigate]);

  return (
    <div className="flex flex-col items-center">
      <canvas ref={canvasRef} className="border border-gray-700 rounded-md bg-gray-800" width={600} height={400} />
      {!gameState.gameStarted && (
        <button
          className="mt-4 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors"
          onClick={initGame}
        >
          게임 시작
        </button>
      )}
      {gameState.gameOver && (
        <button
          className="mt-4 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors"
          onClick={initGame}
        >
          다시 시작
        </button>
      )}
    </div>
  );
}
