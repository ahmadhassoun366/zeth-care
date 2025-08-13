import { useContext } from 'react';
import ModalSvcContext from 'src/shared/services/modal/modal.context';
import APP_MODALS from 'src/static/enums/app.modals';
import { VMType } from 'src/static/enums/vmtype.enum';

export default function TestPage() {
	const modalSvc = useContext(ModalSvcContext);

	function openModal() {
		modalSvc.open(APP_MODALS.DEPLOYMENT_SUCCESS_MODAL, {
			network_name: 'network_name',
			chain_id: 'chain_id',
			currency_symbol: 'currency_symbol',
			vm_type: VMType.ETHEREUM,
			bridges: ['bridges'],
			rpc_url: 'rpc_url',
			explorer_url: 'explorer_url',
			instrucctions_url: 'instrucctions_url',
		});
	}

	return (
		<main className="container-3 mx-auto">
			<img src="" alt="" />
			<div>asd</div>

			<button onClick={openModal}>open</button>
		</main>
	);
}
