export class BusinessException extends Error {
	description: string | null;

	constructor(message: string, description?: string) {
		super(message);
		this.description = description ?? null;
		this.name = "BusinessException";
	}
}
