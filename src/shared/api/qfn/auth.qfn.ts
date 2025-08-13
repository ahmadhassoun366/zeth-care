import { AuthProvider } from '../../enums/auth-providers.enum';
import { Role } from '../../enums/role.enum';
import api from '../api';
import { axios_, axios_m, mock } from '../axios-instance';
import { authenticateDto, OAuthLoginDto } from '../dto/auth.dto';
import {
	AuthenticateResponse,
	LogoutResponse,
	OAuthLoginResponse,
	SessionResponse,
} from '../responses/auth.response';

// #region mocking

if (import.meta.env.VITE_APP_ENV === 'dev') {
	const oauthRes: OAuthLoginResponse = {
		user: {
			id: '123e4567-e89b-12d3-a456-426614174000',
			provider: AuthProvider.GOOGLE,
			provider_id: '1234567890',
			username: 'user123',
			pfp: 'https://picsum.photos/200',
			role: Role.USER,
		},
		token: {
			access_token: 'jwt_token_here',
			expires_at: 1738677377,
		},
	};

	mock.onPost(api.auth.loginOAuth).reply(200, oauthRes);

	const authRes: AuthenticateResponse = {
		user: {
			id: '123e4567-e89b-12d3-a456-426614174000',
			provider: AuthProvider.WALLET,
			address: '0x1234...4321',
			username: '0x1234...4321',
			pfp: 'https://example.com/pfp.jpg',
			role: Role.USER,
		},
		token: {
			access_token: 'jwt_token_here',
			expires_at: 1738677377,
		},
	};

	mock.onPost(api.auth.authenticate).reply(200, authRes);

	mock.onPost(api.auth.logout).reply(200, {
		message: 'Logout successful',
	});

	const sessionRes: SessionResponse = {
		user: {
			id: '123e4567-e89b-12d3-a456-426614174000',
			username: 'johndoe',
			pfp: 'https://picsum.photos/200',
			provider: AuthProvider.WALLET,
			role: Role.USER,
			address: '0x1234...4321',
		},
		auth: {
			access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
			expires_at: 1738677377,
		},
	};

	mock.onGet(api.auth.session).reply(200, sessionRes);
}

// #endregion

const AuthAPI = {
	async authenticate(dto: authenticateDto): Promise<AuthenticateResponse> {
		const res = await axios_<AuthenticateResponse>({
			method: 'POST',
			url: api.auth.authenticate,
			data: dto,
		});

		console.log('res main', res);
		return res.data;
	},

	async loginOAuth(dto: OAuthLoginDto): Promise<OAuthLoginResponse> {
		const res = await axios_<OAuthLoginResponse>({
			method: 'POST',
			url: api.auth.loginOAuth,
			data: dto,
		});

		return res.data;
	},

	async logout(): Promise<LogoutResponse> {
		const res = await axios_<LogoutResponse>({
			method: 'POST',
			url: api.auth.logout,
		});

		return res.data;
	},

	async getSession(): Promise<SessionResponse> {
		const res = await axios_<SessionResponse>({
			method: 'GET',
			url: api.auth.session,
		});

		return res.data;
	},
};

export default AuthAPI;
