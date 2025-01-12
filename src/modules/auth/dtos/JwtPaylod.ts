export class JwtPaylod {
	sub: number;
	name: string;
	username: string;
	picture: string | null;
	roles: string[];
	permissions: string[];
	iat: number;
	exp: number;
}
