import { Link, useLocation } from 'react-router-dom';
import { useContext, useMemo, useState } from 'react';
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

// ——— NAV DATA ——— //
const navMain = [
	{ label: 'Front', href: '/' },
	{
		label: 'Services',
		type: 'dropdown' as const,
		items: [
			{ label: 'Indsats-pakken', href: '/indsatser#indsats' },
			{ label: 'Trygheds-pakken', href: '/indsatser#tryghed' },
		],
	},
	{ label: 'Approaches and methods', href: '/tilgange' },
	{
		label: 'About us',
		type: 'dropdown' as const,
		items: [
			{ label: 'Om Tryglund', href: '/om' },
			{ label: 'Målgruppe & faglighed', href: '/om#maalgruppe' },
		],
	},
	{ label: 'Job', href: '/job' },
];

/* =======================
   Reusable Dropdown
   ======================= */
type DropdownProps = {
	label: string;
	items: { label: string; href: string }[];
	isActive?: boolean;
};

function NavDropdown({ label, items, isActive }: DropdownProps) {
	const [open, setOpen] = useState(false);

	const floating = useFloating({
		open,
		onOpenChange: setOpen,
		placement: 'bottom-start',
		strategy: 'fixed', // 👈 add this
		whileElementsMounted: autoUpdate,
		middleware: [offset(10), flip({ padding: 10 }), shift({ padding: 10 })],
	});

	// hover + click + escape/outside + role (menu)
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
			<button
				ref={floating.refs.setReference}
				{...getReferenceProps()}
				className={`nav-link inline-flex items-center gap-2 ${isActive ? 'is-active' : ''}`}
				aria-expanded={open}
				aria-haspopup="menu"
			>
				{label}
				<i
					className={`fa-regular fa-angle-down transition-transform duration-200 ${
						open ? 'rotate-180' : ''
					}`}
				/>
			</button>

			<FloatingPortal>
				{open && (
					<div
						ref={floating.refs.setFloating}
						style={floating.floatingStyles}
						{...getFloatingProps()}
						className="z-[9999] min-w-[240px] overflow-hidden rounded-xl border border-neutral-200/60 bg-white/95 p-2 shadow-xl ring-1 ring-black/5 backdrop-blur-sm
                 dark:border-neutral-700/60 dark:bg-neutral-900/95 dark:ring-white/5"
					>
						{items.map((it) => (
							<Link
								key={it.href}
								to={it.href}
								className="block rounded-lg px-3 py-2 text-sm text-neutral-800 hover:bg-neutral-50 hover:text-neutral-900
                     focus:bg-neutral-50 focus:outline-none dark:text-neutral-200 dark:hover:bg-neutral-800 dark:hover:text-white"
								onClick={() => setOpen(false)}
								role="menuitem"
							>
								{it.label}
							</Link>
						))}
					</div>
				)}
			</FloatingPortal>
		</li>
	);
}

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
	const mobileCols = useMemo(
		() => ({
			services: navMain.find((n) => n.label === 'Services') as Extract<
				(typeof navMain)[number],
				{ type: 'dropdown' }
			>,
			about: navMain.find((n) => n.label === 'About us') as Extract<
				(typeof navMain)[number],
				{ type: 'dropdown' }
			>,
		}),
		[]
	);

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
									to="/"
								>
									Front
								</Link>
							</li>

							{/* Services */}
							<NavDropdown
								label="Services"
								items={[
									{ label: 'Indsats-pakken', href: '/indsatser#indsats' },
									{ label: 'Trygheds-pakken', href: '/indsatser#tryghed' },
								]}
								isActive={isActive('/indsatser')}
							/>

							{/* Approaches & methods */}
							<li>
								<Link
									className={`nav-link ${
										isActive('/tilgange') ? 'is-active' : ''
									}`}
									to="/tilgange"
								>
									Approaches and methods
								</Link>
							</li>

							{/* About us */}
							<NavDropdown
								label="About us"
								items={[
									{ label: 'Om Tryglund', href: '/om' },
									{ label: 'Målgruppe & faglighed', href: '/om#maalgruppe' },
								]}
								isActive={isActive('/om')}
							/>

							{/* Job */}
							<li>
								<Link
									className={`nav-link ${isActive('/job') ? 'is-active' : ''}`}
									to="/job"
								>
									Job
								</Link>
							</li>
						</ul>
					</div>

					{/* Right: CTA + Theme + Burger */}
					<div className="flex items-center gap-3">
						<Link to="/kontakt" className="hidden sm:block">
							<Button className="green small rounded-full px-5">
								Contact & Visitation
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
								Front
							</Link>

							{/* Services collapsible */}
							<details className="group rounded-lg">
								<summary className="flex cursor-pointer list-none items-center justify-between rounded-lg px-3 py-2 text-neutral-800 hover:bg-neutral-50 dark:text-neutral-200 dark:hover:bg-neutral-800">
									Services
									<ChevronDown
										size={18}
										strokeWidth={2}
										className="transition-transform group-open:rotate-180"
									/>
								</summary>
								<div className="mt-1 space-y-1 pl-3">
									{mobileCols.services.items.map((it) => (
										<Link
											key={it.href}
											to={it.href}
											onClick={toggleMobileNav}
											className="block rounded-md px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-800"
										>
											{it.label}
										</Link>
									))}
								</div>
							</details>

							<Link
								to="/tilgange"
								className="block rounded-lg px-3 py-2 text-neutral-800 hover:bg-neutral-50 dark:text-neutral-200 dark:hover:bg-neutral-800"
								onClick={toggleMobileNav}
							>
								Approaches and methods
							</Link>

							{/* About collapsible */}
							<details className="group rounded-lg">
								<summary className="flex cursor-pointer list-none items-center justify-between rounded-lg px-3 py-2 text-neutral-800 hover:bg-neutral-50 dark:text-neutral-200 dark:hover:bg-neutral-800">
									About us
									<ChevronDown
										size={18}
										strokeWidth={2}
										className="transition-transform group-open:rotate-180"
									/>
								</summary>
								<div className="mt-1 space-y-1 pl-3">
									{mobileCols.about.items.map((it) => (
										<Link
											key={it.href}
											to={it.href}
											onClick={toggleMobileNav}
											className="block rounded-md px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-800"
										>
											{it.label}
										</Link>
									))}
								</div>
							</details>

							<Link
								to="/job"
								className="block rounded-lg px-3 py-2 text-neutral-800 hover:bg-neutral-50 dark:text-neutral-200 dark:hover:bg-neutral-800"
								onClick={toggleMobileNav}
							>
								Job
							</Link>

							<div className="mt-3 flex items-center gap-3">
								<Link to="/kontakt" onClick={toggleMobileNav}>
									<Button className="green small rounded-full px-5">
										Contact & Visitation
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
