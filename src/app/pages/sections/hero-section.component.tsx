import { Link } from 'react-router-dom';
import {
	useTime,
	useTransform,
	motion,
	useScroll,
	cubicBezier,
	useReducedMotion,
	useMotionTemplate,
	useMotionValue,
	useSpring,
} from 'framer-motion';

import { ArrowRight, CheckCircle2, Phone } from 'lucide-react';
import { useRef } from 'react';
import type { Variants } from 'framer-motion';

const features = [
	'Medarbejdere med høj faglighed og erfaring',
	'Fleksible løsninger – tryghed for borger og personale',
	'24/7 tilgængelighed hele året',
];

// Premium easing curves
const EASE_SMOOTH = cubicBezier(0.25, 1, 0.3, 1);
const EASE_SUBTLE = cubicBezier(0.33, 1, 0.68, 1);

export default function Hero() {
	const sectionRef = useRef<HTMLElement | null>(null);
	const visualRef = useRef<HTMLDivElement | null>(null);

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ['start end', 'end start'],
	});

	const t = useTime();
	const prefersReduced = useReducedMotion();

	// --------------------------
	// Idle drift (time-based)
	// --------------------------
	const idleY = useTransform(t, (v) => Math.sin(v / 1200) * 8);

	// --------------------------
	// Parallax from scroll
	// --------------------------
	const blobYLeftScroll = useTransform(scrollYProgress, [0, 1], [0, -40]);
	const blobYRightScroll = useTransform(scrollYProgress, [0, 1], [0, 50]);

	// IMPORTANT: compose as calc() so CSS understands the addition
	const blobYLeft = useMotionTemplate`calc(${blobYLeftScroll}px + ${idleY}px)`;
	const blobYRight = useMotionTemplate`calc(${blobYRightScroll}px + ${idleY}px)`;

	// --------------------------
	// Mouse-driven 3D tilt (subtle)
	// --------------------------
	const mx = useMotionValue(0);
	const my = useMotionValue(0);

	// Map normalized mouse coords (-0.5..0.5) to tilt/shift
	const tiltX = useTransform(my, [-0.5, 0.5], [10, -10]); // rotateX
	const tiltY = useTransform(mx, [-0.5, 0.5], [-10, 10]); // rotateY
	const parallaxX = useTransform(mx, [-0.5, 0.5], [-12, 12]);
	const parallaxY = useTransform(my, [-0.5, 0.5], [12, -12]);

	// Smooth it out
	const tiltXSmooth = useSpring(tiltX, { stiffness: 120, damping: 18, mass: 0.3 });
	const tiltYSmooth = useSpring(tiltY, { stiffness: 120, damping: 18, mass: 0.3 });
	const pxSmooth = useSpring(parallaxX, { stiffness: 140, damping: 20, mass: 0.25 });
	const pySmooth = useSpring(parallaxY, { stiffness: 140, damping: 20, mass: 0.25 });

	function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
		if (prefersReduced) return;
		const el = visualRef.current;
		if (!el) return;
		const rect = el.getBoundingClientRect();
		const x = (e.clientX - rect.left) / rect.width; // 0..1
		const y = (e.clientY - rect.top) / rect.height; // 0..1
		mx.set(x - 0.5);
		my.set(y - 0.5);
	}

	function onMouseLeave() {
		mx.set(0);
		my.set(0);
	}

	const orbitAnimate = prefersReduced
		? { scale: [1, 1.01, 1], rotate: [0, 0.5, 0] }
		: { scale: [1, 1.06, 1, 1.05, 1], rotate: [0, -6, 6, 0] };

	// Variants
	const container: Variants = {
		hidden: {},
		show: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
	};

	const fadeUp: Variants = {
		hidden: { opacity: 0, y: 20 },
		show: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.8, ease: EASE_SMOOTH },
		},
	};

	const featureItem: Variants = {
		hidden: { opacity: 0, y: 14 },
		show: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.6, ease: EASE_SUBTLE },
		},
	};

	// Visual scale + lift on scroll
	const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
	const videoLift = useTransform(scrollYProgress, [0, 1], [0, -12]);

	return (
		<section
			ref={sectionRef}
			id="hero"
			className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-20 dark:from-neutral-950 dark:to-neutral-900 lg:py-44"
		>
			{/* Blurred blobs with smooth orbital motion */}
			<motion.span
				aria-hidden
				className="pointer-events-none absolute -top-20 -left-24 h-80 w-80 rounded-full bg-green-300/50 blur-3xl dark:bg-green-800/40"
				style={{ y: blobYLeft, willChange: 'transform' }}
				animate={orbitAnimate}
				transition={{ repeat: Infinity, duration: 18, ease: 'easeInOut' }}
			/>
			<motion.span
				aria-hidden
				className="pointer-events-none absolute -bottom-32 -right-32 h-[28rem] w-[28rem] rounded-full bg-emerald-200/50 blur-3xl dark:bg-emerald-800/40"
				style={{ y: blobYRight, willChange: 'transform' }}
				animate={orbitAnimate}
				transition={{ repeat: Infinity, duration: 22, ease: 'easeInOut' }}
			/>

			<div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="grid items-center gap-16 lg:grid-cols-2">
					{/* Text column */}
					<motion.div
						variants={container}
						initial="hidden"
						whileInView="show"
						viewport={{ once: true, amount: 0.6 }}
					>
						<motion.div
							className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-medium tracking-wider text-green-800 ring-1 ring-green-600/20 backdrop-blur dark:bg-white/10 dark:text-green-300 dark:ring-green-500/20"
							variants={fadeUp}
						>
							Tryglund
							<span className="h-1 w-1 rounded-full bg-green-700 dark:bg-green-300" />
							Professionel omsorg
						</motion.div>

						<motion.h1
							className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-neutral-900 dark:text-white md:text-5xl lg:text-6xl"
							variants={fadeUp}
						>
							Akut, døgn{' '}
							<span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text font-extrabold text-transparent dark:from-green-400 dark:to-emerald-300">
								tilgængelighed
							</span>{' '}
							og målrettet indsats
						</motion.h1>

						<motion.p
							className="mt-6 max-w-xl text-lg text-neutral-700 dark:text-neutral-300"
							variants={fadeUp}
						>
							Vi tilbyder{' '}
							<span className="font-semibold">
								spezialiserede og skræddersyede løsninger
							</span>{' '}
							til borgere med komplekse behov – hurtigt, trygt og professionelt.
						</motion.p>

						{/* Features */}
						<motion.ul className="mt-8 grid gap-3 text-base" variants={container}>
							{features.map((item) => (
								<motion.li
									key={item}
									className="flex items-start gap-2 text-neutral-800 dark:text-neutral-200"
									variants={featureItem}
									whileHover={{ x: 3 }}
									transition={{ type: 'spring', stiffness: 200, damping: 16 }}
								>
									<CheckCircle2
										className="mt-0.5 shrink-0 text-green-700 dark:text-green-400"
										size={20}
									/>
									<span>{item}</span>
								</motion.li>
							))}
						</motion.ul>

						{/* CTAs */}
						<motion.div className="mt-10 flex flex-wrap gap-4" variants={fadeUp}>
							<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
								<Link
									to="/indsatser"
									className="inline-flex items-center gap-2 rounded-full bg-green-600 px-6 py-3 text-white shadow-lg shadow-green-600/20 transition hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600/40 dark:bg-green-500 dark:hover:bg-green-600"
								>
									Læs mere <ArrowRight size={18} />
								</Link>
							</motion.div>

							<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
								<Link
									to="/kontakt"
									className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-3 text-neutral-900 shadow-sm transition hover:bg-neutral-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700"
								>
									Kontakt os
								</Link>
							</motion.div>

							<motion.a
								href="tel:+4522550635"
								className="group inline-flex items-center gap-2 rounded-full border border-green-600/30 bg-green-50 px-6 py-3 text-green-800 transition hover:bg-green-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600/30 dark:border-green-500/30 dark:bg-green-900/40 dark:text-green-300 dark:hover:bg-green-800/50"
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.97 }}
							>
								<Phone size={18} />
								Akut: +45 22 55 06 35
							</motion.a>
						</motion.div>
					</motion.div>

					{/* Visual */}
					<motion.div
						ref={visualRef}
						onMouseMove={onMouseMove}
						onMouseLeave={onMouseLeave}
						className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl shadow-2xl"
						style={{
							transformPerspective: 900,
							rotateX: prefersReduced ? 0 : tiltXSmooth,
							rotateY: prefersReduced ? 0 : tiltYSmooth,
							x: prefersReduced ? 0 : pxSmooth,
							y: prefersReduced ? 0 : pySmooth,
							willChange: 'transform',
						}}
					>
						<motion.video
							src="/media/videos/hero.mp4"
							autoPlay
							loop
							muted
							playsInline
							className="h-full w-full object-cover"
							style={{ scale: videoScale, y: videoLift, willChange: 'transform' }}
						/>

						{/* Soft vignette for depth */}
						<div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-black/10" />
					</motion.div>
				</div>
			</div>
		</section>
	);
}
