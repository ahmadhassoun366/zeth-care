// third party
import { useContext } from 'react';

// component
import NetworkCardSkeleton from './skeletons/card.skeleton';
import HttpReqErrorComponent from 'src/components/internal/http-req-error/http-req-error.component';
import NetworkCard from 'src/components/composed/network-card.component';

// context
import { DashboardPageCtx, DashboardPageCtxType } from './dashboard.context';

// static

export default function DasboardView() {
	const { queries } = useContext<DashboardPageCtxType>(DashboardPageCtx);

	const { userL1sQuery } = queries;

	const { data: networksData, isLoading: networksLoading, isError: networksError } = userL1sQuery;

	if (networksError || (!networksLoading && !networksData)) {
		return <HttpReqErrorComponent message="Error fetching user networks" />;
	}

	return (
		<main className="container-3 mx-auto space-y-10">
			<section id="title">
				<div className="text-black dark:text-white font-bold sm:text-4xl text-xl">
					Dashboard
				</div>
			</section>

			<section id="networks">
				{networksLoading ? (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
						{new Array(8).fill(0).map((_, idx) => (
							<div key={idx}>
								<NetworkCardSkeleton />
							</div>
						))}
					</div>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
						{networksData.networks.map((network, idx) => (
							<div key={idx}>
								<NetworkCard network={network} />
							</div>
						))}
					</div>
				)}
			</section>
		</main>
	);
}
