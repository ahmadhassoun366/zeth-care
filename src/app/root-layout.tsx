// 3rd party
import { Suspense, lazy, useContext, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { Route, BrowserRouter, Routes, useLocation } from 'react-router-dom';

// layouts
import HeaderFooterLayout from '../app/layout/header-footer.layout';

// context, containers, app init
import ContextComponent from '../components/context/context.component';
import AppInit from '../components/app-init/app-init.component';

// pages

// services
import GeneralSettingsService from '../shared/services/general-settings/general-settings.service';
import geneneralSettingsSvcContext from '../shared/services/general-settings/general-settings.context';

// static
import ROUTES from '../static/router.data.ts';

// styles
import 'react-toastify/dist/ReactToastify.css';
import '../global.scss';
import { THEMES } from '../static/settings/general-settings.data';
import NotFoundPage from './pages/404/404-page.tsx';
import About from './pages/about/about.page.tsx';
import FlowchartPage from './pages/flowchart/flowchart.page.tsx';
import PsykiskeVanskelighederPage from './pages/Indsatser/psykiskeVanskeligheder/PsykiskeVanskeligheder.page.tsx';
import ASDAndADHDPage from './pages/Indsatser/autisme_adhd/autisme_adhd.page.tsx';
import SocialChallengesPage from './pages/Indsatser/social/socialChallenges.page.tsx';
import SubstanceAbusePage from './pages/Indsatser/substanceAbuse/SubstanceAbuse.page.tsx';
import TraumaInformedCarePage from './pages/Indsatser/traumaInformedCare/TraumaInformedCare.page.tsx';
import YouthAtRiskPage from './pages/Indsatser/youthatrisk/youthAtRiskSection.page.tsx';
import JobsPage from './pages/jobs/jobs.page.tsx';
import ContactPage from './pages/contactUs/contactUs.page.tsx';
import HomeLanding from './pages/home/home.page.tsx';
import PrivacyPolicyPage from './pages/policies/policies.page.tsx';
import IndsatserIndexPage from './pages/Indsatser/IndsatserIndex.page.tsx';
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
					<Route path={ROUTES.root} element={<HomeLanding />} />
					<Route path={ROUTES.omos} element={<About />} />
					<Route path={ROUTES.flowchart} element={<FlowchartPage />} />
					<Route
						path={ROUTES.indsatser.psykiske}
						element={<PsykiskeVanskelighederPage />}
					/>
					<Route path={ROUTES.indsatser.autisme_adhd} element={<ASDAndADHDPage />} />
					<Route
						path={ROUTES.indsatser.social_udfordringer}
						element={<SocialChallengesPage />}
					/>
					<Route
						path={ROUTES.indsatser.misbrug_dobbeltdiagnoser}
						element={<SubstanceAbusePage />}
					/>
					<Route
						path={ROUTES.indsatser.kognitiv_adfaerdsterapi}
						element={<TraumaInformedCarePage />}
					/>
					<Route
						path={ROUTES.indsatser.kriminalitetstruede_børn_og_unge}
						element={<YouthAtRiskPage />}
					/>
					<Route path={ROUTES.jobs} element={<JobsPage />} />
					<Route path={ROUTES.kontakt} element={<ContactPage />} />
					<Route path={ROUTES.policies} element={<PrivacyPolicyPage />} />
						<Route path={ROUTES.indsatser.root} element={<IndsatserIndexPage />} />
					{/* discover page */}
					{/* 404 */}
					<Route path="*" element={<NotFoundPage />} />
				</Route>

				{/* <Route element={<EmptyLayout />}></Route> */}
			</Routes>
		</>
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
