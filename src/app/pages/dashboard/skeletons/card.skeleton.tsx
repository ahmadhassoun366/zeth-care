export default function NetworkCardSkeleton() {
	return (
		<div className="bg-light-900 dark:bg-dark-900 p-6 space-y-4 rounded-xl group hover:bg-hoverCardBg dark:hover:bg-viewBtnHoverBg">
			<div className="skeleton-circle size-10" />
			<div className="space-y-2 text-sm">
				{new Array(6).fill(0).map((_, idx) => (
					<div key={idx} className="flex justify-between">
						<div
							className="skeleton-title"
							style={{
								width: `${Math.floor(Math.random() * 80) + 50}px`,
							}}
						></div>
						<div
							className="skeleton-title"
							style={{
								width: `${Math.floor(Math.random() * 80) + 50}px`,
							}}
						></div>
					</div>
				))}
			</div>
			<div className="skeleton-box h-[36px] w-full rounded-full"></div>
		</div>
	);
}
