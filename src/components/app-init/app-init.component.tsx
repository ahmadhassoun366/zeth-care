// react
import { useContext, useEffect, useState } from 'react';

// services
import geneneralSettingsSvcContext from 'src/shared/services/general-settings/general-settings.context';
import GeneralSettingsService from 'src/shared/services/general-settings/general-settings.service';

// static
import { THEMES } from 'src/static/settings/general-settings.data';
import { motion, cubicBezier } from 'framer-motion';
import { HandHeart } from 'lucide-react';

const EASE = cubicBezier(0.22, 1, 0.36, 1);

function LoadingComponent() {
	const genSettingsSvc = useContext<GeneralSettingsService>(geneneralSettingsSvcContext);
	const theme = genSettingsSvc.getTheme();
	const isDark = theme === THEMES.DARK;

	return (
		<div
			className={`fixed inset-0 z-[9999] grid place-items-center ${
				isDark ? 'bg-neutral-950 text-neutral-50' : 'bg-white text-neutral-900'
			}`}
			role="status"
			aria-live="polite"
			aria-label="Indlæser"
		>
			{/* background blobs */}
			<motion.span
				aria-hidden
				className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full blur-3xl"
				style={{
					background: isDark ? 'rgba(16,185,129,.25)' : 'rgba(110,231,183,.45)',
				}}
				animate={{ y: [-10, 10, -10], scale: [1, 1.05, 1] }}
				transition={{ duration: 8, repeat: Infinity, ease: EASE }}
			/>
			<motion.span
				aria-hidden
				className="pointer-events-none absolute -bottom-28 -right-24 h-[28rem] w-[28rem] rounded-full blur-3xl"
				style={{
					background: isDark ? 'rgba(5,150,105,.25)' : 'rgba(52,211,153,.35)',
				}}
				animate={{ y: [10, -6, 10], scale: [1.02, 1, 1.02], rotate: [-2, 2, -2] }}
				transition={{ duration: 10, repeat: Infinity, ease: EASE }}
			/>

			{/* card */}
			<div
				className={`relative mx-4 w-full max-w-md overflow-hidden rounded-3xl border p-8 text-center shadow-xl backdrop-blur
          ${isDark ? 'border-neutral-800 bg-neutral-900/70' : 'border-neutral-200 bg-white/70'}`}
			>
				{/* brand mark */}
				<motion.div
					className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl text-white shadow-lg"
					style={{
						background:
							'linear-gradient(135deg, rgb(22,163,74) 0%, rgb(16,185,129) 100%)',
						boxShadow: isDark
							? '0 10px 30px rgba(16,185,129,.15)'
							: '0 10px 30px rgba(16,185,129,.25)',
					}}
					animate={{ scale: [1, 1.06, 1], rotate: [0, -2, 0] }}
					transition={{ duration: 1.75, repeat: Infinity, ease: EASE }}
				>
					<HandHeart size={22} strokeWidth={2.6} />
				</motion.div>

				{/* heading + sub */}
				<h1 className="text-xl font-semibold tracking-tight">Indlæser Tryglund</h1>
				<p className={`mt-1 text-sm ${isDark ? 'text-neutral-300' : 'text-neutral-600'}`}>
					Vi forbereder indholdet – et øjeblik…
				</p>

				{/* progress bar */}
				<div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-neutral-200/70 dark:bg-neutral-700/60">
					<motion.div
						className="h-full rounded-full"
						style={{
							background: 'linear-gradient(90deg, rgb(16,185,129), rgb(5,150,105))',
						}}
						initial={{ x: '-100%' }}
						animate={{ x: ['-100%', '0%', '100%'] }}
						transition={{ duration: 1.6, repeat: Infinity, ease: EASE }}
					/>
				</div>

				{/* tiny helper text */}
				<div className={`mt-3 text-xs ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
					Tip: Du kan skifte tema når som helst.
				</div>

				{/* subtle top accent */}
				<div
					className="pointer-events-none absolute inset-x-0 -top-px h-px opacity-60"
					style={{
						background:
							'linear-gradient(90deg, transparent, rgba(16,185,129,.35), transparent)',
					}}
				/>
			</div>

			{/* SR-only fallback text for screen readers */}
			<span className="sr-only">Indlæser…</span>
		</div>
	);
}

type AppInitProps = {
	children: React.ReactNode;
};

export default function AppInit({ children }: AppInitProps) {
	// *~~~ inject services ~~~* //
	const genSettingsSvc = useContext<GeneralSettingsService>(geneneralSettingsSvcContext);

	// *~~~ state ~~~* //
	const [appLoaded, setAppLoaded] = useState<boolean>(false);

	// set up storage api
	useEffect(() => {
		if (import.meta.env.VITE_APP_MAINTENANCE) {
			return;
		}

		(async () => {
			// *~~~ LOAD APP SETTINGS ~~~* //

			await genSettingsSvc.init();

			// *~~~ LOAD AUTH ~~~* //

			// await authSvc.init();

			// *~~~ html head ~~~* //

			setAppLoaded(true);
		})();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// TODO: add loading screen
	if (!appLoaded) return <LoadingComponent />;

	return children;
}
