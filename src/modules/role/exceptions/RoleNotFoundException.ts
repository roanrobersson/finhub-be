import { EntityNotFoundException } from "../../../core/exceptions/EntityNotFoundException";

export class RoleNotFoundException extends EntityNotFoundException {
	constructor(identifier: string | number, description?: string) {
		super(`Role '${identifier}' not found`, description);
		this.name = "RoleNotFoundException";
	}
}
