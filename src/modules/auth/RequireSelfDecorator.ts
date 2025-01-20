import { SetMetadata } from "@nestjs/common";

export const REQUIRE_SELF_KEY = "requireSelf";
export const RequireSelf = () => SetMetadata(REQUIRE_SELF_KEY, true);
