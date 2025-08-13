import { AuthProvider } from '../../enums/auth-providers.enum';
import { Role } from '../../enums/role.enum';

export type GetAllUsersResponse = {
	users: {
		id: string;
		auth_provider: AuthProvider;
		username: string;
		pfp: string;
		role: Role;
		created_at: EpochTimeStamp;
	}[];
	metadata: {
		items_per_page: number;
		total_items: number;
		current_page: number;
		total_pages: number;
	};
};

export type GetUserResponse = {
	id: string;
	username: string;
	pfp: string;
	role: Role;
};

export type UpdateUserResponse = {
	message: string;
};

export type DeleteUserResponse = {
	message: string;
};

export type CheckUsernameResponse = {
	available: boolean;
};
