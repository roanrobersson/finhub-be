import { SetMetadata } from "@nestjs/common";
import { PermissionEnum } from "src/core/enums/PermissionEnum";

export const REQUIRE_PERMISSIONS_KEY = "requirePermissions";
export const RequirePermissions = (...roles: PermissionEnum[]) =>
	SetMetadata(REQUIRE_PERMISSIONS_KEY, roles);
