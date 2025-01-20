import {
	CanActivate,
	ExecutionContext,
	Inject,
	Injectable
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { RoleEnum } from "src/core/enums/RoleEnum";

import { AuthRequest } from "../dtos/AuthRequest";
import { REQUIRE_ROLES_KEY } from "../RequireRolesDecorator";

@Injectable()
export class RequireRolesGuard implements CanActivate {
	@Inject(Reflector)
	private reflector: Reflector;

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(
			REQUIRE_ROLES_KEY,
			[context.getHandler(), context.getClass()]
		);
		if (!requiredRoles) {
			return true;
		}
		const request = context.switchToHttp().getRequest<AuthRequest>();
		return requiredRoles.some((role) => request.user.roles.includes(role));
	}
}
