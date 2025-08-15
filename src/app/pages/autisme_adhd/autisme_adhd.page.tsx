import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Users, LayoutDashboard, MessageSquareHeart, Lightbulb } from 'lucide-react';

const timeline = [
	{
		title: 'Autismespektrumforstyrrelser & ADHD',
		icon: Users,
		description:
			'Neuroudviklingsforstyrrelser, der påvirker tænkning, adfærd og sociale relationer. Vi skaber struktur, der tager højde for sansning, impulsivitet og koncentration.',
	},
	{
		title: 'Strukturpædagogik',
		icon: LayoutDashboard,
		description:
			'Gennem visuelle skemaer, rutiner og klare forventninger reducerer vi stress og støtter selvstændighed.',
	},
	{
		title: 'Relationspædagogik',
		icon: MessageSquareHeart,
		description:
			'Nærvær og tillid danner grundlag for trivsel. Vi arbejder med anerkendelse, relation og kontinuitet.',
	},
	{
		title: 'Kognitiv tilgang / KAT',
		icon: Lightbulb,
		description:
			'KAT hjælper med at forstå og regulere følelser og tanker. En vej til øget selvindsigt og mestring.',
	},
];

export default function ASDAndADHDPage() {
	return (
		<main className="bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
			<Helmet>
				<title>Autismespektrum & ADHD – Tryglund</title>
			</Helmet>

			{/* Hero */}
			<section className="py-28 pt-44 px-6 text-center bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-900/10 dark:to-neutral-950">
				<div className="max-w-3xl mx-auto">
					<span className="inline-block bg-emerald-100 dark:bg-emerald-800/20 text-emerald-700 dark:text-emerald-300 text-sm px-3 py-1 rounded-full mb-4 font-medium">
						Specialpædagogiske tilgange
					</span>
					<h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight tracking-tight">
						Målrettet støtte ved autisme og ADHD
					</h1>
					<p className="text-lg md:text-xl text-neutral-700 dark:text-neutral-300 leading-relaxed">
						Vi forener struktur, relation og refleksion – skræddersyet til det enkelte
						menneske.
					</p>
				</div>
			</section>

			{/* Timeline Section */}
			<section className="max-w-5xl mx-auto px-6 py-28 space-y-20">
				{timeline.map(({ title, description, icon: Icon }, idx) => (
					<motion.div
						key={title}
						initial={{ opacity: 0, y: 24 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: idx * 0.1 }}
						className="relative"
					>
						{/* Animated Card with Hover */}
						<motion.div
							whileHover={{
								scale: 1.03,
								boxShadow: '0px 10px 30px rgba(16, 185, 129, 0.25)',
							}}
							transition={{
								type: 'spring', 
								stiffness: 260,
								damping: 20,
							}}
							className="relative bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl px-6 py-8 md:px-10 transition-all duration-300 hover:ring-2 hover:ring-emerald-400/50 cursor-pointer"
						>
							<div className="flex items-start gap-4">
								<div className="shrink-0">
									<div className="h-12 w-12 rounded-xl flex items-center justify-center bg-emerald-100 dark:bg-emerald-800/20 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-600/10">
										<Icon size={24} />
									</div>
								</div>
								<div>
									<h3 className="text-xl font-semibold mb-2">{title}</h3>
									<p className="text-neutral-700 dark:text-neutral-300 text-[15px] leading-relaxed">
										{description}
									</p>
								</div>
							</div>
						</motion.div>

						{/* Enhanced Line Below */}
						<motion.div
							initial={{ scaleX: 0 }}
							whileInView={{ scaleX: 1 }}
							transition={{ duration: 0.6, delay: idx * 0.1 }}
							viewport={{ once: true }}
							className="h-1 w-28 mx-auto mt-10 rounded-full bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-400 opacity-60 origin-center"
						/>
					</motion.div>
				))}
			</section>

			{/* CTA */}
			<section className="py-24 px-6 bg-gradient-to-br from-neutral-100 to-white dark:from-neutral-900 dark:to-neutral-950 text-center">
				<div className="max-w-2xl mx-auto">
					<motion.h2
						className="text-3xl md:text-4xl font-bold mb-4"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.1 }}
						viewport={{ once: true }}
					>
						Vil du vide mere?
					</motion.h2>
					<motion.p
						className="text-lg text-neutral-700 dark:text-neutral-300 mb-6"
						initial={{ opacity: 0, y: 10 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						viewport={{ once: true }}
					>
						Kontakt os for en uforpligtende samtale om, hvordan vi skaber de rette
						rammer for unge og voksne med autismespektrumforstyrrelser og ADHD.
					</motion.p>
					<motion.a
						href="/kontakt"
						initial={{ opacity: 0, y: 10 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.3 }}
						className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-3 rounded-full transition shadow-md hover:shadow-lg"
						viewport={{ once: true }}
					>
						Kontakt os
					</motion.a>
				</div>
			</section>
		</main>
	);
}
