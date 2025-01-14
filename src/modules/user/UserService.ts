import { Inject, Injectable } from "@nestjs/common";
import { BusinessException } from "src/core/exceptions/BusinessException";
import { UniqueException } from "src/core/exceptions/UniqueException";
import { hashPassword, isPasswordValid } from "src/core/utils/passwordUtils";
import { Transactional } from "typeorm-transactional";

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

	async getByEmail(email: string): Promise<User> {
		const user = await this.userRepository.findOne({
			where: { email },
			relations: ["roles", "roles.permissions"]
		});
		if (!user) {
			throw new UserNotFoundException(email);
		}
		return user;
	}

	@Transactional()
	async save(user: User): Promise<User> {
		await this.validateUniqueUser(user);
		if (user.isNew() && user.password) {
			const hashedPassword = await hashPassword(user.password);
			user.password = hashedPassword;
		}
		return await this.userRepository.save(user);
	}

	@Transactional()
	async changePassword(
		id: number,
		currentPassword: string,
		newPassword: string
	): Promise<void> {
		const user = await this.getById(id);
		const isCurrentPasswordValid = await isPasswordValid(
			currentPassword,
			user.password
		);
		if (!isCurrentPasswordValid) {
			throw new BusinessException("Current password is incorrect");
		}
		user.password = await hashPassword(newPassword);
		await this.userRepository.save(user);
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
