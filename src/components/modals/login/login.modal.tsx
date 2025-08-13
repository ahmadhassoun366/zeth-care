import { useContext, useEffect, useRef, useState } from 'react';

import Button from 'src/components/internal/button/button.component';
import ModalService from 'src/shared/services/modal/modal.service';
import ModalSvcContext from 'src/shared/services/modal/modal.context';
import APP_MODALS from 'src/static/enums/app.modals';

import AuthService from 'src/shared/services/auth/auth.service';
import AuthSvcContext from 'src/shared/services/auth/auth.context';
// import { PwrProviderNotDetectedError } from 'src/static/app.errors';
// import ROUTES from 'src/static/router.data';
// import { toast } from 'react-toastify';
// import api from 'src/shared/api/api';
// import ROUTES from 'src/static/router.data';

type LoginModalProps = {
	modalId: APP_MODALS;
	data: null;
};

export default function LoginModal({ modalId }: LoginModalProps) {
	const modalRef = useRef<HTMLDivElement>(null);
	const googleBtn = useRef<HTMLDivElement>(null);

	const authSvc = useContext<AuthService>(AuthSvcContext);
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

	useEffect(() => {
		if (!googleBtn.current) return;

		window.google.accounts.id.renderButton(
			googleBtn.current,
			{
				width: 250,
				height: 50,
			} // Customize the button as needed
		);
	}, [googleBtn]);

	useEffect(() => {
		const searchParams = new URLSearchParams(window.location.search);
		const authCode = searchParams.get('code');

		if (authCode) {
			console.log('Received authorization code:', authCode);

			// Ensure message is sent before closing the window
			if (window.opener) {
				window.opener.postMessage({ code: authCode }, 'https://l1-portal-d.vercel.app');
			}

			// Use setTimeout to delay window close
			setTimeout(() => {
				window.close();
			}, 500); // give some time for the postMessage to send
		}
	}, []);

	const [googleAuthLoading, setGoogleAuthLoading] = useState(false);
	async function googleAuth(): Promise<string> {
		return new Promise((resolve, reject) => {
			const w = window.open(
				'https://accounts.google.com/o/oauth2/auth?client_id=997802428506-jc6ko3efdthasukeqflv1t758hqmu7i3.apps.googleusercontent.com&redirect_uri=https://l1-portal-d.vercel.app/discover&response_type=code&scope=email%20profile&access_type=offline&prompt=consent',
				'connect',
				'height=600,width=800'
			);

			if (!w) {
				reject(new Error('Failed to open the authentication popup.'));
				return;
			}

			const allowedOrigins = ['http://localhost:5173', 'https://l1-portal-d.vercel.app'];

			const timeout = setTimeout(() => {
				window.removeEventListener('message', onMessage);
				try {
					w.close();
				} catch {
					//
				}
				reject(new Error('⏰ Google login timed out.'));
			}, 60 * 10 * 1000);

			function onMessage(event: MessageEvent) {
				if (event.origin.startsWith('chrome-extension://')) return;

				if (allowedOrigins.some((origin) => event.origin.startsWith(origin))) {
					const { code } = event.data || {};
					if (code) {
						clearTimeout(timeout);
						window.removeEventListener('message', onMessage);
						try {
							w!.close();
						} catch {
							//
						}
						resolve(code);
					}
				} else {
					console.warn('Blocked message from unauthorized origin:', event.origin);
				}
			}

			window.addEventListener('message', onMessage);
		});
	}

	async function loginWithGoogle() {
		setGoogleAuthLoading(true);

		try {
			const code = await googleAuth();

			await authSvc.googleLogin(code);

			close();
		} catch (err) {
			if (import.meta.env.VITE_APP_ENV === 'dev') console.error(err);

			throw err;
		} finally {
			setGoogleAuthLoading(false);
		}
	}

	// async function connectToGoogle() {
	// 	const w = window.open(
	// 		'https://accounts.google.com/o/oauth2/auth?client_id=997802428506-jc6ko3efdthasukeqflv1t758hqmu7i3.apps.googleusercontent.com&redirect_uri=https://l1-portal-d.vercel.app/discover&response_type=code&scope=email%20profile&access_type=offline&prompt=consent',
	// 		'connect',
	// 		'height=600,width=800'
	// 	);

	// 	if (w === null) {
	// 		console.error('Failed to open the authentication window.');
	// 		return;
	// 	}
	// 	// const bc = new BroadcastChannel('google-login');

	// 	// Adding message listener for incoming messages from the OAuth window

	// 	let code;
	// 	function onMessage(event: MessageEvent) {
	// 		console.log({ event });
	// 		const allowedOrigins = ['http://localhost:5173', 'https://l1-portal-d.vercel.app'];

	// 		// Ignore messages from Chrome extensions (e.g., MetaMask)
	// 		if (event.origin.startsWith('chrome-extension://')) {
	// 			return;
	// 		}

	// 		// Process only messages from allowed origins
	// 		if (allowedOrigins.some((origin) => event.origin.startsWith(origin))) {
	// 			const { data } = event;
	// 			console.log('Received data: ', data);

	// 			if (data && data.code) {
	// 				code = data.code;
	// 				console.log('code received:', code);

	// 				w!.close(); // Close the OAuth window
	// 				window.removeEventListener('message', onMessage); // Remove the event listener
	// 			}
	// 		} else {
	// 			console.log('Blocked message from:', event.origin);
	// 		}
	// 	}

	// 	window.addEventListener('message', onMessage);

	// 	// Post message to notify OAuth window about the start
	// 	// if (w && w.postMessage) {
	// 	// 	w.postMessage(
	// 	// 		{ type: 'start', message: 'Google OAuth started' },
	// 	// 		'https://l1-portal-d.vercel.app'
	// 	// 	);
	// 	// } else {
	// 	// 	console.log('Failed to post message to the OAuth window.');
	// 	// }

	// 	// const timeout = setTimeout(() => {

	// 	// 	reject(new Error('⏰ Login timeout. User likely closed the popup.'));
	// 	// 	try {
	// 	// 		popup.close();
	// 	// 	} catch (e) {
	// 	// 		/* ignore */
	// 	// 	}
	// 	// }, 60_000); // 1 minute

	// 	// Listen for the 'auth_code_received' message on the BroadcastChannel
	// 	// bc.onmessage = (event) => {
	// 	// 	console.log(event);

	// 	// 	if (event.data.type === 'auth_code_received') {
	// 	// 		console.log('BroadcastChannel: Code received:', event.data.code);
	// 	// 	}
	// 	// };
	// }

	return (
		// <!-- modal size manager -->
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
					<h1 className="text-2xl font-bold text-black dark:text-white">Log In</h1>
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

				<div id="moda-body" className="px-8 pb-6 space-y-6">
					<p className="text-base leading-relaxed text-black dark:text-gray-400">
						Welcome to the PWR Processing Units! Login/signup to discover L1s and launch
						your own L1s.
					</p>

					{/* buttons con */}
					<div className="flex flex-col gap-[12px]">
						<div className="">
							{/* <Button
								className={`blue w-full ${loading && 'loading'}`}
								onClick={pwrLogin}
							>
								<span>
									<img
										src="src/assets/pwr.svg"
										className="inline mr-[8px]"
										alt=""
									/>
								</span>
								Log in with PWR Wallet
							</Button> */}
						</div>

						<div className="">
							<Button
								// className={` w-full text-[14px] dark:text-white font-normal leading-[24px] border border-solid border-abrandc-dark-grey dark:border-abrandc-light-grey ${
								// 	loading && 'loading'
								// }`}

								className={`blue w-full space-x-2 flex gap-x-2 items-center justify-center ${
									googleAuthLoading && 'loading'
								}`}
								data-testid="google-login"
								onClick={loginWithGoogle}
							>
								<span>
									<img src="public\media\logos\g-google.svg" alt="" />
								</span>
								<span>Log in with Google</span>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
