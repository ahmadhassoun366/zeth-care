import { Role } from 'src/shared/enums/role.enum';

export type UserData = {
	id: string;
	username: string;
	pfp: string;
	role: Role;
	// role: 'User' | 'Admin' | 'Super Admin' | '';
};
