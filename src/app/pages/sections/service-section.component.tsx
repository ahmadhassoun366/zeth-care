import { Link } from 'react-router-dom';
import { motion, cubicBezier, type Variants } from 'framer-motion';
import {
	Users,
	LifeBuoy,
	Activity,
	HeartHandshake,
	GraduationCap,
	House,
	ArrowRight,
} from 'lucide-react';

const services = [
	{ icon: Users, label: 'Enkeltmandsprojekter', to: '/indsatser#enkeltmands' },
	{ icon: LifeBuoy, label: 'Akut anbringelse', to: '/indsatser#akut' },
	{ icon: Activity, label: 'Forbedringsforløb / UKN', to: '/indsatser#ukn' },
	{ icon: HeartHandshake, label: 'Støttekontaktperson', to: '/indsatser#stotte' },
	{ icon: GraduationCap, label: 'Unge støtte', to: '/indsatser#unge' },
	{ icon: HeartHandshake, label: 'Familiebehandling', to: '/indsatser#familie' },
	{ icon: Users, label: 'Mentorstøtte', to: '/indsatser#mentor' },
	{ icon: Activity, label: 'Misbrugsbehandling', to: '/indsatser#misbrug' },
	{ icon: House, label: 'Anbringelse i eget hjem', to: '/indsatser#egethjem' },
];

// Type-safe easing function
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
	return (
		<section id="services" className="bg-neutral-50 dark:bg-neutral-900/30 py-16 lg:py-24">
			<div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
				{/* Heading */}
				<div className="mb-12 max-w-3xl">
					<span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20">
						Vores indsatser <span className="h-1 w-1 rounded-full bg-green-700" />
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
					{services.map(({ icon: Icon, label, to }) => (
						<motion.div
							key={label}
							variants={card}
							whileHover={{ y: -4 }}
							transition={{ duration: 0.25 }}
						>
							<Link
								to={to}
								className="group relative flex h-full flex-col justify-between rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition dark:border-neutral-800 dark:bg-neutral-900"
							>
								{/* top accent */}
								<span className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-green-500 via-emerald-500 to-green-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
								{/* icon chip */}
								<div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-700 ring-1 ring-green-600/20 dark:bg-green-900/20 dark:text-green-400">
									<Icon size={22} />
								</div>
								{/* text */}
								<div>
									<h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
										{label}
									</h3>
									<p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
										Læs mere
									</p>
								</div>
								{/* hover glow */}
								<div
									className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
									style={{
										background:
											'radial-gradient(60% 60% at 50% 0%, rgba(16,185,129,0.12), transparent)',
									}}
								/>
							</Link>
						</motion.div>
					))}
				</motion.div>

				{/* CTA */}
				<div className="mt-10">
					<Link
						to="/indsatser"
						className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-3 text-neutral-900 shadow-sm transition hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700"
					>
						Se alle indsatser <ArrowRight size={16} />
					</Link>
				</div>
			</div>
		</section>
	);
}
