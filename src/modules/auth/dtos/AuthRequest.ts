import { AuthUser } from "./AuthUser";

export interface AuthRequest extends Omit<Request, "user"> {
	user: AuthUser;
}
