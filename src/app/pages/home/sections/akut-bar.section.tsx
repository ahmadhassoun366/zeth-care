import { Link } from 'react-router-dom';
import { motion, cubicBezier, type Variants } from 'framer-motion';
import { Phone, ArrowRight } from 'lucide-react';
import ROUTES from 'src/static/router.data';

const easeOutSoft = cubicBezier(0.22, 1, 0.36, 1);

const wrap: Variants = {
	hidden: { opacity: 0, y: 16 },
	show: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.7, ease: easeOutSoft, staggerChildren: 0.15 },
	},
};

const item: Variants = {
	hidden: { opacity: 0, y: 10 },
	show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOutSoft } },
};

export default function AkutBar() {
	return (
		<section id="akut" className="py-0">
			<div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
				<motion.div
					variants={wrap}
					initial="hidden"
					whileInView="show"
					viewport={{ once: false, amount: 0.4 }}
					className="my-6 overflow-hidden rounded-3xl bg-gradient-to-r from-green-800 to-emerald-700 text-white shadow-lg ring-1 ring-white/10"
				>
					{/* top accent line */}
					<div className="h-0.5 w-full bg-gradient-to-r from-lime-300/40 via-white/30 to-lime-300/40" />

					<div className="grid gap-6 px-6 py-6 md:grid-cols-3 md:items-center">
						{/* Akut telefon */}
						<motion.a
							variants={item}
							href="tel:+4522550635"
							className="group flex items-center gap-4 rounded-xl p-3 transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
							aria-label="Ring til akut telefon +45 22 55 06 35"
						>
							<div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20 transition group-hover:scale-105 group-hover:bg-white/20">
								<Phone size={22} />
							</div>
							<div>
								<div className="text-xs opacity-80">Akut telefon</div>
								<div className="text-xl font-semibold tracking-tight">
									+45 22 55 06 35
								</div>
							</div>
						</motion.a>

						{/* Generelle henvendelser */}
						<motion.a
							variants={item}
							href="tel:+4522550635"
							className="group flex items-center gap-4 rounded-xl p-3 transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
							aria-label="Ring til generelle henvendelser +45 22 55 06 35"
						>
							<div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20 transition group-hover:scale-105 group-hover:bg-white/20">
								<Phone size={22} />
							</div>
							<div>
								<div className="text-xs opacity-80">Generelle henvendelser</div>
								<div className="text-xl font-semibold tracking-tight">
									+45 22 55 06 35
								</div>
							</div>
						</motion.a>

						{/* CTA + 24/7 badge */}
						<motion.div
							variants={item}
							className="flex items-center justify-start gap-4 md:justify-end"
						>
							<span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium ring-1 ring-white/20">
								<span className="relative inline-flex">
									<span className="absolute inline-flex h-2.5 w-2.5 animate-ping rounded-full bg-lime-300 opacity-75" />
									<span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-lime-300" />
								</span>
								24/7 Beredskab
							</span>

							<Link
								to={ROUTES.kontakt}
								className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-medium text-green-900 shadow-lg shadow-white/10 transition hover:bg-lime-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
							>
								Kontakt os <ArrowRight size={16} />
							</Link>
						</motion.div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
