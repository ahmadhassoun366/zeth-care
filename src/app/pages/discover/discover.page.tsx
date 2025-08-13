// third party
import { useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

// services

// context
import { DiscoverPageCtx, DiscoverPageCtxType, SearchForm, SortConfig } from './discover.context';
import DiscoverView from './discover.view';

// static
import TOOLTIPS from 'src/static/tooltips.data';
import QUERY_KEYS from 'src/static/query.keys';

// shared
import QueryApi from 'src/shared/api/query-api';
import { useDebounce } from 'src/shared/hooks/use-debounce.hook';
import queryClient from 'src/shared/query-client';

const searchSchema = z.object({
	search: z.string(),
});

function PageLogic({ children }: { children: React.ReactNode }) {
	// #region dependencies
	// const authSvc = useContext<AuthService>(AuthSvcContext);
	// const userSvc = useContext<UserService>(UserSvcContext);
	// const modalSvc = useContext<ModalService>(ModalSvcContext);
	// // #endregion

	// #region state

	// prettier-ignore
	const headersData: {
		title: string;
		className: string;
		tooltip?: string;
		sortkey?: string;
	}[] = [
			{ title: '#', className: 'justify-center', sortkey: 'id' },
			{ title: '', className: '' },
			{ title: 'Name', className: 'pl-2.5', sortkey: 'network_name' },
			{ title: 'Unique Wallets', className: 'justify-center', tooltip: TOOLTIPS.dappsTable.unique_wallets, sortkey: 'unique_wallets' },
			{ title: 'UAW', className: 'justify-center', tooltip: TOOLTIPS.dappsTable.UAW, sortkey: 'uaw' },
			{ title: 'Total Txns', className: 'justify-center', tooltip: TOOLTIPS.dappsTable.total_txn, sortkey: 'total_txns' },
			{ title: 'Txns 24h', className: 'justify-center', tooltip: TOOLTIPS.dappsTable.txn_24_h, sortkey: 'txns_last_24h' },
			{ title: 'Txn Volume', className: 'justify-center', tooltip: TOOLTIPS.dappsTable.volume, sortkey: 'txn_volume_percentage' },
		];
	//  #endregion

	// #region form

	const form = useForm<SearchForm>({
		resolver: zodResolver(searchSchema),
		mode: 'all',
	});

	const { watch } = form;

	const search = watch('search', '');
	useEffect(() => {
		// Get the query parameters from the URL
		const searchParams = new URLSearchParams(window.location.search);
		const authCode = searchParams.get('code'); // Get the authorization code

		// Check if we received the authorization code
		if (authCode) {
			// Log the received code for debugging purposes
			console.log('Received authorization code:', authCode);

			// Post the code back to the parent window (the opener window)
			if (window.opener) {
				window.opener.postMessage({ code: authCode }, 'https://l1-portal-d.vercel.app');
			}

			// Close the current window after sending the message
			window.close();
		}
	}, []);

	const debSearch = useDebounce(search, 500);

	function deleteSearchResults() {
		form.setValue('search', '');
	}

	// #region http reqs
	const statsQuery = useQuery([QUERY_KEYS.stats.GET_STATS], () =>
		QueryApi.stats.getGeneralStats()
	);

	const networksQuery = useQuery([QUERY_KEYS.networks.GET_NETWORKS], () =>
		QueryApi.networks.getNetworks()
	);

	const searchQuery = useQuery(
		[QUERY_KEYS.networks.SEARCH_NETWORKS, debSearch],
		() => QueryApi.networks.getNetworks({ search: debSearch }),
		{
			enabled: debSearch !== '',
		}
	);
	const [currentPage, setCurrentPage] = useState(networksQuery.data?.metadata.current_page ?? 1);

	const changePage = (page: number) => {
		setCurrentPage(page);
		queryClient.invalidateQueries([QUERY_KEYS.networks.GET_NETWORKS]);
	};

	// #endregion

	// #region sort table

	function sortBy(key: string) {
		let direction: 'ascending' | 'descending' = 'ascending';
		if (sortConfig.key === key && sortConfig.direction === 'ascending') {
			direction = 'descending';
		}
		setSortConfig({ key, direction });
	}

	const [sortConfig, setSortConfig] = useState<SortConfig>({
		key: null,
		direction: 'descending',
	});

	const sortedNetworks = useMemo(() => {
		if (networksQuery.data === undefined) return [];
		const sortableNetworks = [...networksQuery.data.networks];

		const sortKey = sortConfig.key as keyof (typeof sortableNetworks)[0];

		if (sortKey === null) {
			return sortableNetworks;
		}

		sortableNetworks.sort((a, b) => {
			if (a[sortKey] < b[sortKey]) {
				return sortConfig.direction === 'ascending' ? -1 : 1;
			} else if (a[sortKey] > b[sortKey]) {
				return sortConfig.direction === 'ascending' ? 1 : -1;
			} else {
				return 0;
			}
		});

		return sortableNetworks;
	}, [networksQuery.data, sortConfig]);

	//

	const ctxObject: DiscoverPageCtxType = {
		// formik,
		form,

		queries: {
			statsQuery,
			networksQuery,
			searchQuery,
		},
		fn: {
			deleteSearchResults,
			sortBy,
			changePage,
		},
		state: {
			headersData,
			debSearch,
			sortedNetworks,
			currentPage,
		},
	};

	return <DiscoverPageCtx.Provider value={ctxObject}>{children}</DiscoverPageCtx.Provider>;
}

export default function DiscoverPage() {
	return (
		<PageLogic>
			<DiscoverView />
		</PageLogic>
	);
}
