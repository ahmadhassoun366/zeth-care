import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion, cubicBezier, useReducedMotion, MotionConfig } from 'framer-motion';
import {
	Brain,
	Puzzle,
	UsersRound,
	Cross,
	HeartHandshake,
	ShieldAlert,
	ArrowRight,
	Search,
	X,
	type LucideIcon,
} from 'lucide-react';
import ROUTES from 'src/static/router.data';

type Tile = {
	to: string;
	title: string;
	desc: string;
	Icon: LucideIcon;
	tags: string[];
};

const EASE = cubicBezier(0.22, 1, 0.36, 1);
const TAGS = ['Alle', 'Psykiatri', 'Autisme/ADHD', 'Socialt', 'Misbrug', 'Kognitiv/Traume', 'Unge'];

export default function IndsatserIndexPage() {
	const prefersReducedMotion = useReducedMotion();
	const [q, setQ] = useState('');
	const [tag, setTag] = useState<string>('Alle');

	const tiles: Tile[] = useMemo(
		() => [
			{
				to: ROUTES.indsatser.psykiske,
				title: 'Psykiske vanskeligheder',
				desc: 'Angst, PTSD, depression m.m.',
				Icon: Brain,
				tags: ['Psykiatri'],
			},
			{
				to: ROUTES.indsatser.autisme_adhd,
				title: 'Autisme & ADHD',
				desc: 'Struktur, forudsigelighed og støtte.',
				Icon: Puzzle,
				tags: ['Autisme/ADHD'],
			},
			{
				to: ROUTES.indsatser.social_udfordringer,
				title: 'Sociale udfordringer',
				desc: 'Isolation, fællesskab og relationer.',
				Icon: UsersRound,
				tags: ['Socialt'],
			},
			{
				to: ROUTES.indsatser.misbrug_dobbeltdiagnoser,
				title: 'Misbrug & dobbeltdiagnoser',
				desc: 'Integreret psykiatri og misbrugsstøtte.',
				Icon: Cross,
				tags: ['Misbrug', 'Psykiatri'],
			},
			{
				to: ROUTES.indsatser.kognitiv_adfaerdsterapi,
				title: 'Kognitiv & traumebevidst pædagogik',
				desc: 'KAT, TBT, Low Arousal.',
				Icon: HeartHandshake,
				tags: ['Kognitiv/Traume', 'Psykiatri'],
			},
			{
				to: ROUTES.indsatser.kriminalitetstruede_børn_og_unge,
				title: 'Kriminalitetstruede børn & unge',
				desc: 'Forebyggelse og positiv identitet.',
				Icon: ShieldAlert,
				tags: ['Unge', 'Socialt'],
			},
		],
		[]
	);

	const filtered = useMemo(() => {
		const norm = (s: string) =>
			s
				.toLowerCase()
				.normalize('NFD')
				.replace(/\p{Diacritic}/gu, '');
		const nq = norm(q);
		return tiles.filter((t) => {
			const hitText =
				!nq ||
				norm(t.title).includes(nq) ||
				norm(t.desc).includes(nq) ||
				t.tags.some((tg) => norm(tg).includes(nq));
			const hitTag = tag === 'Alle' || t.tags.includes(tag);
			return hitText && hitTag;
		});
	}, [q, tag, tiles]);

	return (
		<MotionConfig reducedMotion="user">
			<main className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-neutral-950 dark:to-neutral-900 text-neutral-900 dark:text-neutral-100 pt-24">
				<Helmet>
					<title>Indsatser – Tryglund</title>
					<meta
						name="description"
						content="Se alle Tryglunds indsatser samlet ét sted. Filtrér efter område og find hurtigt den rette indsats."
					/>
					<link rel="canonical" href={ROUTES.indsatser.root} />
				</Helmet>

				{/* Soft background accents */}
				<motion.span
					aria-hidden
					className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-emerald-300/30 blur-3xl dark:bg-emerald-700/20"
					initial={{ opacity: 0.35, y: -10 }}
					animate={prefersReducedMotion ? {} : { opacity: 0.55, y: 10 }}
					transition={{ repeat: Infinity, repeatType: 'mirror', duration: 9, ease: EASE }}
				/>
				<motion.span
					aria-hidden
					className="pointer-events-none absolute -bottom-32 -right-32 h-[28rem] w-[28rem] rounded-full bg-green-200/40 blur-3xl dark:bg-emerald-800/30"
					initial={{ opacity: 0.35, y: 10 }}
					animate={prefersReducedMotion ? {} : { opacity: 0.55, y: -10 }}
					transition={{
						repeat: Infinity,
						repeatType: 'mirror',
						duration: 10,
						ease: EASE,
					}}
				/>

				{/* Hero / Heading */}
				<section className="px-6 md:px-10">
					<div className="max-w-6xl mx-auto text-center py-16 md:py-20">
						<h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
							Vores indsatser
						</h1>
						<p className="text-lg md:text-xl text-neutral-700 dark:text-neutral-300">
							Fagligt funderede tilbud – tilpasset den enkelte borger og situation.
						</p>
					</div>
				</section>

				{/* Controls: search + tags */}
				<section className="px-6 md:px-10 pb-6">
					<div className="max-w-6xl mx-auto">
						{/* Search */}
						<div className="relative max-w-xl">
							<Search
								className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
								size={18}
							/>
							<input
								value={q}
								onChange={(e) => setQ(e.target.value)}
								placeholder="Søg i indsatser (fx 'traume', 'social', 'misbrug')"
								className="w-full rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 pl-10 pr-10 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
								aria-label="Søg i indsatser"
							/>
							{q && (
								<button
									onClick={() => setQ('')}
									className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
									aria-label="Ryd søgning"
								>
									<X size={16} className="text-neutral-500" />
								</button>
							)}
						</div>

						{/* Tag chips */}
						<div className="mt-5 flex flex-wrap gap-2">
							{TAGS.map((t) => {
								const active = tag === t;
								return (
									<button
										key={t}
										onClick={() => setTag(t)}
										className={[
											'rounded-full px-3 py-1.5 text-sm border transition',
											active
												? 'bg-emerald-600 text-white border-emerald-600'
												: 'bg-white dark:bg-neutral-950 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700',
										].join(' ')}
										aria-pressed={active}
									>
										{t}
									</button>
								);
							})}
						</div>
					</div>
				</section>

				{/* Results info */}
				<section className="px-6 md:px-10 pb-2">
					<div className="max-w-6xl mx-auto text-sm text-neutral-500 dark:text-neutral-400">
						{filtered.length} resultat{filtered.length === 1 ? '' : 'er'}
					</div>
				</section>

				{/* Grid */}
				<section className="px-6 md:px-10 pb-28">
					<div
						className="max-w-6xl mx-auto grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 items-stretch"
						role="list"
						aria-label="Indsatser"
					>
						{filtered.map(({ to, title, desc, Icon }, i) => (
							<motion.div
								key={to}
								className="h-full" // ensure wrapper fills the row height
								initial={{ opacity: 0, y: 18 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, amount: 0.25 }}
								transition={{ duration: 0.45, delay: i * 0.05 }}
							>
								{/* Card-as-link */}
								<Link
									to={to}
									className="group relative block h-full min-h-[220px] md:min-h-[240px] lg:min-h-[250px] overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-5 shadow-sm hover:shadow-md transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 flex flex-col"
									role="listitem"
									aria-label={title}
								>
									{/* Top content */}
									<div className="flex items-start gap-4">
										<Icon
											className="text-emerald-600 dark:text-emerald-400 shrink-0"
											size={24}
										/>
										<div>
											<h3 className="text-lg font-semibold mb-1">{title}</h3>
											<p className="text-sm text-neutral-600 dark:text-neutral-300">
												{desc}
											</p>
										</div>
									</div>

									{/* Bottom affordance pinned to bottom */}
									<div className="mt-auto flex items-center justify-end pt-6">
										<span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-medium transition-transform group-hover:translate-x-0.5">
											<ArrowRight size={18} />
										</span>
									</div>

									{/* subtle hover wash */}
									<div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-emerald-50/60 to-transparent dark:from-emerald-900/10" />
								</Link>
							</motion.div>
						))}
					</div>

					{/* Empty state */}
					{filtered.length === 0 && (
						<div className="max-w-6xl mx-auto text-center py-16 text-neutral-500 dark:text-neutral-400">
							Ingen resultater. Prøv en anden søgning eller fjern filteret.
						</div>
					)}
				</section>

				{/* CTA footer */}
				<section className="py-16 px-6 bg-emerald-600 text-white">
					<div className="max-w-6xl mx-auto text-center">
						<h2 className="text-2xl md:text-3xl font-bold mb-2">
							Er du i tvivl om den rette indsats?
						</h2>
						<p className="opacity-90 mb-6">
							Kontakt os for en uforpligtende vurdering.
						</p>
						<a
							href={ROUTES.kontakt}
							className="inline-flex items-center gap-2 bg-white text-emerald-700 hover:bg-emerald-100 font-medium px-6 py-3 rounded-full transition"
						>
							Skriv til os <ArrowRight size={18} />
						</a>
					</div>
				</section>
			</main>
		</MotionConfig>
	);
}
