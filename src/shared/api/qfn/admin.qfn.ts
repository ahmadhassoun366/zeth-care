import api from '../api';
import { axios_m, mock } from '../axios-instance';
import { ChangeUserRoleDTO } from '../dto/admin.dto';
import { ChangeUserRoleResponse } from '../responses/admin.response';

// #region mocking

if (import.meta.env.VITE_APP_ENV === 'dev') {
	const changeRolRes: ChangeUserRoleResponse = {
		message: 'User role updated successfully',
	};

	mock.onPut(api.admin.changeUserRole.replace(':userId', '1')).reply(200, changeRolRes);
}

// #endregion

const AdminAPI = {
	async changeUserRole(userId: string, dto: ChangeUserRoleDTO): Promise<ChangeUserRoleResponse> {
		const res = await axios_m<ChangeUserRoleResponse>({
			method: 'PUT',
			url: api.admin.changeUserRole.replace(':userId', userId),
			data: dto,
		});

		return res.data;
	},
};

export default AdminAPI;
