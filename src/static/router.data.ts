const ROUTES = {
	root: '/',

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
