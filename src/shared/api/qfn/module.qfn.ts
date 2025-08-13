import { axios_m } from '../axios-instance';

// #region mocking

if (import.meta.env.VITE_APP_ENV === 'dev') {
	import('axios-mock-adapter').then(({ default: Mock }) => {
		const mock = new Mock(axios_m, { delayResponse: 1000 });

		const res: CreateResponse = {
			data: {
				id: '1',
				name: 'name',
			},
		};

		mock.onPost('/qfn/create').reply(200, res);
	});
}

// #endregion

type CreateDTO = {
	name: string;
};

type CreateResponse = {
	data: any;
};

const CrudQfn = {
	async create(dto: CreateDTO): Promise<CreateResponse> {
		const res = await axios_m<CreateResponse>({
			method: 'POST',
			url: '/qfn/create',
			data: dto,
		});

		return res.data;
	},

	// add below methods here
};

export default CrudQfn;
