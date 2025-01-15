import { withTimestamp } from "src/core/utils/miscUtils";
import { hashPassword } from "src/core/utils/passwordUtils";
import { User } from "src/modules/user/UserEntity";

export async function createFakeUser(): Promise<User> {
	const user = new User();
	user.name = "User";
	user.email = withTimestamp("user") + "@gmail.com";
	user.password = await hashPassword("12345678");
	user.picture = "https://i.pravatar.cc/150?img=26";
	return user;
}
