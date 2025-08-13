export function AvailabilityStatus({
	status,
	label,
}: {
	status: 'idle' | 'loading' | 'available' | 'unavailable';
	label: string;
}) {
	if (status === 'idle') return null;

	return (
		<div className="flex items-center gap-x-2 text-xs mt-1">
			{status === 'loading' && (
				<>
					<i className="fa-solid fa-spinner fa-spin text-gray-500" />
					<span>Checking {label}...</span>
				</>
			)}
			{status === 'available' && (
				<>
					<i className="fa-solid fa-check text-green-500" />
					<span className="text-green-500">{label} is available</span>
				</>
			)}
			{status === 'unavailable' && (
				<>
					<i className="fa-solid fa-xmark text-red-500" />
					<span className="text-red-500">{label} is not available</span>
				</>
			)}
		</div>
	);
}
