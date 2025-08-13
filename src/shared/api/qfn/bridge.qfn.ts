import api from '../api';
import { axios_m, mock } from '../axios-instance';
import { CreateBridgeDto, UpdateBridgeDto } from '../dto/bridge.dto';
import {
	CreateBridgeResponse,
	GetAllBridgesResponse,
	GetOneBridgeResponse,
	UpdateBridgeResponse,
} from '../responses/bridge.response';

// #region mocking

if (import.meta.env.VITE_APP_ENV === 'dev') {
	const newBridge: CreateBridgeResponse = {
		id: 'bridge123',
		name: 'Bridge Name',
		image: 'https://picsum.photos/200',
	};

	mock.onPost('/bridges/create').reply(201, newBridge);

	const allBridges: GetAllBridgesResponse = [
		{
			id: 'bridge123',
			name: 'Bridge Name',
			image: 'https://example.com/image.png',
		},
	];

	mock.onGet('/bridges/all').reply(200, allBridges);

	const one: GetOneBridgeResponse = {
		id: 'bridge123',
		name: 'Bridge Name',
		image: 'https://example.com/image.png',
	};

	mock.onGet(/\/bridges\/.+/).reply(200, one);

	const updated: UpdateBridgeResponse = {
		id: 'bridge123',
		name: 'Bridge Name',
		image: 'https://example.com/image.png',
	};

	mock.onPut(/\/bridges\/.+/).reply(200, updated);

	mock.onDelete(/\/bridges\/.+/).reply((config) => {
		const bridgeId = config.url?.split('/').pop();
		if (!bridgeId) {
			return [400, { message: 'invalid request', code: '400__INVALID__REQUEST' }];
		}
		return [204];
	});
}

// #endregion

const BridgeAPI = {
	async create(dto: CreateBridgeDto): Promise<CreateBridgeResponse> {
		const res = await axios_m<CreateBridgeResponse>({
			method: 'POST',
			url: api.bridges.create,
			data: dto,
		});

		return res.data;
	},

	async getAll(): Promise<GetAllBridgesResponse> {
		const res = await axios_m<GetAllBridgesResponse>({
			method: 'GET',
			url: api.bridges.getAll,
		});

		return res.data;
	},

	async getById(bridgeId: string): Promise<GetOneBridgeResponse> {
		const res = await axios_m<GetOneBridgeResponse>({
			method: 'GET',
			url: api.bridges.getById.replace(':bridgeId', bridgeId),
		});
		return res.data;
	},

	async update(bridgeId: string, dto: UpdateBridgeDto): Promise<UpdateBridgeResponse> {
		const res = await axios_m<UpdateBridgeResponse>({
			method: 'PUT',
			url: api.bridges.update.replace(':bridgeId', bridgeId),
			data: dto,
		});

		return res.data;
	},

	async delete(bridgeId: string): Promise<void> {
		await axios_m({
			method: 'DELETE',
			url: api.bridges.delete.replace(':bridgeId', bridgeId),
		});
	},
};

export default BridgeAPI;
