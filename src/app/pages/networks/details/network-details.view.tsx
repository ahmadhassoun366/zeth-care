// third party
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';

// component
import Button from 'src/components/internal/button/button.component';
import HttpReqErrorComponent from 'src/components/internal/http-req-error/http-req-error.component';
import CopyTooltip from 'src/components/internal/tooltip/copy-tooltip.component';

// context
import { NetworkDetailsPageCtx, NetworkDetailsPageCtxType } from './network-details.context';

// shared
import useMediaQuery from 'src/shared/hooks/use-media-query';
import { BnToDec, shortenAddress, USNumber } from 'src/shared/utils/formatters';

// static
import ROUTES from 'src/static/router.data';

// function TransactionDetailSkeleton() {
// 	return (
// 		<div className=" lg:flex skeleton-container h-8 space-y-2">
// 			<div className="w-[300px]">
// 				<div className="skeleton-line w-[100px]"></div>
// 			</div>
// 			<div
// 				className="skeleton-line"
// 				style={{
// 					width: Math.round(Math.random() * 100) + 300 + 'px',
// 				}}
// 			></div>
// 		</div>
// 	);
// }

export default function NetworkDetailsView() {
	const mobile = useMediaQuery('(max-width: 640px)');

	const { state, fn, queries } = useContext<NetworkDetailsPageCtxType>(NetworkDetailsPageCtx);

	const { chartOptions } = state;

	const { networkQuery, chartQuery, chart2Query, chart3Query, chart4Query } = queries;

	const { data: networkData, isLoading: networkLoading, isError: networkError } = networkQuery;
	const { data: chartData, isLoading: chartLoading, isError: chartError } = chartQuery;
	const { data: chart2Data, isLoading: chart2Loading, isError: chart2Error } = chart2Query;
	const { data: chart3Data, isLoading: chart3Loading, isError: chart3Error } = chart3Query;
	const { data: chart4Data, isLoading: chart4Loading, isError: chart4Error } = chart4Query;

	if (networkError || (!networkLoading && !networkData)) {
		return <HttpReqErrorComponent message="Error fetching L1 data" />;
	}

	if (
		chartError ||
		chart2Error ||
		chart3Error ||
		chart4Error ||
		(!chartLoading && !chartData) ||
		(!chart2Loading && !chart2Data) ||
		(!chart3Loading && !chart3Data) ||
		(!chart4Loading && !chart4Data)
	) {
		return <HttpReqErrorComponent message="Error fetching chart data" />;
	}

	if (networkLoading) {
		return (
			<div className="m-10">
				{Array.from({ length: 4 }).map((_, index) => (
					<div key={index} className="skeleton-container w-full  mt-10">
						{/* the left and right gen con */}
						<div className="flex justify-between w-[250px]">
							{/* the left */}
							<div className="flex flex-col gap-3">
								<div className="skeleton-title w-20"></div>
								<div className="skeleton-title w-20"></div>
								<div className="skeleton-title w-20"></div>
							</div>
							{/* the right */}
							<div className="flex flex-col gap-3">
								<div className="skeleton-title w-20"></div>
								<div className="skeleton-title w-20"></div>
								<div className="skeleton-title w-20"></div>
							</div>
						</div>
						<hr className="border-t-agrey-300 dark:border-t-agrey-800 my-8 md:my-4" />
					</div>
				))}

				{/* the charts */}
				<div className="flex flex-col md:grid md:grid-cols-2 gap-4 w-full mt-10">
					{/* the chart */}
					<div className="skeleton-box w-full h-[300px]  rounded-md"></div>
					<div className="skeleton-box w-full h-[300px]  rounded-md"></div>
					<div className="skeleton-box w-full h-[300px]  rounded-md"></div>
					<div className="skeleton-box w-full h-[300px]  rounded-md"></div>
				</div>
			</div>
		);
	}

	return (
		<main className="container-3 mx-auto space-y-14">
			<div id="stats" className=" md:space-y-8 space-y-6">
				{/* Bitcoin+ Logo  */}
				<div
					id="network-name"
					className="flex flex-col sm:flex-row justify-between sm:items-center gap-3  items-start"
				>
					<div className="flex items-center gap-3 tab:gap-4">
						<img src={networkData.network_image} alt="Bitcoin" />
						{/* <div className="flex flex-1 items-center tab:px-2 tab:py-1"> */}
						<h1 className="text-black dark:text-white font-bold text-xl">
							{networkData.network_name}
						</h1>
						{/* </div> */}
					</div>
					<Link to={ROUTES.dashboard.root}>
						<Button className="secondary small">View in dApp Store</Button>
					</Link>
				</div>

				<div id="info" className="">
					<div className="space-y-4 md:pb-4">
						<div className="flex justify-between md:gap-[100px] items-center">
							<p className="text-agrey-700 dark:text-agrey-400 font-medium text-sm tab:w-full md:w-[160px] flex-shrink-0">
								Network Name
							</p>
							<p className="text-black dark:text-white font-bold text-sm md:w-full">
								{networkData.network_name}
							</p>
						</div>
						<div className="flex justify-between md:gap-[100px] items-center">
							<p className="text-agrey-700 dark:text-agrey-400 font-medium text-sm tab:w-full md:w-[160px] flex-shrink-0">
								Currency Name
							</p>
							<p className="text-black dark:text-white font-bold text-sm md:w-full">
								{networkData.currency_name}
							</p>
						</div>
						<div className="flex justify-between md:gap-[100px] items-center">
							<p className="text-agrey-700 dark:text-agrey-400 font-medium text-sm tab:w-full md:w-[160px] flex-shrink-0">
								Currency Symbol
							</p>
							<p className="text-black dark:text-white font-bold text-sm md:w-full">
								{networkData.currency_symbol}
							</p>
						</div>
					</div>

					<hr className="border-t-agrey-300 dark:border-t-agrey-800 my-8 md:my-4" />

					<div className="space-y-4 md:pb-4">
						<div className="flex justify-between md:gap-[100px] items-center">
							<p className="text-agrey-700 dark:text-agrey-400 font-medium text-sm tab:w-full md:w-[160px] flex-shrink-0">
								Chain/VM ID
							</p>
							<div className="flex items-center gap-3 justify-start sm:w-full">
								<p className="text-black dark:text-white font-bold text-sm ">
									{networkData.chain_id}
								</p>

								<CopyTooltip textToCopy={networkData.chain_id}>
									<button className="text-agrey-700">
										<i className="fa-regular fa-clone" />
									</button>
								</CopyTooltip>
							</div>
						</div>

						<div className="flex justify-between md:gap-[100px] items-center">
							<p className="text-agrey-700 dark:text-agrey-400 font-medium text-sm tab:w-full md:w-[160px] flex-shrink-0">
								Revenue
							</p>
							<p className="text-black dark:text-white font-bold text-sm md:w-full">
								{USNumber(BnToDec(networkData.revenue))}{' '}
								{networkData.currency_symbol}
							</p>
						</div>

						<div className="flex justify-between md:gap-[100px] items-center">
							<p className="text-agrey-700 dark:text-agrey-400 font-medium text-sm tab:w-full md:w-[160px] flex-shrink-0">
								24h Revenue
							</p>
							<p className="text-black dark:text-white font-bold text-sm md:w-full">
								{USNumber(BnToDec(networkData.revenue_24h))}{' '}
								{networkData.currency_symbol}
							</p>
						</div>
					</div>

					<hr className="border-t-agrey-300 dark:border-t-agrey-800 my-8 md:my-4" />

					<div className="space-y-4 md:pb-4">
						<div className="flex justify-between md:gap-[100px] items-center">
							<p className="text-agrey-700 dark:text-agrey-400 font-medium text-sm tab:w-full md:w-[160px] flex-shrink-0">
								Gas price
							</p>
							<p className="text-black dark:text-white font-bold text-sm md:w-full">
								{BnToDec(networkData.gas_price, 9)} GWEI
							</p>
						</div>

						<div className="flex justify-between md:gap-[100px] items-center">
							<p className="text-agrey-700 dark:text-agrey-400 font-medium text-sm tab:w-full w-[120px] md:w-[160px] flex-shrink-0">
								RPC URL
							</p>
							<div className="flex items-center gap-3 justify-end md:justify-start flex-grow min-w-1">
								<Link
									to={networkData.rpc_url}
									className="text-link blue w-fit whitespace-nowrap overflow-hidden overflow-ellipsis"
								>
									{networkData.rpc_url}
								</Link>
								<CopyTooltip textToCopy={networkData.rpc_url}>
									<button className="text-agrey-700">
										<i className="fa-regular fa-clone" />
									</button>
								</CopyTooltip>
							</div>
						</div>

						<div className="flex justify-between md:gap-[100px] items-center">
							<p className="text-agrey-700 dark:text-agrey-400 font-medium text-sm tab:w-full w-[120px] md:w-[160px] flex-shrink-0">
								Explorer URL
							</p>
							<div className="flex items-center gap-3 justify-end md:justify-start flex-grow min-w-1">
								<Link
									to={networkData.explorer_url}
									className="text-link blue w-fit whitespace-nowrap overflow-hidden overflow-ellipsis"
								>
									{networkData.explorer_url}
								</Link>
								<CopyTooltip textToCopy={networkData.explorer_url}>
									<button className="text-agrey-700">
										<i className="fa-regular fa-clone" />
									</button>
								</CopyTooltip>
							</div>
						</div>
					</div>

					<hr className="border-t-agrey-300 dark:border-t-agrey-800 my-8 md:my-4" />

					<div className="space-y-4 md:pb-4 ">
						<div className="flex justify-between md:gap-[100px] items-center">
							<p className="text-agrey-700 dark:text-agrey-400 font-medium text-sm tab:w-full  md:w-[160px] flex-shrink-0">
								Wrapped Node Address
							</p>
							<div className="flex items-center gap-3 justify-start sm:w-full">
								<p className="text-black dark:text-white font-bold text-sm ">
									{mobile
										? shortenAddress(networkData.wrapper_node_address)
										: networkData.wrapper_node_address}
								</p>

								<CopyTooltip textToCopy={networkData.wrapper_node_address}>
									<button className="text-agrey-700">
										<i className="fa-regular fa-clone" />
									</button>
								</CopyTooltip>
							</div>
						</div>

						<div className="flex justify-between md:gap-[100px] items-center">
							<p className="text-agrey-700 dark:text-agrey-400 font-medium text-sm tab:w-full md:w-[160px] flex-shrink-0">
								Wrapper Node Funds
							</p>
							<p className="text-black dark:text-white font-bold text-sm md:w-full">
								{BnToDec(networkData.wrapper_node_funds, 9)} PWR
							</p>
						</div>
					</div>

					<hr className="border-t-agrey-300 dark:border-t-agrey-800 my-8 md:my-4" />

					<div className="space-y-4 md:pb-4 ">
						<div className="flex justify-between md:gap-[100px] items-center">
							<p className="text-agrey-700 dark:text-agrey-400 font-medium text-sm tab:w-full md:w-[160px] flex-shrink-0">
								Foundation Address
							</p>
							<div className="flex items-center gap-3 justify-start sm:w-full">
								<p className="text-black dark:text-white font-bold text-sm ">
									{mobile
										? shortenAddress(networkData.foundation_address)
										: networkData.foundation_address}
								</p>

								<CopyTooltip textToCopy={networkData.foundation_address}>
									<button className="text-agrey-700">
										<i className="fa-regular fa-clone" />
									</button>
								</CopyTooltip>
							</div>
						</div>
						<div className="flex justify-between md:gap-[100px] items-center">
							<p className="text-agrey-700 dark:text-agrey-400 font-medium text-sm tab:w-full md:w-[160px] flex-shrink-0">
								Gas Price Manager Address
							</p>
							<div className="flex items-center gap-3 justify-start sm:w-full">
								<p className="text-black dark:text-white font-bold text-sm ">
									{mobile
										? shortenAddress(networkData.gas_price_address)
										: networkData.gas_price_address}
								</p>

								<CopyTooltip textToCopy={networkData.gas_price_address}>
									<button className="text-agrey-700">
										<i className="fa-regular fa-clone" />
									</button>
								</CopyTooltip>
							</div>
						</div>
						<div className="flex justify-between md:gap-[100px] items-center">
							<p className="text-agrey-700 dark:text-agrey-400 font-medium text-sm tab:w-full md:w-[160px] flex-shrink-0">
								Automation Revenue Address
							</p>
							<div className="flex items-center gap-3 justify-start sm:w-full">
								<p className="text-black dark:text-white font-bold text-sm ">
									{mobile
										? shortenAddress(networkData.automation_revenue_address)
										: networkData.automation_revenue_address}
								</p>

								<CopyTooltip textToCopy={networkData.automation_revenue_address}>
									<button className="text-agrey-700">
										<i className="fa-regular fa-clone" />
									</button>
								</CopyTooltip>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Activity Insights Section  */}
			<div className="space-y-4 md:space-y-6">
				<div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
					<p className="text-black dark:text-white font-bold text-xl tab:px-2 tab:py-1">
						Activity Insights
					</p>
					{/* <Calender /> */}
				</div>
				{/* Graphs  */}
				<div className="grid grid-cols-1 md:grid-cols-2 md:gap-6 gap-y-4">
					{state.charts.map((c, idx) => (
						<div className="" key={idx}>
							<div
								className={
									'border border-[#DEDDF6] dark:border-[#3F4054] rounded-t-xl'
								}
							>
								<ReactApexChart
									options={chartOptions}
									series={c.series}
									height={350}
									type="area"
								/>
							</div>

							<div className="border border-[#DEDDF6] dark:border-[#3F4054]  rounded-b-xl bg-inputBg dark:bg-darkInputBg px-4 py-3 flex justify-between items-center">
								<div className="text-agrey-700 dark:text-white text-sm font-medium">
									{c.name}
								</div>
								<button
									className="cursor-pointer text-agrey-700 dark:text-white"
									onClick={fn.openChartModal.bind(null, c)}
								>
									<i className="fa-solid fa-expand" />
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</main>
	);
}
