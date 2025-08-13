import { AuthProvider } from '../../enums/auth-providers.enum';

export type OAuthLoginDto = {
	provider: AuthProvider;
	code: string;
	// access_token: string;
};

export type authenticateDto = {
	message: string;
	signature: string;
	address: string;
};
