import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor
} from "@nestjs/common";
import { Observable } from "rxjs";
import { delay } from "rxjs/operators";

@Injectable()
export class ResponseDelayInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const request = context.switchToHttp().getRequest();
		const delayHeader = request.headers["x-delay"];

		if (delayHeader) {
			const delayTime = parseInt(delayHeader, 10);

			if (!isNaN(delayTime) && delayTime > 0) {
				return next.handle().pipe(delay(delayTime));
			}
		}

		return next.handle();
	}
}
