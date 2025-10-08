import * as React from 'react';
import emailjs from '@emailjs/browser';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import {
	Phone,
	Mail,
	Info,
	UserRound,
	ShieldCheck,
	ClipboardList,
	ArrowRight,
	CheckCircle2,
	MapPin,
	Clock4,
} from 'lucide-react';

// ────────────────────────────────────────────────────────────────────────────────
// Motion helpers
// ────────────────────────────────────────────────────────────────────────────────
const fadeUp = {
	hidden: { opacity: 0, y: 14 },
	show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 16 } },
} as const;

const stagger = {
	hidden: { opacity: 0 },
	show: { opacity: 1, transition: { staggerChildren: 0.08 } },
} as const;

// ────────────────────────────────────────────────────────────────────────────────
// Page
// ────────────────────────────────────────────────────────────────────────────────
export default function ContactPage() {
	const [status, setStatus] = React.useState<'idle' | 'success' | 'error'>('idle');

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const form = e.currentTarget;
		const data = Object.fromEntries(new FormData(form).entries());

		// Basic front-end validation
		if (!data.name || !data.email || !data.message) {
			setStatus('error');
			return;
		}

		try {
			await emailjs.send(
				'service_hku2s72', // Your Service ID
				'template_91dya1j', // Replace with your Template ID
				{
					name: data.name,
					email: data.email,
					phone: data.phone || '',
					role: data.role || '',
					message: data.message,
					consent: data.consent ? 'Yes' : 'No',
				},
				'es2VbB-v_DYBSXqre' // Replace with your Public Key
			);
			form.reset();
			setStatus('success');
		} catch (err) {
			console.error('EmailJS error:', err);
			setStatus('error');
		}
	}

	return (
		<main className="bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
			<Helmet>
				<title>Kontakt og Visitation – Trygbasen</title>
				<script type="application/ld+json">
					{JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'ContactPage',
						name: 'Kontakt og Visitation – Trygbasen',
						about: 'Kontakt og visitation for børn og unge',
						mainEntity: {
							'@type': 'Organization',
							name: 'Trygbasen',
							contactPoint: [
								{
									'@type': 'ContactPoint',
									contactType: 'Visitation',
									telephone: '60223347',
									email: 'ab@trygbasen.dk',
									areaServed: 'DK',
									availableLanguage: ['da'],
								},
							],
						},
					})}
				</script>
			</Helmet>

			{/* HERO */}
			<section className="relative overflow-hidden py-24 pt-44 px-6 bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-900/10 dark:to-neutral-950">
				{/* soft background accents */}
				<motion.div
					aria-hidden
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.8 }}
					className="pointer-events-none absolute inset-0"
				>
					<motion.div
						className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-emerald-400/20 blur-3xl"
						animate={{ x: [0, 20, -10, 0], y: [0, -8, 6, 0] }}
						transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
					/>
					<motion.div
						className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-emerald-300/20 blur-3xl"
						animate={{ x: [0, -15, 10, 0], y: [0, 10, -6, 0] }}
						transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
					/>
				</motion.div>

				<div className="max-w-6xl mx-auto text-center relative">
					<motion.div
						variants={stagger}
						initial="hidden"
						whileInView="show"
						viewport={{ once: true, amount: 0.6 }}
					>
						<motion.h1
							variants={fadeUp}
							className="text-4xl md:text-5xl font-bold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-700 to-emerald-500 dark:from-emerald-300 dark:to-emerald-400"
						>
							Kontakt og Visitation
						</motion.h1>
						<motion.p
							variants={fadeUp}
							className="text-lg text-neutral-700 dark:text-neutral-300 max-w-3xl mx-auto"
						>
							Har du et barn eller en ung, der har behov for et øjeblikkeligt tilbud?
							Kontakt os gerne for en indledende drøftelse – vi vurderer hver
							henvendelse individuelt, så vi kan skabe det rette match og den
							nødvendige støtte.
						</motion.p>
						<motion.div
							variants={fadeUp}
							className="mx-auto mt-6 h-px w-28 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-80"
						/>
					</motion.div>
				</div>
			</section>

			{/* CONTACT + PROCESS */}
			<section className="py-16 px-6">
				<div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-10 md:gap-12">
					{/* Left column: quick contact + info cards */}
					<div className="space-y-6 lg:col-span-1">
						<div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6">
							<h2 className="text-xl font-semibold mb-4">Kontakt os</h2>
							<div className="space-y-3 text-sm text-neutral-700 dark:text-neutral-300">
								<a
									href="tel:60223347"
									className="flex items-center gap-3 rounded-lg border border-neutral-200 dark:border-neutral-800 p-3 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition"
								>
									<Phone
										size={18}
										className="text-emerald-600 dark:text-emerald-400"
									/>
									<div>
										<div className="font-medium">Telefonisk kontakt</div>
										<div className="text-neutral-600 dark:text-neutral-400">
											60223347
										</div>
									</div>
								</a>
								<a
									href="mailto:AB@trygbasen.dk"
									className="flex items-center gap-3 rounded-lg border border-neutral-200 dark:border-neutral-800 p-3 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition"
								>
									<Mail
										size={18}
										className="text-emerald-600 dark:text-emerald-400"
									/>
									<div>
										<div className="font-medium">Mail kontakt</div>
										<div className="text-neutral-600 dark:text-neutral-400">
											AB@trygbasen.dk
										</div>
									</div>
								</a>
								<div className="flex items-center gap-3 rounded-lg border border-neutral-200 dark:border-neutral-800 p-3">
									<Clock4
										size={18}
										className="text-emerald-600 dark:text-emerald-400"
									/>
									<div>
										<div className="font-medium">Telefontid</div>
										<div className="text-neutral-600 dark:text-neutral-400">
											Alle dage · 24/7 (akutte henvendelser besvares hurtigst
											muligt)
										</div>
									</div>
								</div>
							</div>
							<p className="text-xs text-neutral-500 dark:text-neutral-400 mt-4 flex items-center gap-2">
								<Info size={14} /> Visitation sker i tæt samarbejde med anbringende
								myndighed og evt. netværk.
							</p>
						</div>

						<div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-900/10 dark:to-neutral-950 p-6">
							<h3 className="text-base font-semibold mb-3 flex items-center gap-2">
								<ShieldCheck
									size={18}
									className="text-emerald-600 dark:text-emerald-400"
								/>{' '}
								Sikkerhed & Fortrolighed
							</h3>
							<p className="text-sm text-neutral-700 dark:text-neutral-300">
								Vi behandler personoplysninger fortroligt og i overensstemmelse med
								gældende GDPR-regler. Del kun nødvendige oplysninger – vi aftaler
								tryg deling af følsomme data.
							</p>
						</div>

						<div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6">
							<h3 className="text-base font-semibold mb-3 flex items-center gap-2">
								<MapPin
									size={18}
									className="text-emerald-600 dark:text-emerald-400"
								/>{' '}
								Lokation
							</h3>
							<p className="text-sm text-neutral-700 dark:text-neutral-300">
								Trygbasen – Østjylland og omegn. Besøg efter aftale.
							</p>
						</div>
					</div>

					{/* Right column: form + process */}
					<div className="space-y-8 lg:col-span-2">
						{/* Process */}
						<div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6">
							<h2 className="text-xl font-semibold mb-5">Sådan foregår visitation</h2>
							<ol className="grid md:grid-cols-3 gap-4">
								{[
									{
										icon: (
											<UserRound
												size={18}
												className="text-emerald-600 dark:text-emerald-400"
											/>
										),
										title: 'Indledende kontakt',
										desc: 'Vi drøfter behov, muligheder og afklarer rammerne for et muligt forløb.',
									},
									{
										icon: (
											<ClipboardList
												size={18}
												className="text-emerald-600 dark:text-emerald-400"
											/>
										),
										title: 'Faglig vurdering',
										desc: 'Vi vurderer henvendelsen individuelt og matcher støtteomfang til barnet/unge.',
									},
									{
										icon: (
											<CheckCircle2
												size={18}
												className="text-emerald-600 dark:text-emerald-400"
											/>
										),
										title: 'Plan & opstart',
										desc: 'I samarbejde med myndighed og netværk udarbejdes plan – opstart aftales.',
									},
								].map((step, i) => (
									<li
										key={i}
										className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4"
									>
										<div className="flex items-center gap-2 mb-1">
											{step.icon}
											<span className="text-sm font-medium">
												{step.title}
											</span>
										</div>
										<p className="text-sm text-neutral-600 dark:text-neutral-400">
											{step.desc}
										</p>
									</li>
								))}
							</ol>
						</div>

						{/* Form */}
						<form
							onSubmit={handleSubmit}
							className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6"
						>
							<h2 className="text-xl font-semibold mb-5">Skriv til os</h2>

							{status === 'success' && (
								<div className="mb-5 rounded-lg border border-emerald-200 bg-emerald-50 dark:bg-emerald-900/10 dark:border-emerald-900/40 p-3 text-sm text-emerald-700 dark:text-emerald-300">
									Tak for din henvendelse. Vi vender tilbage hurtigst muligt.
								</div>
							)}
							{status === 'error' && (
								<div className="mb-5 rounded-lg border border-red-200 bg-red-50 dark:bg-red-900/10 dark:border-red-900/40 p-3 text-sm text-red-700 dark:text-red-300">
									Noget gik galt. Tjek venligst felterne og prøv igen.
								</div>
							)}

							<div className="grid md:grid-cols-2 gap-4">
								<div>
									<label
										htmlFor="name"
										className="block text-sm font-medium mb-1"
									>
										Navn
									</label>
									<input
										id="name"
										name="name"
										required
										className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
									/>
								</div>
								<div>
									<label
										htmlFor="email"
										className="block text-sm font-medium mb-1"
									>
										E-mail
									</label>
									<input
										id="email"
										name="email"
										type="email"
										required
										className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
									/>
								</div>
								<div>
									<label
										htmlFor="phone"
										className="block text-sm font-medium mb-1"
									>
										Telefon (valgfri)
									</label>
									<input
										id="phone"
										name="phone"
										className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
									/>
								</div>
								<div>
									<label
										htmlFor="role"
										className="block text-sm font-medium mb-1"
									>
										Jeg er
									</label>
									<select
										id="role"
										name="role"
										className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
									>
										<option>Kommunal sagsbehandler</option>
										<option>Forælder / Værge</option>
										<option>Fagperson</option>
										<option>Andet</option>
									</select>
								</div>
								<div className="md:col-span-2">
									<label
										htmlFor="message"
										className="block text-sm font-medium mb-1"
									>
										Besked
									</label>
									<textarea
										id="message"
										name="message"
										rows={6}
										required
										className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
									/>
								</div>
								<div className="md:col-span-2 flex items-start gap-2 text-sm">
									<input
										id="consent"
										name="consent"
										type="checkbox"
										required
										className="mt-1"
									/>
									<label
										htmlFor="consent"
										className="text-neutral-700 dark:text-neutral-300"
									>
										Jeg giver samtykke til, at Trygbasen må kontakte mig på
										baggrund af min henvendelse.
									</label>
								</div>
							</div>

							<div className="mt-5 flex items-center gap-3">
								<button
									type="submit"
									className="inline-flex items-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 text-sm font-medium transition"
								>
									Send henvendelse <ArrowRight size={18} />
								</button>
								<a
									href="mailto:AB@trygbasen.dk"
									className="text-sm underline hover:no-underline"
								>
									eller skriv direkte på AB@trygbasen.dk
								</a>
							</div>
						</form>
					</div>
				</div>
			</section>

			{/* FAQ / extra info */}
			<section className="py-8 px-6">
				<div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
					<div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6">
						<h3 className="text-base font-semibold mb-3">
							Hvad kan jeg skrive i første henvendelse?
						</h3>
						<p className="text-sm text-neutral-700 dark:text-neutral-300">
							En kort beskrivelse af barnets/den unges situation, kontaktoplysninger
							og hvad du ønsker sparring på. Del ikke følsomme persondata – vi aftaler
							tryg deling, hvis det bliver relevant.
						</p>
					</div>
					<div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6">
						<h3 className="text-base font-semibold mb-3">Hvem kan henvende sig?</h3>
						<p className="text-sm text-neutral-700 dark:text-neutral-300">
							Forældre/værger, kommunale sagsbehandlere og fagpersoner. Vi samarbejder
							altid med anbringende myndighed ved visitation.
						</p>
					</div>
				</div>
			</section>

			{/* FOOTER CTA */}
			<section className="py-16 px-6">
				<div className="max-w-6xl mx-auto rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-900/10 dark:to-neutral-950 p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
					<div>
						<h3 className="text-xl md:text-2xl font-semibold mb-2">
							Har du brug for hurtig sparring?
						</h3>
						<p className="text-neutral-700 dark:text-neutral-300">
							Ring på{' '}
							<a href="tel:60223347" className="underline">
								60223347
							</a>{' '}
							– vi besvarer henvendelser i telefontiden og vender tilbage hurtigst
							muligt.
						</p>
					</div>
					<a
						href="mailto:AB@trygbasen.dk"
						className="inline-flex items-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 font-medium transition"
					>
						<Mail size={18} /> Skriv til os
					</a>
				</div>
			</section>
		</main>
	);
}
