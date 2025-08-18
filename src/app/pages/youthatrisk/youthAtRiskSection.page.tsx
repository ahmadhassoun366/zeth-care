import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ShieldAlert, MessageCircleHeart, BookOpenText, Brain, Sparkles } from 'lucide-react';
import ROUTES from 'src/static/router.data';

const principles = [
	{
		title: 'Konsekvenspædagogik & social træning',
		desc: 'Vi tydeliggør sammenhængen mellem handling og konsekvens, så individet lærer gennem praksis og refleksion.',
		icon: ShieldAlert,
	},
	{
		title: 'Narrativ pædagogik',
		desc: 'Vi hjælper den unge med at genfortælle sin livshistorie med fokus på ressourcer og muligheder – ikke fejl.',
		icon: BookOpenText,
	},
	{
		title: 'Motiverende samtale (MI)',
		desc: 'Via respektfuld dialog støtter vi indre motivation og ejerskab til forandring.',
		icon: MessageCircleHeart,
	},
	{
		title: 'Kognitiv adfærdspædagogik (KAT)',
		desc: 'Vi arbejder med bevidstgørelse og forandring af tanker, følelser og handlinger gennem konkrete redskaber.',
		icon: Brain,
	},
	{
		title: 'Anerkendende pædagogik',
		desc: 'Vi ser det, der virker – og styrker den unges selvværd gennem respekt, relationer og tryghed.',
		icon: Sparkles,
	},
];

export default function YouthAtRiskPage() {
	return (
		<main className="bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
			<Helmet>
				<title>Kriminalitetstruede unge – Tryglund</title>
			</Helmet>

			{/* Hero */}
			<section className="relative py-32 px-6 bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-900/10 dark:to-neutral-950">
				<div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7 }}
					>
						<h1 className="text-4xl md:text-5xl font-extrabold mb-6">
							Forebyggende pædagogik for unge i risikozonen
						</h1>
						<p className="text-lg text-neutral-700 dark:text-neutral-300 mb-4">
							Vi arbejder med metoder, der skaber ejerskab, refleksion og positive
							identiteter – til unge på kanten.
						</p>
						<p className="text-base text-neutral-500 dark:text-neutral-400">
							Relationer, respekt og struktur er fundamentet for forandring.
						</p>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7 }}
					>
						<img
							src="https://images.unsplash.com/photo-1573164574572-cb89e39749b4?auto=format&fit=crop&w=1000&q=80"
							alt="Ung og støtte"
							className="rounded-xl shadow-lg w-full object-cover aspect-[4/3]"
						/>
					</motion.div>
				</div>
			</section>

			{/* Approaches Grid */}
			<section className="py-32 px-6 bg-white dark:bg-neutral-950">
				<div className="max-w-6xl mx-auto">
					<div className="text-center mb-20">
						<h2 className="text-3xl md:text-4xl font-semibold mb-4">
							Pædagogiske metoder i praksis
						</h2>
						<p className="text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
							Vi anvender evidensbaserede og erfaringsbaserede tilgange, der bygger
							kompetencer, relationer og motivation.
						</p>
					</div>

					<div className="grid md:grid-cols-2 gap-10">
						{principles.map(({ title, desc, icon: Icon }, idx) => (
							<motion.div
								key={title}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: idx * 0.1 }}
								className="flex items-start gap-5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-sm hover:shadow-md transition"
							>
								<div className="mt-1">
									<Icon
										size={28}
										className="text-emerald-600 dark:text-emerald-400"
									/>
								</div>
								<div>
									<h3 className="text-lg font-semibold mb-1">{title}</h3>
									<p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
										{desc}
									</p>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="py-24 px-6 bg-emerald-600 text-white text-center">
				<div className="max-w-2xl mx-auto">
					<motion.h2
						className="text-3xl md:text-4xl font-bold mb-4"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
					>
						Vi tror på udvikling – også når det er svært
					</motion.h2>
					<p className="text-lg mb-6">
						Kontakt os for en uforpligtende samtale om, hvordan vi kan støtte unge med
						risikoadfærd på vej mod nye muligheder.
					</p>
					<a
						href={ROUTES.kontakt}
						className="inline-block bg-white text-emerald-700 hover:bg-emerald-100 font-medium px-8 py-3 rounded-full transition"
					>
						Kontakt os
					</a>
				</div>
			</section>
		</main>
	);
}
