import { Link } from 'react-router-dom';

import Button from 'src/components/internal/button/button.component';

import { BnToDec, USNumber } from 'src/shared/utils/formatters';

import ROUTES from 'src/static/router.data';

type NetworkCardProps = {
	network: {
		id: string;
		network_name: string;
		network_image: string;
		currency_symbol: string;
		chain_id: number;
		transactions_24h: number;
		fees_24h: string;
		revenue_24h: string;
	};
};
export default function NetworkCard({ network }: NetworkCardProps) {
	return (
		<div className="bg-light-900 dark:bg-dark-900 p-6 space-y-4 rounded-xl group hover:bg-agrey-50 dark:hover:bg-dark-600">
			<div>
				<img src={network.network_image} alt="" />
			</div>
			<div className="space-y-2 text-sm">
				<div className="flex justify-between ">
					<div className="text-agrey-700 dark:text-agrey-400 font-medium">
						Network Name
					</div>
					<div className="text-black dark:text-white font-bold">
						{network.network_name}
					</div>
				</div>
				<div className="flex justify-between">
					<div className="text-agrey-700 dark:text-agrey-400 font-medium">
						Currency Symbol
					</div>
					<div className="text-black dark:text-white font-bold">
						{network.currency_symbol}
					</div>
				</div>
				<div className="flex justify-between">
					<div className="text-agrey-700 dark:text-agrey-400 font-medium">Chain ID</div>
					<div className="text-black dark:text-white font-bold">{network.chain_id}</div>
				</div>
				<div className="flex justify-between">
					<div className="text-agrey-700 dark:text-agrey-400 font-medium">
						Transactions (24h)
					</div>
					<div className="text-black dark:text-white font-bold">
						{USNumber(network.transactions_24h)}
					</div>
				</div>
				<div className="flex justify-between">
					<div className="text-agrey-700 dark:text-agrey-400 font-medium">Fees (24h)</div>
					<div className="text-black dark:text-white font-bold">
						{USNumber(BnToDec(network.fees_24h))} {network.currency_symbol}
					</div>
				</div>
				<div className="flex justify-between">
					<div className="text-agrey-700 dark:text-agrey-400 font-medium">
						Profit (24h)
					</div>
					<div className="text-black dark:text-white font-bold">
						{USNumber(BnToDec(network.revenue_24h))} {network.currency_symbol}
					</div>
				</div>
			</div>
			<div>
				<Link to={ROUTES.networks.details.replace(':id', network.id)}>
					<Button className="secondary w-full small">View</Button>
				</Link>
			</div>
		</div>
	);
}
