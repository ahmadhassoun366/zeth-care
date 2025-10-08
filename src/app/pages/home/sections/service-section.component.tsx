import { useState, useCallback, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, cubicBezier, type Variants } from 'framer-motion';
import { Users, LifeBuoy, Activity, GraduationCap, ArrowRight, X } from 'lucide-react';
import ROUTES from 'src/static/router.data';

type ServiceKey = 'enkeltmands' | 'akut' | 'ukn' | 'unge' | 'misbrug';

type Service = {
	key: ServiceKey;
	icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
	label: string;
	to?: string;
};

const services: Service[] = [
	{
		key: 'enkeltmands',
		icon: Users,
		label: 'Enkeltmandsprojekter',
		to: '/indsatser#enkeltmands',
	},
	{ key: 'akut', icon: LifeBuoy, label: 'Akut anbringelse', to: '/indsatser#akut' },
	{ key: 'ukn', icon: Activity, label: 'Forbedringsforløb / UKN', to: '/indsatser#ukn' },
	{ key: 'unge', icon: GraduationCap, label: 'Unge støtte', to: '/indsatser#unge' },
	{ key: 'misbrug', icon: Activity, label: 'Misbrugsbehandling', to: '/indsatser#misbrug' },
];

// Danish copy for the details sheet
const DETAILS: Record<ServiceKey, { title: string; body: JSX.Element }> = {
	akut: {
		title: 'Akut anbringelse',
		body: (
			<>
				<p className="mb-3">
					Hos Trygbasen tilbyder vi trygge og professionelle rammer for børn og unge i
					krise. Vi er omstillingsparate, handler hurtigt og tilpasser os den enkelte
					unges behov – både fagligt og menneskeligt.
				</p>
				<p className="mb-3">
					Vores engagerede personale har stor erfaring med akutte anbringelser og arbejder
					tværfagligt for at skabe stabilitet, ro og struktur fra dag ét. Vi lægger vægt
					på nærvær, relationsarbejde og en helhedsorienteret indsats, hvor den unge altid
					er i centrum.
				</p>
			</>
		),
	},
	ukn: {
		title: 'Forbedringsforløb',
		body: (
			<>
				<p className="mb-3">
					I vores forbedringsprogram arbejder vi med forbedringer for at sikre den bedst
					mulige indsats for de unge. Processen starter med observation og evaluering – vi
					indsamler løbende data, tilbagemeldinger fra unge, personale og
					samarbejdspartnere.
				</p>
				<p className="mb-3">
					På baggrund af dette identificerer vi udviklingsområder og laver en konkret
					handleplan. Vi inddrager hele personalegruppen i forbedringsarbejdet og sikrer
					fælles tilgang. Forandringer implementeres gradvist, og vi følger op med løbende
					evaluering og justering for at sikre, at tiltagene virker i praksis.
				</p>
			</>
		),
	},
	unge: {
		title: 'Ungestøtte',
		body: (
			<>
				<p className="mb-3">
					Unge i sårbare livssituationer har brug for støtte for at kunne mestre
					hverdagen, skabe stabile relationer og udvikle sunde strategier til at håndtere
					livets udfordringer. Ungestøtte giver dem tryghed, struktur og en tillidsfuld
					voksenkontakt – alt sammen afgørende faktorer for trivsel og positiv udvikling.
				</p>
				<p className="mb-3">
					Støtten hjælper med at forebygge frafald fra skole, kriminalitet, misbrug og
					social isolation. Den skaber mulighed for, at den unge kan opbygge selvværd,
					tage ansvar og få troen på egne evner og fremtid tilbage.
				</p>
				<p className="mb-1">
					Kort sagt: Ungestøtte er en investering i både individets og samfundets fremtid.
				</p>
			</>
		),
	},
	// Short placeholders (you can replace later)
	enkeltmands: {
		title: 'Enkeltmandsprojekter',
		body: (
			<p className="mb-3">
				Skræddersyede, høj-intensitetsforløb med tæt relation og struktur – til unge med
				behov for maksimal støtte, forudsigelighed og specialiserede rammer.
			</p>
		),
	},
	misbrug: {
		title: 'Misbrugsbehandling',
		body: (
			<p className="mb-3">
				Integrerede indsatser der kombinerer misbrugsbehandling, psykosocial støtte og
				relations- arbejde – med fokus på motivation, trivsel og varig forandring.
			</p>
		),
	},
};

// Motion + layout
const easeOutSoft = cubicBezier(0.22, 1, 0.36, 1);

const container: Variants = {
	hidden: {},
	show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const card: Variants = {
	hidden: { opacity: 0, y: 16 },
	show: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.6, ease: easeOutSoft },
	},
};

export default function Services() {
	const [openKey, setOpenKey] = useState<ServiceKey | null>(null);
	const close = useCallback(() => setOpenKey(null), []);
	const initialFocusRef = useRef<HTMLButtonElement | null>(null);

	// ESC to close
	useEffect(() => {
		if (!openKey) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') close();
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [openKey, close]);

	return (
		<section id="services" className="bg-neutral-50 dark:bg-neutral-900/30 py-16 lg:py-24">
			<div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
				{/* Heading */}
				<div className="mb-12 max-w-3xl">
					<span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 dark:bg-green-900/20 dark:text-green-300">
						Vores indsatser{' '}
						<span className="h-1 w-1 rounded-full bg-green-700 dark:bg-green-400" />
					</span>
					<h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 dark:text-white md:text-4xl">
						Specialiserede løsninger for børn, unge og familier
					</h2>
					<p className="mt-3 text-lg text-neutral-600 dark:text-neutral-300">
						Vi dækker hele landet og leverer målrettede indsatser til børn og unge under
						18 år samt deres familier – i tæt samarbejde med botilbud og institutioner.
					</p>
				</div>

				{/* Cards */}
				<motion.div
					className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
					variants={container}
					initial="hidden"
					whileInView="show"
					viewport={{ once: false, amount: 0.3 }}
				>
					{services.map(({ icon: Icon, label, key }) => (
						<motion.div
							key={label}
							variants={card}
							whileHover={{ y: -4 }}
							transition={{ duration: 0.25 }}
						>
							<div className="group relative flex h-full flex-col justify-between rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition dark:border-neutral-800 dark:bg-neutral-900">
								{/* top accent */}
								<span className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-green-500 via-emerald-500 to-green-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
								{/* icon chip */}
								<div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-700 ring-1 ring-green-600/20 dark:bg-green-900/20 dark:text-green-400">
									<Icon className='w-5' />
								</div>
								{/* text */}
								<div>
									<h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
										{label}
									</h3>
									<p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
										Kort overblik og nøglefordele.
									</p>
								</div>
								{/* actions */}
								<div className="mt-5 flex items-center justify-between">
									<button
										onClick={() => setOpenKey(key)}
										className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 bg-white px-3 py-1.5 text-sm font-medium text-neutral-900 shadow-sm transition hover:bg-neutral-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700"
										ref={key === openKey ? initialFocusRef : undefined}
									>
										Læs mere
										<ArrowRight size={16} className="translate-x-px" />
									</button>
									<Link
										to="/indsatser"
										className="text-sm font-medium text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
									>
										Se alle
									</Link>
								</div>

								{/* hover glow */}
								<div
									className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
									style={{
										background:
											'radial-gradient(60% 60% at 50% 0%, rgba(16,185,129,0.12), transparent)',
									}}
								/>
							</div>
						</motion.div>
					))}
				</motion.div>

				{/* CTA under grid */}
				<div className="mt-10">
					<Link
						to="/indsatser"
						className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-3 text-neutral-900 shadow-sm transition hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700"
					>
						Se alle indsatser <ArrowRight size={16} />
					</Link>
				</div>
			</div>

			{/* === Responsive Sheet / Modal === */}
			<AnimatePresence>
				{openKey && (
					<>
						{/* Backdrop */}
						<motion.button
							aria-label="Luk dialog"
							className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={close}
						/>
						{/* Panel: bottom sheet on mobile, centered modal on md+ */}
						<motion.div
							role="dialog"
							aria-modal="true"
							className="fixed z-50 inset-x-0 bottom-0 md:inset-0 md:flex md:items-center md:justify-center"
							initial={{ y: '100%', opacity: 1 }}
							animate={{ y: 0 }}
							exit={{ y: '100%' }}
							transition={{ type: 'spring', stiffness: 260, damping: 30 }}
						>
							<motion.div
								className="mx-auto w-full md:w-[680px] lg:w-[760px] md:max-h-[80vh] overflow-hidden
                           rounded-t-3xl md:rounded-2xl border border-neutral-200/70 dark:border-neutral-800
                           bg-white dark:bg-neutral-900 shadow-2xl"
								initial={{ opacity: 0, scale: 0.98 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.98 }}
								transition={{ duration: 0.18, ease: easeOutSoft }}
							>
								{/* Drag handle (mobile hint) */}
								<div className="md:hidden mx-auto mt-2 mb-1 h-1.5 w-10 rounded-full bg-neutral-300/80 dark:bg-neutral-700/80" />
								{/* Header */}
								<div className="flex items-center justify-between px-5 py-4 md:px-6 md:py-5 border-b border-neutral-200/70 dark:border-neutral-800">
									<div className="flex items-center gap-3">
										{/* Icon */}
										{(() => {
											const svc = services.find((s) => s.key === openKey)!;
											const Icon = svc.icon;
											return (
												<span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-700 ring-1 ring-green-600/20 dark:bg-green-900/20 dark:text-green-400">
													<Icon width={20} height={20} />
												</span>
											);
										})()}
										<h3 className="text-lg md:text-xl font-semibold text-neutral-900 dark:text-white">
											{DETAILS[openKey].title}
										</h3>
									</div>
									<button
										onClick={close}
										className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
										aria-label="Luk"
									>
										<X size={18} />
									</button>
								</div>

								{/* Content */}
								<div className="px-5 md:px-6 py-4 md:py-6 text-[15px] leading-relaxed text-neutral-700 dark:text-neutral-300">
									{DETAILS[openKey].body}

									<div className="mt-5 flex flex-wrap items-center gap-3">
										<Link
											to={ROUTES.kontakt}
											className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2 text-white font-medium shadow-sm hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
										>
											Kontakt os <ArrowRight size={16} />
										</Link>
										<Link
											to="/indsatser"
											className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-5 py-2 text-neutral-900 shadow-sm hover:bg-neutral-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700"
										>
											Se alle indsatser
										</Link>
									</div>
								</div>
							</motion.div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</section>
	);
}
