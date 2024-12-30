import {
	CanActivate,
	ExecutionContext,
	Inject,
	Injectable
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { RoleEnum } from "src/core/enums/RoleEnum";

import { ROLES_KEY } from "./RolesDecorator";

@Injectable()
export class RolesGuard implements CanActivate {
	@Inject(Reflector)
	private reflector: Reflector;

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(
			ROLES_KEY,
			[context.getHandler(), context.getClass()]
		);
		if (!requiredRoles) {
			return true;
		}
		const request = context.switchToHttp().getRequest();
		return requiredRoles.some((role) => request.user.roles.includes(role));
	}
}
