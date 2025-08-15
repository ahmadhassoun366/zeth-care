import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { HeartHandshake, ShieldCheck, Sparkles, Lightbulb, Repeat } from 'lucide-react';

export default function JobsPage() {
	const reasons = [
		{
			title: 'Meningsfuld hverdag',
			desc: 'Vi kombinerer høj faglighed med varme og nærvær for at skabe livskvalitet.',
			icon: HeartHandshake,
		},
		{
			title: 'Skærmet og trygt miljø',
			desc: 'Et struktureret pædagogisk miljø, der reducerer stress og uhensigtsmæssig adfærd.',
			icon: ShieldCheck,
		},
		{
			title: 'Stabile relationer',
			desc: 'Vi arbejder vedholdende med relationer som fundament for udvikling.',
			icon: Sparkles,
		},
		{
			title: 'Forebygger institutionsskader',
			desc: 'Vi styrker den enkeltes livsmestring og selvstændighed i stedet for afhængighed.',
			icon: Lightbulb,
		},
		{
			title: 'Fleksible løsninger',
			desc: 'Vi er løsningsorienterede og tilpasser os borgerens behov.',
			icon: Repeat,
		},
	];

	return (
		<main className="bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
			<Helmet>
				<title>Hvorfor vælge os? – Tryglund</title>
			</Helmet>

			{/* Hero Section */}
			<section className="py-24 pt-44 px-6 bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-900/10 dark:to-neutral-950">
				<div className="max-w-6xl mx-auto text-center">
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="text-4xl md:text-5xl font-bold mb-4"
					>
						Hvorfor vælge os?
					</motion.h1>
					<p className="text-lg text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto">
						Et trygt, professionelt og udviklingsfokuseret sted at arbejde – med
						borgeren i centrum.
					</p>
				</div>
			</section>

			{/* Benefits + Contact Section */}
			<section className="py-32 px-6">
				<div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-14">
					{/* Left: Benefits */}
					<div className="md:col-span-2 space-y-8">
						{reasons.map(({ title, desc, icon: Icon }, idx) => (
							<motion.div
								key={title}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: idx * 0.1 }}
								className="flex items-start gap-5"
							>
								<Icon
									className="text-emerald-600 dark:text-emerald-400 mt-1"
									size={28}
								/>
								<div>
									<h3 className="text-lg font-semibold mb-1">{title}</h3>
									<p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
										{desc}
									</p>
								</div>
							</motion.div>
						))}
					</div>

					{/* Right: Contact column */}
					<div className=" shadow-sm sticky top-32 flex flex-col justify-center">
						<div className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
							<h2 className="text-xl font-semibold mb-4">Kontakt os</h2>
							<p className="text-sm text-neutral-600 dark:text-neutral-300 mb-6">
								Er du interesseret i at arbejde hos os eller vil du høre mere om
								vores pædagogiske miljø?
							</p>

							<a
								href="/kontakt"
								className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-3 rounded-full transition"
							>
								Send en besked
							</a>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
