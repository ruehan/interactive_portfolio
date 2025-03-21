// 필요한 인터페이스만 정의
interface GithubEvent {
	id: string;
	type: string;
	repo: string;
	createdAt: string;
}

interface SocialLinksProps {
	githubData: {
		user: {
			name?: string;
			avatar?: string;
			url?: string;
			bio?: string;
		};
		recentActivity: GithubEvent[];
	};
}

export default function SocialLinks({ githubData }: SocialLinksProps) {
	const { recentActivity } = githubData;

	// 이벤트 유형 한글화
	const formatEventType = (type: string): string => {
		switch (type) {
			case "PushEvent":
				return "푸시";
			case "CreateEvent":
				return "생성";
			case "PullRequestEvent":
				return "풀 리퀘스트";
			case "IssuesEvent":
				return "이슈";
			case "IssueCommentEvent":
				return "이슈 댓글";
			case "WatchEvent":
				return "스타";
			case "ForkEvent":
				return "포크";
			default:
				return type.replace("Event", "");
		}
	};

	// 날짜 포맷팅
	const formatDate = (dateString: string): string => {
		const date = new Date(dateString);
		const now = new Date();
		const diffMs = now.getTime() - date.getTime();
		const diffSec = Math.floor(diffMs / 1000);
		const diffMin = Math.floor(diffSec / 60);
		const diffHour = Math.floor(diffMin / 60);
		const diffDay = Math.floor(diffHour / 24);

		if (diffDay > 0) {
			return `${diffDay}일 전`;
		} else if (diffHour > 0) {
			return `${diffHour}시간 전`;
		} else if (diffMin > 0) {
			return `${diffMin}분 전`;
		} else {
			return "방금 전";
		}
	};

	return (
		<div>
			{/* 최근 GitHub 활동 */}
			{recentActivity.length > 0 ? (
				<ul className="space-y-2">
					{recentActivity.map((event) => (
						<li key={event.id} className="text-sm">
							<a
								href={`https://github.com/${event.repo}`}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-start hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-md transition-colors"
							>
								<span className="mr-2 text-indigo-500">•</span>
								<div>
									<span className="font-medium">{formatEventType(event.type)}</span>
									<span className="mx-1">-</span>
									<span className="text-gray-600 dark:text-gray-400">{event.repo}</span>
									<span className="ml-2 text-xs text-gray-500 dark:text-gray-500">{formatDate(event.createdAt)}</span>
								</div>
							</a>
						</li>
					))}
				</ul>
			) : (
				<p className="text-gray-500 dark:text-gray-400 text-sm">최근 활동이 없습니다.</p>
			)}
		</div>
	);
}
