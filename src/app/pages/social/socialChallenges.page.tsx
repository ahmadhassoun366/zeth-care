import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import {
	MessageSquareHeart,
	Smile,
	UsersRound,
	Quote,
} from 'lucide-react';

export default function SocialChallengesPage() {
	return (
		<main className="bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
			<Helmet>
				<title>Sociale udfordringer – Tryglund</title>
			</Helmet>

			{/* Hero Section */}
			<section className="py-28 pt-44 px-6 text-center bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-900/10 dark:to-neutral-950">
				<div className="max-w-3xl mx-auto">
					<motion.h1
						className="text-4xl md:text-5xl font-bold mb-6 leading-tight tracking-tight"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
						Støtte ved sociale udfordringer og isolation
					</motion.h1>
					<p className="text-lg md:text-xl text-neutral-700 dark:text-neutral-300">
						Vi hjælper mennesker tilbage i fællesskabet gennem relation, ressourcer og
						narrativ forståelse.
					</p>
				</div>
			</section>

			{/* Section: About the Challenges */}
			<section className="max-w-5xl mx-auto px-6 md:px-10 py-24 grid md:grid-cols-2 gap-16 items-center">
				<div>
					<h2 className="text-2xl font-semibold mb-4">
						Isolation og marginalisering
					</h2>
					<p className="text-neutral-700 dark:text-neutral-300 text-lg leading-relaxed">
						Mennesker, der føler sig udenfor fællesskabet – på grund af diagnose,
						kultur, tidligere oplevelser eller adfærd – kan opleve ensomhed, lavt
						selvværd og manglende tillid til andre.
					</p>
				</div>
				<motion.div
					className="bg-emerald-100 dark:bg-emerald-800/10 p-10 rounded-xl"
					initial={{ opacity: 0, scale: 0.95 }}
					whileInView={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.6 }}
				>
					<UsersRound className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mb-4" />
					<p className="text-md text-neutral-800 dark:text-neutral-200">
						Vi skaber relationer, der bygger bro mellem individ og fællesskab.
					</p>
				</motion.div>
			</section>

			{/* Methods Grid */}
			<section className="bg-neutral-50 dark:bg-neutral-900 py-24 px-6">
				<div className="max-w-6xl mx-auto text-center mb-12">
					<h2 className="text-3xl font-semibold">Vores pædagogiske tilgange</h2>
					<p className="text-neutral-600 dark:text-neutral-300 mt-2">
						Tilpasset hver enkelt persons behov og muligheder.
					</p>
				</div>

				<div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
					{[
						{
							icon: MessageSquareHeart,
							title: 'Relationspædagogik',
							text: 'Vi bygger tillid gennem nærvær, kontinuitet og anerkendelse.',
						},
						{
							icon: Smile,
							title: 'Ressourcefokuseret tilgang',
							text: 'Vi arbejder med det, der virker – ikke det, der mangler.',
						},
						{
							icon: UsersRound,
							title: 'Social færdighedstræning',
							text: 'Vi træner konkrete situationer: kontakt, konflikter, samspil.',
						},
						{
							icon: Quote,
							title: 'Narrativ tilgang',
							text: 'Vi hjælper med at omskrive livshistorien med fokus på styrker.',
						},
					].map(({ icon: Icon, title, text }, index) => (
						<motion.div
							key={title}
							whileHover={{ scale: 1.02 }}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 text-left shadow-sm hover:shadow-md transition"
						>
							<div className="flex items-center gap-4 mb-4">
								<Icon className="text-emerald-600 dark:text-emerald-400" size={28} />
								<h3 className="text-xl font-semibold">{title}</h3>
							</div>
							<p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
								{text}
							</p>
						</motion.div>
					))}
				</div>
			</section>

			{/* Narrative Highlight Block */}
			<section className="py-24 px-6 bg-gradient-to-br from-white to-emerald-50 dark:from-neutral-950 dark:to-emerald-900/10">
				<div className="max-w-4xl mx-auto text-center">
					<motion.blockquote
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="text-xl md:text-2xl font-medium italic text-neutral-800 dark:text-neutral-200"
					>
						"Du er ikke dine problemer – du er dine erfaringer, dine styrker og dine
						historier. Vi hjælper dig med at fortælle dem på ny."
					</motion.blockquote>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-24 px-6 bg-emerald-600 text-white text-center">
				<div className="max-w-2xl mx-auto">
					<motion.h2
						className="text-3xl md:text-4xl font-bold mb-4"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
					>
						Vil du vide mere?
					</motion.h2>
					<p className="text-lg mb-6">
						Kontakt os og hør mere om vores specialpædagogiske tilgang til sociale
						udfordringer og isolation.
					</p>
					<a
						href="/kontakt"
						className="inline-block bg-white text-emerald-700 hover:bg-emerald-100 font-medium px-6 py-3 rounded-full transition"
					>
						Kontakt os
					</a>
				</div>
			</section>
		</main>
	);
}
