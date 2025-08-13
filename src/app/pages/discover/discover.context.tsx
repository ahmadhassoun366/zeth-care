import { createContext } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { UseQueryResult } from 'react-query';
import { GetNetworksResponse } from 'src/shared/api/responses/network.response';
import { GetStatsResponse } from 'src/shared/api/responses/stats.response';

export type SearchForm = {
	search: string;
};

export type SortConfig = {
	key: string | null;
	direction: 'ascending' | 'descending';
};

export type DiscoverPageCtxType = {
	form: UseFormReturn<SearchForm, any, undefined>;

	state: {
		headersData: {
			title: string;
			className: string;
			tooltip?: string;
			sortkey?: string;
		}[];
		debSearch: string;
		currentPage: number;
		sortedNetworks: {
			id: string;
			network_image: string;
			chain_id: string;
			network_name: string;
			unique_wallets: number;
			uaw: number;
			total_txns: number;
			txns_last_24h: number;
			txn_volume_percentage: number;
		}[];
	};

	fn: {
		deleteSearchResults(): void;
		sortBy(key: string): void;
		changePage(page: number): void;
	};

	queries: {
		statsQuery: UseQueryResult<GetStatsResponse, unknown>;
		networksQuery: UseQueryResult<GetNetworksResponse, unknown>;
		searchQuery: UseQueryResult<GetNetworksResponse, unknown>;
	};
};

// @ts-expect-error init later
export const DiscoverPageCtx = createContext<DiscoverPageCtxType>();
