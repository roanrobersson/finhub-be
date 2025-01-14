import { EntityNotFoundException } from "../../../core/exceptions/EntityNotFoundException";

export class UserNotFoundException extends EntityNotFoundException {
	constructor(identifier: string | number, description?: string) {
		super(`User '${identifier}' not found`, description);
		this.name = "UserNotFoundException";
	}
}
