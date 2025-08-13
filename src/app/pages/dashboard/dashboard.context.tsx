import { createContext } from 'react';
import { UseQueryResult } from 'react-query';
import { GetUserNetworksResponse } from 'src/shared/api/responses/network.response';

export type DashboardPageCtxType = {
	state: {
		clicks: number;
	};

	fn: {
		handleClick: (dir: number) => void;
	};

	queries: {
		userL1sQuery: UseQueryResult<GetUserNetworksResponse, unknown>;
	};
};

// @ts-expect-error init later
export const DashboardPageCtx = createContext<DashboardPageCtxType>();
