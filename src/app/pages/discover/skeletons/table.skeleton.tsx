export default function TableSkeleton() {
	const cols = [
		{
			id: 0,
			// w: '180px',
		},
		{
			id: 0,
			// w: '80px',
		},
		{
			id: 0,
			// w: '50px',
		},
		{
			id: 0,
			// w: '90px',
		},
		{
			id: 0,
			// w: '50px',
		},
		{
			id: 0,
		},
	];

	return (
		<section>
			{/* Table */}
			<div className="w-full mt-5 overflow-x-auto scroll-sm">
				<table className="table-auto bg-awhite w-full rounded-2xl overflow-hidden">
					{/* table header */}
					<thead className="">
						<tr className=" bg-light-900 dark:bg-dark-900 text-agrey-700 dark:text-agrey-400 py-2.5">
							{cols.map((_, idx) => (
								<th
									key={idx}
									className={`py-2 px-8 ${idx === 0 ? 'w-[300px]' : ''}`}
								>
									<div className=" skeleton-container">
										<div className="h-[20px]"></div>
									</div>
								</th>
							))}
						</tr>
					</thead>

					{/* table body - Skeleton Rows */}
					<tbody className="">
						{new Array(10).fill(0).map((_, idx) => (
							<tr
								key={idx}
								className={` ${
									idx % 2 == 0
										? 'bg-transparent'
										: ' dark:bg-dark-900 bg-light-900'
								}`}
							>
								{cols.map((_, idx2) => (
									<td
										className={`h-[64px] xl:p-2.5 px-2   skeleton-container `}
										key={idx2}
									>
										{idx2 === 0 ? (
											<div className="flex gap-x-2 items-center">
												<div className="skeleton-box w-[20px] h-[20px] rounded" />
												<div className="skeleton-box w-[40px] h-[40px]  rounded" />
												<div className="skeleton-box w-[160px]  rounded" />
											</div>
										) : (
											<div className="grid place-items-center">
												<div className="skeleton-box w-[75px]  rounded" />
											</div>
										)}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div>
				<div className="skeleton-pagination" />
			</div>
		</section>
	);
}
