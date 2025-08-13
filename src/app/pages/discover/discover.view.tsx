import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { DiscoverPageCtx, DiscoverPageCtxType } from './discover.context';
import { USNumber } from 'src/shared/utils/formatters';
import HttpReqErrorComponent from 'src/components/internal/http-req-error/http-req-error.component';
import TableSkeleton from './skeletons/table.skeleton';
import ROUTES from 'src/static/router.data';
import HoverTooltip from 'src/components/internal/tooltip/hover-tooltip.component';
import geneneralSettingsSvcContext from 'src/shared/services/general-settings/general-settings.context';
import Pagination from 'src/components/internal/pagination/pagination.component';

// #region view components

function StatsCardSkeleton() {
	return (
		<div>
			<div className=" bg-light-900 dark:bg-dark-900  rounded-xl px-6 py-4 flex gap-4 items-center">
				<div className="size-8 skeleton-box grid place-items-center"></div>
				<div className="flex flex-col gap-y-4">
					<p className="skeleton-title w-[100px]"></p>
					<p className="skeleton-title w-[200px]"></p>
				</div>
			</div>
		</div>
	);
}

type StatsCardProps = {
	title: string;
	value: string;
	imgSrc: string;
};

function StatsCard({ title, value, imgSrc }: StatsCardProps) {
	return (
		<div className="bg-light-900 dark:bg-dark-900  rounded-xl px-6 py-4 flex gap-4 items-center">
			<img src={imgSrc} alt="Total_L1" className="size-8" />

			<div className="flex flex-col ">
				<p className=" text-sm font-medium text-agrey-700 dark:text-agrey-400 uppercase">
					{title}
				</p>
				<p className="font-bold text-black dark:text-white">{value}</p>
			</div>
		</div>
	);
}

// #endregion

const statsImgs: {
	[key: string]: string;
} = {
	total_networks: '/media/icons/network.svg',
	transaction_count: '/media/icons/transction_count.svg',
	total_unique_wallets: '/media/icons/unique_wallet.svg',
};

const statsImgsDark: {
	[key: string]: string;
} = {
	total_networks: '/media/icons/network-dark.svg',
	transaction_count: '/media/icons/transction_count-dark.svg',
	total_unique_wallets: '/media/icons/unique_wallet-dark.svg',
};

export default function DiscoverView() {
	const settingsSvc = useContext(geneneralSettingsSvcContext);

	const { queries, fn, state, form } = useContext<DiscoverPageCtxType>(DiscoverPageCtx);

	const { statsQuery, networksQuery, searchQuery } = queries;

	const { data: stats, isLoading: statsLoading, isError: statsError } = statsQuery;
	const {
		data: networksData,
		isLoading: networksLoading,
		isError: networksError,
	} = networksQuery;

	console.log(networksData, 'networksData');

	const {
		data: searchResults,
		isLoading: searchLoading,
		isError: searchError,
		status: searchStatus,
	} = searchQuery;

	const { headersData } = state;

	const { watch, register, handleSubmit } = form;

	if (statsError || (!statsLoading && stats == undefined))
		return <HttpReqErrorComponent message="Error fetching stats" />;

	if (networksError || (!networksLoading && networksData == undefined))
		return <HttpReqErrorComponent message="Error fetching networks" />;

	if (searchError || (searchStatus !== 'idle' && !searchLoading && !searchResults))
		return <HttpReqErrorComponent message="error searching dapps" />;

	return (
		<div className="container-3 mx-auto">
			<div className="relative  flex flex-col py-4 space-y-10">
				<div
					id="title"
					className="text-black dark:text-white font-bold sm:text-4xl text-xl"
				>
					PWR L1's
				</div>

				<section id="cards">
					{statsLoading ? (
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-6 gap-6 max-sm:my-6">
							{[1, 2, 3].map((_, idx) => (
								<StatsCardSkeleton key={idx} />
							))}
						</div>
					) : (
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-6 gap-6 max-sm:my-6">
							{Object.entries(stats).map(([key, value], idx) => (
								<div key={idx} className="col-span-1">
									<StatsCard
										title={key.replace(/_/g, ' ')}
										value={USNumber(value)}
										imgSrc={
											settingsSvc.getTheme() == 'light'
												? statsImgs[key]
												: statsImgsDark[key]
										}
									/>
								</div>
							))}
						</div>
					)}
				</section>

				{/* SearchBar and Categories */}
				<section>
					<form className="space-y-6" onSubmit={handleSubmit(() => {})}>
						<div className="field">
							<div className="form-control">
								<input
									className="search-input px-10  py-2 text-sm "
									type="text"
									// {...getFieldProps('search')}
									{...register('search')}
									placeholder="Search projects"
								/>

								{/* icon */}
								<div className="text-black dark:text-white absolute inset-y-0 left-0 flex items-center pl-4 ">
									<i className="fa-regular fa-magnifying-glass "></i>
								</div>

								<div className="absolute inset-y-0 right-0 flex items-center gap-x-2 pr-3">
									{watch('search') && watch('search')!.length > 0 && (
										<button
											type="button"
											className="text-black  dark:text-white hover:text-ablue-200"
											onClick={fn.deleteSearchResults}
										>
											<i className="fa-solid fa-xmark"></i>
										</button>
									)}
								</div>

								{/* Dropdown for search results */}
								{state.debSearch.length > 0 && (
									<>
										{searchLoading ? (
											<ul className="absolute w-full top-full translate-y-2 dropdown-menu   bg-light-800 dark:bg-dark-800 z-searchPanel overflow-hidden rounded-xl py-2 max-h-[240px] overflow-y-scroll  shadow-xl">
												{[1, 2, 3].map((_, idx) => (
													<li className="" key={idx}>
														<div className="skeleton-container flex p-3 gap-x-2 hover:bg-light-400 dark:hover:bg-dark-400">
															<div className="skeleton-box w-14 h-14" />
															<div className=" space-y-4">
																<h1 className="skeleton-title w-[120px]"></h1>
																<div className="flex gap-x-2">
																	<h1 className="skeleton-line w-[50px]"></h1>
																	<h1 className="skeleton-line w-[50px]"></h1>
																	<h1 className="skeleton-line w-[50px]"></h1>
																</div>
															</div>
														</div>
													</li>
												))}
											</ul>
										) : searchResults && searchResults.networks.length === 0 ? (
											<div className="p-3 absolute w-full top-full translate-y-2 dropdown-menu   bg-light-800 dark:bg-dark-800 z-searchPanel overflow-hidden rounded-xl py-2 max-h-[240px] shadow-xl">
												<h1 className="text-agrey-900 dark:text-white">
													No results found
												</h1>
											</div>
										) : (
											searchResults && (
												<ul className="absolute w-full top-full translate-y-2 dropdown-menu   bg-light-800 dark:bg-dark-800 z-searchPanel overflow-hidden rounded-xl py-2 max-h-[240px] overflow-y-scroll  shadow-xl">
													{searchResults!.networks.map((_, idx) => (
														<li key={idx}>
															<Link
																to={ROUTES.networks.details.replace(
																	/:id/,
																	_.id.toString()
																)}
															>
																<div className="flex p-3 gap-x-2 hover:bg-light-400 dark:hover:bg-dark-400">
																	<img
																		src={_.network_image}
																		alt=""
																		className="w-14 h-14"
																	/>

																	<div>
																		<h1 className="text-black dark:text-white">
																			{_.network_name}
																		</h1>
																	</div>
																</div>
															</Link>
														</li>
													))}
												</ul>
											)
										)}
									</>
								)}
							</div>
						</div>
					</form>
				</section>

				{/* L1s Overview Table  */}
				<section className="space-y-4">
					<h1 className="text-black dark:text-white text-2xl font-bold px-2 py-1">
						L1s Overview
					</h1>
					<div>
						{/* Table */}
						<div className="w-full mt-5 overflow-x-auto scroll-sm">
							{networksLoading ? (
								<TableSkeleton />
							) : (
								// the table
								<div>
									{networksData.networks.length > 0 ? (
										<table className="table-auto bg-awhite w-full min-w-[900px]  rounded-2xl overflow-hidden">
											{/* table header */}
											<thead className="sticky top-0 ">
												<tr>
													{headersData.map((header, idx) => (
														<th
															className={`bg-light-900 dark:bg-dark-900 py-2.5 ${
																idx === 1 && 'w-11'
															} ${idx === 0 && 'w-10'}`}
															key={idx}
														>
															<div
																className={`flex  items-center gap-x-2 ${header.className}`}
															>
																<h1 className=" text-xs text-agrey-700 dark:text-agrey-400 ">
																	{header.title}
																</h1>

																{header.sortkey && (
																	<div className="flex flex-col justify-center items-center text-ghostly_grey-500 dark:text-agrey-600">
																		<button
																			className="w-fit h-4"
																			onClick={() =>
																				fn.sortBy(
																					header.sortkey!
																				)
																			}
																		>
																			<i className="fa-regular fa-angle-up"></i>
																		</button>
																		<button className="w-fit h-4">
																			<i className="fa-regular fa-angle-down"></i>
																		</button>
																	</div>
																)}

																{/* <div className="flex flex-col">
															<button>
																<i className="fa-regular fa-angle-up"></i>
															</button>
															<button>
																<i className="fa-regular fa-angle-down"></i>
															</button>
														</div> */}
																{header.tooltip && (
																	<HoverTooltip
																		text={header.tooltip}
																		strategy="fixed"
																	>
																		<div className="text-ghostly_grey-500 dark:text-agrey-600">
																			<i className="fa-sm far fa-info-circle" />
																		</div>
																	</HoverTooltip>
																)}
															</div>
														</th>
													))}
												</tr>
											</thead>

											{/* table body */}
											<tbody>
												{state.sortedNetworks.map((n, idx) => (
													<tr
														key={idx}
														className={` ${
															idx % 2 == 0
																? 'bg-transparent'
																: ' dark:bg-dark-900 bg-light-900'
														}`}
													>
														{/* dapp numbr */}
														<td className="h-[64px] xl:p-2.5 px-2 ">
															<h1 className="text-sm text-agrey-700 text-center">
																{idx + 1}
															</h1>
														</td>

														{/*  img */}
														<td className="h-[64px] xl:p-2.5 px-2 ">
															<Link
																to={ROUTES.networks.details.replace(
																	/:id/,
																	n.id
																)}
															>
																<div className="w-10 h-10">
																	<img
																		className="w-full h-full"
																		src={n.network_image}
																		alt=""
																	/>
																</div>
															</Link>
														</td>

														{/* name */}
														<td className="h-[64px] xl:p-2.5 px-2">
															<Link
																to={ROUTES.networks.details.replace(
																	/:id/,
																	n.id
																)}
																className="text-sm font-medium text-black dark:text-white"
															>
																{n.network_name}
															</Link>
														</td>

														{/* unique wallets */}
														<td className="h-[64px] xl:p-2.5 px-2">
															<h1 className="text-sm text-black dark:text-white text-center">
																{n.unique_wallets}
															</h1>
														</td>

														{/* UAW */}
														<td className="h-[64px] xl:p-2.5 px-2">
															<h1 className="text-sm text-black dark:text-white text-center">
																{n.uaw}
															</h1>
														</td>

														{/* total txn */}
														<td className="h-[64px] xl:p-2.5 px-2">
															<h1 className="text-sm text-black dark:text-white text-center">
																{n.total_txns}
															</h1>
														</td>

														{/* txns 24 h */}
														<td className="h-[64px] xl:p-2.5 px-2">
															<h1 className="text-sm text-black dark:text-white text-center">
																{n.txns_last_24h}
															</h1>
														</td>

														{/* txns volume */}
														<td className="h-[64px] xl:p-2.5 px-2">
															<h1
																className={`text-sm  text-center ${
																	n.txn_volume_percentage >= 0
																		? 'text-[#009545] dark:text-[#00F696]'
																		: 'text-[#FC4137] dark:text-[#F65251]'
																}`}
															>
																{n.txn_volume_percentage}%
															</h1>
														</td>
													</tr>
												))}
											</tbody>
										</table>
									) : (
										<div className="text-center">No Network found</div>
									)}
								</div>
							)}
						</div>

						{/* <SortableTable data={data} /> */}
						{networksData && networksData.metadata.total_pages > 1 && (
							<div className="flex justify-center mt-6">
								<Pagination
									metadata={{
										itemsPerPage: networksData.metadata.items_per_page,
										totalItems: networksData.metadata.total_items,
										currentPage: state.currentPage, // ✅ use local state instead of backend value
										totalPages: networksData.metadata.total_pages,
									}}
									onPageChange={fn.changePage}
								/>
							</div>
						)}
					</div>
				</section>
			</div>
		</div>
	);
}
