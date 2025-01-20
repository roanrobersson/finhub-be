import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { AuthRequest } from "../dtos/AuthRequest";
import { REQUIRE_SELF_KEY } from "../RequireSelfDecorator";

@Injectable()
export class RequireSelfGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const requireSelf = this.reflector.get<boolean>(
			REQUIRE_SELF_KEY,
			context.getHandler()
		);

		if (!requireSelf) {
			return true;
		}

		const request = context.switchToHttp().getRequest<AuthRequest>();

		const user = request.user;
		const requestUserId = Number(request.params.userId);

		if (user.isAdmin() || user.id === requestUserId) {
			return true;
		}

		throw new ForbiddenException();
	}
}
