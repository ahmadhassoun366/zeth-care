import { useContext, useRef } from 'react';

import ModalService from 'src/shared/services/modal/modal.service';
import ModalSvcContext from 'src/shared/services/modal/modal.context';
import APP_MODALS from 'src/static/enums/app.modals';
import { DeploymentSuccessModalData } from 'src/shared/models/modals/modals.model';
import { Link } from 'react-router-dom';
import ROUTES from 'src/static/router.data';
import Button from 'src/components/internal/button/button.component';

type LoginModalProps = {
	modalId: APP_MODALS;
	data: DeploymentSuccessModalData;
};

export default function DeploymentProgressModal({ modalId, data }: LoginModalProps) {
	console.log(data);
	const modalRef = useRef<HTMLDivElement>(null);

	// 1. inject modalSvc
	const modalSvc = useContext<ModalService>(ModalSvcContext);

	// 3. call the modal hook, it will return this object {show: boolean, closeModal: fn}
	function close() {
		const modalElmt = modalRef.current;
		if (!modalElmt) return;

		modalElmt.classList.add('animate-fadeOut');

		function handleAnimationEnd(e: any) {
			if (!modalElmt) return;
			if (e.animationName !== 'fadeOut') return;

			modalSvc.closeModal(modalId);
			modalElmt.classList.remove('animate-fadeOut');
			modalElmt.removeEventListener('animationend', handleAnimationEnd);
			// modalElmt.add('animate-fadeIn');
		}

		modalElmt.addEventListener('animationend', handleAnimationEnd);
	}

	return (
		<div
			className={` w-full max-w-[600px] max-h-full animate-fadeIn pointer-events-auto `}
			tabIndex={-1}
			ref={modalRef}
		>
			{/* modal box */}
			<div className="relative dark:bg-dk_blue-900 bg-white dark:bg-dark-800 rounded-lg shadow ">
				<div
					id="modal-header"
					className="flex items-start justify-between px-8 py-6  rounded-t "
				>
					<h1 className="text-2xl font-bold text-black dark:text-white">Success</h1>
					<button
						type="button"
						className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
						data-modal-hide="defaultModal"
						onClick={close}
					>
						<span className="icon">
							<i className="far fa-times"></i>
						</span>

						<span className="sr-only">Close modal</span>
					</button>
				</div>

				<div id="modal-body" className="px-8 pb-6 space-y-6">
					<p className="text-base leading-relaxed text-black dark:text-gray-400">
						Your Layer 1 blockchain is currently being deployed. This process might take
						a few moments. Please wait while we finalize everything to ensure a seamless
						experience for you.
					</p>

					<div className="space-y-2">
						<div className="text-2xl text-center">
							<i className="fa-solid fa-check-circle text-green-500"></i>
						</div>

						<h2
							className="font-medium text-black dark:text-white text-center"
							data-testid="launch-success"
						>
							L1 has been launched successfully!
						</h2>
					</div>

					<div className="space-y-4">
						<div className="flex justify-between space-y-1">
							<h1 className="text-xs font-medium text-agrey-700 dark:text-white">
								Network name
							</h1>
							<p className="text-xs font-bold text-black dark:text-white">
								{data.network_name}
							</p>
						</div>
					</div>

					<div className="flex justify-center">
						<Link to={ROUTES.networks.details.replace(':id', '1')}>
							<Button className="secondary small w-[168px]" onClick={close}>
								View L1
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
