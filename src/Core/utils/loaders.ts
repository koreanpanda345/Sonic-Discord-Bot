import { readdirSync } from 'fs';

export async function loadFilesAsync(dirs: string[]) {
	for (const dir of dirs) {
		const folders = readdirSync(`./build/Core/${dir}`);
		for (const folder of folders) {
			const files = readdirSync(`./build/Core/${dir}/${folder}`).filter((f) => f.endsWith('.js'));
			for (const file of files) {
				await import(`./../${dir}/${folder}/${file}`);
			}
		}
	}
}
