const _baseUrl = import.meta.env.VITE_APP_BACKEND_API;

const api = {
	admin: {
		changeUserRole: '/admin/user-role/:userId',
	},
	auth: {
		authenticate: `${_baseUrl}/auth/login/oauth`,
		loginOAuth: `${_baseUrl}/auth/login/oauth`,
		logout: '/auth/logout',
		session: '/auth/session',
	},
	users: {
		getAll: '/users/all',
		getById: '/users/:userId',
		update: '/users/:userId',
		delete: '/users/:userId',
		checkUsername: '/users/check-username/:username',
	},
	stats: {
		general: '/stats/general',
	},

	networks: {
		create: `${_baseUrl}/api/networks`,
		getAll: `${_baseUrl}/api/networks`,
		getById: `${_baseUrl}/api/networks/:networkId`,
		getUserNetworks: `${_baseUrl}/api/networks/user/:userId`,
		getTransactions: '/networks/:networkId/txns',
		getRevenue: '/networks/:networkId/revenue',
		getGasUsage: '/networks/:networkId/gas-usage',
		getExpenses: '/networks/:networkId/expenses',
		checkNetworkName: `/api/networks/check-network-name/:networkName`,
		checkCurrencyName: `/api/networks/check-currency-name/:currencyName`,
		checkCurrencySymbol: `/api/networks/check-currency-symbol/:currencySymbol`,
		checkChainId: `/api/networks/check-network-chainId/:chainId`,
		delete: '/networks/:networkId',
	},
	bridges: {
		create: '/bridges/create',
		getAll: '/bridges/all',
		getById: '/bridges/:bridgeId',
		update: '/bridges/:bridgeId',
		delete: '/bridges/:bridgeId',
	},
};

export default api;
