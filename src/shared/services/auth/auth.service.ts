import { signal, type Signal } from '@preact/signals-react';
import { type AppStorage } from 'src/shared/models/global/app-storage.model';

import STORAGE_KEYS from 'src/static/storage.keys';

import QueryApi from 'src/shared/api/query-api';
import { APP_EVENTS } from 'src/static/enums/app.events';
import { UserData } from 'src/shared/models/user/user.model';
import { toast } from 'react-toastify';
import { AuthProvider } from 'src/shared/enums/auth-providers.enum';
import { axios_ } from 'src/shared/api/axios-instance';

export default class AuthService {
	private authenticated: Signal<boolean> = signal(false);
	private provider: Signal<AuthProvider | null> = signal(null);

	constructor(private appStorage: AppStorage) {
		this.onGoogleAuthCallback = this.onGoogleAuthCallback.bind(this);
	}

	async init(): Promise<void> {
		await this.restoreSession();
	}

	isLoggedIn() {
		return this.authenticated.value;
	}

	public get auth_provider(): AuthProvider | null {
		return this.provider.value;
	}

	// *~~~ Auth ~~~* //

	// async signup(password: string): Promise<void> {}

	async login(): Promise<void> {
		this.authenticated.value = true;
	}

	async googleLogin(code: string): Promise<void> {
		try {
			const res = await QueryApi.auth.loginOAuth({
				provider: AuthProvider.GOOGLE,
				code,
			});

			// Save session data
			this.appStorage.set(STORAGE_KEYS.auth_session, true);
			this.appStorage.set(STORAGE_KEYS.auth_token, res.data.token.access_token);
			this.addTokenToHeaders(res.data.token.access_token);

			const loggedInEvent = new CustomEvent<UserData>(APP_EVENTS.AUTH_LOGGED_IN, {
				detail: {
					id: res.data.id,
					username: res.data.username,
					pfp: res.data.pfp,
					// email: res.email,
					role: res.data.role.name,
				},
			});

			document.dispatchEvent(loggedInEvent);

			this.authenticated.value = true;
			this.provider.value = AuthProvider.GOOGLE;
		} catch (err) {
			toast.error('Error while trying to authenticate with google');
		}
	}

	async logout(): Promise<void> {
		try {
			await QueryApi.auth.logout();
		} catch (err) {
			//
		}

		this.appStorage.remove(STORAGE_KEYS.auth_session);

		const loggedOutEvent = new CustomEvent(APP_EVENTS.AUTH_LOGGED_OUT);
		document.dispatchEvent(loggedOutEvent);
		this.authenticated.value = false;
	}

	private addTokenToHeaders(token: string): void {
		axios_.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	}

	public async restoreSession(): Promise<void> {
		const session = this.appStorage.get<boolean>(STORAGE_KEYS.auth_session); // check if there is a session in storage
		const token = this.appStorage.get<string>(STORAGE_KEYS.auth_token); // check if there is a token in storage

		if (session && token !== null) {
			// verify with backend
			try {
				this.addTokenToHeaders(token);
				const sessionInfo = await QueryApi.auth.getSession();
				const loggedInEvent = new CustomEvent<UserData>(APP_EVENTS.AUTH_LOGGED_IN, {
					detail: {
						id: sessionInfo.user.id,
						username: sessionInfo.user.username,
						pfp: sessionInfo.user.pfp,
						// email: sessionInfo.email,
						role: sessionInfo.user.role,
					},
				});
				document.dispatchEvent(loggedInEvent);
				this.authenticated.value = true;
			} catch (err) {
				this.logout();
				return;
			}
		}
	}

	public async checkSessionIsStillValid(): Promise<boolean> {
		try {
			// await QueryApi.auth.session();
			return true;
		} catch (err) {
			this.logout();
			return false;
		}
	}

	public onGoogleAuthCallback(response: { credential: string }): void {
		// this.googleLogin(response.credential);
		// const token = response.credential;
		// if (import.meta.env.VITE_APP_ENV === 'dev') console.log(response.credential);
	}
}
