import { ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { IS_PUBLIC_KEY } from "src/core/decorators/PublicDecorator";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
	@Inject()
	private reflector: Reflector;

	canActivate(context: ExecutionContext) {
		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
			context.getHandler(),
			context.getClass()
		]);
		if (isPublic) {
			return true;
		}
		return super.canActivate(context);
	}
}
