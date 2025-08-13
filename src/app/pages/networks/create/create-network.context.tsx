import { createContext } from 'react';
import { UseFieldArrayReturn, UseFormReturn } from 'react-hook-form';

export type CreateNetworkForm = {
	network_name: string;
	currency_name: string;
	currency_symbol: string;
	network_image: File;
	chain_id: string;

	vm_type: string;

	gas_price: number;

	foundation_address: string;
	gas_price_manager_address: string;
	automation_revenue_address: string;

	initial_supply: {
		address: string;
		amount: number;
	}[];

	accept_terms: boolean;
};

export type CreateNetworkPageCtxType = {
	form: UseFormReturn<CreateNetworkForm, any, undefined>;

	state: {
		initialSupplyArray: UseFieldArrayReturn<CreateNetworkForm, 'initial_supply', 'id'>;

		activeSection: number;
		link_group: {
			title: string;
			links: {
				name: string;
				onClick: () => void;
			}[];
		}[];
	};
	queries: {
		currencySymbolQuery: any;
		currencyNameQuery: any;
		chainIdQuery: any;
		checkNetworkName: any;
	};

	fn: {
		manuHandleSubmit(): Promise<void>;
	};

	refs: {
		sectionRefs: React.MutableRefObject<(HTMLFieldSetElement | null)[]>;
	};
};

// @ts-expect-error init later
export const CreateNetworkPageCtx = createContext<CreateNetworkPageCtxType>();
