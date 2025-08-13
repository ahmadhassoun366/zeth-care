import { useContext, useEffect, useRef } from 'react';

import Button from 'src/components/internal/button/button.component';
import ModalService from 'src/shared/services/modal/modal.service';
import ModalSvcContext from 'src/shared/services/modal/modal.context';
import APP_MODALS from 'src/static/enums/app.modals';
import { VMType } from 'src/static/enums/vmtype.enum';

type LoginModalProps = {
	modalId: APP_MODALS;
	data: null;
};

export default function DeploymentProgressModal({ modalId }: LoginModalProps) {
	const modalRef = useRef<HTMLDivElement>(null);

	// 1. inject modalSvc
	const modalSvc = useContext<ModalService>(ModalSvcContext);

	// 3. call the modal hook, it will return this object {show: boolean, closeModal: fn}
	function close(callback?: () => void) {
		const modalElmt = modalRef.current;
		if (!modalElmt) return;

		modalElmt.classList.add('animate-fadeOut');

		function handleAnimationEnd(e: any) {
			if (!modalElmt) return;
			if (e.animationName !== 'fadeOut') return;

			modalSvc.closeModal(modalId);
			modalElmt.classList.remove('animate-fadeOut');
			modalElmt.removeEventListener('animationend', handleAnimationEnd);
			callback && callback();
			// modalElmt.add('animate-fadeIn');
		}

		modalElmt.addEventListener('animationend', handleAnimationEnd);
	}

	useEffect(() => {
		function onSuccess() {
			close(() => {
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
			});
		}

		document.addEventListener('deploymentsuccess', onSuccess);

		return () => {
			document.removeEventListener('deploymentsuccess', onSuccess);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div
			className={` w-full max-w-[406px] max-h-full animate-fadeIn pointer-events-auto `}
			tabIndex={-1}
			ref={modalRef}
		>
			{/* modal box */}
			<div className="relative dark:bg-dk_blue-900 bg-white dark:bg-dark-800 rounded-lg shadow ">
				<div
					id="modal-header"
					className="flex items-start justify-between px-8 py-6  rounded-t "
				>
					<h1 className="text-2xl font-bold text-black dark:text-white">
						Deployment in Progress
					</h1>
				</div>

				<div id="modal-body" className="px-8 pb-6 space-y-6">
					<p className="text-base leading-relaxed text-black dark:text-gray-400">
						Your Layer 1 blockchain is currently being deployed. This process might take
						a few moments. Please wait while we finalize everything to ensure a seamless
						experience for you.
					</p>

					{/* buttons con */}
					<div className="flex flex-col gap-[12px]">
						<Button className="blue space-x-2" disabled>
							<span className="">
								<i className="fa-solid fa-loader animate-spin ease-linear "></i>
							</span>
							<span>Deploying your L1..</span>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
