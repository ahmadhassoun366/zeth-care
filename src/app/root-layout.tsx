// 3rd party
import { Suspense, lazy, useContext, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { Route, BrowserRouter, Routes, Navigate, Outlet, useLocation } from 'react-router-dom';

// layouts
import HeaderFooterLayout from '../app/layout/header-footer.layout';
// import EmptyLayout from 'src/layout/empty.layout.tsx';

// context, containers, app init
import ContextComponent from '../components/context/context.component';
import ModalContainer from '../components/modals/modal-container.component';
import AppInit from '../components/app-init/app-init.component';

// pages
import DiscoverPage from './pages/discover/discover.page.tsx';
import DashboardPage from './pages/dashboard/dashboard.page';

// import RootPage from './pages/root-page.tsx';
// import DesignerPage from './pages/designer-page.tsx';

// modals
// import LoginModal from 'src/components/modals/login/login.modal';
// import ExampleModal from 'src/components/modals/example.modal.tsx';

// services
import ModalSvcContext from '../shared/services/modal/modal.context';
import ModalService from '../shared/services/modal/modal.service';
import GeneralSettingsService from '../shared/services/general-settings/general-settings.service';
import geneneralSettingsSvcContext from '../shared/services/general-settings/general-settings.context';
// import AuthService from 'src/shared/services/auth/auth.service';
// import AuthSvcContext from 'src/shared/services/auth/auth.context';

// static
import ROUTES from '../static/router.data.ts';
// import APP_MODALS from 'src/static/enums/app.modals';
// import { THEMES } from 'src/static/settings/general-settings.data';
import { ModalData } from '../shared/models/modals/modals.model';

// styles
import 'react-toastify/dist/ReactToastify.css';
import '../global.scss';
import APP_MODALS from '../static/enums/app.modals';
import { THEMES } from '../static/settings/general-settings.data';
import NotFoundPage from './pages/404/404-page.tsx';
// *~~~ lazy loaded pages ~~~*

// pages

const TestPage = lazy(() => import('../app/pages/test/test.tsx'));
// const UiKitPage = lazy(() => import('./dev/ui-kit/ui-kit'));

function ScrollToTop() {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
}

function RoutingComponent() {
	function AuthRequiredLayout() {
		// const authSvc = useContext<AuthService>(AuthSvcContext);

		// We are checking if the user is authenticated
		const isAuthenticated = true; // authSvc.isLoggedIn();

		// here we are redirecting unauthenticated users to the login page so that they can login
		if (!isAuthenticated) {
			return <Navigate to={ROUTES.protectionPage} />;
		}

		// We will then allow the admins to access the dashboard
		return <Outlet />;
	}

	// function AdminRequiredLayout() {
	// 	const userSvc = useContext<UserService>(UserSvcContext);

	// 	if (!userSvc.isAdmin()) {
	// 		return <Navigate to={ROUTES.root} />;
	// 	}

	// 	return <Outlet />;
	// }

	return (
		<>
			<Routes>
				{/* header footer layout */}
				<Route element={<HeaderFooterLayout />}>
					{/* dev only routes */}
					{import.meta.env.VITE_APP_ENV === 'dev' && (
						<>
							<Route path="/test" element={<TestPage />} />
							{/* <Route path={'/ui'} element={<UiKitPage />} /> */}
						</>
					)}

					{/* root page  */}
					<Route path={ROUTES.root} element={<Navigate to={ROUTES.discover.root} />} />

					<Route path={ROUTES.dashboard.root} element={<DashboardPage />} />
					{/* <Route
						path={ROUTES.protectionPage}
						element={
							<ProtectionPage
								modalId={APP_MODALS.LOGIN_MODAL_DISCOVER_BUTTON}
								data={null}
							/>
						}
					/> */}

					{/* <Route path={ROUTES.dashboard.root} element={<Dashboard />} />
					<Route path={ROUTES?.l1?.root} element={<L1Single />} /> */}

					{/* 404 */}
					<Route path="*" element={<NotFoundPage />} />

					{/* *~~~ proteted routes ~~~* */}
					<Route element={<AuthRequiredLayout />}>
						<Route path={ROUTES.discover.root} element={<DiscoverPage />} />
					</Route>
				</Route>

				{/* <Route element={<EmptyLayout />}></Route> */}
			</Routes>
		</>
	);
}

function AppModals() {
	const modals: {
		[key: string]: any;
	} = {
		// [APP_MODALS.LOGIN_MODAL]: LoginModal,
		[APP_MODALS.CHART_MODAL]: lazy(() => import('../components/modals/charts/chart.modal')),
		[APP_MODALS.LOGIN_MODAL]: lazy(() => import('../components/modals/login/login.modal')),
		[APP_MODALS.DEPLOYMENT_IN_PROGRESS_MODAL]: lazy(
			() => import('../components/modals/launch/deployment-progress.modal')
		),

		[APP_MODALS.DEPLOYMENT_SUCCESS_MODAL]: lazy(
			() => import('../components/modals/launch/deployment-success.modal')
		),
	};

	const modalSvc = useContext<ModalService>(ModalSvcContext);

	return (
		<ModalContainer>
			<Suspense fallback={<div></div>}>
				{modalSvc.getOpenModals().map((modal: ModalData, idx: number) => {
					const ModalComp = modals[modal.id];

					return <ModalComp modalId={modal.id} data={modal.data} key={idx} />;
				})}
			</Suspense>
		</ModalContainer>
	);
}

export default function RootLayout() {
	const settingsSvc = useContext<GeneralSettingsService>(geneneralSettingsSvcContext);

	return (
		<ContextComponent>
			<AppInit>
				<BrowserRouter>
					<Suspense fallback={<div></div>}>
						<RoutingComponent />
					</Suspense>

					<ScrollToTop />

					<AppModals />

					<ToastContainer
						position="bottom-left"
						theme={settingsSvc.getTheme() === THEMES.DARK ? 'dark' : 'light'}
						hideProgressBar
						autoClose={5000}
						className="py-1 my-0 "
						toastClassName=" min-h-[40px] "
					/>
				</BrowserRouter>
			</AppInit>
		</ContextComponent>
	);
}
