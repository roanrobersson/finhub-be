import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { Repository } from "typeorm";

import { User } from "./UserEntity";

@Injectable()
export class UserService {
	@InjectRepository(User)
	private userRepository: Repository<User>;

	async getById(id: number): Promise<User> {
		const user = await this.userRepository.findOne({
			where: { id },
			relations: ["roles", "roles.permissions"]
		});
		if (!user) {
			throw new NotFoundException(`User with id ${id} not found`);
		}
		return user;
	}

	async findOneByUsername(username: string): Promise<User> {
		const user = await this.userRepository.findOneBy({ email: username });
		if (!user) {
			throw new NotFoundException(`User with username ${username} not found`);
		}
		return user;
	}

	async getAll(): Promise<User[]> {
		return this.userRepository.find();
	}

	async save(user: User): Promise<User> {
		if (user.isNew()) {
			const hashedPassword = await UserService.hashPassword(user.password);
			user.password = hashedPassword;
		}
		return this.userRepository.save(user);
	}

	async remove(id: number): Promise<void> {
		await this.userRepository.delete(id);
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
