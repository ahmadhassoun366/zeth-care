import { motion, useReducedMotion, cubicBezier, type Variants } from 'framer-motion';
import { Clock, Phone, ShieldCheck } from 'lucide-react';

export default function Pillars() {
	const prefersReduced = useReducedMotion();
	const EASE_SOFT = cubicBezier(0.22, 1, 0.36, 1);
	const EASE_SWEEP = cubicBezier(0.25, 1, 0.3, 1);

	const items = [
		{
			icon: Clock,
			title: 'Akut',
			desc: 'Vi træder til, når der er brug for handling nu og her.',
		},
		{
			icon: Phone,
			title: '24/7 tilgængelighed',
			desc: 'Vi kan rykke ud indenfor få timer – året rundt.',
		},
		{
			icon: ShieldCheck,
			title: 'Målrettet indsats',
			desc: 'Fleksible, skræddersyede løsninger til den enkelte.',
		},
	];

	const container: Variants = {
		hidden: {},
		show: { transition: { staggerChildren: 0.15, delayChildren: 0.15 } },
	};
	const itemV: Variants = {
		hidden: { opacity: 0, y: 16 },
		show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_SOFT } },
	};

	return (
		<section id="piller" className="relative py-16 lg:py-24 bg-neutral-50 dark:bg-neutral-950">
			{/* Soft backdrop */}
			<div
				aria-hidden
				className="pointer-events-none absolute inset-x-0 -top-24 mx-auto h-64 max-w-5xl rounded-[80px] bg-emerald-400/10 blur-3xl dark:bg-emerald-500/10"
			/>

			<div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
				{/* Heading */}
				<div className="mb-12">
					<span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 ring-1 ring-green-600/20 dark:bg-green-900/30 dark:text-green-300 dark:ring-green-500/20">
						Vores styrker{' '}
						<span className="h-1 w-1 rounded-full bg-green-700 dark:bg-green-300" />
					</span>
					<h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 dark:text-white md:text-4xl">
						Det, der gør os effektive i akutte indsatser
					</h2>
				</div>

				{/* Rail */}
				<div className="relative">
					<svg
						className="pointer-events-none absolute left-0 top-10 hidden h-2 w-full md:block"
						viewBox="0 0 100 2"
						preserveAspectRatio="none"
						aria-hidden
					>
						<defs>
							<linearGradient id="railGrad" x1="0" x2="1" y1="0" y2="0">
								<stop offset="0%" stopColor="rgb(16 185 129 / 0.5)" />
								<stop offset="50%" stopColor="rgb(52 211 153 / 0.8)" />
								<stop offset="100%" stopColor="rgb(16 185 129 / 0.5)" />
							</linearGradient>
						</defs>

						{[
							{ x1: 4, x2: 32, d: 0.05 },
							{ x1: 34, x2: 66, d: 0.4 },
							{ x1: 68, x2: 96, d: 0.75 },
						].map((seg, i) => (
							<motion.line
								key={i}
								x1={seg.x1}
								y1="1"
								x2={seg.x2}
								y2="1"
								stroke="url(#railGrad)"
								strokeWidth="2"
								strokeLinecap="round"
								initial={{ pathLength: 0, opacity: 0.5 }}
								whileInView={{ pathLength: 1, opacity: 1 }}
								viewport={{ once: true, amount: 0.4 }}
								transition={{
									duration: prefersReduced ? 0 : 0.8,
									ease: EASE_SWEEP,
									delay: seg.d,
								}}
							/>
						))}
					</svg>

					{/* Items */}
					<motion.ul
						variants={container}
						initial="hidden"
						whileInView="show"
						viewport={{ once: true, amount: 0.5 }}
						className="grid gap-10 md:grid-cols-3"
					>
						{items.map(({ icon: Icon, title, desc }, idx) => (
							<motion.li
								key={title}
								variants={itemV}
								className="group relative flex flex-col items-start"
							>
								{/* Icon wrapper with ring */}
								<div className="relative">
									<div className="absolute inset-0 rounded-full bg-gradient-to-tr from-green-400 to-emerald-500 opacity-30 blur-xl" />
									{/* Rotating ring */}
									<motion.span
										className="absolute inset-0 rounded-full border-2 border-transparent"
										style={{
											background:
												'conic-gradient(from 0deg, rgba(16,185,129,0.6), rgba(16,185,129,0) 70%)',
										}}
										animate={prefersReduced ? {} : { rotate: 360 }}
										transition={{
											repeat: Infinity,
											duration: 8,
											ease: 'linear',
										}}
									/>
									{/* Icon disc */}
									<div className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-green-600 to-emerald-500 text-white shadow-lg shadow-emerald-600/25 ring-1 ring-white/10">
										<Icon size={22} />
										{/* Inner animated core dot */}
										<motion.span
											className="absolute h-2 w-2 rounded-full bg-white"
											animate={
												prefersReduced
													? {}
													: {
															scale: [1, 1.4, 1],
															opacity: [0.8, 0.4, 0.8],
															// eslint-disable-next-line no-mixed-spaces-and-tabs
													  }
											}
											transition={{
												repeat: Infinity,
												duration: 2,
												ease: EASE_SOFT,
												delay: idx * 0.3,
											}}
										/>
									</div>
								</div>

								{/* Text */}
								<div className="mt-4">
									<h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
										{title}
									</h3>
									<p className="mt-2 max-w-sm text-sm leading-6 text-neutral-600 dark:text-neutral-300">
										{desc}
									</p>
									<span className="mt-3 block h-[2px] w-14 origin-left scale-x-0 rounded bg-gradient-to-r from-green-500 to-emerald-400 transition-transform duration-300 group-hover:scale-x-100" />
								</div>

								{/* Index */}
								<span
									aria-hidden
									className="absolute -top-2 right-0 translate-y-[-50%] select-none text-xs font-semibold tracking-wider text-neutral-400/70 dark:text-neutral-500/70"
								>
									{String(idx + 1).padStart(2, '0')}
								</span>
							</motion.li>
						))}
					</motion.ul>
				</div>
			</div>
		</section>
	);
}
