// src/pages/PrivacyPolicyModern.tsx
import { Helmet } from 'react-helmet';
import { useMemo } from 'react';
import { motion } from 'framer-motion';

// ────────────────────────────────────────────────────────────────────────────────
// Motion helpers
// ────────────────────────────────────────────────────────────────────────────────
const fadeUp = {
	hidden: { opacity: 0, y: 14 },
	show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 16 } },
} as const;

const stagger = {
	hidden: { opacity: 0 },
	show: { opacity: 1, transition: { staggerChildren: 0.08 } },
} as const;

const COMPANY = {
	name: 'Trygbasen ApS',
	cvr: '45934373',
	address: 'Låsbyvej 61, 8660 Skanderborg',
	email: 'jobs@trygbasen.dk',
	phone: '+45 60 22 33 47',
	lastUpdated: '18. august 2025',
	canonical: 'https://trygbasen.dk/privatlivspolitik',
};

const SECTIONS = [
	{ id: 'controller', title: 'Dataansvarlig' },
	{ id: 'purposes', title: 'Formål & behandlingsgrundlag' },
	{ id: 'data', title: 'Hvilke oplysninger' },
	{ id: 'processors', title: 'Modtagere & databehandlere' },
	{ id: 'retention', title: 'Opbevaring' },
	{ id: 'security', title: 'Sikkerhed' },
	{ id: 'cookies', title: 'Cookies' },
	{ id: 'rights', title: 'Dine rettigheder' },
	{ id: 'complaints', title: 'Klage' },
	{ id: 'updates', title: 'Opdateringer' },
];

export default function PrivacyPolicyModern() {
	const toc = useMemo(() => SECTIONS, []);

	return (
		<main className="bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
			<Helmet>
				<title>Privatlivspolitik – Trygbasen</title>
				<meta
					name="description"
					content="Læs hvordan Trygbasen ApS behandler personoplysninger: formål, retsgrundlag, opbevaring, rettigheder og kontakt."
				/>
				<link rel="canonical" href={COMPANY.canonical} />
				{/* OG for nice sharing previews */}
				<meta property="og:title" content="Privatlivspolitik – Trygbasen" />
				<meta
					property="og:description"
					content="Information om vores behandling af personoplysninger."
				/>
				<meta property="og:type" content="website" />
			</Helmet>

			<section className="relative overflow-hidden py-24 pt-44 px-6 bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-900/10 dark:to-neutral-950">
				{/* soft background accents */}
				<motion.div
					aria-hidden
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.8 }}
					className="pointer-events-none absolute inset-0"
				>
					<motion.div
						className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-emerald-400/20 blur-3xl"
						animate={{ x: [0, 20, -10, 0], y: [0, -8, 6, 0] }}
						transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
					/>
					<motion.div
						className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-emerald-300/20 blur-3xl"
						animate={{ x: [0, -15, 10, 0], y: [0, 10, -6, 0] }}
						transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
					/>
				</motion.div>

				<div className="max-w-6xl mx-auto text-center relative">
					<motion.div
						variants={stagger}
						initial="hidden"
						whileInView="show"
						viewport={{ once: true, amount: 0.6 }}
					>
						<motion.h1
							variants={fadeUp}
							className="text-4xl md:text-5xl font-bold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-700 to-emerald-500 dark:from-emerald-300 dark:to-emerald-400"
						>
							Privatlivspolitik
						</motion.h1>
						<motion.p
							variants={fadeUp}
							className="text-lg text-neutral-700 dark:text-neutral-300 max-w-3xl mx-auto"
						>
							Transparens om, hvordan vi indsamler, anvender og beskytter dine
							oplysninger.
						</motion.p>
						<motion.div
							variants={fadeUp}
							className="mx-auto mt-6 h-px w-28 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-80"
						/>
					</motion.div>
				</div>
			</section>

			{/* Content + TOC */}
			<section className="mx-auto max-w-7xl px-6 py-8 lg:py-12">
				<div className="grid gap-10 lg:grid-cols-[280px,1fr]">
					{/* TOC */}
					<aside className="lg:sticky lg:top-6 h-fit">
						<nav
							aria-label="Indholdsfortegnelse"
							className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
						>
							<div className="mb-2 text-sm font-medium">Indhold</div>
							<ul className="space-y-1">
								{toc.map((s) => (
									<li key={s.id}>
										<a
											href={`#${s.id}`}
											className="block rounded-md px-2 py-1.5 text-sm text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
										>
											{s.title}
										</a>
									</li>
								))}
							</ul>
						</nav>

						{/* Meta box */}
						<div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900 dark:border-emerald-900/40 dark:bg-emerald-900/20 dark:text-emerald-200">
							<div className="font-semibold">Senest opdateret</div>
							<div>{COMPANY.lastUpdated}</div>
						</div>
					</aside>

					{/* Body */}
					<div className="space-y-6">
						<Card id="controller" title="Dataansvarlig">
							<p>
								{COMPANY.name} (CVR {COMPANY.cvr}), {COMPANY.address}. Telefon{' '}
								{COMPANY.phone}. Kontakt:{' '}
								<a
									className="text-emerald-600 underline"
									href={`mailto:${COMPANY.email}`}
								>
									{COMPANY.email}
								</a>
								.
							</p>
						</Card>

						<Card id="purposes" title="Formål & behandlingsgrundlag">
							<ul className="ml-5 list-disc space-y-1">
								<li>
									Besvare henvendelser via kontaktformular/e-mail – art. 6(1)(f)
									legitim interesse og/eller art. 6(1)(b).
								</li>
								<li>
									Overholde retlige forpligtelser (fx bogføring) – art. 6(1)(c).
								</li>
								<li>
									Marketing/nyhedsbrev (hvis relevant) – art. 6(1)(a) samtykke.
								</li>
							</ul>
						</Card>

						<Card id="data" title="Hvilke oplysninger">
							<p>
								Navn, e-mail og indhold af din henvendelse. Undlad venligst at sende
								følsomme oplysninger.
							</p>
						</Card>

						<Card id="processors" title="Modtagere & databehandlere">
							<ul className="ml-5 list-disc space-y-1">
								<li>EmailJS – afsendelse af kontaktformularen til vores e-mail.</li>
								<li>Vercel Inc. – hosting og tekniske logs (IP-adresser).</li>
								<li>Simply.com – e-mailtjeneste.</li>
							</ul>
							<p className="mt-3">
								Databehandleraftaler er indgået. Ved overførsel uden for EU/EEA
								anvendes EU’s standardkontraktbestemmelser (SCC).
							</p>
						</Card>

						<Card id="retention" title="Opbevaring">
							<p>
								Henvendelser i mailboks opbevares i op til 12 måneder efter sagens
								afslutning. Regnskabsdata opbevares i 5 år.
							</p>
						</Card>

						<Card id="security" title="Sikkerhed">
							<p>
								Vi anvender TLS-kryptering, adgangsstyring og mindst-mulig-adgang
								(“need-to-know”).
							</p>
						</Card>

						<Card id="cookies" title="Cookies">
							<p>
								Vi anvender kun nødvendige cookies til drift. Analyse- eller
								marketingcookies anvendes ikke uden dit samtykke.
							</p>
						</Card>

						<Card id="rights" title="Dine rettigheder">
							<p>
								Du kan anmode om: indsigt, berigtigelse, sletning, begrænsning,
								dataportabilitet og gøre indsigelse.
							</p>
							<p className="mt-2">
								Vi besvarer normalt inden 30 dage. Kontakt:{' '}
								<a
									className="text-emerald-600 underline"
									href={`mailto:${COMPANY.email}`}
								>
									{COMPANY.email}
								</a>
								.
							</p>
						</Card>

						<Card id="complaints" title="Klage">
							<p>
								Du kan klage til Datatilsynet:{' '}
								<a
									className="text-emerald-600 underline"
									href="https://www.datatilsynet.dk/"
									target="_blank"
									rel="noreferrer"
								>
									datatilsynet.dk
								</a>
								.
							</p>
						</Card>

						<Card id="updates" title="Opdateringer">
							<p>
								Vi opdaterer denne politik ved behov. Senest opdateret:{' '}
								{COMPANY.lastUpdated}.
							</p>
						</Card>

						{/* footer meta */}
						<div className="mt-10 grid gap-3 rounded-2xl border border-neutral-200 bg-white p-5 text-sm shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
							<Row
								label="Virksomhed"
								value={`${COMPANY.name} · CVR ${COMPANY.cvr}`}
							/>
							<Row label="Adresse" value={COMPANY.address} />
							<Row label="Kontakt" value={`${COMPANY.phone} · ${COMPANY.email}`} />
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}

/* ---------- helpers ---------- */

function Card({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
	return (
		<section
			id={id}
			className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
		>
			<h2 className="text-lg font-semibold tracking-tight">{title}</h2>
			<div className="mt-3 text-[15px] leading-7 text-neutral-700 dark:text-neutral-300">
				{children}
			</div>
		</section>
	);
}

function Row({ label, value }: { label: string; value: string }) {
	return (
		<div className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:gap-3">
			<span className="w-40 shrink-0 text-neutral-500 dark:text-neutral-400">{label}</span>
			<span className="font-medium text-neutral-900 dark:text-neutral-100">{value}</span>
		</div>
	);
}
