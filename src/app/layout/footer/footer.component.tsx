import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

export default function FooterComponent() {
	return (
		<footer className="bg-neutral-50 text-neutral-800 dark:bg-neutral-900 dark:text-white">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-10">
				{/* Top: Brand + Newsletter */}
				<div className="lg:flex lg:items-start lg:justify-between lg:gap-8">
					{/* Logo */}
					<div>
						<Link to="/" className="inline-flex items-center gap-2">
							<svg
								className="h-8 w-auto text-green-600 dark:text-white"
								viewBox="0 0 28 24"
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M0.41 10.3847C1.14777 7.4194..." />
							</svg>
							<span className="sr-only">Tryglund</span>
						</Link>
						<p className="mt-4 max-w-xs text-sm text-neutral-600 dark:text-white/70">
							Specialiserede indsatser og støtte for børn, unge og deres familier –
							landsdækkende, fleksibelt og med høj faglighed.
						</p>
					</div>

					{/* Newsletter */}
					<div className="mt-8 lg:mt-0 lg:max-w-md w-full">
						<h2 className="text-lg font-semibold">Tilmeld nyhedsbrev</h2>
						<p className="mt-2 text-sm text-neutral-600 dark:text-white/70">
							Få seneste nyt om vores indsatser og tilbud direkte i din indbakke.
						</p>
						<form className="mt-4">
							<div className="flex flex-col sm:flex-row gap-3">
								<input
									type="email"
									required
									placeholder="Din e-mailadresse"
									className="flex-1 rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm 
											placeholder-neutral-500 focus:border-green-500 focus:outline-none 
											focus:ring-2 focus:ring-green-500/50
											dark:border-white/10 dark:bg-white/10 dark:placeholder-white/50"
								/>
								<button
									type="submit"
									className="rounded-lg bg-green-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-green-700"
								>
									Tilmeld
								</button>
							</div>
						</form>
					</div>
				</div>

				{/* Navigation links */}
				<div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
					{[
						{
							title: 'Indsatser',
							links: [
								'Enkeltmandsprojekter',
								'Akut anbringelse',
								'Familiebehandling',
								'Støttekontaktperson',
							],
						},
						{ title: 'Om os', links: ['Profil', 'Team', 'Historie'] },
						{ title: 'Hjælp', links: ['Kontakt', 'FAQ', 'Live Chat'] },
						{ title: 'Juridisk', links: ['Vilkår', 'Privatlivspolitik', 'Cookies'] },
						{ title: 'Ressourcer', links: ['Downloads', 'Guides', 'Infografikker'] },
					].map((col) => (
						<div key={col.title}>
							<p className="font-semibold">{col.title}</p>
							<ul className="mt-4 space-y-2 text-sm text-neutral-600 dark:text-white/70">
								{col.links.map((link) => (
									<li key={link}>
										<a
											href="#"
											className="transition hover:text-neutral-900 dark:hover:text-white"
										>
											{link}
										</a>
									</li>
								))}
							</ul>
						</div>
					))}

					{/* Socials */}
					<div>
						<p className="font-semibold">Følg os</p>
						<ul className="mt-4 flex gap-4">
							<li>
								<a
									href="#"
									aria-label="Facebook"
									className="transition hover:text-green-600 dark:hover:text-green-400"
								>
									<Facebook size={20} />
								</a>
							</li>
							<li>
								<a
									href="#"
									aria-label="Instagram"
									className="transition hover:text-green-600 dark:hover:text-green-400"
								>
									<Instagram size={20} />
								</a>
							</li>
							<li>
								<a
									href="#"
									aria-label="LinkedIn"
									className="transition hover:text-green-600 dark:hover:text-green-400"
								>
									<Linkedin size={20} />
								</a>
							</li>
						</ul>
					</div>
				</div>

				{/* Bottom bar */}
				<div
					className="mt-10 border-t border-neutral-200 pt-6 text-sm text-neutral-600 
							dark:border-white/10 dark:text-white/70 
							sm:flex sm:items-center sm:justify-between"
				>
					<p>© {new Date().getFullYear()} Tryglund. Alle rettigheder forbeholdes.</p>
					<div className="mt-4 sm:mt-0 flex gap-4">
						<Link
							to="/legal/vilkar"
							className="transition hover:text-neutral-900 dark:hover:text-white"
						>
							Vilkår
						</Link>
						<Link
							to="/legal/privatliv"
							className="transition hover:text-neutral-900 dark:hover:text-white"
						>
							Privatliv
						</Link>
						<Link
							to="/cookies"
							className="transition hover:text-neutral-900 dark:hover:text-white"
						>
							Cookies
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
