export interface IBotEvent {
	name: string;
	once?: boolean;
	disabled?: boolean;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	invoke: (...args: any[]) => Promise<void>;
}
