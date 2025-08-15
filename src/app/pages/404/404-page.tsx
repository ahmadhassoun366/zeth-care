import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from 'src/components/internal/button/button.component';
import ROUTES from 'src/static/router.data';

export default function NotFoundPage() {
	return (
		<main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-white dark:from-neutral-900 dark:to-neutral-950 px-6 py-32 text-center">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className="max-w-xl mx-auto"
			>
				<p className="text-6xl font-extrabold text-emerald-600 dark:text-emerald-400">
					404
				</p>
				<h1 className="text-2xl md:text-3xl font-semibold mt-4 text-neutral-800 dark:text-white">
					Siden blev ikke fundet
				</h1>
				<p className="mt-2 text-neutral-600 dark:text-neutral-300">
					Den side du leder efter eksisterer ikke – eller er måske blevet flyttet.
				</p>
				<Link to={ROUTES.root} className="inline-block mt-6">
					<Button className="green rounded-full px-6">Til forsiden</Button>
				</Link>
			</motion.div>
		</main>
	);
}
