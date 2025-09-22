import { Link } from 'react-router-dom';
import { motion, cubicBezier, type Variants } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ROUTES from 'src/static/router.data';

const easeOutSoft = cubicBezier(0.22, 1, 0.36, 1);

const container: Variants = {
	hidden: {},
	show: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
};

const fadeUp: Variants = {
	hidden: { opacity: 0, y: 16 },
	show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOutSoft } },
};

const listItem: Variants = {
	hidden: { opacity: 0, y: 10 },
	show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easeOutSoft } },
};

export default function About() {
	return (
		<section id="about" className="relative py-16 lg:py-24">
			{/* soft background accent */}
			<motion.span
				aria-hidden
				className="pointer-events-none absolute -top-20 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-emerald-200/40 blur-3xl"
				initial={{ opacity: 0, y: -12 }}
				whileInView={{ opacity: 0.5, y: 0 }}
				viewport={{ once: false, amount: 0.4 }}
				transition={{ duration: 1, ease: easeOutSoft }}
			/>

			<div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
				<motion.div
					className="grid gap-10 lg:grid-cols-2"
					variants={container}
					initial="hidden"
					whileInView="show"
					viewport={{ once: false, amount: 0.35 }}
				>
					{/* Left: copy */}
					<div>
						<motion.h2
							variants={fadeUp}
							className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white md:text-4xl"
						>
							Om Tryglund
						</motion.h2>

						<motion.p
							variants={fadeUp}
							className="mt-4 text-lg leading-7 text-neutral-700 dark:text-neutral-300"
						>
							Vi tilbyder specialiserede enkeltmandsprojekter og særforanstaltninger
							for børn og unge under 18 år – skræddersyet til botilbud og
							institutioner i hele landet. Vi rykker ud indenfor få timer og varetager
							både den praktiske og administrative del af indsatsen, så I kan fokusere
							på kerneopgaverne.
						</motion.p>

						<motion.p
							variants={fadeUp}
							className="mt-4 text-lg leading-7 text-neutral-700 dark:text-neutral-300"
						>
							Vores medarbejdere er nøje udvalgte og har solid erfaring med målgruppen
							– altid med høj faglighed, fleksibilitet og omstillingsparathed i fokus.
						</motion.p>

						<motion.div variants={fadeUp} className="mt-7 flex flex-wrap gap-3">
							<Link
								to={ROUTES.omos}
								className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-5 py-3 text-neutral-900 shadow-sm transition hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700"
							>
								Læs om os
							</Link>
							<Link
								to="/indsatser"
								className="inline-flex items-center gap-2 rounded-full bg-green-600 px-5 py-3 text-white shadow-lg shadow-green-600/20 transition hover:bg-green-700"
							>
								Se indsatser <ArrowRight size={16} />
							</Link>
						</motion.div>
					</div>

					{/* Right: facts card */}
					<motion.aside
						variants={fadeUp}
						className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
					>
						<div className="mb-3 text-sm font-medium text-neutral-900 dark:text-neutral-100">
							Fokusområder
						</div>

						<motion.ul
							variants={container}
							initial="hidden"
							whileInView="show"
							viewport={{ once: false, amount: 0.4 }}
							className="grid gap-2"
						>
							{[
								'Høj faglighed og løbende kompetenceudvikling',
								'Fleksibilitet og hurtig omstilling',
								'Samarbejde med landsdækkende partnere',
								'Tryghed for borger og personale',
							].map((x) => (
								<motion.li
									key={x}
									variants={listItem}
									className="flex items-start gap-2"
								>
									<span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-md bg-green-50 text-green-700 ring-1 ring-green-600/20 dark:bg-green-900/20 dark:text-green-400">
										<CheckCircle2 size={16} />
									</span>
									<span className="text-sm leading-6 text-neutral-700 dark:text-neutral-200">
										{x}
									</span>
								</motion.li>
							))}
						</motion.ul>

						<div className="mt-6 grid gap-2 text-sm">
							<div className="text-neutral-600 dark:text-neutral-300">CVR</div>
							<div className="font-semibold text-neutral-900 dark:text-white">
								44772965
							</div>

							<div className="mt-4 text-neutral-600 dark:text-neutral-300">
								Adresse
							</div>
							<div className="font-semibold text-neutral-900 dark:text-white">
								vr. Janderupvej 29, 6851 Janderup
							</div>
						</div>

						{/* subtle top accent on hover */}
						<div
							className="pointer-events-none mt-6 h-px w-full opacity-60"
							style={{
								background:
									'linear-gradient(90deg, transparent, rgba(16,185,129,.35), transparent)',
							}}
						/>
					</motion.aside>
				</motion.div>
			</div>
		</section>
	);
}
