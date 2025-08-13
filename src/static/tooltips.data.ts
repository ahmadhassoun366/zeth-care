/**
 * This file contains the data for all the tooltips of the app
 * fill the object with the tooltips needed, make sure they are grouped by the page they are used in
 */
const TOOLTIPS = {
	dappsTable: {
		unique_wallets:
			'Unique Wallets: Total number of unique wallets that have interacted with the application. Represents all users who have engaged with the app.',
		UAW: 'Unique Active Wallets (UAW): Number of unique wallets that have interacted with the application in the past 7 days. Indicates current user engagement and activity.',
		total_txn:
			'Total Transactions : The Total Number of transactions conducted through the application. Indicates total transaction activity and user engagement.',
		txn_24_h:
			'Transactions (24h): Number of transactions conducted through the application in the past 24 hours. Indicates recent transaction activity and user engagement.',
		volume: 'Txn Volume: Percentage change in transaction volume over the past 7 days. Highlights the recent trend in transaction activity, showing increase or decrease.',
	},

	dappDetails: {
		upgradable:
			'This indicates that the software application can receive updates or improvements over time.',
	},
};

export default TOOLTIPS;
