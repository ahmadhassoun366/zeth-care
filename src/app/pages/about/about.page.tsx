import { motion, cubicBezier, type Variants } from 'framer-motion';
import { ShieldCheck, Home, Trees, Users, Moon, ClipboardCheck } from 'lucide-react';
import { Waves, Footprints, Utensils, Brush, ShoppingCart, Palette } from 'lucide-react';
const EASE = cubicBezier(0.22, 1, 0.36, 1);

const lines: Variants = {
	hidden: {},
	show: { transition: { staggerChildren: 0.12 } },
};
const line: Variants = {
	hidden: { opacity: 0, y: 14 },
	show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

const container: Variants = {
	hidden: {},
	show: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
};

const item: Variants = {
	hidden: { opacity: 0, y: 14 },
	show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export default function About() {
	return (
		<main className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-20 dark:from-neutral-950 dark:to-neutral-900 lg:py-20">
			{/* Top banner */}
			<section className="relative bg-gradient-to-b from-gray-50 to-white dark:from-neutral-950 dark:to-neutral-900 py-16 lg:py-24">
				{/* soft background blobs */}
				<motion.span
					aria-hidden
					className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-emerald-300/40 blur-3xl dark:bg-emerald-700/30"
					initial={{ opacity: 0.4, y: -12 }}
					animate={{ opacity: 0.6, y: 12 }}
					transition={{ repeat: Infinity, repeatType: 'mirror', duration: 9, ease: EASE }}
				/>
				<motion.span
					aria-hidden
					className="pointer-events-none absolute -bottom-32 -right-32 h-[28rem] w-[28rem] rounded-full bg-green-200/50 blur-3xl dark:bg-green-800/40"
					initial={{ opacity: 0.4, y: 12 }}
					animate={{ opacity: 0.6, y: -12 }}
					transition={{
						repeat: Infinity,
						repeatType: 'mirror',
						duration: 10,
						ease: EASE,
					}}
				/>

				<div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="max-w-3xl">
						<span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-medium tracking-wider text-green-800 ring-1 ring-green-600/20 backdrop-blur dark:bg-white/10 dark:text-green-300 dark:ring-green-500/20">
							Tryglund
							<span className="h-1 w-1 rounded-full bg-green-700 dark:bg-green-300" />
							Enkeltmandsprojekt
						</span>

						<motion.h1
							className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-neutral-900 dark:text-white md:text-5xl"
							variants={lines}
							initial="hidden"
							whileInView="show"
							viewport={{ once: true, amount: 0.6 }}
						>
							<motion.span className="block" variants={line}>
								Et trygt, naturskønt{' '}
								<span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
									rammemiljø
								</span>
							</motion.span>
							<motion.span className="block" variants={line}>
								til borgere med komplekse behov
							</motion.span>
						</motion.h1>

						<motion.p
							className="mt-4 max-w-2xl text-lg text-neutral-700 dark:text-neutral-300"
							initial={{ opacity: 0, y: 8 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.55 }}
							transition={{ duration: 0.45, ease: EASE }}
						>
							<span className="font-extrabold text-xl text-black dark:text-white">
								Tryglund
							</span>{' '}
							er et enkeltmandsprojekt med base i et trygt og naturskønt
							sommerhusmiljø – målrettet borgere med komplekse behov, der har brug for
							en helhedsorienteret, intensiv og skræddersyet pædagogisk indsats jf.
							Barnets Lov. Når traditionelle tilbud kommer til kort, skaber vi et
							alternativt rum for udvikling og stabilisering, hvor relation, struktur
							og aktivitet er de bærende elementer.
						</motion.p>
					</div>
				</div>
			</section>

			{/* Core description + image placeholder */}
			<section className="py-12 lg:py-16">
				<div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-10 lg:grid-cols-2 lg:items-start">
					<div>
						<h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white md:text-3xl">
							Vores rammer og pædagogiske tilgang
						</h2>
						<p className="mt-4 text-neutral-700 dark:text-neutral-300">
							Vi tilbyder en intensiv <strong>1:1</strong> eller <strong>2:1</strong>{' '}
							indsats i et skærmet sommerhusmiljø. Sommerhuset fungerer som base for
							både hverdagsstruktur og målrettet udviklingsarbejde. Vi møder borgeren
							med varme, faglighed og tydelig retning – altid med tryghed som
							fundament.
						</p>

						<ul className="mt-6 space-y-4">
							{[
								{
									icon: Moon,
									title: 'Fastvågen nattevagt',
									desc: 'Hver nat kl. 22.00–06.00 for tryghed, ro og kontinuitet.',
								},
								{
									icon: Users,
									title: 'Kvalificerede og stabile pædagoger',
									desc: 'Erfaring fra psykiatri, socialpædagogik og misbrugsindsatser.',
								},
								{
									icon: ClipboardCheck,
									title: 'Løbende supervision & tværfagligt samarbejde',
									desc: 'Struktureret sparring og koordination omkring forløbet.',
								},
							].map(({ icon: Icon, title, desc }) => (
								<li
									key={title}
									className="group rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
								>
									<div className="flex items-start gap-3">
										<span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-700 ring-1 ring-green-600/20 dark:bg-green-900/20 dark:text-green-400">
											<Icon size={18} />
										</span>
										<div>
											<h3 className="font-semibold text-neutral-900 dark:text-white">
												{title}
											</h3>
											<p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
												{desc}
											</p>
										</div>
									</div>
								</li>
							))}
						</ul>
					</div>

					{/* visual: replace src with real photo if you have one */}
					<motion.div
						className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
						initial={{ opacity: 0, y: 14 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.4 }}
						transition={{ duration: 0.5, ease: EASE }}
					>
						{/* Replace placeholder with image */}
						<img
							src="/media/images/forest.jpg" // your optimized image path
							alt="Tryglund – støtte og udvikling i trygge rammer"
							className="absolute inset-0 h-full w-full object-cover"
						/>

						{/* Floating label stays */}
						<motion.div
							className="absolute right-4 top-4 rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-neutral-700 backdrop-blur dark:bg-neutral-800/80 dark:text-neutral-100"
							animate={{ y: [0, -4, 0] }}
							transition={{ repeat: Infinity, duration: 4.5, ease: EASE }}
						>
							Skærmet base
						</motion.div>
					</motion.div>
				</div>
			</section>

			{/* Three highlights rail (matches your “pillars” style but inline) */}
			<section className="py-12 lg:py-16 ">
				<div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="mb-8">
						<span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 ring-1 ring-green-600/20 dark:bg-green-900/30 dark:text-green-300 dark:ring-green-500/20">
							Tryglund i korte træk{' '}
							<span className="h-1 w-1 rounded-full bg-green-700 dark:bg-green-300" />
						</span>
					</div>

					<div className="grid gap-6 md:grid-cols-3">
						{[
							{
								icon: Home,
								title: 'Sommerhus-base',
								desc: 'Et roligt, naturnært og skærmet miljø, der støtter nærvær og struktur.',
							},
							{
								icon: Trees,
								title: 'Natur & aktivitet',
								desc: 'Hverdagen bygges op om relation, struktur og meningsfulde aktiviteter.',
							},
							{
								icon: ShieldCheck,
								title: 'Helhedsorienteret indsats',
								desc: 'Individuelt tilpasset 1:1/2:1 med klare mål og tæt opfølgning.',
							},
						].map(({ icon: Icon, title, desc }) => (
							<div
								key={title}
								className="group relative rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
							>
								<div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-700 ring-1 ring-green-600/20 dark:bg-green-900/20 dark:text-green-400">
									<Icon size={20} />
								</div>
								<h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
									{title}
								</h3>
								<p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
									{desc}
								</p>
								<span
									aria-hidden
									className="pointer-events-none absolute -inset-px -z-10 rounded-3xl opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
									style={{
										background:
											'radial-gradient(60% 60% at 50% 0%, rgba(16,185,129,0.12), transparent)',
									}}
								/>
							</div>
						))}
					</div>
				</div>
			</section>
			<motion.section
				id="hverdag"
				className="relative py-20 bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-950"
				initial="hidden"
				whileInView="show"
				viewport={{ once: true, amount: 0.45 }}
				variants={container}
			>
				{/* Decorative blur behind */}
				<div
					aria-hidden
					className="pointer-events-none absolute inset-x-0 -top-32 mx-auto h-64 max-w-6xl rounded-[80px] bg-emerald-400/10 blur-3xl dark:bg-emerald-600/10"
				/>

				<div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
					{/* Heading */}
					<div className="max-w-3xl">
						<span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 ring-1 ring-green-600/20 dark:bg-green-900/30 dark:text-green-300 dark:ring-green-500/20">
							Hverdag & trivsel
							<span className="h-1 w-1 rounded-full bg-green-700 dark:bg-green-300" />
						</span>

						<h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 dark:text-white md:text-4xl">
							Hverdagen i projektet – struktur og aktivitet som nøgle til trivsel
						</h2>

						<p className="mt-4 text-lg text-neutral-700 dark:text-neutral-300">
							Vi strukturerer dagligdagen med <strong>borgeren i centrum</strong>. Vi
							arbejder med <strong>små mål</strong>, der skaber mestring og motivation
							– altid med tydelige rammer og nærværende voksne.
						</p>
					</div>

					{/* Activities - structured timeline layout */}
					<div className="mt-14 grid gap-y-10 gap-x-16 lg:grid-cols-2">
						{[
							{
								icon: Waves,
								title: 'Svømning',
								desc: 'Både som fysisk træning og sansestimulerende aktivitet.',
							},
							{
								icon: Footprints,
								title: 'Gåture & naturterapi',
								desc: 'Samtaler i bevægelse, grounding og ro i naturen.',
							},
							{
								icon: Utensils,
								title: 'Madlavning',
								desc: 'Planlægning, tilberedning og fællesskab omkring måltider.',
							},
							{
								icon: ShoppingCart,
								title: 'Indkøb',
								desc: 'Øvelse i budget, plan og ansvar i hverdagen.',
							},
							{
								icon: Brush,
								title: 'Rengøring & struktur',
								desc: 'Rutiner der styrker selvstændighed og overskud.',
							},
							{
								icon: Palette,
								title: 'Kreative aktiviteter & spil',
								desc: 'Fordybelse, fællesskab og positiv identitet.',
							},
						].map(({ icon: Icon, title, desc }, index) => (
							<motion.div
								key={title}
								variants={item}
								className="flex items-start gap-5 group"
							>
								{/* icon */}
								<div className="relative shrink-0">
									<span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-700 ring-1 ring-green-600/20 dark:bg-green-900/20 dark:text-green-400">
										<Icon size={22} />
									</span>

									{/* vertical line */}
									{index !== 5 && (
										<div
											aria-hidden
											className="absolute left-1/2 top-12 h-10 w-px -translate-x-1/2 bg-neutral-200 dark:bg-neutral-800"
										/>
									)}
								</div>

								{/* text */}
								<div>
									<h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
										{title}
									</h3>
									<p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
										{desc}
									</p>
								</div>
							</motion.div>
						))}
					</div>

					{/* Final statement */}
					<div className="mt-16 max-w-3xl rounded-3xl border border-neutral-200 bg-white p-6 text-sm shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
						<div className="font-medium text-neutral-900 dark:text-white">
							Individuel plan – altid med borgeren i centrum
						</div>
						<p className="mt-2 text-neutral-600 dark:text-neutral-300">
							Vi arbejder altid ud fra en <strong>individuel plan</strong> i
							samarbejde med borgeren, hvor trivsel, motivation og{' '}
							<strong>livsmestring</strong> er i fokus.
						</p>
					</div>
				</div>
			</motion.section>
		</main>
	);
}
