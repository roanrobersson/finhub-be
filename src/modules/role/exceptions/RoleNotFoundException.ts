import { EntityNotFoundException } from "../../../core/exceptions/EntityNotFoundException";

export class RoleNotFoundException extends EntityNotFoundException {
	constructor(id: number) {
		super(`Role with id ${id} not found`);
		this.name = "RoleNotFoundException";
	}
}
