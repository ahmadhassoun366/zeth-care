import { Link } from 'react-router-dom';
import Button from 'src/components/internal/button/button.component';
import ROUTES from 'src/static/router.data';

export default function NotFoundPage() {
	return (
		<div>
			{/* the text and the button div */}
			<div className="flex flex-col items-center justify-center h-full mt-10">
				<h1 className="text-4xl font-bold">404</h1>
				<Link to={ROUTES.root}>
					<Button className="blue  hover:scale-105 transition duration-300 ease-in-out mt-4">
						To the home page
					</Button>
				</Link>
			</div>
		</div>
	);
}
