// import { UserData } from '../models/user/user.model';

export async function copyToClipboard(text: string) {
	try {
		await navigator.clipboard.writeText(text);
	} catch {
		console.error('Failed to copy to clipboard');
	}
}

export function isAddress(text: string) {
	return text.length === 42 && text.startsWith('0x');
}

export function isHash(text: string) {
	return text.length === 66 && text.startsWith('0x');
}

export function isAdmin(user: any) {
	return user && false;
}

export function isLinkedInURL(url: string) {
	return url.includes('linkedin.com');
}

export function useDefaultUserImg(e: React.SyntheticEvent<HTMLImageElement, Event>) {
	const element = e.target as HTMLImageElement;
	element.src = '/media/generic/pfp.jpg';
}

export function getWsData(type: string, payload: any) {
	return JSON.stringify({
		type,
		payload,
	});
}
