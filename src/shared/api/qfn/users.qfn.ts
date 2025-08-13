import { AuthProvider } from '../../enums/auth-providers.enum';
import { Role } from '../../enums/role.enum';
import api from '../api';
import { axios_m, mock } from '../axios-instance';
import { UpdateUserDto } from '../dto/user.dto';
import {
	CheckUsernameResponse,
	DeleteUserResponse,
	GetAllUsersResponse,
	GetUserResponse,
	UpdateUserResponse,
} from '../responses/user.response';

// #region mocking

if (import.meta.env.VITE_APP_ENV === 'dev') {
	const usersRes: GetAllUsersResponse = {
		users: [
			{
				id: '550e8400-e29b-41d4-a716-446655440000',
				auth_provider: AuthProvider.WALLET,
				username: 'johndoe',
				pfp: 'https://example.com/pfp.jpg',
				role: Role.USER,
				created_at: 1738598344,
			},
		],
		metadata: {
			items_per_page: 10,
			total_items: 50,
			current_page: 1,
			total_pages: 5,
		},
	};

	mock.onGet(api.users.getAll).reply(200, usersRes);

	const userRes: GetUserResponse = {
		id: '123e4567-e89b-12d3-a456-426614174000',
		username: 'John',
		pfp: 'https://example.com/pfp.jpg',
		role: Role.USER,
	};

	mock.onGet(/\/users\/.+/).reply(200, userRes);

	const updateRes: UpdateUserResponse = {
		message: 'User updated successfully',
	};

	mock.onPatch(/\/users\/.+/).reply(200, updateRes);

	mock.onDelete(/\/users\/.+/).reply(200, {
		message: 'User deleted successfully',
	});

	mock.onGet(/\/users\/check-username\/.+/).reply(200, (config: any) => {
		const username = config.url?.split('/').pop();
		const available = username !== 'takenUsername'; // Simulating username availability
		return [200, { available }];
	});
}

// #endregion

export type GetUsersQueryParams = {
	search?: string;
	page?: number;
	per_page?: number;
};

const UsersAPI = {
	async getAll(params?: GetUsersQueryParams): Promise<GetAllUsersResponse> {
		const res = await axios_m<GetAllUsersResponse>({
			method: 'GET',
			url: api.users.getAll,
			params,
		});

		return res.data;
	},

	async getById(userId: string): Promise<GetUserResponse> {
		const res = await axios_m<GetUserResponse>({
			method: 'GET',
			url: api.users.getById.replace(':userId', userId),
		});

		return res.data;
	},

	async updateUser(userId: string, dto: UpdateUserDto): Promise<UpdateUserResponse> {
		const res = await axios_m<UpdateUserResponse>({
			method: 'PATCH',
			url: api.users.update.replace(':userId', userId),
			data: dto,
		});

		return res.data;
	},

	async deleteUser(userId: string): Promise<DeleteUserResponse> {
		const res = await axios_m<DeleteUserResponse>({
			method: 'DELETE',
			url: api.users.delete.replace(':userId', userId),
		});

		return res.data;
	},

	async checkUsername(username: string): Promise<CheckUsernameResponse> {
		const res = await axios_m<CheckUsernameResponse>({
			method: 'GET',
			url: api.users.checkUsername.replace(':username', username),
		});

		return res.data;
	},
};

export default UsersAPI;
