/* eslint-disable no-mixed-spaces-and-tabs */
import { Link, useLocation } from 'react-router-dom';
import { useContext, useState } from 'react';
import {
	autoUpdate,
	flip,
	offset,
	shift,
	useClick,
	useDismiss,
	useFloating,
	useHover,
	useInteractions,
	useRole,
	safePolygon,
	FloatingPortal,
} from '@floating-ui/react';
import { ChevronDown, HandHeart, Menu, Moon, Sun, X } from 'lucide-react'; // ⬅ Lucide import

import Button from 'src/components/internal/button/button.component';
import GeneralSettingsService from 'src/shared/services/general-settings/general-settings.service';
import geneneralSettingsSvcContext from 'src/shared/services/general-settings/general-settings.context';
import ROUTES from 'src/static/router.data';

/* =======================
   Reusable Dropdown
   ======================= */
type DropdownItem = { label: string; href: string };

type DropdownGroup = {
	group: string;
	links: DropdownItem[];
};

type DropdownProps = {
	label: string;
	items: DropdownItem[] | DropdownGroup[];
	isActive?: boolean;
};

function NavDropdown({ label, items, isActive }: DropdownProps) {
	const [open, setOpen] = useState(false);

	// Type Guard to check for grouped dropdown
	function isGrouped(items: DropdownProps['items']): items is DropdownGroup[] {
		return Array.isArray(items) && typeof items[0] === 'object' && 'group' in items[0];
	}

	// Setup floating UI for dropdown positioning
	const floating = useFloating({
		open,
		onOpenChange: setOpen,
		placement: 'bottom-start',
		strategy: 'fixed',
		whileElementsMounted: autoUpdate,
		middleware: [offset(10), flip({ padding: 10 }), shift({ padding: 10 })],
	});

	// Interaction hooks
	const hover = useHover(floating.context, {
		move: true,
		handleClose: safePolygon({ requireIntent: true }),
		delay: { open: 40, close: 80 },
	});
	const click = useClick(floating.context, { toggle: true, event: 'mousedown' });
	const dismiss = useDismiss(floating.context);
	const role = useRole(floating.context, { role: 'menu' });

	const { getReferenceProps, getFloatingProps } = useInteractions([hover, click, dismiss, role]);

	return (
		<li className="relative">
			{/* Dropdown trigger */}
			<button
				ref={floating.refs.setReference}
				{...getReferenceProps()}
				className={`nav-link inline-flex items-center gap-2 ${isActive ? 'is-active' : ''}`}
				aria-expanded={open}
				aria-haspopup="menu"
			>
				<span className="text-neutral-800 hover:bg-neutral-50 dark:text-neutral-200 dark:hover:bg-neutral-800">
					{label}
				</span>
				{/* Lucide chevron icon */}
				<span className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
					{/* Import at top: import { ChevronDown } from 'lucide-react'; */}
					<ChevronDown size={18} strokeWidth={2} />
				</span>
			</button>

			{/* Dropdown content */}
			<FloatingPortal>
				{open && (
					<div
						ref={floating.refs.setFloating}
						style={floating.floatingStyles}
						{...getFloatingProps()}
						className="z-[9999] min-w-[240px] overflow-hidden rounded-xl border border-neutral-200/60 bg-white/95 p-2 shadow-xl ring-1 ring-black/5 backdrop-blur-sm
						dark:border-neutral-700/60 dark:bg-neutral-900/95 dark:ring-white/5"
					>
						{isGrouped(items)
							? items.map((group, groupIndex) => (
									<div
										key={group.group}
										className={`mb-1 ${
											groupIndex > 0
												? 'pt-2 border-t border-neutral-200 dark:border-neutral-700/40'
												: ''
										}`}
									>
										<div className="px-3 py-2 text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide bg-neutral-100 dark:bg-neutral-800 rounded-md mb-1">
											{group.group}
										</div>
										{group.links.map((item) => (
											<Link
												key={item.href}
												to={item.href}
												className="block rounded-lg px-3 py-2 text-sm text-neutral-800 hover:bg-neutral-50 hover:text-neutral-900
							focus:bg-neutral-50 focus:outline-none dark:text-neutral-200 dark:hover:bg-neutral-800 dark:hover:text-white"
												onClick={() => setOpen(false)}
												role="menuitem"
											>
												{item.label}
											</Link>
										))}
									</div>
							  ))
							: (items as DropdownItem[]).map((item) => (
									<Link
										key={item.href}
										to={item.href}
										className="block rounded-lg px-3 py-2 text-sm text-neutral-800 hover:bg-neutral-50 hover:text-neutral-900
					focus:bg-neutral-50 focus:outline-none dark:text-neutral-200 dark:hover:bg-neutral-800 dark:hover:text-white"
										onClick={() => setOpen(false)}
										role="menuitem"
									>
										{item.label}
									</Link>
							  ))}
					</div>
				)}
			</FloatingPortal>
		</li>
	);
}

const indsatsDropdown: DropdownGroup[] = [
	{
		group: 'Psykiske udfordringer',
		links: [
			{ label: 'Psykiske vanskeligheder', href: ROUTES.indsatser.psykiske },
			{
				label: 'Kognitiv adfærdsterapi (KAT)',
				href: ROUTES.indsatser.kognitiv_adfaerdsterapi,
			},
		],
	},
	{
		group: 'Neurodivergens',
		links: [{ label: 'Autisme & ADHD', href: ROUTES.indsatser.autisme_adhd }],
	},
	{
		group: 'Sociale udfordringer',
		links: [
			{
				label: 'Sociale udfordringer, marginalisering eller isolation',
				href: ROUTES.indsatser.social_udfordringer,
			},
			{
				label: 'Kriminalitetstruede børn og unge',
				href: ROUTES.indsatser.kriminalitetstruede_børn_og_unge,
			},
		],
	},
	{
		group: 'Misbrug',
		links: [
			{
				label: 'Misbrug og dobbeltdiagnoser',
				href: ROUTES.indsatser.misbrug_dobbeltdiagnoser,
			},
		],
	},
];

/* =======================
   Header
   ======================= */
export default function HeaderComponent() {
	const { pathname } = useLocation();

	// Theme service
	const settingsSvc = useContext<GeneralSettingsService>(geneneralSettingsSvcContext);
	const toggleTheme = () => settingsSvc.toggleTheme();
	const theme = settingsSvc.getTheme();

	// Mobile menu
	const [mobileNavOpen, setMobileNavOpen] = useState(false);
	const toggleMobileNav = () => {
		setMobileNavOpen((v) => {
			const next = !v;
			const html = document.querySelector('html');
			if (!next) html?.classList.remove('overflow-hidden');
			else html?.classList.add('overflow-hidden');
			return next;
		});
	};

	const isActive = (href: string) =>
		href === '/' ? pathname === '/' : pathname.startsWith(href);

	// Split columns for mobile collapsibles

	return (
		<nav className="fixed inset-x-0 top-0 z-header">
			{/* translucent bar */}
			<div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
				<div
					className="mt-4 flex h-16 items-center justify-between rounded-2xl border border-neutral-200/50 bg-white/70 px-5 shadow-md backdrop-blur-md
                     dark:border-neutral-700/60 dark:bg-neutral-900/70"
				>
					{/* Brand */}
					<Link to="/" className="flex items-center gap-3">
						<span className="grid place-items-center h-9 w-9 rounded-xl bg-gradient-to-tr from-green-600 to-emerald-500 text-white shadow-lg shadow-emerald-600/25">
							<HandHeart size={18} strokeWidth={2.5} />
						</span>
						<span className="hidden text-sm font-semibold text-neutral-900 sm:inline dark:text-white">
							Tryglund
						</span>
					</Link>

					{/* Desktop Nav */}
					<div className="hidden md:block">
						<ul className="flex items-center gap-6">
							{/* Front */}
							<li>
								<Link
									className={`nav-link ${isActive('/') ? 'is-active' : ''}`}
									to={ROUTES.root}
								>
									Forside
								</Link>
							</li>

							{/* Indsatser */}
							<NavDropdown
								label="Indsatser"
								items={indsatsDropdown}
								isActive={isActive('/indsatser')}
							/>

							{/* flowchart */}
							<li>
								<Link
									className={`nav-link ${
										isActive(ROUTES.flowchart) ? 'is-active' : ''
									}`}
									to={ROUTES.flowchart}
								>
									Flowchart
								</Link>
							</li>

							{/* About us */}
							<li>
								<Link
									className={`nav-link ${
										isActive(ROUTES.omos) ? 'is-active' : ''
									}`}
									to={ROUTES.omos}
								>
									Om os
								</Link>
							</li>
							{/* Job */}
							<li>
								<Link
									className={`nav-link ${
										isActive(ROUTES.jobs) ? 'is-active' : ''
									}`}
									to={ROUTES.jobs}
								>
									Job
								</Link>
							</li>
							{/* Privacy Policy */}
							<li>
								<Link
									className={`nav-link ${
										isActive(ROUTES.policies) ? 'is-active' : ''
									}`}
									to={ROUTES.policies}
								>
									Privatlivspolitik
								</Link>
							</li>
						</ul>
					</div>

					{/* Right: CTA + Theme + Burger */}
					<div className="flex items-center gap-3">
						<Link to={ROUTES.kontakt} className="hidden sm:block">
							<Button className="green small rounded-full px-5">
								Kontakt & Visitation
							</Button>
						</Link>

						<button
							className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200/60 bg-white/70 text-neutral-700 transition hover:bg-white
                         dark:border-neutral-700/60 dark:bg-neutral-800/70 dark:text-neutral-200 dark:hover:bg-neutral-800"
							onClick={toggleTheme}
							aria-label="Toggle theme"
						>
							{theme === 'light' ? (
								<Moon size={18} strokeWidth={2} />
							) : (
								<Sun size={18} strokeWidth={2} />
							)}
						</button>

						<button
							type="button"
							className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200/60 bg-white/70 text-neutral-700 transition hover:bg-white
                         dark:border-neutral-700/60 dark:bg-neutral-800/70 dark:text-neutral-200 dark:hover:bg-neutral-800"
							aria-controls="mobile-menu"
							aria-expanded={mobileNavOpen}
							onClick={toggleMobileNav}
						>
							<span className="sr-only">Open menu</span>
							{mobileNavOpen ? (
								<X size={20} strokeWidth={2} />
							) : (
								<Menu size={20} strokeWidth={2} />
							)}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile menu */}
			{mobileNavOpen && (
				<div
					id="mobile-menu"
					className="md:hidden mx-auto mt-2 max-w-7xl px-4 sm:px-6 lg:px-8"
				>
					<div
						className="rounded-2xl border border-neutral-200/60 bg-white/95 p-4 shadow-md ring-1 ring-black/5 backdrop-blur-sm
                       dark:border-neutral-700/60 dark:bg-neutral-900/95 dark:ring-white/5"
					>
						<div className="space-y-3">
							<Link
								to="/"
								className="block rounded-lg px-3 py-2 text-neutral-800 hover:bg-neutral-50 dark:text-neutral-200 dark:hover:bg-neutral-800"
								onClick={toggleMobileNav}
							>
								Forside
							</Link>

							<h1 className="block list-none pl-3">
								<NavDropdown
									label="Indsatser"
									items={indsatsDropdown}
									isActive={isActive('/indsatser')}
								/>
							</h1>

							<Link
								to={ROUTES.flowchart}
								className="block rounded-lg px-3 py-2 text-neutral-800 hover:bg-neutral-50 dark:text-neutral-200 dark:hover:bg-neutral-800"
								onClick={toggleMobileNav}
							>
								Flowchart
							</Link>

							{/* Om os collapsible */}
							<Link className="group rounded-lg" to={ROUTES.omos}>
								<h1 className="flex cursor-pointer list-none items-center justify-between rounded-lg px-3 py-2 text-neutral-800 hover:bg-neutral-50 dark:text-neutral-200 dark:hover:bg-neutral-800">
									Om os
								</h1>
							</Link>

							<Link
								to={ROUTES.jobs}
								className="block rounded-lg px-3 py-2 text-neutral-800 hover:bg-neutral-50 dark:text-neutral-200 dark:hover:bg-neutral-800"
								onClick={toggleMobileNav}
							>
								Job
							</Link>
							<Link
								to={ROUTES.policies}
								className="block rounded-lg px-3 py-2 text-neutral-800 hover:bg-neutral-50 dark:text-neutral-200 dark:hover:bg-neutral-800"
								onClick={toggleMobileNav}
							>
								Privatlivspolitik
							</Link>

							<div className="mt-3 flex items-center gap-3">
								<Link to={ROUTES.kontakt} onClick={toggleMobileNav}>
									<Button className="green small rounded-full px-5">
										Kontakt & Visitation
									</Button>
								</Link>
								<button
									onClick={toggleTheme}
									aria-label="Toggle theme"
									className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200/60 bg-white/70 text-neutral-700 transition hover:bg-white
                             dark:border-neutral-700/60 dark:bg-neutral-800/70 dark:text-neutral-200 dark:hover:bg-neutral-800"
								>
									{theme === 'light' ? (
										<Moon size={18} strokeWidth={2} />
									) : (
										<Sun size={18} strokeWidth={2} />
									)}
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</nav>
	);
}

/* =======================
   Tiny CSS helpers (Tailwind)
   ======================= */
/* Add these utilities to your global CSS if you don’t already have .nav-link */
