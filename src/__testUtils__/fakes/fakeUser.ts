import { hashPassword } from "src/core/utils/passwordUtils";
import { User } from "src/modules/user/UserEntity";

export async function createFakeUser(): Promise<User> {
	const user = new User();
	user.name = "User";
	user.email = "user@gmail.com";
	user.password = await hashPassword("user");
	user.picture = "https://i.pravatar.cc/150?img=26";
	return user;
}

export async function createFakeAdminUser(): Promise<User> {
	const user = new User();
	user.name = "Admin";
	user.email = "admin@gmail.com";
	user.password = await hashPassword("admin");
	user.picture = "https://i.pravatar.cc/150?img=26";
	return user;
}
