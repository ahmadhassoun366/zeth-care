import { Link, useLocation } from 'react-router-dom';
import { useContext, useState } from 'react';

import { offset, useClick, useDismiss, useFloating, useInteractions } from '@floating-ui/react';

// components
import Button from 'src/components/internal/button/button.component';
import PwrImagotipo from 'src/components/logos/pwr-imagotipo/pwr-imagotipo.logo';

// services
import GeneralSettingsService from 'src/shared/services/general-settings/general-settings.service';
import geneneralSettingsSvcContext from 'src/shared/services/general-settings/general-settings.context';
import UserService from 'src/shared/services/user/user.service';
import UserSvcContext from 'src/shared/services/user/user.context';
import ModalService from 'src/shared/services/modal/modal.service';
import ModalSvcContext from 'src/shared/services/modal/modal.context';
import AuthSvcContext from 'src/shared/services/auth/auth.context';
import AuthService from 'src/shared/services/auth/auth.service';

import { useDefaultUserImg } from 'src/shared/utils/functions';

import ROUTES from 'src/static/router.data';
import APP_MODALS from 'src/static/enums/app.modals';
import ProfileDropdown from './profile-dropdown';

const navBttns = [
	{ label: 'Discover', href: '/discover' },
	{ label: 'Dashboard', href: '/dashboard' },
];

export default function HeaderComponent() {
	// *~~~ inject dependencies ~~~* //

	const authSvc = useContext<AuthService>(AuthSvcContext);
	const userSvc = useContext<UserService>(UserSvcContext);
	const modalSvc = useContext<ModalService>(ModalSvcContext);

	// const navigate = useNavigate();
	const { pathname } = useLocation();

	const [mobileNavOpen, setMobileNavOpen] = useState(false);

	const toggleMobileNav = () => {
		setMobileNavOpen(!mobileNavOpen);
		const html = document.querySelector('html');

		if (mobileNavOpen) {
			html?.classList.remove('overflow-hidden');
		} else {
			html?.classList.add('overflow-hidden');
		}
	};

	// #region dropdown
	const [profileIsOpen, setProfileIsOpen] = useState(false);

	const { refs, floatingStyles, context } = useFloating({
		open: profileIsOpen,
		onOpenChange: setProfileIsOpen,
		placement: 'bottom',
		middleware: [offset(10)],
	});

	const dismiss = useDismiss(context);
	const click = useClick(context);

	const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);

	// #endregion

	// *~~~ Theme ~~~* //
	const settingsSvc = useContext<GeneralSettingsService>(geneneralSettingsSvcContext);

	function toggleTheme() {
		settingsSvc.toggleTheme();
	}

	function openLoginModal() {
		modalSvc.open(APP_MODALS.LOGIN_MODAL, null);
		// modalSvc.open(APP_MODALS.LOGIN_MODAL_DISCOVER_BUTTON, null);
	}

	function logout() {
		authSvc.logout();
	}

	function closeCallback() {
		setProfileIsOpen(false);
	}

	return (
		<nav className="fixed  bg-opacity-5 top-0 left-0 w-full z-header transparent py-5 ">
			<div className="container-3 mx-auto !py-0">
				<div className="bg-white dark:bg-dark-800 shadow-lg rounded-[30px] px-[50px] h-header">
					{/* desktop */}
					<div className="flex justify-between items-center  w-full h-full ">
						{/* brand */}
						<Link to={ROUTES.root} className="brand">
							<PwrImagotipo />
						</Link>

						{/* navbar links */}
						<div className="hidden md:flex items-center gap-x-6 ">
							{/* link con */}
							<ul className="flex items-center gap-x-6">
								{/* {userSvc.isAdmin() && (
								<li>
									<Link
										to={ROUTES.dashboard.root}
										className={`navbar-link ${
											pathname.includes('dashboard') ? 'active' : ''
										}`}
									>
										Dashboard
									</Link>
								</li>
							)} */}
								{navBttns.map((nav, idx) => (
									<li key={idx}>
										<Link
											to={nav.href}
											className={`navbar-link ${pathname.includes(nav.href) ? 'active' : ''
												}`}
										>
											{nav.label}
										</Link>
									</li>
								))}
							</ul>
						</div>

						{/* user */}
						<div className="hidden md:flex items-center gap-x-6 ">
							{authSvc.isLoggedIn() ? (
								<>
									<button
										id="profile-dropdown-button"
										className="w-[80px] p-2 bg-gray-100 dark:bg-gray-900 rounded-xl justify-start items-center gap-x-2 flex"
										{...getReferenceProps()}
										ref={refs.setReference}
									>
										<img
											alt="Profile"
											className="w-11 h-11 rounded-full transition-transform duration-300 hover:scale-110 hover:shadow-lg"
											onError={useDefaultUserImg}
											src={userSvc.getUserData().pfp}
										/>

										<div className="dark:text-white text-gray-900">
											<i
												className="fa-regular fa-angle-down transition-transform duration-200"
												style={{
													transform: profileIsOpen
														? 'rotate(180deg)'
														: '',
												}}
											/>
										</div>
									</button>

									{profileIsOpen && (
										<div
											className="aabsolute aright-1.5 atop-16 z-header_profile"
											ref={refs.setFloating}
											style={floatingStyles}
											{...getFloatingProps()}
										>
											<ProfileDropdown closeCallback={closeCallback} />
										</div>
									)}
									{/* <Link to={'/'}>
										<img
											alt="Profile"
											className="w-11 h-11 rounded-full transition-transform duration-300 hover:scale-110 hover:shadow-lg"
											onError={useDefaultUserImg}
											src={userSvc.getUserData().pfp}
										/>
									</Link> */}
									<Link to={ROUTES.networks.create}>
										<Button className="blue small hover:scale-105 transition duration-300 ease-in-out">
											Lauch L1
										</Button>
									</Link>
								</>
							) : (
								<Button
									className="blue small hover:scale-105 transition duration-300 ease-in-out"
									onClick={openLoginModal}
									data-testid="login-btn"
								>
									Login/Singup
								</Button>
							)}

							<button
								className="theme_btn text-agrey-500 dark:text-white"
								onClick={toggleTheme}
							>
								<div className="dark:text-white">
									<i
										className={`fa-if fas fa-${settingsSvc.getTheme() === 'light'
												? 'moon '
												: 'sun-bright'
											}`}
									></i>
								</div>
							</button>
						</div>

						<div className="burger-button md:hidden flex">
							{authSvc.isLoggedIn() && (
								<Link to={'/'}>
									<img
										src={userSvc.getUserData().pfp}
										alt=""
										className="w-8 h-8 rounded-full mr-4"
									/>
								</Link>
							)}

							{/* This is a simple burger icon. You can replace this with any SVG or icon library you prefer. */}
							<button
								data-collapse-toggle="navbar-sticky"
								type="button"
								className={`burger ${mobileNavOpen ? 'active' : ''}`}
								aria-controls="navbar-sticky"
								aria-expanded="true"
								onClick={toggleMobileNav}
							>
								<div className="h-line h-line1 dark:bg-white"></div>
								<div className="h-line h-line2 dark:bg-white"></div>
								<div className="h-line h-line3 dark:bg-white"></div>
							</button>
						</div>
					</div>

					{/* mobile */}
					<div className="flex justify-center">
						{/* <SideProfile isOpen={isProfileOpen} closeProfile={toggleProfile} /> */}

						{/* Mobile navigation menu */}
						{mobileNavOpen && (
							<div className="transition-opacity duration-300 ease-in opacity-100 shadow-bottom absolute top-13 mt-[-23px]    w-[92%] rounded-bl-2xl rounded-br-2xl shadow-bl-2xl dark:bg-abrandc-dark-blackish bg-white  p-4 flex flex-col items-center space-y-6">
								{/* links */}
								<div className="space-y-9 mt-5 ">
									<div className="">
										<Link
											to={'/'}
											className="text-center  font-medium text-agrey-900 dark:text-white flex items-center gap-x-2 "
										>
											<div>Projects</div>
										</Link>
									</div>

									<div className="">
										<Link
											to="/"
											className=" justify-center font-medium text-agrey-900 dark:text-white flex items-center gap-x-2 "
										>
											<div>FAQs</div>
										</Link>
									</div>
								</div>

								{/* buttons */}
								<div className="flex justify-between gap-4 mb-3">
									{/* <Button className="secondary medium w-2/4">Connect</Button> */}

									{authSvc.isLoggedIn() ? (
										<>
											<button className="navbar-link" onClick={logout}>
												Log Out
											</button>
										</>
									) : (
										<Button
											className="blue medium w-[117px]"
											onClick={openLoginModal}
										>
											Login
										</Button>
									)}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
}
