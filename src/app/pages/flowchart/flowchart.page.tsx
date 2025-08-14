import { motion } from 'framer-motion';

const steps = [
	{ title: 'Kontakt med Rådgiver' },
	{ title: 'Planlægning' },
	{ title: 'Afhentning' },
	{ title: 'Placering af borger' },
	{
		title: 'Ugentlig opfølgning mellem afdeling og rådgiver i form af dagsbogsnotater og helhedsvurdering',
	},
	{ title: 'Opfølgning / fremtidsplanlægning' },
];

export default function FlowchartPage() {
	return (
		<main className="relative overflow-hidden py-24 bg-gradient-to-b from-white to-neutral-100 dark:from-neutral-900 dark:to-neutral-950">
			{/* Background glow */}
			<div
				aria-hidden
				className="pointer-events-none absolute -top-32 left-1/2 z-0 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-emerald-200/30 blur-3xl dark:bg-emerald-500/20"
			/>

			<div className="relative  mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 mt-10">
				{/* Header */}
				<header className="max-w-2xl mb-14">
					<span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 ring-1 ring-green-600/20 dark:bg-green-900/30 dark:text-green-300 dark:ring-green-500/20">
						Forløbsoversigt
						<span className="h-1 w-1 rounded-full bg-green-700 dark:bg-green-300" />
					</span>
					<h1 className="mt-4 text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white md:text-4xl">
						Flowchart for Enkeltmandsprojekter
					</h1>
					<p className="mt-3 text-neutral-700 dark:text-neutral-300 text-lg leading-relaxed">
						En trin-for-trin visuel gennemgang af processen i et enkeltmandsprojekt hos
						Tryglund – fra første kontakt til opfølgning og fremtidsplanlægning.
					</p>
				</header>

				{/* Flowchart */}
				<div className="relative flex flex-col items-center space-y-10">
					{steps.map((step, index) => (
						<div
							key={index}
							className="relative flex items-center gap-4 w-full max-w-xl"
						>
							{/* Vertical connector line */}
							{index !== steps.length - 1 && (
								<div className="absolute left-5 top-10 h-[calc(100%+20px)] w-px bg-gradient-to-b from-green-300 via-green-400 to-green-600 dark:from-green-600 dark:via-green-500 dark:to-green-400" />
							)}

							{/* Step number */}
							<div className="relative  flex items-center justify-center h-10 w-10 mt-1 rounded-full bg-white text-green-700 font-bold ring-2 ring-green-300 shadow dark:bg-neutral-800 dark:text-green-300 dark:ring-green-500">
								{index + 1}
							</div>

							{/* Step card */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.4, delay: index * 0.1 }}
								className="flex-1 rounded-xl border border-green-200 bg-white px-6 py-5 shadow-md hover:shadow-lg transition dark:border-green-700/30 dark:bg-neutral-900"
							>
								<p className="text-base md:text-lg font-medium text-neutral-800 dark:text-neutral-100 leading-relaxed">
									{step.title}
								</p>
							</motion.div>
						</div>
					))}
				</div>
			</div>
		</main>
	);
}
