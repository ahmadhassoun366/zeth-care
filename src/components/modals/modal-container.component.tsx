import { useContext } from 'react';

import ModalSvcContext from 'src/shared/services/modal/modal.context';
import ModalService from 'src/shared/services/modal/modal.service';

type ModalContainerProps = {
	children: React.ReactNode;
};

export default function ModalContainer({ children }: ModalContainerProps) {
	const modalSvc = useContext<ModalService>(ModalSvcContext);

	function closeCurrentModal() {
		modalSvc.closeCurrentModal();
	}

	// useEffect(() => {
	// 	function onKeyDown(e: KeyboardEvent) {
	// 		if (e.key === 'Escape') {
	// 			closeCurrentModal();
	// 		}
	// 	}

	// 	window.addEventListener('keydown', onKeyDown);

	// 	return () => {
	// 		window.removeEventListener('keydown', onKeyDown);
	// 	};
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, []);

	return (
		<div className="modal_main_container">
			<div
				className={`modal_overlay ${modalSvc.getGlassPanel() ? '' : 'hidden'}`}
				onClick={closeCurrentModal}
			></div>

			{/* modal container */}
			<div className="absolute top-0 left-0 w-full h-full p-4 md:inset-0 overflow-x-hidden overflow-y-auto pointer-events-none flex justify-center items-center  z-modal">
				{children}
			</div>
		</div>
	);
}
