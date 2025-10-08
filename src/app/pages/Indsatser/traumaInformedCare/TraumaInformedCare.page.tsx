import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { HeartHandshake, ShieldCheck, SmilePlus, CircleSlash } from 'lucide-react';
import ROUTES from 'src/static/router.data';

export default function TraumaInformedCarePage() {
	return (
		<main className="bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
			<Helmet>
				<title>Kognitiv & Traumebevidst Pædagogik – Trygbasen</title>
			</Helmet>

			{/* Hero Section */}
			<section className="relative py-36 px-6 bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
				{/* Background Image */}
				<div className="absolute inset-0 z-0">
					<img
						src="https://images.unsplash.com/photo-1499887142886-791eca5918cd?auto=format&fit=crop&w=1600&q=80"
						alt="Omsorg og tryghed"
						className="w-full h-full object-cover opacity-40 dark:opacity-30"
					/>
					<div className="absolute inset-0 bg-white/70 dark:bg-neutral-950/60 backdrop-blur-sm" />
				</div>

				{/* Content */}
				<div className="relative max-w-4xl mx-auto text-center">
					<motion.h1
						className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
						Traume­bevidst & kognitiv pædagogik
					</motion.h1>
					<motion.p
						className="text-lg md:text-xl text-neutral-700 dark:text-neutral-300 mb-4"
						initial={{ opacity: 0, y: 10 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.1 }}
					>
						Vi møder barnet med forståelse – ikke straf. Adfærden er ikke problemet, men
						et vindue til det oplevede.
					</motion.p>
					<p className="text-base text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto">
						Vores tilgang bygger på tryghed, forudsigelighed og en relation, der hverken
						overvælder eller overlader barnet alene.
					</p>
				</div>
			</section>

			{/* Principles Timeline Section */}
			<section className="relative py-32 px-6 bg-white dark:bg-neutral-950 overflow-hidden">
				{/* Decorative Blur Accent */}
				<div
					className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-emerald-300/20 dark:bg-emerald-600/10 blur-3xl"
					aria-hidden
				/>
				<div
					className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-emerald-200/20 dark:bg-emerald-800/10 blur-3xl"
					aria-hidden
				/>

				<div className="max-w-5xl mx-auto relative">
					<div className="text-center mb-20">
						<h2 className="text-3xl md:text-4xl font-semibold mb-4">
							Centrale principper i praksis
						</h2>
						<p className="text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
							Vi støtter børn og unge gennem etiske, anerkendende og traumesensitive
							metoder.
						</p>
					</div>

					{/* Timeline Style Items */}
					<div className="relative border-l-4 border-emerald-500/50 dark:border-emerald-500/30 pl-10 space-y-16">
						{[
							{
								title: 'Kognitiv adfærdsterapi (KAT)',
								desc: 'Vi hjælper barnet med at forstå sine tanker, følelser og reaktioner gennem konkrete værktøjer.',
								icon: SmilePlus,
							},
							{
								title: 'Traumebevidst pædagogik',
								desc: 'Adfærd ses som overlevelse. Vi møder med respekt, ikke konfrontation.',
								icon: HeartHandshake,
							},
							{
								title: 'Tryghed & forudsigelighed',
								desc: 'Vi skaber struktur og overskuelighed, der giver barnet mulighed for at falde til ro.',
								icon: ShieldCheck,
							},
							{
								title: 'Ingen straf – ingen skam',
								desc: 'Vi arbejder aldrig med kontrol eller skam, men med relation, støtte og mening.',
								icon: CircleSlash,
							},
						].map(({ title, desc, icon: Icon }, idx) => (
							<motion.div
								key={title}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: idx * 0.1 }}
								className="relative"
							>
								{/* Icon circle */}
								<div className="absolute -left-[2.15rem] top-1 bg-white dark:bg-neutral-950 border-2 border-emerald-500 w-10 h-10 rounded-full flex items-center justify-center shadow-md">
									<Icon
										className="text-emerald-600 dark:text-emerald-400"
										size={20}
									/>
								</div>

								<div className="pl-4">
									<h3 className="text-xl font-semibold mb-1">{title}</h3>
									<p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
										{desc}
									</p>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Afstemt Voksenkontakt */}
			<section className="bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-900/10 dark:to-neutral-950 py-28 px-6">
				<div className="max-w-4xl mx-auto text-center">
					<motion.h2
						className="text-3xl md:text-4xl font-bold mb-6"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
						Afstemt voksenkontakt
					</motion.h2>
					<motion.p
						className="text-lg text-neutral-700 dark:text-neutral-300 mb-6"
						initial={{ opacity: 0, y: 10 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.1 }}
					>
						Vi tilpasser kontakt og stimuli, så barnet ikke bliver over- eller
						underinvolveret. Det er balancen, der skaber tryghed og udvikling.
					</motion.p>
					<blockquote className="text-xl italic font-medium text-neutral-800 dark:text-neutral-100">
						"For meget kan overvælde – for lidt kan efterlade alene."
					</blockquote>
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
						Er du nysgerrig på vores tilgang?
					</motion.h2>
					<p className="text-lg mb-6">
						Vi står klar til en dialog om, hvordan vi kan støtte børn med traumer gennem
						pædagogik med omsorg og faglighed.
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
