import { Helmet } from 'react-helmet';
import { useState } from 'react';
import { motion, cubicBezier } from 'framer-motion';
import { ChevronDown, ChevronUp, Lightbulb, HeartHandshake, ShieldCheck } from 'lucide-react';
import ROUTES from 'src/static/router.data';

const EASE = cubicBezier(0.22, 1, 0.36, 1);

export default function PsykiskeVanskelighederPage() {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const toggle = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	const accordionData = [
		{
			title: 'Traumebevidst tilgang (TBT)',
			icon: <HeartHandshake className="text-emerald-600 dark:text-emerald-400" size={22} />,
			content: (
				<>
					TBT tager udgangspunkt i, hvordan traumer påvirker adfærd og trivsel. Gennem
					trygge rammer, forudsigelighed og stabile relationer arbejder vi med at skabe en
					omsorgsfuld hverdag, hvor tillid er vigtigere end kontrol.
				</>
			),
		},
		{
			title: 'Low Arousal',
			icon: <ShieldCheck className="text-emerald-600 dark:text-emerald-400" size={22} />,
			content: (
				<>
					Low Arousal handler om at nedtrappe konflikter og undgå eskalation. Med lav
					affekt, tålmodighed og rolig kommunikation støtter vi borgerens selvregulering
					og sikrer et trygt miljø – selv i pressede situationer.
				</>
			),
		},
		{
			title: 'Miljøterapi & miljøpædagogik',
			icon: <Lightbulb className="text-emerald-600 dark:text-emerald-400" size={22} />,
			content: (
				<>
					Det pædagogiske miljø bruges aktivt som en del af behandlingen. Strukturerede
					rammer, hverdagsaktiviteter og relationelle indsatser skaber trygge og
					meningsfulde hverdage, der understøtter udvikling, læring og trivsel.
				</>
			),
		},
		{
			title: 'Akut og struktureret støtte',
			icon: <ShieldCheck className="text-emerald-600 dark:text-emerald-400" size={22} />,
			content: (
				<>
					Nogle borgere har behov for akut støtte i svære perioder. Vi arbejder med
					struktur, tilgængelighed og tæt relation, så borgeren oplever sig mødt og
					aflastet, når behovet er størst. Det giver mulighed for at genetablere ro og
					stabilitet.
				</>
			),
		},
		{
			title: 'Et helhedsorienteret miljø',
			icon: <Lightbulb className="text-emerald-600 dark:text-emerald-400" size={22} />,
			content: (
				<>
					Vi ser borgeren i en helhed og arbejder med både den følelsesmæssige, sociale og
					kognitive trivsel. Vores miljøer er udviklet til at balancere struktur og
					fleksibilitet – med fokus på hverdagens muligheder som pædagogisk redskab.
				</>
			),
		},
	];

	return (
		<main className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white pt-24 dark:from-neutral-950 dark:to-neutral-900 text-neutral-900 dark:text-neutral-100">
			<Helmet>
				<title>Psykiske vanskeligheder – Trygbasen</title>
			</Helmet>

			{/* Background blobs */}
			<motion.span
				aria-hidden
				className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-emerald-300/40 blur-3xl dark:bg-emerald-700/30"
				initial={{ opacity: 0.4, y: -12 }}
				animate={{ opacity: 0.6, y: 12 }}
				transition={{ repeat: Infinity, repeatType: 'mirror', duration: 9, ease: EASE }}
			/>
			<motion.span
				aria-hidden
				className="pointer-events-none absolute -bottom-32 -right-32 h-[28rem] w-[28rem] rounded-full bg-green-200/50 blur-3xl dark:bg-green-800/40"
				initial={{ opacity: 0.4, y: 12 }}
				animate={{ opacity: 0.6, y: -12 }}
				transition={{ repeat: Infinity, repeatType: 'mirror', duration: 10, ease: EASE }}
			/>

			{/* Section 1: Hero & Box */}
			<section className="relative px-6 md:px-10 py-24">
				<div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 items-start">
					{/* Text block */}
					<div className="md:col-span-2">
						<h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
							Trygge rammer ved psykiske vanskeligheder
						</h1>
						<p className="text-lg md:text-xl text-neutral-700 dark:text-neutral-300 mb-6">
							Vi arbejder med unge og voksne, der har psykiske vanskeligheder som
							angst, PTSD, depression eller borderline. Vores tilgang bygger på
							tillid, respekt og faglige metoder.
						</p>
					</div>

					{/* List box */}
					<div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-sm">
						<h2 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-4 uppercase tracking-wide">
							Vi tilbyder:
						</h2>
						<ul className="space-y-3 text-sm text-neutral-800 dark:text-neutral-300">
							<li>• Traumebevidst tilgang (TBT)</li>
							<li>• Low Arousal konfliktnedtrapning</li>
							<li>• Miljøterapi og miljøpædagogik</li>
							<li>• Akut og struktureret støtte</li>
						</ul>
					</div>
				</div>
			</section>

			{/* Section 2: Accordion */}
			<section className="max-w-4xl mx-auto py-20 px-6 md:px-10">
				<h2 className="text-3xl font-semibold text-center mb-12">
					Vores tilgange i praksis
				</h2>

				<div className="space-y-6">
					{accordionData.map((item, index) => {
						const isOpen = openIndex === index;

						return (
							<div
								key={index}
								className="border border-neutral-200 dark:border-neutral-800 rounded-xl bg-neutral-50 dark:bg-neutral-900 shadow-sm transition-shadow"
							>
								<button
									onClick={() => toggle(index)}
									className="w-full flex items-center justify-between p-5 group focus:outline-none hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
									aria-expanded={isOpen}
								>
									<div className="flex items-center gap-3 text-left">
										{item.icon}
										<span className="text-lg font-medium">{item.title}</span>
									</div>
									<div className="transition-transform duration-300 ease-in-out">
										{isOpen ? (
											<ChevronUp className="text-neutral-600 dark:text-neutral-300" />
										) : (
											<ChevronDown className="text-neutral-600 dark:text-neutral-300" />
										)}
									</div>
								</button>

								{/* Animated drop area */}
								<motion.div
									initial={{ height: 0, opacity: 0 }}
									animate={{
										height: isOpen ? 'auto' : 0,
										opacity: isOpen ? 1 : 0,
									}}
									transition={{ duration: 0.4, ease: EASE }}
									className="overflow-hidden"
								>
									<div className="px-5 py-5 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
										{item.content}
									</div>
								</motion.div>
							</div>
						);
					})}
				</div>
			</section>

			{/* Section 3: CTA */}
			{/* Section 3: CTA */}
			<section className="relative overflow-hidden py-24 bg-gradient-to-br from-emerald-100/50 to-white dark:from-emerald-900/30 dark:to-neutral-950">
				{/* Decorative blur background */}
				<div
					aria-hidden
					className="pointer-events-none absolute -top-20 right-10 h-64 w-64 rounded-full bg-emerald-300/30 blur-3xl dark:bg-emerald-600/20"
				/>

				<div className="max-w-4xl mx-auto px-6 text-center">
					<h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
						Er du nysgerrig på vores arbejde?
					</h2>
					<p className="text-neutral-700 dark:text-neutral-300 text-base md:text-lg mb-6">
						Vi står klar til en uforpligtende dialog om, hvordan vi arbejder med
						psykiske vanskeligheder og komplekse udfordringer – med relation og
						faglighed i centrum.
					</p>
					<p className="text-sm text-neutral-500 dark:text-neutral-400 mb-8">
						Vores mål er at skabe trygge, udviklende og meningsfulde forløb –
						skræddersyet til det enkelte menneske.
					</p>

					<a
						href={ROUTES.kontakt}	
						className="inline-flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-full shadow-md transition-transform hover:-translate-y-0.5"
					>
						<span>Kontakt os</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M17 8l4 4m0 0l-4 4m4-4H3"
							/>
						</svg>
					</a>
				</div>
			</section>
		</main>
	);
}
