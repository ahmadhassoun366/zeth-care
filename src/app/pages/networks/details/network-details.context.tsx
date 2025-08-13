import { ApexOptions } from 'apexcharts';
import { createContext } from 'react';
import { UseQueryResult } from 'react-query';
import {
	GetNetworkExpensesResponse,
	GetNetworkGasUsageResponse,
	GetNetworkResponse,
	GetNetworkRevenueResponse,
	GetNetworkTransactionsResponse,
} from 'src/shared/api/responses/network.response';
import { ChartModalData } from 'src/shared/models/modals/modals.model';

export type TodosResponse = {
	id: number;
	title: string;
	userId: number;
	completed: boolean;
}[];

export type NetworkDetailsPageCtxType = {
	state: {
		chartOptions: ApexOptions;
		// txnsSeries: ApexAxisChartSeries;
		// revenueSeries: ApexAxisChartSeries;

		charts: {
			series: ApexAxisChartSeries;
			name: string;
		}[];
	};

	fn: {
		openChartModal(data: ChartModalData): void;
	};

	queries: {
		networkQuery: UseQueryResult<GetNetworkResponse, unknown>;

		chartQuery: UseQueryResult<GetNetworkTransactionsResponse, unknown>;
		chart2Query: UseQueryResult<GetNetworkRevenueResponse, unknown>;
		chart3Query: UseQueryResult<GetNetworkGasUsageResponse, unknown>;
		chart4Query: UseQueryResult<GetNetworkExpensesResponse, unknown>;
	};
};

// @ts-expect-error init later
export const NetworkDetailsPageCtx = createContext<NetworkDetailsPageCtxType>();
