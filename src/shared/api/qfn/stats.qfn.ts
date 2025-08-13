import api from '../api';
import { axios_m, mock } from '../axios-instance';
import { GetStatsResponse } from '../responses/stats.response';

// #region mocking

if (import.meta.env.VITE_APP_ENV === 'dev') {
	const res: GetStatsResponse = {
		total_networks: 1200,
		transaction_count: 3500000,
		total_unique_wallets: 450000,
	};

	mock.onGet(api.stats.general).reply(200, res);
}

// #endregion

const StatsAPI = {
	async getGeneralStats(): Promise<GetStatsResponse> {
		const res = await axios_m<GetStatsResponse>({
			method: 'GET',
			url: api.stats.general,
		});

		return res.data;
	},
};

export default StatsAPI;
