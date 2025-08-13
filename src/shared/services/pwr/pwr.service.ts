// import { Signal, signal } from '@preact/signals-react';
// import { PwrProviderNotDetectedError } from 'src/static/app.errors';
// import { APP_EVENTS } from 'src/static/enums/app.events';
// import {
// 	EarlyWithdrawPenaltyTxn,
// 	FeePerByteTxn,
// 	MaxBlockSizeTxn,
// 	MaxTransactionSizeTxn,
// 	OverallBurnPercentageTxn,
// 	VoteOnProposalTxn,
// 	RewardPerYearTxn,
// 	ValidatorCountLimitTxn,
// 	ValidatorJoiningFeeTxn,
// 	VmIdClaimingFeeTxn,
// 	VmOwnerTransactionFeeShareTxn,
// 	OtherProposalTxn,
// 	DataTxn,
// } from 'types/global';

// type WalletModel = {
// 	addresses: string[];
// 	isConnected: boolean;
// };

// export default class PwrService {
// 	// state
// 	private detected: Signal<boolean> = signal(false);

// 	// wallet
// 	private wallet: Signal<WalletModel> = signal({
// 		addresses: [],
// 		isConnected: false,
// 	});

// 	getWallet(): WalletModel {
// 		return this.wallet.value;
// 	}

// 	// *~~~ Constructor ~~~* //

// 	private provider: PwrProvider | null;

// 	constructor() {
// 		if (window.pwr) {
// 			this.detected.value = true;
// 			this.provider = window.pwr;
// 		} else {
// 			this.detected.value = false;
// 			this.provider = null;
// 		}
// 	}

// 	async init() {
// 		// 1. detect provider
// 		// 2. get provider

// 		await new Promise((_) => setTimeout(_, 200));

// 		// *~~*~~*~~ Events ~~*~~*~~* //

// 		if (this.provider) {
// 			const connectedAddresses = await this.provider.getConnections();

// 			if (connectedAddresses.length > 0) {
// 				this.wallet.value = {
// 					addresses: connectedAddresses,
// 					isConnected: true,
// 				};
// 			}

// 			this.provider.onConnect.addListener((addresses: string[]) => {
// 				this.wallet.value = {
// 					addresses,
// 					isConnected: true,
// 				};

// 				const walletConnectEvent = new CustomEvent(APP_EVENTS.WALLET_CONNECTED, {
// 					detail: { addresses },
// 				});

// 				document.dispatchEvent(walletConnectEvent);
// 			});

// 			this.provider.onDisconnect.addListener((address: string) => {
// 				if (
// 					this.wallet.value.addresses.length > 0 &&
// 					this.wallet.value.addresses[0] === address
// 				) {
// 					this.wallet.value = {
// 						addresses: [],
// 						isConnected: false,
// 					};

// 					const walletDisconnectedEvent = new CustomEvent(APP_EVENTS.WALLET_DICONNECTED);
// 					document.dispatchEvent(walletDisconnectedEvent);
// 				}
// 			});
// 		}
// 	}

// 	//Comment on a Proposal (Transaction based)
// 	async dataTransaction(txnData: DataTxn) {
// 		if (!this.provider) throw new PwrProviderNotDetectedError();
// 		return this.provider.dataTransaction(txnData);
// 	}

// 	async bytesDataTransaction(txnData: DataTxn) {
// 		if (!this.provider) throw new PwrProviderNotDetectedError();
// 		return this.provider.bytesDataTransaction(txnData);
// 	}

// 	// *~~*~~*~~ External connection ~~*~~*~~* //

// 	getProvider() {
// 		if (!this.detected.value) throw new PwrProviderNotDetectedError();
// 		return this.provider;
// 	}

// 	async connect(): Promise<any> {
// 		if (!this.provider) {
// 			throw new PwrProviderNotDetectedError();
// 		}

// 		return this.provider.connect();
// 	}

// 	// #region automated txns

// 	async enableAutomatedTransactions(): Promise<any> {
// 		if (!this.provider) throw new PwrProviderNotDetectedError();

// 		return this.provider.setAutoFeature(true);
// 	}

// 	async areAutomatedTransactionsEnabled(): Promise<boolean> {
// 		if (!this.provider) throw new PwrProviderNotDetectedError();

// 		return this.provider.areAutomatedTransactionsEnabled();
// 	}

// 	// #endregion

// 	// #region proposals

// 	async earlyWithdrawPenalty(txnData: EarlyWithdrawPenaltyTxn) {
// 		if (!this.provider) throw new PwrProviderNotDetectedError();

// 		return this.provider.earlyWithdrawPenalty(txnData);
// 	}

// 	async feePerByte(txnData: FeePerByteTxn) {
// 		if (!this.provider) throw new PwrProviderNotDetectedError();

// 		return this.provider.feePerByte(txnData);
// 	}

// 	async maxBlockSize(txnData: MaxBlockSizeTxn) {
// 		if (!this.provider) throw new PwrProviderNotDetectedError();

// 		console.log({ txnData });

// 		return this.provider.maxBlockSize(txnData);
// 	}

// 	async maxTransactionSize(txnData: MaxTransactionSizeTxn) {
// 		if (!this.provider) throw new PwrProviderNotDetectedError();

// 		return this.provider.maxTransactionSize(txnData);
// 	}

// 	async overallBurnPercentage(txnData: OverallBurnPercentageTxn) {
// 		if (!this.provider) throw new PwrProviderNotDetectedError();

// 		return this.provider.overallBurnPercentage(txnData);
// 	}

// 	async rewardPerYear(txnData: RewardPerYearTxn) {
// 		if (!this.provider) throw new PwrProviderNotDetectedError();

// 		return this.provider.rewardPerYear(txnData);
// 	}

// 	async validatorCountLimit(txnData: ValidatorCountLimitTxn) {
// 		if (!this.provider) throw new PwrProviderNotDetectedError();

// 		return this.provider.validatorCountLimit(txnData);
// 	}

// 	async validatorJoiningFee(txnData: ValidatorJoiningFeeTxn) {
// 		if (!this.provider) throw new PwrProviderNotDetectedError();

// 		return this.provider.validatorJoiningFee(txnData);
// 	}

// 	async vmIdClaimingFee(txnData: VmIdClaimingFeeTxn) {
// 		if (!this.provider) throw new PwrProviderNotDetectedError();

// 		return this.provider.vmIdClaimingFee(txnData);
// 	}

// 	async vmOwnerTransactionFeeShare(txnData: VmOwnerTransactionFeeShareTxn) {
// 		if (!this.provider) throw new PwrProviderNotDetectedError();

// 		return this.provider.vmOwnerTransactionFeeShare(txnData);
// 	}

// 	async otherProposal(txnData: OtherProposalTxn) {
// 		if (!this.provider) throw new PwrProviderNotDetectedError();

// 		return this.provider.otherProposal(txnData);
// 	}

// 	async voteOnProposal(txnData: VoteOnProposalTxn) {
// 		if (!this.provider) throw new PwrProviderNotDetectedError();

// 		return this.provider.voteOnProposal(txnData);
// 	}

// 	// #endregion
// }
