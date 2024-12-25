import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { UniqueException } from "src/core/exceptions/UniqueException";

import { User } from "./UserEntity";
import { UserRepository } from "./UserRepository";

@Injectable()
export class UserService {
	@Inject()
	private userRepository: UserRepository;

	async getAll(): Promise<User[]> {
		return this.userRepository.findAll() as any;
	}

	async getById(id: number): Promise<User> {
		const user = await this.userRepository.findById(id);
		if (!user) {
			throw new NotFoundException(`User with id ${id} not found`);
		}
		return user as any;
	}

	async findByUsername(username: string): Promise<User> {
		const user = await this.userRepository.findByEmail(username);
		if (!user) {
			throw new NotFoundException(`User with username ${username} not found`);
		}
		return user as any;
	}

	async save(user: User): Promise<User> {
		await this.validateUniqueUser(user);
		if (user.isNew()) {
			const hashedPassword = await UserService.hashPassword(user.password);
			user.password = hashedPassword;
		}
		await this.userRepository.save(user);
		return user;
	}

	async remove(id: number): Promise<void> {
		await this.userRepository.remove(id);
	}

	async validateUniqueUser(user: User) {
		const isInsert = user.isNew();
		const existingUser = await this.userRepository.findByEmail(user.email);
		if (!existingUser) {
			return;
		}
		if (isInsert || existingUser.id !== user.id) {
			throw new UniqueException(`User with email ${user.email} already exists`);
		}
	}

	static async validatePassword(
		plainPassword: string,
		hashedPassword: string
	): Promise<boolean> {
		return bcrypt.compare(plainPassword, hashedPassword);
	}

	static async hashPassword(password: string): Promise<string> {
		const saltRounds = 10;
		return bcrypt.hash(password, saltRounds);
	}
}
