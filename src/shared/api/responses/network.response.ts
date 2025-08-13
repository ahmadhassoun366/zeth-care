import { TimePeriod } from '../../enums/time-period.enums';

export type CreateNetworkResponse = {
	id: string;
	network_name: string;
	currency_name: string;
	currency_symbol: string;
	network_image: string;
	chain_id: string;
	vm_type: 'EVM' | 'SOLANA';
	gas_price: string | number;
	foundation_address: string;
	gas_price_address: string;
	automation_revenue_address: string;
	bridges: string[];
	initial_supply: {
		address: string;
		amount: string;
	}[];
};

export type GetNetworksResponse = {
	networks: {
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
	metadata: {
		items_per_page: number;
		total_items: number;
		current_page: number;
		total_pages: number;
	};
};

export type GetNetworkResponse = {
	id: string;
	network_name: string;
	currency_name: string;
	currency_symbol: string;
	network_image: string;
	chain_id: string;
	revenue: string;
	revenue_24h: string;
	gas_price: string;
	rpc_url: string;
	explorer_url: string;
	foundation_address: string;
	gas_price_address: string;
	automation_revenue_address: string;
	wrapper_node_address: string;
	wrapper_node_funds: string;
};

export type GetUserNetworksResponse = {
	networks: {
		id: string;
		network_name: string;
		network_image: string;
		currency_symbol: string;
		chain_id: number;
		transactions_24h: number;
		fees_24h: string;
		revenue_24h: string;
	}[];
	metadata: {
		items_per_page: number;
		total_items: number;
		current_page: number;
		total_pages: number;
	};
};

export type GetNetworkTransactionsResponse = {
	time_period: TimePeriod;
	data: { timestamp: number; transactions: number }[];
};

export type GetNetworkRevenueResponse = {
	time_period: TimePeriod;
	data: {
		timestamp: number;
		revenue: string;
	}[];
};

export type GetNetworkGasUsageResponse = {
	time_period: TimePeriod;
	data: {
		timestamp: number;
		gas_usage: string;
	}[];
};

export type GetNetworkExpensesResponse = {
	time_period: TimePeriod;
	data: {
		timestamp: number;
		expenses: string;
	}[];
};

export type CheckNetworkNameResponse = {
	available: boolean;
};

export type CheckCurrencyNameResponse = {
	available: boolean;
};

export type CheckCurrencySymbolResponse = {
	available: boolean;
};

export type CheckChainIdResponse = {
	available: boolean;
};

export type DeleteNetworkResponse = {
	message: string;
};
