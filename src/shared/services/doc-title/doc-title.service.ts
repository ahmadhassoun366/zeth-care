import AppConfig from 'src/static/app.config';

// export function useTitle(title: string) {
// 	document.title = title;
// }

export default class DocumentTitleService {
	constructor() {}

	setTitle(title: string) {
		const prefix = import.meta.env.VITE_APP_ENV === 'dev' ? 'DEV' : '';
		const newTitle = `${prefix} ${AppConfig.name} | ${title}`;
		document.title = newTitle;
	}
}
