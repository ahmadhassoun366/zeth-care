import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { HeartHandshake, UserX, Cross, MessageSquareText } from 'lucide-react';
import ROUTES from 'src/static/router.data';

export default function SubstanceAbusePage() {
	return (
		<main className="relative overflow-hidden bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
			<Helmet>
				<title>Misbrug & Dobbeltdiagnoser – Trygbasen</title>
			</Helmet>

			{/* Background blobs */}
			<motion.span
				aria-hidden
				className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-emerald-300/30 blur-3xl dark:bg-emerald-700/20"
				initial={{ opacity: 0.4, y: -12 }}
				animate={{ opacity: 0.6, y: 12 }}
				transition={{ repeat: Infinity, repeatType: 'mirror', duration: 9 }}
			/>
			<motion.span
				aria-hidden
				className="pointer-events-none absolute -bottom-32 -right-32 h-[28rem] w-[28rem] rounded-full bg-green-200/40 blur-3xl dark:bg-emerald-800/30"
				initial={{ opacity: 0.4, y: 12 }}
				animate={{ opacity: 0.6, y: -12 }}
				transition={{ repeat: Infinity, repeatType: 'mirror', duration: 10 }}
			/>

			{/* Hero */}
			<section className="bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-900/10 dark:to-neutral-950 py-28 px-6">
				<div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
					<div>
						<motion.h1
							className="text-4xl md:text-5xl font-bold mb-6"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
						>
							Misbrug og dobbeltdiagnoser
						</motion.h1>
						<p className="text-lg md:text-xl text-neutral-700 dark:text-neutral-300 leading-relaxed">
							Kompleks støtte, når psykisk sygdom og misbrug går hånd i hånd. Vi
							arbejder helhedsorienteret med både psykiatri og afhængighed.
						</p>
					</div>  
					<div className="hidden md:block">
						<img
							src="/media/images/subs.jpg" // Your actual image path
							alt="Støtte til mennesker med misbrug"
							className="aspect-square object-cover rounded-xl w-full h-full"
						/>
					</div>
				</div>
			</section>

			{/* Challenges */}
			<section className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-14 items-start">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					<h2 className="text-2xl font-semibold mb-4">Hvad er dobbeltdiagnoser?</h2>
					<p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
						Det handler om personer, der både kæmper med psykiske lidelser og misbrug.
						Ofte forstærker de to problemer hinanden og skaber barrierer for trivsel,
						relationer, bolig og sundhed. Derfor kræves integreret og samtidig støtte.
					</p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-sm"
				>
					<ul className="space-y-4 text-neutral-800 dark:text-neutral-200 text-base">
						<li className="flex items-center gap-3">
							<UserX className="text-emerald-600 dark:text-emerald-400" size={20} />
							Relationelle udfordringer & mistillid
						</li>
						<li className="flex items-center gap-3">
							<Cross className="text-emerald-600 dark:text-emerald-400" size={20} />
							Manglende stabilitet i hverdagen
						</li>
						<li className="flex items-center gap-3">
							<MessageSquareText
								className="text-emerald-600 dark:text-emerald-400"
								size={20}
							/>
							Stigmatisering og isolation
						</li>
					</ul>
				</motion.div>
			</section>

			{/* MI Section */}
			<section className="bg-gradient-to-br from-emerald-100 to-white dark:from-emerald-900/10 dark:to-neutral-950 py-28 px-6">
				<div className="max-w-4xl mx-auto text-center">
					<motion.h2
						className="text-3xl md:text-4xl font-bold mb-6"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
						Motiverende samtaler (MI)
					</motion.h2>
					<motion.p
						className="text-lg text-neutral-700 dark:text-neutral-300 mb-6"
						initial={{ opacity: 0, y: 10 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.1 }}
					>
						Vi arbejder med respektfuld dialog, der fremmer refleksion og ejerskab.
						Forandring sker bedst, når den kommer indefra.
					</motion.p>
					<blockquote className="text-xl italic font-medium text-neutral-800 dark:text-neutral-100">
						"MI handler ikke om at presse – men om at møde og motivere."
					</blockquote>
				</div>
			</section>

			{/* Cards */}
			<section className="max-w-6xl mx-auto px-6 py-28">
				<div className="text-center mb-12">
					<h2 className="text-3xl font-semibold">Vores tilgang</h2>
					<p className="text-neutral-600 dark:text-neutral-300 mt-2">
						Specialiseret pædagogik, der forener psykiatri og misbrugsstøtte.
					</p>
				</div>

				<div className="grid md:grid-cols-3 gap-8">
					{[
						{
							title: 'Helhedsorienteret støtte',
							text: 'Vi arbejder parallelt med både psykisk lidelse og misbrug.',
							icon: HeartHandshake,
						},
						{
							title: 'Motiverende tilgang',
							text: 'Forandring skabes gennem dialog, ikke kontrol.',
							icon: MessageSquareText,
						},
						{
							title: 'Tæt relation & tillid',
							text: 'Stærke relationer er fundamentet i vores indsats.',
							icon: UserX,
						},
					].map(({ title, text, icon: Icon }, idx) => (
						<motion.div
							key={title}
							whileHover={{ scale: 1.03 }}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: idx * 0.1 }}
							className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-md hover:shadow-lg transition"
						>
							<div className="flex items-center gap-4 mb-4">
								<Icon
									className="text-emerald-600 dark:text-emerald-400"
									size={26}
								/>
								<h3 className="text-lg font-semibold">{title}</h3>
							</div>
							<p className="text-sm text-neutral-700 dark:text-neutral-300">{text}</p>
						</motion.div>
					))}
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
						Tag kontakt og hør mere
					</motion.h2>
					<p className="text-lg mb-6">
						Vi tilbyder professionel støtte til mennesker med dobbeltdiagnoser. Lad os
						tage en uforpligtende dialog.
					</p>
					<a
						href={ROUTES.kontakt}
						className="inline-block bg-white text-emerald-700 hover:bg-emerald-100 font-medium px-8 py-3 rounded-full transition hover:scale-105"
					>
						Kontakt os
					</a>
				</div>
			</section>
		</main>
	);
}
