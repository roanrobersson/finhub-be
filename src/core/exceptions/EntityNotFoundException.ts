import { BusinessException } from "./BusinessException";

export class EntityNotFoundException extends BusinessException {
	constructor(message: string, description?: string) {
		super(message, description);
		this.name = "EntityNotFoundException";
	}
}
