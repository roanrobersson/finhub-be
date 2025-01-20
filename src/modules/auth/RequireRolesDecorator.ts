import { SetMetadata } from "@nestjs/common";
import { RoleEnum } from "src/core/enums/RoleEnum";

export const REQUIRE_ROLES_KEY = "requireRoles";
export const RequireRoles = (...roles: RoleEnum[]) =>
	SetMetadata(REQUIRE_ROLES_KEY, roles);
