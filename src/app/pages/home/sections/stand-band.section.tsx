import { motion, useInView, useMotionValue, animate, cubicBezier } from 'framer-motion';
import { Clock, CalendarDays, ShieldCheck } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const easeOutSoft = cubicBezier(0.22, 1, 0.36, 1);

function Counter({ value, duration = 1.6 }: { value: number; duration?: number }) {
	const ref = useRef<HTMLSpanElement | null>(null);
	const isInView = useInView(ref, { amount: 0.6 });
	const mv = useMotionValue(0);
	const [display, setDisplay] = useState(0);

	useEffect(() => {
		const unsub = mv.on('change', (v) => setDisplay(Math.round(v)));
		return () => unsub();
	}, [mv]);

	useEffect(() => {
		if (isInView) {
			const controls = animate(mv, value, { duration, ease: easeOutSoft });
			return () => controls.stop();
		} else {
			mv.set(0);
		}
	}, [isInView, value, mv, duration]);

	return (
		<span ref={ref} className="tabular-nums">
			{display}
		</span>
	);
}

export default function Stats() {
	const stats = [
		{ icon: Clock, value: 24, label: 'Timer i døgnet' },
		{ icon: CalendarDays, value: 365, label: 'Dage om året' },
		{ icon: ShieldCheck, label: 'Akutberedskab', sub: 'Klar til opstart' },
	];

	return (
		<section
			id="stats"
			className="relative py-32 bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-950 px-6"
		>
			{/* Background glow */}
			<motion.div
				aria-hidden
				className="pointer-events-none absolute -top-20 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-green-200/40 blur-3xl"
				initial={{ opacity: 0, scale: 0.9 }}
				whileInView={{ opacity: 0.5, scale: 1 }}
				viewport={{ once: true }}
				transition={{ duration: 1, ease: easeOutSoft }}
			/>

			{/* Title & Description */}
			<div className="relative max-w-4xl mx-auto text-center mb-20">
				<span className="inline-block mb-4 text-sm font-semibold tracking-wide uppercase text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20 px-3 py-1 rounded-full">
					Tilgængelighed & beredskab
				</span>
				<h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
					Altid klar til at støtte
				</h2>
				<p className="text-neutral-600 dark:text-neutral-300 text-base md:text-lg max-w-2xl mx-auto">
					Vi er til rådighed hele året – med akutberedskab og tryghed, når der er behov.
				</p>
			</div>

			{/* Stats Grid */}
			<div className="relative mx-auto max-w-7xl">
				<motion.div
					className="grid gap-8 md:grid-cols-3"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: false, amount: 0.3 }}
					variants={{
						hidden: {},
						visible: { transition: { staggerChildren: 0.15 } },
					}}
				>
					{stats.map((item) => (
						<motion.div
							key={item.label}
							className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-white p-8 shadow-lg shadow-green-600/5 backdrop-blur dark:border-neutral-800 dark:bg-neutral-900"
							variants={{
								hidden: { opacity: 0, y: 20 },
								visible: {
									opacity: 1,
									y: 0,
									transition: { duration: 0.6, ease: easeOutSoft },
								},
							}}
							whileHover={{ y: -4 }}
						>
							{/* Icon */}
							<div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-700 ring-1 ring-green-600/20 dark:bg-green-900/20 dark:text-green-400">
								<item.icon size={24} />
							</div>

							{/* Value or Title */}
							{item.value ? (
								<div className="text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
									<Counter value={item.value} />
								</div>
							) : (
								<div className="text-2xl font-bold text-neutral-900 dark:text-white">
									{item.label}
								</div>
							)}

							{/* Labels */}
							{item.value ? (
								<p className="mt-2 text-sm font-medium text-neutral-600 dark:text-neutral-300">
									{item.label}
								</p>
							) : (
								<p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
									{item.sub}
								</p>
							)}

							{/* Hover Glow */}
							<div
								className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
								style={{
									background:
										'radial-gradient(60% 60% at 50% 0%, rgba(16,185,129,0.15), transparent)',
								}}
							/>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
