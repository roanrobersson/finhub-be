import { EntityNotFoundException } from "../../../core/exceptions/EntityNotFoundException";

export class TagNotFoundException extends EntityNotFoundException {
	constructor(identifier: string | number, description?: string) {
		super(`Tag '${identifier}' not found`, description);
		this.name = "TagNotFoundException";
	}
}
