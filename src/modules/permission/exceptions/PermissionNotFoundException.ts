import { EntityNotFoundException } from "../../../core/exceptions/EntityNotFoundException";

export class PermissionNotFoundException extends EntityNotFoundException {
	constructor(identifier: string | number) {
		super(`Permission '${identifier}' not found`);
		this.name = "PermissionNotFoundException";
	}
}
