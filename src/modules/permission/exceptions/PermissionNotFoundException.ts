import { EntityNotFoundException } from "../../../core/exceptions/EntityNotFoundException";

export class PermissionNotFoundException extends EntityNotFoundException {
	constructor(id: number) {
		super(`Permission with id ${id} not found`);
		this.name = "PermissionNotFoundException";
	}
}
