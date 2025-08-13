// third party
import { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { ApexOptions } from 'apexcharts';

// services
import DocTitleSvcContext from '../../../../shared/services/doc-title/doc-title.context';

import ModalSvcContext from '../../../../shared/services/modal/modal.context';

import geneneralSettingsSvcContext from '../../../../shared/services/general-settings/general-settings.context';

// context
import { NetworkDetailsPageCtx, NetworkDetailsPageCtxType } from './network-details.context';
import NetworkDetailsView from './network-details.view';

// shared
import QueryApi from 'src/shared/api/query-api';
import { TimePeriod } from 'src/shared/enums/time-period.enums';
import { BnToDec } from 'src/shared/utils/formatters';
import { ChartModalData } from 'src/shared/models/modals/modals.model';

// static
import QUERY_KEYS from 'src/static/query.keys';
import APP_MODALS from 'src/static/enums/app.modals';

function PageLogic({ children }: { children: React.ReactNode }) {
	// #region dependencies

	const modalSvc = useContext(ModalSvcContext);
	const settingsSvc = useContext(geneneralSettingsSvcContext);
	useContext(DocTitleSvcContext).setTitle('Network Details');

	const { id } = useParams<{ id: string }>();
	const networkId = id!;

	// #endregion

	// #region chart data

	const dark = '#3F4054';
	const light = '#DEDDF6';
	const dark_text = '#BBBAD2';
	const light_text = '#5F5F74';

	const [txnsSeries, setTxnsSeries] = useState<ApexAxisChartSeries>([]);
	const [revenueSeries, setRevenueSeries] = useState<ApexAxisChartSeries>([]);
	const [gasUsageSeries, setGasUsageSeries] = useState<ApexAxisChartSeries>([]);
	const [expensesSeries, setExpensesSeries] = useState<ApexAxisChartSeries>([]);

	const [chartOptions, setChartOptions] = useState<ApexOptions>({
		chart: {
			height: 350,
			type: 'area',
			toolbar: {
				show: false, // Disable the toolbar
			},
		},
		dataLabels: {
			enabled: false,
		},
		stroke: {
			curve: 'smooth',
			width: 1.7,
			colors: ['#112FF8'],
		},
		fill: {
			type: 'gradient',
			gradient: {
				shadeIntensity: 1,
				opacityFrom: 0.3, // Starting opacity of the fill color
				opacityTo: 0.1, // Ending opacity of the fill color
				stops: [0, 100], // Gradient stops
				colorStops: [
					{ offset: 0, color: '#CCCCFE', opacity: 1 }, // Fill color (start)
					{ offset: 100, color: '#E1DFEB', opacity: 0 }, // Fill color (end)
				],
			},
		},
		markers: {
			colors: '#ffffff',
		},
		grid: {
			borderColor: settingsSvc.getTheme() == 'dark' ? dark : light,
			xaxis: {
				lines: {
					show: false,
				},
			},
		},

		xaxis: {
			type: 'category',
			labels: {
				style: {
					colors: settingsSvc.getTheme() == 'dark' ? '#BBBAD2' : '#5F5F74',
					fontSize: '12px',
					fontWeight: '400px',
				},
			},
			crosshairs: {
				show: false,
				// width: 1,
				// position: 'back',
				// stroke: {
				// 	color: `${currentTheme == 'dark' ? '#ffffff' : '#000000'}`, // Color of the vertical marker line
				// 	borderWidth: '1px',
				// 	dashArray: 7,
				// },
			},
			axisBorder: {
				show: false,
			},
		},
		// yaxis: {
		// 	title: {
		// 		text: 'Transactions', // Set the y-axis label text
		// 		style: {
		// 			color: settingsSvc.getTheme() == 'dark' ? '#BBBAD2' : '#5F5F74',
		// 			fontSize: '11px',
		// 			fontWeight: '400px',
		// 			// fontSize: isFullScreenChart ? '16px' : '11px',
		// 			// fontWeight: isFullScreenChart ? '500px' : '400px',
		// 		},
		// 	},
		// 	labels: {
		// 		style: {
		// 			colors: settingsSvc.getTheme() == 'dark' ? '#BBBAD2' : '#5F5F74',
		// 			fontSize: '12px',
		// 			fontWeight: '400px',
		// 		},
		// 	},
		// },
		// tooltip: {
		// 	custom: function ({ series, seriesIndex, dataPointIndex, w }) {
		// 		return `<div style="background-color: ${
		// 			currentTheme == 'dark' ? '#ffffff' : '#18181A'
		// 		}; padding: 10px 12px 10px 12px; border-radius: 8px;">
		// 			<strong style="font-size:14px; font-weight:500px; color:${
		// 				currentTheme == 'dark' ? '#000000' : '#fff'
		// 			};">${months[dataPointIndex]}</strong>
		// 			<br />
		// 			<p style="font-size:14px; font-weight:400px; padding-top: 4px; color:${
		// 				currentTheme == 'dark' ? '#000000' : '#fff'
		// 			};">Transactions: ${series[seriesIndex][dataPointIndex]}</p>
		// 		  </div>`;
		// 	},
		// },
	});

	// #region http reqs

	const networkQuery = useQuery([QUERY_KEYS.networks.GET_NETWORK_DETAILS, networkId], () =>
		QueryApi.networks.getNetwork(networkId)
	);

	const chartQuery = useQuery(
		[QUERY_KEYS.charts.GET_ACTIVITY_TXNS, networkId],
		() =>
			QueryApi.networks.getTransactions(networkId, {
				time: TimePeriod.DAILY,
			}),
		{
			onSuccess: (data) => {
				// let _categories: string[];

				// console.log('data', data);

				// if (data.time_period === TimePeriod.DAILY) {
				// 	// 00:00 - 23:59
				// 	_categories = data.data.map((txn) => {
				// 		const d = new Date(txn.timestamp);

				// 		return `${d.getHours()}:${d.getMinutes()}`;
				// 	}) as string[];
				// }

				setTxnsSeries([
					{
						name: 'Transactions',
						data: data.data.map((txn) => txn.transactions),
					},
				]);

				// setChartOptions((prev) => {
				// 	return {
				// 		...prev,
				// 		series: [
				// 			{
				// 				name: 'Transactions',
				// 				data: data.data.map((txn) => txn.transactions),
				// 			},
				// 		],
				// 		xaxis: {
				// 			type: 'category',
				// 			categories: _categories,
				// 		},
				// 	};
				// });
			},
		}
	);

	const chart2Query = useQuery(
		[QUERY_KEYS.charts.GET_REVENUE, networkId],
		() =>
			QueryApi.networks.getRevenue(networkId, {
				time: TimePeriod.DAILY,
			}),
		{
			onSuccess: (data) => {
				// let _categories: string[];

				// if (data.time_period === TimePeriod.DAILY) {
				// 	// 00:00 - 23:59
				// 	_categories = data.data.map((txn) => {
				// 		const d = new Date(txn.timestamp);

				// 		return `${d.getHours()}:${d.getMinutes()}`;
				// 	}) as string[];
				// }

				setRevenueSeries([
					{
						name: 'Revenue',
						data: data.data.map((txn) => +BnToDec(txn.revenue)),
					},
				]);
			},
		}
	);

	const chart3Query = useQuery(
		[QUERY_KEYS.charts.GET_GAS_USAGE, networkId],
		() =>
			QueryApi.networks.getGasUsage(networkId, {
				time: TimePeriod.DAILY,
			}),
		{
			onSuccess: (data) => {
				// let _categories: string[];

				// if (data.time_period === TimePeriod.DAILY) {
				// 	// 00:00 - 23:59
				// 	_categories = data.data.map((txn) => {
				// 		const d = new Date(txn.timestamp);

				// 		return `${d.getHours()}:${d.getMinutes()}`;
				// 	}) as string[];
				// }

				setGasUsageSeries([
					{
						name: 'Gas Usage',
						data: data.data.map((txn) => +BnToDec(txn.gas_usage)),
					},
				]);
			},
		}
	);

	const chart4Query = useQuery(
		[QUERY_KEYS.charts.GET_EXPENSES, networkId],
		() =>
			QueryApi.networks.getNetworkExpenses(networkId, {
				time: TimePeriod.DAILY,
			}),
		{
			onSuccess: (data) => {
				// let _categories: string[];

				// if (data.time_period === TimePeriod.DAILY) {
				// 	// 00:00 - 23:59
				// 	_categories = data.data.map((txn) => {
				// 		const d = new Date(txn.timestamp);

				// 		return `${d.getHours()}:${d.getMinutes()}`;
				// 	}) as string[];
				// }

				setExpensesSeries([
					{
						name: 'Expenses',
						data: data.data.map((txn) => +BnToDec(txn.expenses)),
					},
				]);
			},
		}
	);

	// #endregion

	useEffect(() => {
		setChartOptions(() => {
			return {
				...chartOptions,
				grid: {
					borderColor: settingsSvc.getTheme() == 'dark' ? dark : light,
				},
				yaxis: {
					title: {
						text: 'Transactions', // Set the y-axis label text
						style: {
							color: settingsSvc.getTheme() == 'dark' ? dark_text : light_text,
							fontSize: '11px',
							fontWeight: '400px',
							// fontSize: isFullScreenChart ? '16px' : '11px',
							// fontWeight: isFullScreenChart ? '500px' : '400px',
						},
					},
					labels: {
						style: {
							colors: settingsSvc.getTheme() == 'dark' ? dark_text : light_text,
							fontSize: '12px',
							fontWeight: '400px',
						},
					},
				},
			};
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [settingsSvc.getTheme()]);

	// #endregion

	// #region fn

	function openChartModal(data: ChartModalData) {
		modalSvc.open(APP_MODALS.CHART_MODAL, data);
	}

	// #endregion

	const ctxObject: NetworkDetailsPageCtxType = {
		state: {
			chartOptions,
			charts: [
				{
					name: 'Transactions',
					series: txnsSeries,
				},
				{
					name: 'Revenue',
					series: revenueSeries,
				},
				{
					name: 'Gas Usage',
					series: gasUsageSeries,
				},
				{
					name: 'Gas Price',
					series: expensesSeries,
				},
			],
		},

		queries: {
			networkQuery,

			chartQuery,
			chart2Query,
			chart3Query,
			chart4Query,
		},

		fn: {
			openChartModal,
		},
	};

	return (
		<NetworkDetailsPageCtx.Provider value={ctxObject}>
			{children}
		</NetworkDetailsPageCtx.Provider>
	);
}

export default function NetworkDetailsPage() {
	return (
		<PageLogic>
			<NetworkDetailsView />
		</PageLogic>
	);
}
