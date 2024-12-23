import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { Repository } from "typeorm";

import { User } from "./UserEntity";

@Injectable()
export class UserService {
	@InjectRepository(User)
	private userRepository: Repository<User>;

	async findOne(id: number): Promise<User | undefined> {
		const user = await this.userRepository.findOneBy({ id });
		if (!user) {
			throw new NotFoundException(`User with id ${id} not found`);
		}
		return user;
	}

	async findOneByUsername(username: string): Promise<User | undefined> {
		const user = await this.userRepository.findOneBy({ email: username });
		if (!user) {
			throw new NotFoundException(`User with username ${username} not found`);
		}
		return user;
	}

	async findAll(): Promise<User[]> {
		return this.userRepository.find();
	}

	async create(user: User): Promise<User> {
		const hashedPassword = await this.hashPassword(user.password);
		user.password = hashedPassword;
		return this.userRepository.save(user);
	}

	async delete(id: number): Promise<void> {
		await this.userRepository.delete(id);
	}

	async validatePassword(
		plainPassword: string,
		hashedPassword: string
	): Promise<boolean> {
		return bcrypt.compare(plainPassword, hashedPassword);
	}

	private async hashPassword(password: string): Promise<string> {
		const saltRounds = 10;
		return bcrypt.hash(password, saltRounds);
	}
}
