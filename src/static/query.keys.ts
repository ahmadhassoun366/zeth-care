// /**
//  * this.files contanis all the keys for they queries used in the application
//  */

// const QUERY_KEYS = {
// 	// profile

// 	GET_DATA: 'get_data',
// };

// export default QUERY_KEYS;

const QUERY_KEYS = {
	stats: {
		GET_STATS: 'get_stats',
	},
	createL1: {
		currencySymbolQuery: 'currency_symbol_query',
		currencyNameQuery: 'currency_name_query',
		chainId: 'chain_id',
		networkName: 'networkName',
	},

	networks: {
		SEARCH_NETWORKS: 'search_networks',
		GET_NETWORKS: 'get_networks',
		GET_USER_NETWORKS: 'get_user_networks',
		GET_NETWORK_DETAILS: 'get_network_details',
	},

	charts: {
		GET_ACTIVITY_TXNS: 'get_activity_txns',
		GET_REVENUE: 'get_revenue',
		GET_GAS_USAGE: 'get_gas_usage',
		GET_EXPENSES: 'get_expenses',
	},
};

export default QUERY_KEYS;
