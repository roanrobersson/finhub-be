import { EntityNotFoundException } from "../../../core/exceptions/EntityNotFoundException";

export class UserNotFoundException extends EntityNotFoundException {
	constructor(id: number | null, description?: string) {
		if (id === null) {
			super("User not found", description);
		} else {
			super(`User with id ${id} not found`, description);
		}
		this.name = "UserNotFoundException";
	}
}
