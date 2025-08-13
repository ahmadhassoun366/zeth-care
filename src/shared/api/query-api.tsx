import AdminAPI from './qfn/admin.qfn';
import AuthAPI from './qfn/auth.qfn';
import BridgeAPI from './qfn/bridge.qfn';
import NetworkAPI from './qfn/network.qfn';
import StatsAPI from './qfn/stats.qfn';
import UsersAPI from './qfn/users.qfn';

const QueryApi = {
	admin: AdminAPI,
	auth: AuthAPI,
	users: UsersAPI,
	networks: NetworkAPI,
	bridge: BridgeAPI,
	stats: StatsAPI,
};

export default QueryApi;
