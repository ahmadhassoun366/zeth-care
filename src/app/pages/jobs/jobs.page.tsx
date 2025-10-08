import { Helmet } from 'react-helmet';
import {
	Briefcase,
	Mail,
	MapPin,
	CalendarClock,
	Clock4,
	Building2,
	ChevronRight,
	ArrowLeft,
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ROUTES from 'src/static/router.data';
import { motion } from 'framer-motion';

// ────────────────────────────────────────────────────────────────────────────────
// Data – easy to extend with more jobs later
// ────────────────────────────────────────────────────────────────────────────────
const jobs = [
	{
		id: 'ergoterapeut-oestjylland-barsel',
		title: 'Barselsvikariat: Ergoterapeut',
		location: 'Østjylland',
		department: 'Trygbasen – Afdeling Østjylland',
		type: 'Fuld tid',
		duration: 'Ca. 12 måneder (mulighed for forlængelse)',
		start: 'Snarest muligt',
		email: 'jobs@trygbasen.dk',
		heroTag: 'Ny stilling',
		intro: 'Brænder du for at gøre en forskel i menneskers hverdag, og har du lyst til at blive en del af et dedikeret og fagligt stærkt team? Så er det måske dig, vi søger som barselsvikar til en af vores afdelinger i Østjylland.',
		about: 'Vi søger en ergoterapeut til et barselsvikariat. Du bliver en del af et tværfagligt team, hvor samarbejde, faglig sparring og borgerinddragelse er i fokus.',
		responsibilities: [
			'Udarbejde sansemotoriske og funktionelle vurderinger',
			'Støtte borgere i udvikling af daglige færdigheder og selvstændighed',
			'Indgå i tværfagligt samarbejde med pædagoger, psykologer og socialrådgivere',
			'Udarbejde mål og indsatsplaner i tæt samarbejde med borger og kolleger',
		],
		requirements: [
			'Uddannet ergoterapeut – gerne erfaring fra psykiatri, social- eller specialområdet',
			'Arbejder struktureret, relationskompetent og nysgerrigt',
			'Kan arbejde både selvstændigt og i team',
			'Kørekort er en fordel (ikke et krav)',
		],
		benefits: [
			'Høj faglighed, fokus på trivsel og mulighed for udvikling',
			'Tæt kollegial sparring og supervision',
			'Indflydelse på egne opgaver og mulighed for at præge udviklingen',
		],
	},
];

// ────────────────────────────────────────────────────────────────────────────────
// Small UI helpers
// ────────────────────────────────────────────────────────────────────────────────
function Pill({ children }: { children: React.ReactNode }) {
	return (
		<span className="inline-flex items-center rounded-full border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50 dark:bg-emerald-900/10 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
			{children}
		</span>
	);
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
	return (
		<section className="space-y-4">
			<h3 className="text-lg font-semibold">{title}</h3>
			<div className="space-y-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
				{children}
			</div>
		</section>
	);
}

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

// ────────────────────────────────────────────────────────────────────────────────
// Job Card (left column list)
// ────────────────────────────────────────────────────────────────────────────────
function JobCard({ job, isActive, onOpen }: { job: any; isActive: boolean; onOpen: () => void }) {
	return (
		<button
			type="button"
			onClick={onOpen}
			className={`text-left w-full rounded-2xl border p-5 md:p-6 transition hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400/50 bg-white/70 dark:bg-neutral-900/60 backdrop-blur border-neutral-200 dark:border-neutral-800 ${
				isActive ? 'ring-2 ring-emerald-400/60' : ''
			}`}
		>
			<div className="flex flex-wrap items-center gap-2 mb-3">
				<Pill>{job.heroTag}</Pill>
			</div>
			<h3 className="text-base md:text-lg font-semibold mb-2">{job.title}</h3>
			<p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 mb-4">
				{job.intro}
			</p>
			<div className="flex flex-wrap items-center gap-3 text-xs text-neutral-600 dark:text-neutral-400">
				<span className="inline-flex items-center gap-1">
					<MapPin size={16} /> {job.location}
				</span>
				<span className="inline-flex items-center gap-1">
					<Briefcase size={16} /> {job.type}
				</span>
				<span className="inline-flex items-center gap-1">
					<CalendarClock size={16} /> {job.start}
				</span>
			</div>
			<div className="mt-4 flex items-center text-sm font-medium text-emerald-700 dark:text-emerald-300">
				Se detaljer <ChevronRight className="ml-1" size={18} />
			</div>
		</button>
	);
}

// ────────────────────────────────────────────────────────────────────────────────
// Job Details (right column)
// ────────────────────────────────────────────────────────────────────────────────
function JobDetails({ job, onBack }: { job: any; onBack?: () => void }) {
	return (
		<div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 md:p-8">
			{onBack && (
				<button
					onClick={onBack}
					className="mb-6 inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
				>
					<ArrowLeft size={18} /> Tilbage til alle jobs
				</button>
			)}

			<div className="flex flex-wrap items-center gap-3 mb-2">
				<Pill>{job.heroTag}</Pill>
				<Pill>{job.type}</Pill>
				<Pill>{job.location}</Pill>
			</div>

			<h2 className="text-2xl md:text-3xl font-bold mb-2">{job.title}</h2>
			<div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400 mb-6">
				<span className="inline-flex items-center gap-1">
					<Building2 size={16} /> {job.department}
				</span>
				<span className="inline-flex items-center gap-1">
					<Clock4 size={16} /> {job.duration}
				</span>
				<span className="inline-flex items-center gap-1">
					<CalendarClock size={16} /> Start: {job.start}
				</span>
			</div>

			<p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
				{job.intro}
			</p>
			<p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-8">
				{job.about}
			</p>

			<div className="grid md:grid-cols-2 gap-8 mb-10">
				<Section title="Dine opgaver">
					<ul className="list-disc list-outside ml-5 space-y-2">
						{job.responsibilities.map((item: string) => (
							<li key={item}>{item}</li>
						))}
					</ul>
				</Section>
				<Section title="Vi søger dig, der">
					<ul className="list-disc list-outside ml-5 space-y-2">
						{job.requirements.map((item: string) => (
							<li key={item}>{item}</li>
						))}
					</ul>
				</Section>
			</div>

			<Section title="Vi tilbyder">
				<ul className="list-disc list-outside ml-5 space-y-2">
					{job.benefits.map((item: string) => (
						<li key={item}>{item}</li>
					))}
				</ul>
			</Section>

			<div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-3">
				<a
					href={`mailto:${job.email}?subject=${encodeURIComponent(
						job.title
					)}&body=${encodeURIComponent(
						'Hej Trygbasen –\n\nJeg er interesseret i stillingen og vedlægger mit CV.\n\nVenlig hilsen\n'
					)}`}
					className="inline-flex items-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 font-medium transition"
				>
					<Mail size={18} /> Søg stillingen
				</a>

				<Link
					to={ROUTES.kontakt}
					className="inline-flex items-center gap-2 rounded-full border border-neutral-300 dark:border-neutral-700 px-6 py-3 font-medium hover:bg-neutral-50 dark:hover:bg-neutral-800 transition"
				>
					Spørgsmål? Kontakt os
				</Link>
			</div>
		</div>
	);
}

// ────────────────────────────────────────────────────────────────────────────────
// Page
// ────────────────────────────────────────────────────────────────────────────────
export default function JobsPage() {
	const [activeId, setActiveId] = useState<string>(jobs[0]?.id);
	const activeJob = jobs.find((j) => j.id === activeId) || jobs[0];

	return (
		<main className="bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
			<Helmet>
				<title>Ledige stillinger – Trygbasen</title>
				{/* SEO JobPosting (JSON-LD) for the active job */}
				<script type="application/ld+json">
					{JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'JobPosting',
						title: activeJob.title,
						employmentType: activeJob.type,
						datePosted: new Date().toISOString().split('T')[0],
						hiringOrganization: {
							'@type': 'Organization',
							name: 'Trygbasen',
						},
						jobLocation: {
							'@type': 'Place',
							address: {
								'@type': 'PostalAddress',
								addressLocality: activeJob.location,
								addressRegion: 'DK',
								addressCountry: 'DK',
							},
						},
						description: `${activeJob.intro}\n\n${activeJob.about}`,
						validThrough: new Date(Date.now() + 1000 * 60 * 60 * 24 * 120)
							.toISOString()
							.split('T')[0],
					})}
				</script>
			</Helmet>

			{/* Hero */}

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
							Ledige stillinger
						</motion.h1>
						<motion.p
							variants={fadeUp}
							className="text-lg text-neutral-700 dark:text-neutral-300 max-w-3xl mx-auto"
						>
							Et trygt, professionelt og udviklingsfokuseret sted at arbejde – med
							borgeren i centrum.
						</motion.p>
						<motion.div
							variants={fadeUp}
							className="mx-auto mt-6 h-px w-28 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-80"
						/>
					</motion.div>
				</div>
			</section>
			{/* Content */}
			<section className="py-16 px-6">
				<div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 md:gap-12">
					{/* Left: list */}
					<aside className="md:col-span-1">
						<div className="sticky top-28 space-y-4">
							{jobs.map((job) => (
								<JobCard
									key={job.id}
									job={job}
									isActive={activeId === job.id}
									onOpen={() => setActiveId(job.id)}
								/>
							))}
						</div>
					</aside>

					{/* Right: details */}
					<div className="md:col-span-2">
						<JobDetails job={activeJob} />
					</div>
				</div>
			</section>

			{/* CTA Footer */}
			<section className="py-16 px-6">
				<div className="max-w-6xl mx-auto rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-900/10 dark:to-neutral-950 p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
					<div>
						<h3 className="text-xl md:text-2xl font-semibold mb-2">
							Har du ikke fundet det rigtige job endnu?
						</h3>
						<p className="text-neutral-700 dark:text-neutral-300">
							Send os gerne en uopfordret ansøgning – vi er altid nysgerrige på at
							møde dygtige kolleger.
						</p>
					</div>
					<a
						href={`mailto:${jobs[0].email}?subject=${encodeURIComponent(
							'Uopfordret ansøgning – Trygbasen'
						)}`}
						className="inline-flex items-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 font-medium transition"
					>
						<Mail size={18} /> Skriv til os
					</a>
				</div>
			</section>
		</main>
	);
}

// NOTE:
// – Bevarer jeres farver/typografi (emerald + neutral) og framer-motion transitions.
// – Venstre kolonne (LinkedIn-lignende) liste af jobs; højre kolonne viser detaljer.
// – Let at udvide: læg flere objekter i `jobs` arrayet.
// – SEO: JSON-LD JobPosting via Helmet.
