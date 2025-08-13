import { VMType } from 'src/static/enums/vmtype.enum';
import APP_MODALS from 'src/static/enums/app.modals';

export type ModalData = {
	id: string;
	show: boolean;
	data?: any; // any data to be passed to the modal component
};

export type ChartModalData = {
	name: string;
	series: ApexAxisChartSeries;
};

export type DeploymentSuccessModalData = {
	network_name: string;
	chain_id: string;
	currency_symbol: string;
	vm_type: VMType;
	bridges: string[];
	rpc_url: string;
	explorer_url: string;
	instrucctions_url: string;
};

export type ModalDataMap = {
	[APP_MODALS.LOGIN_MODAL]: null;
	[APP_MODALS.LOGIN_MODAL_DISCOVER_BUTTON]: null;
	[APP_MODALS.CHART_MODAL]: ChartModalData;
	[APP_MODALS.DEPLOYMENT_IN_PROGRESS_MODAL]: null;
	[APP_MODALS.DEPLOYMENT_SUCCESS_MODAL]: DeploymentSuccessModalData;
};
