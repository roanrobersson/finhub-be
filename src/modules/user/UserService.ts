import { Inject, Injectable } from "@nestjs/common";
import { UniqueException } from "src/core/exceptions/UniqueException";
import { hashPassword } from "src/core/utils/passwordUtils";

import { UserNotFoundException } from "./exceptions/UserNotFoundException";
import { User } from "./UserEntity";
import { UserRepository } from "./UserRepository";

@Injectable()
export class UserService {
	@Inject()
	private userRepository: UserRepository;

	async getAll(): Promise<User[]> {
		return this.userRepository.find();
	}

	async getById(id: number): Promise<User> {
		const user = await this.userRepository.findOne({
			where: { id },
			relations: ["roles", "roles.permissions"]
		});
		if (!user) {
			throw new UserNotFoundException(id);
		}
		return user;
	}

	async findOneByUsername(username: string): Promise<User> {
		const user = await this.userRepository.findOneBy({
			email: username
		});
		if (!user) {
			throw new UserNotFoundException(
				null,
				`User with email ${username} not found`
			);
		}
		return user;
	}

	async save(user: User): Promise<User> {
		await this.validateUniqueUser(user);
		if (user.isNew()) {
			const hashedPassword = await hashPassword(user.password);
			user.password = hashedPassword;
		}
		return await this.userRepository.save(user);
	}

	async remove(id: number): Promise<void> {
		await this.userRepository.delete(id);
	}

	async validateUniqueUser(user: User) {
		const isInsert = user.isNew();
		const existingUser = await this.userRepository.findOneBy({
			email: user.email
		});
		if (!existingUser) {
			return;
		}
		if (isInsert || existingUser.id !== user.id) {
			throw new UniqueException(`User with email ${user.email} already exists`);
		}
	}
}
