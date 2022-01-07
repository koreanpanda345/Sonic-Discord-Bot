export interface IBotMonitor {
	name: string;
	disabled?: boolean;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	invoke: (...args: any[]) => Promise<unknown>;
}
