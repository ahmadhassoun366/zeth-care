import { TimePeriod } from 'src/shared/enums/time-period.enums';
import api from '../api';
import { axios_, axios_m, mock } from '../axios-instance';
import { CreateNetworkDto } from '../dto/networks.dto';
import {
	CheckChainIdResponse,
	CheckCurrencyNameResponse,
	CheckCurrencySymbolResponse,
	CheckNetworkNameResponse,
	CreateNetworkResponse,
	DeleteNetworkResponse,
	GetNetworkExpensesResponse,
	GetNetworkGasUsageResponse,
	GetNetworkResponse,
	GetNetworkRevenueResponse,
	GetNetworksResponse,
	GetNetworkTransactionsResponse,
	GetUserNetworksResponse,
} from '../responses/network.response';

// #region mocking

if (import.meta.env.VITE_APP_ENV === 'dev') {
	// const createNetworkResponse: CreateNetworkResponse = {
	// 	network_id: '60f3b3b3c4b3d3b3b3b3b3b3',
	// 	network_name: 'My Network',
	// 	currency_name: 'My Currency',
	// 	currency_symbol: 'MYC',
	// 	network_image: '/media/icons/l1.svg',
	// 	chain_id: '0x1234567890abcdef',
	// 	vm_type: 'EVM',
	// 	gas_price: '1000000000000000000',
	// 	foundation_address: '0x1234567890abcdef',
	// 	gas_price_address: '0x1234567890abcdef',
	// 	automation_revenue_address: '0x1234567890abcdef',
	// 	bridges: ['ETH', 'BSC'],
	// 	initial_supply: [
	// 		{
	// 			address: '0x1234567890abcdef',
	// 			amount: '1000000000000000000000000000',
	// 		},
	// 	],
	// };

	// mock.onPost('/networks/create').reply(200, createNetworkResponse);

	const getNetworksResponse: GetNetworksResponse = {
		networks: new Array(10).fill(null).map((_, i) => ({
			id: '0x00000000000000000000000' + i,
			network_image: '/media/icons/l1.svg',
			chain_id: '0x1234567890abcdef',
			network_name: 'My Network' + i,
			unique_wallets: Math.floor(Math.random() * 1000),
			uaw: Math.floor(Math.random() * 1000),
			total_txns: Math.floor(Math.random() * 10000),
			txns_last_24h: Math.floor(Math.random() * 1000),
			txn_volume_percentage: +(Math.random() * 20).toFixed(2),
		})),
		metadata: {
			items_per_page: 10,
			total_items: 50,
			current_page: 1,
			total_pages: 5,
		},
	};

	mock.onGet('/networks/all').reply(200, getNetworksResponse);

	const txns: GetNetworkTransactionsResponse = {
		time_period: TimePeriod.DAILY,
		data: [
			{ timestamp: 1704067200, transactions: 15388888 },
			{ timestamp: 1704070800, transactions: 208 },
			{ timestamp: 1704074400, transactions: 176 },
			{ timestamp: 1704078000, transactions: 199 },
			{ timestamp: 1704081600, transactions: 142 },
			{ timestamp: 1704085200, transactions: 234 },
			{ timestamp: 1704088800, transactions: 189 },
			{ timestamp: 1704092400, transactions: 167 },
			{ timestamp: 1704096000, transactions: 220 },
			{ timestamp: 1704099600, transactions: 158 },
			{ timestamp: 1704103200, transactions: 201 },
			{ timestamp: 1704106800, transactions: 189 },
			{ timestamp: 1704110400, transactions: 175 },
			{ timestamp: 1704114000, transactions: 212 },
			{ timestamp: 1704117600, transactions: 160 },
			{ timestamp: 1704121200, transactions: 230 },
			{ timestamp: 1704124800, transactions: 145 },
			{ timestamp: 1704128400, transactions: 198 },
			{ timestamp: 1704132000, transactions: 205 },
			{ timestamp: 1704135600, transactions: 171 },
			{ timestamp: 1704139200, transactions: 183 },
			{ timestamp: 1704142800, transactions: 217 },
			{ timestamp: 1704146400, transactions: 160 },
			{ timestamp: 1704150000, transactions: 192 },
		],
	};

	mock.onGet(/\/networks\/[^/]+\/txns/).reply(200, txns);

	const revenueRes: GetNetworkRevenueResponse = {
		time_period: TimePeriod.DAILY,
		data: [
			{ timestamp: 1738613710, revenue: '1000000' },
			{ timestamp: 1738613710, revenue: '20000000000' },
			{ timestamp: 1738613710, revenue: '0' },
		],
	};

	mock.onGet(/\/networks\/[^/]+\/revenue/).reply(200, revenueRes);

	const gasResponse: GetNetworkGasUsageResponse = {
		time_period: TimePeriod.DAILY,
		data: [
			{ timestamp: 1738613710, gas_usage: '1000000' },
			{ timestamp: 1738613710, gas_usage: '20000000000' },
			{ timestamp: 1738613710, gas_usage: '0' },
		],
	};

	mock.onGet(/\/networks\/[^/]+\/gas-usage/).reply(200, gasResponse);

	const expensesRes: GetNetworkExpensesResponse = {
		time_period: TimePeriod.DAILY,
		data: [
			{ timestamp: 1738613710, expenses: '1000000' },
			{ timestamp: 1738613710, expenses: '20000000000' },
			{ timestamp: 1738613710, expenses: '0' },
		],
	};

	mock.onGet(/\/networks\/[^/]+\/expenses/).reply(200, expensesRes);

	const networkRes: GetNetworkResponse = {
		id: 'a0ebe0c3-6ca4-4b3f-9dfa-f0faa4ffb2ce',
		network_name: 'Bitcoin+',
		currency_name: 'Bitcoin+',
		currency_symbol: 'BTC+',
		network_image: '/media/delete/bitcoin.svg',
		chain_id: '2100001',
		revenue: '1000000000000000000',
		revenue_24h: '1000000000000000000',
		gas_price: '1000000000000000000',
		rpc_url: 'https://mainnet.pwrlabs.io/v3/',
		explorer_url: 'https://mainnet.pwrlabs.io/v3/',
		foundation_address: '0x71E5eE8736dghf6578892wuhif6578jdgcni7F4C1682',
		gas_price_address: '0x9085eE8736dghf6578892wuhf6578jdgcni7F4C1684',
		automation_revenue_address: '0x68e5eE8736dghf6578892wuhf6578jdgcni7F4C1686',
		wrapper_node_address: '0x71E5eE8736dghf6578892wuhf6578jdgcni7F4C1681',
		wrapper_node_funds: '100000000000000',
	};

	mock.onGet(/\/networks\/([a-f0-9-]+)/).reply(200, networkRes);

	const getUserNetworksResponse: GetUserNetworksResponse = {
		networks: new Array(10).fill({
			id: 'bb3d1ed1-ffdf-4113-b9f7-8d2478ea5dbf',
			network_name: 'Ethereum',
			network_image: '/media/delete/bitcoin.svg',
			currency_symbol: 'ETH',
			chain_id: 1,
			transactions_24h: 1000,
			fees_24h: '1000000000000',
			revenue_24h: '1000000000000',
		}),

		metadata: {
			items_per_page: 10,
			total_pages: 50,
			current_page: 1,
			total_items: 5,
		},
	};

	mock.onGet(/\/networks\/user\/[^/]+/).reply(200, getUserNetworksResponse);

	// const check1Response: CheckNetworkNameResponse = {
	// 	available: true,
	// };

	// mock.onGet(/\/networks\/check-network-name\/.+/).reply(200, check1Response);

	// const check2Response: CheckNetworkNameResponse = {
	// 	available: false,
	// };

	// mock.onGet(/\/networks\/check-currency-name\/.+/).reply(200, check2Response);

	// const check3Response: CheckNetworkNameResponse = {
	// 	available: true,
	// };

	// mock.onGet(/\/networks\/check-currency-symbol\/.+/).reply(200, check3Response);

	// const check4Response: CheckNetworkNameResponse = {
	// 	available: false,
	// };

	// mock.onGet(/\/networks\/check-chain-id\/\d+/).reply(200, check4Response);

	const deleteRes: DeleteNetworkResponse = {
		message: 'Network deleted successfully',
	};

	mock.onDelete(/\/networks\/\d+/).reply(200, deleteRes);
}

// #endregion

type GetNetworkTxnsParams = {
	time: string;
};

type GetNetworkRevenueParams = {
	time: string;
};

type GetGasUsageParams = {
	time: string;
};

type GetNetworkExpensesParams = {
	time: string;
};

const token =
	'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxODI1MTdkYS0xNWZlLTQ4YjctODRhNS01NGFmMTI4ZjJlZmQiLCJ1c2VybmFtZSI6IkFobWFkIEhhc3NvdW4iLCJwcm92aWRlciI6IkdPT0dMRSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzQzMTY4OTEyLCJleHAiOjE3NDMyNTUzMTJ9.XVcwKV8nninaJFO_M2u9FR06T_ROHedk6XiCeJdFtNo';
const NetworkAPI = {
	async createNetwork(dto: CreateNetworkDto): Promise<CreateNetworkResponse> {
		const formData = new FormData();

		Object.entries(dto).forEach(([key, value]) => {
			if (Array.isArray(value)) {
				value.forEach((item) => {
					formData.append(key, typeof item === 'object' ? JSON.stringify(item) : item);
				});
			} else {
				formData.append(key, value.toString());
			}
		});

		const res = await axios_<CreateNetworkResponse>({
			method: 'POST',
			url: api.networks.create,
			headers: {
				'Content-Type': 'multipart/form-data',
				Authorization: `Bearer ${token}`,
			},
			data: formData,
		});

		return res.data;
	},

	async getNetworks(params?: { search?: string }): Promise<GetNetworksResponse> {
		const res = await axios_<GetNetworksResponse>({
			method: 'GET',
			url: api.networks.getAll,
			params,
		});

		return res.data;
	},

	async getNetwork(networkId: string): Promise<GetNetworkResponse> {
		const res = await axios_<GetNetworkResponse>({
			method: 'GET',
			url: api.networks.getById.replace(':networkId', networkId),
		});

		return res.data;
	},

	async getUserNetworks(
		userId: string,
		params?: Record<string, string | number>
	): Promise<GetUserNetworksResponse> {
		const res = await axios_<GetUserNetworksResponse>({
			method: 'GET',
			url: api.networks.getUserNetworks.replace(':userId', userId),
			params,
		});

		return res.data;
	},

	async getTransactions(
		networkId: string,
		params: GetNetworkTxnsParams
	): Promise<GetNetworkTransactionsResponse> {
		const res = await axios_m<GetNetworkTransactionsResponse>({
			method: 'GET',
			url: api.networks.getTransactions.replace(':networkId', networkId),
			params,
		});

		return res.data;
	},

	async getRevenue(
		networkId: string,
		params: GetNetworkRevenueParams
	): Promise<GetNetworkRevenueResponse> {
		const res = await axios_m<GetNetworkRevenueResponse>({
			method: 'GET',
			url: api.networks.getRevenue.replace(':networkId', networkId),
			params,
		});

		return res.data;
	},

	async getGasUsage(
		networkId: string,
		params: GetGasUsageParams
	): Promise<GetNetworkGasUsageResponse> {
		const res = await axios_m<GetNetworkGasUsageResponse>({
			method: 'GET',
			url: api.networks.getGasUsage.replace(':networkId', networkId),
			params,
		});

		return res.data;
	},

	async getNetworkExpenses(
		networkId: string,
		params: GetNetworkExpensesParams
	): Promise<GetNetworkExpensesResponse> {
		const res = await axios_m<GetNetworkExpensesResponse>({
			method: 'GET',
			url: api.networks.getExpenses.replace(':networkId', networkId),
			params,
		});

		return res.data;
	},

	async checkNetworkName(networkName: string): Promise<CheckNetworkNameResponse> {
		const res = await axios_<CheckNetworkNameResponse>({
			method: 'GET',
			url: api.networks.checkNetworkName.replace(':networkName', networkName),
		});

		return res.data;
	},

	async checkCurrencyName(currencyName: string): Promise<CheckCurrencyNameResponse> {
		const res = await axios_<CheckCurrencyNameResponse>({
			method: 'GET',
			url: api.networks.checkCurrencyName.replace(':currencyName', currencyName),
		});

		return res.data;
	},

	async checkCurrencySymbol(currencySymbol: string): Promise<CheckCurrencySymbolResponse> {
		const res = await axios_<CheckCurrencySymbolResponse>({
			method: 'GET',
			url: api.networks.checkCurrencySymbol.replace(':currencySymbol', currencySymbol),
		});

		return res.data;
	},

	async checkChainId(chainId: string): Promise<CheckChainIdResponse> {
		const res = await axios_<CheckChainIdResponse>({
			method: 'GET',
			url: api.networks.checkChainId.replace(':chainId', chainId),
		});
		return res.data;
	},

	async deleteNetwork(networkId: string): Promise<DeleteNetworkResponse> {
		const res = await axios_m<DeleteNetworkResponse>({
			method: 'DELETE',
			url: api.networks.delete.replace(':networkId', networkId),
		});

		return res.data;
	},
};

export default NetworkAPI;
