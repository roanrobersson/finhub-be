import {
	CanActivate,
	ExecutionContext,
	Inject,
	Injectable
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { PermissionEnum } from "src/core/enums/PermissionEnum";

import { AuthRequest } from "../dtos/AuthRequest";
import { REQUIRE_PERMISSIONS_KEY } from "../RequirePermissionsDecorator";

@Injectable()
export class RequirePermissionsGuard implements CanActivate {
	@Inject(Reflector)
	private reflector: Reflector;

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const requiredPermissions = this.reflector.getAllAndOverride<
			PermissionEnum[]
		>(REQUIRE_PERMISSIONS_KEY, [context.getHandler(), context.getClass()]);
		if (!requiredPermissions) {
			return true;
		}
		const request = context.switchToHttp().getRequest<AuthRequest>();
		return requiredPermissions.some((permission) =>
			request.user.permissions.includes(permission)
		);
	}
}
