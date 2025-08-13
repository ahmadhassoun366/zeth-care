// components
import { useContext, useState } from 'react';

// import Button from '@components/internal/button/button.component';
import AuthSvcContext from 'src/shared/services/auth/auth.context';
import Button from 'src/components/internal/button/button.component';
import UserSvcContext from 'src/shared/services/user/user.context';
import { AuthProvider } from 'src/shared/enums/auth-providers.enum';

// services

export default function ProfileDropdown({ closeCallback }: { closeCallback: () => void }) {
	// *~~*~~*~~  services  ~~*~~*~~* //

	const authSvc = useContext(AuthSvcContext);
	const userSvc = useContext(UserSvcContext);

	// #region fn

	const [loading, setLoading] = useState(false);
	async function logout() {
		setLoading(true);
		try {
			await authSvc.logout();
			closeCallback();
		} catch (err) {
			console.error('Logout failed:', err);
		} finally {
			setLoading(false);
		}
	}

	// #endregion

	return (
		<div className="w-[340px] p-6 pt-[18px] bg-white dark:bg-dark-800 dark:bg-dk_blue-900 rounded-lg shadow border border-violet-200 dark:border-gray-800 space-y-6">
			{/* Title and Lock Button */}
			<div className="flex justify-center items-center">
				<div className="size-16 rounded-full overflow-hidden">
					<img src={userSvc.getUserData().pfp} alt="" className="size-full" />
				</div>
			</div>

			<div className="grid place-content-center py-3">
				<h2 className="text-sm font-medium text-agrey-900 dark:text-white">
					@{userSvc.getUserData().username}
				</h2>
			</div>

			{authSvc.auth_provider === AuthProvider.GOOGLE && (
				<div className="grid place-content-center py-3">
					<button className={`w-full small space-x-2 ${loading && 'loading'}`}>
						<div className="flex gap-x-2 justify-center text-agrey-900 dark:text-white">
							<span>
								<img src="/media/logos/g-google.svg" alt="" />
							</span>
							<span>Google</span>
						</div>
					</button>
				</div>
			)}

			<div>
				<Button
					className={`w-full blue small space-x-2 ${
						loading && 'loading'
					} text-agrey-900 dark:text-white`}
					onClick={logout}
				>
					<span>
						<i className="fa-regular fa-sign-out-alt"></i>
					</span>
					<span>Log out </span>
				</Button>
			</div>
		</div>
	);
}
