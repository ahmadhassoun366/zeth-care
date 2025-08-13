import { AuthProvider } from '../../enums/auth-providers.enum';
import { Role } from '../../enums/role.enum';

export type AuthenticateResponse = {
	user: {
		id: string;
		provider: AuthProvider;
		address: string;
		username: string;
		pfp: string;
		role: Role;
	};
	token: {
		access_token: string;
		expires_at: EpochTimeStamp;
	};
};

export type OAuthLoginResponse = {
	data: {
		id: string;
		username: string;
		provider: AuthProvider;
		provider_id?: string; //
		pfp: string;
		role: { name: Role };
		address?: string; // this is nullable because it's only valid for wallet provider
		token: {
			access_token: string;
			expires_at: EpochTimeStamp;
		};
	};
};

export type LogoutResponse = {
	message: string;
};

export type SessionResponse = {
	user: {
		id: string;
		username: string;
		pfp: string;
		provider: AuthProvider;
		provider_id?: string;
		address?: string;
		role: Role;
	};
	auth: {
		access_token: string;
		expires_at: EpochTimeStamp;
	};
};
