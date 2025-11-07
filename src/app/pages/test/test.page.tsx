import { HandHeart } from 'lucide-react';

export default function TestPage() {
	return (
		<main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-white dark:from-neutral-900 dark:to-neutral-950 px-6 py-32 text-center">
			<span className="grid place-items-center rounded-xl bg-gradient-to-tr from-green-600 to-emerald-500 text-white shadow-lg shadow-emerald-600/25">
				<HandHeart size={100} strokeWidth={2.5} className='p-2' />
			</span>
		</main>
	);
}
