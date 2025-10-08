import { Link } from 'react-router-dom';
import { Facebook, HandHeart, Instagram, Linkedin } from 'lucide-react';
import ROUTES from 'src/static/router.data';

type TitleLink = { label: string; to: string };

const TITLE_LINKS: TitleLink[] = [
	{ label: 'Indsatser', to: ROUTES.indsatser.root },
	{ label: 'Om os', to: ROUTES.omos },
	{ label: 'Kontakt & Visitation', to: ROUTES.kontakt },
	{ label: 'Privatlivspolitik', to: ROUTES.policies },
	{ label: 'Job', to: ROUTES.jobs },
	{ label: 'Flowchart', to: ROUTES.flowchart },
];

export default function FooterComponent() {
	const year = new Date().getFullYear();

	return (
		<footer className="relative overflow-hidden bg-neutral-50 text-neutral-800 dark:bg-neutral-950 dark:text-neutral-100">
			{/* Top accent rule (always visible, stronger in dark) */}
			<div
				aria-hidden
				className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent dark:via-emerald-400/60"
			/>
			{/* Dark-mode radial glow to separate footer from same-color sections */}
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 hidden dark:block bg-[radial-gradient(60%_120%_at_50%_-20%,rgba(16,185,129,0.10),transparent_60%)]"
			/>

			<div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-8">
				{/* Top: Brand + short blurb + (optional) newsletter kept minimal */}
				<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:items-start">
					{/* Brand */}
					<div className="lg:col-span-2">
						<span className="grid place-items-center h-9 w-9 rounded-xl bg-gradient-to-tr from-green-600 to-emerald-500 text-white shadow-lg shadow-emerald-600/25">
							<HandHeart size={18} strokeWidth={2.5} />
						</span>
						<p className="mt-4 max-w-xl text-sm text-neutral-600 dark:text-neutral-400">
							Specialiserede indsatser og støtte for børn, unge og deres familier –
							landsdækkende, fleksibelt og med høj faglighed.
						</p>
					</div>

					{/* Newsletter (professional, compact) */}
					<div className="lg:justify-self-end">
						<form
							className="w-full max-w-md"
							onSubmit={(e) => e.preventDefault()}
							aria-label="Tilmeld nyhedsbrev"
						>
							<label htmlFor="newsletter-email" className="block text-sm font-medium">
								Tilmeld nyhedsbrev
							</label>
							<div className="mt-2 flex gap-2">
								<input
									id="newsletter-email"
									type="email"
									required
									placeholder="Din e-mail"
									className="min-w-0 flex-1 rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm placeholder-neutral-500
                             focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/30
                             dark:border-neutral-800 dark:bg-neutral-900 dark:placeholder-neutral-500"
								/>
								<button
									type="submit"
									className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700
                             focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600/40"
								>
									Tilmeld
								</button>
							</div>
						</form>
					</div>
				</div>

				{/* Middle row: divider + titles-only nav + socials */}
				<div className="mt-10 border-t border-neutral-200/70 dark:border-neutral-800/80 py-4">
					<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
						{/* Titles-only navigation */}
						<nav aria-label="Footer navigation">
							<ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium">
								{TITLE_LINKS.map(({ label, to }) => (
									<li key={label}>
										<Link
											to={to}
											className="hover:text-neutral-900 dark:hover:text-white underline-offset-4 hover:underline"
										>
											{label}
										</Link>
									</li>
								))}
							</ul>
						</nav>

						{/* Socials (Link, open in new tab) */}
						<ul className="flex items-center gap-3">
							<li>
								<Link
									to="https://facebook.com/"
									target="_blank"
									rel="noopener noreferrer"
									aria-label="Facebook"
									className="inline-flex h-9 w-9 items-center justify-center rounded-full border
                             border-neutral-200/70 text-neutral-600 hover:text-emerald-700 hover:border-emerald-200 transition
                             dark:border-white/10 dark:bg-neutral-900/60 dark:text-neutral-300 dark:hover:text-emerald-400"
								>
									<Facebook size={18} />
								</Link>
							</li>
							<li>
								<Link
									to="https://instagram.com/"
									target="_blank"
									rel="noopener noreferrer"
									aria-label="Instagram"
									className="inline-flex h-9 w-9 items-center justify-center rounded-full border
                             border-neutral-200/70 text-neutral-600 hover:text-emerald-700 hover:border-emerald-200 transition
                             dark:border-white/10 dark:bg-neutral-900/60 dark:text-neutral-300 dark:hover:text-emerald-400"
								>
									<Instagram size={18} />
								</Link>
							</li>
							<li>
								<Link
									to="https://linkedin.com/"
									target="_blank"
									rel="noopener noreferrer"
									aria-label="LinkedIn"
									className="inline-flex h-9 w-9 items-center justify-center rounded-full border
                             border-neutral-200/70 text-neutral-600 hover:text-emerald-700 hover:border-emerald-200 transition
                             dark:border-white/10 dark:bg-neutral-900/60 dark:text-neutral-300 dark:hover:text-emerald-400"
								>
									<Linkedin size={18} />
								</Link>
							</li>
						</ul>
					</div>
				</div>

				{/* Bottom bar: legal */}
				<div className="mt-2 text-xs md:text-sm text-neutral-600 dark:text-neutral-400 sm:flex sm:items-center sm:justify-between">
					<p>© {year} Trygbasen. Alle rettigheder forbeholdes.</p>
					<div className="mt-3 sm:mt-0 flex flex-wrap items-center gap-x-4 gap-y-2">
						{/* <Link
							to="/legal/vilkar"
							className="hover:text-neutral-900 dark:hover:text-white"
						>
							Vilkår
						</Link>
						<span aria-hidden>•</span> */}
						<Link
							to="/legal/privatliv"
							className="hover:text-neutral-900 dark:hover:text-white"
						>
							Privatliv
						</Link>
						{/* <span aria-hidden>•</span>
						<Link
							to="/cookies"
							className="hover:text-neutral-900 dark:hover:text-white"
						>
							Cookies
						</Link> */}
					</div>
				</div>
			</div>
		</footer>
	);
}
