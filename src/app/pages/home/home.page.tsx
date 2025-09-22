// src/pages/HomeLanding.jsx
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Hero from './sections/hero-section.component';
import Pillars from './sections/pillar-section.component';
import Services from './sections/service-section.component';
import Stats from './sections/stand-band.section';
import AkutBar from './sections/akut-bar.section';
import About from './sections/about.section';
import ROUTES from 'src/static/router.data';

export default function HomeLanding() {
	return (
		<main className="bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50">
			{/* HERO */}
			<Hero />

			{/* VALUE PILLARS */}
			<Pillars />

			{/* SERVICES */}
			<Services />

			{/* STATS BAND */}

			<Stats />
			{/* EMERGENCY STRIP */}
			<AkutBar />

			{/* ABOUT */}

			<About />
			{/* CTA */}
			<section id="cta" className=" py-14 lg:py-20">
				<div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col items-center justify-between gap-6 rounded-3xl border p-8 text-center md:flex-row md:text-left dark:border-neutral-800">
						<div>
							<h3 className="text-2xl font-semibold">Klar til næste skridt?</h3>
							<p className="text-neutral-600 dark:text-neutral-300">
								Book en samtale – vi tilpasser indsatsen til jeres behov.
							</p>
						</div>
						<Link
							to={ROUTES.kontakt}
							className="inline-flex items-center gap-2 rounded-full btn-green px-5 py-3"
						>
							Kontakt & visitation <ArrowRight size={16} />
						</Link>
					</div>
				</div>
			</section>
		</main>
	);
}
