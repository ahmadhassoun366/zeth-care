export type CreateNetworkDto = {
	network_name: string;
	currency_name: string;
	currency_symbol: string;
	network_image: File;
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
