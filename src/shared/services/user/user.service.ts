import { signal, type Signal } from '@preact/signals-react';
import { Role } from 'src/shared/enums/role.enum';
import { UserData } from 'src/shared/models/user/user.model';

export default class UserService {
	private userData: Signal<UserData> = signal({
		id: '',
		username: '',
		pfp: '',
		role: Role.PUBLIC,
	});

	setUserData(userData: UserData) {
		this.userData.value = userData;
	}

	getUserData() {
		return this.userData.value;
	}

	isAdmin() {
		return false;
		// return this.userData.value.role === 'admin';
		// return this.userData.value.role === 'Admin' || this.userData.value.role === 'Super Admin';
	}
}
