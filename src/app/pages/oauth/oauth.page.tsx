import { useEffect } from 'react';
import { Navigate, useParams, useSearchParams } from 'react-router-dom';
import ROUTES from 'src/static/router.data';

/**
 * 
 * 
 * 
 * https://accounts.google.com/o/oauth2/auth
    ?client_id=997802428506-jc6ko3efdthasukeqflv1t758hqmu7i3.apps.googleusercontent.com
    &redirect_uri=https://l1-portal-d.vercel.app/oauth/login
    &response_type=code
    &scope=email%20profile
    &access_type=offline
    &prompt=consent
 * 
 * @returns 
 * 
 */

export default function OAuthPage() {
	const [qParams] = useSearchParams();

	const code = qParams.get('code');

	useEffect(() => {
		if (!code) return;

		// Post code to the opener (main window)
		if (window.opener) {
			window.opener.postMessage({ code }, window.origin);
		}

		// Also notify via BroadcastChannel
		const bc = new BroadcastChannel('google-login');
		bc.postMessage({ type: 'auth_code_received', code });
		bc.close();
	}, [code]);

	if (!code) return <Navigate to={ROUTES.root} />;

	return (
		<div className="container-3 mx-auto">
			<h1>OAuth Page</h1>
			<p>Provider: {qParams.get('code')}</p>
		</div>
	);
}
