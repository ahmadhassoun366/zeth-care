const ROUTES = {
	root: '/',
	omos: '/omos',
	tilgange: '/tilgange',
	flowchart: '/flowchart',
	jobs: '/jobs',
	indsatser: {
		psykiske: '/indsatser/psykiske-vanskeligheder',
		autisme_adhd: '/indsatser/autisme-adhd',
		social_udfordringer: '/indsatser/sociale-udfordringer',
		misbrug_dobbeltdiagnoser: '/indsatser/misbrug-dobbeltdiagnoser',
		kognitiv_adfaerdsterapi: '/indsatser/kognitiv-adfaerdsterapi',
		kriminalitetstruede_børn_og_unge: '/indsatser/kriminalitetstruede-børn-og-unge',
	},
	kontakt: '/kontakt',
	dashboard: {
		root: '/dashboard',
	},

	discover: {
		root: '/discover',
	},

	networks: {
		details: '/l1/:id',
		create: '/launch',
	},

	oauth: {
		login: '/oauth/login',
	},

	projects: {
		root: '/projects',
		details: '/projects/:id',
		edit: '/projects/:id/edit',
	},
	protectionPage: '/protection-page',

	// l1: {
	// 	root: '/l1_single',
	// 	details: '/l1/:id',
	// 	launch: '/launch',
	// },

	launch: {
		root: 'launch',
	},
};

export default ROUTES;
