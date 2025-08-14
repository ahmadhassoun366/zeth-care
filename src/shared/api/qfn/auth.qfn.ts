import api from '../api';
import { axios_ } from '../axios-instance';
import { authenticateDto, OAuthLoginDto } from '../dto/auth.dto';
import {
	AuthenticateResponse,
	LogoutResponse,
	OAuthLoginResponse,
	SessionResponse,
} from '../responses/auth.response';

// #region mocking

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
