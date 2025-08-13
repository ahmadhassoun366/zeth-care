// third party
import { useContext, useState } from 'react';
import { useQuery } from 'react-query';

// services
import UserSvcContext from 'src/shared/services/user/user.context';
// import AuthSvcContext from 'src/shared/services/auth/auth.context';
// import ModalSvcContext from 'src/shared/services/modal/modal.context';
import DocTitleSvcContext from '../../../shared/services/doc-title/doc-title.context';

// context
import { DashboardPageCtx, DashboardPageCtxType } from './dashboard.context';
import DasboardView from './dashboard.view';

// static
import QUERY_KEYS from '../../../static/query.keys';

// shared
import QueryApi from 'src/shared/api/query-api';

function PageLogic({ children }: { children: React.ReactNode }) {
	// #region dependencies

	// const authSvc = useContext(AuthSvcContext);
	const userSvc = useContext(UserSvcContext);
	// const modalSvc = useContext(ModalSvcContext);
	useContext(DocTitleSvcContext).setTitle('Dashboard');

	// #endregion

	// #region state
	const [clicks, setClicks] = useState<number>(0);
	// #endregion

	// #region http reqs

	const userL1sQuery = useQuery(
		[QUERY_KEYS.networks.GET_USER_NETWORKS, userSvc.getUserData().id],
		() => QueryApi.networks.getUserNetworks(userSvc.getUserData().id)
	);

	// const dataQuery = useQuery(['data'], () => fetchTodos());

	// #endregion

	// #region fn

	function handleClick(dir: number) {
		const n = clicks + dir;
		setClicks(n);
	}
	// #endregion

	const ctxObject: DashboardPageCtxType = {
		state: {
			clicks,
		},

		queries: {
			userL1sQuery,
		},

		fn: {
			handleClick,
		},
	};

	return <DashboardPageCtx.Provider value={ctxObject}>{children}</DashboardPageCtx.Provider>;
}

export default function DashboardPage() {
	return (
		<PageLogic>
			<DasboardView />
		</PageLogic>
	);
}
