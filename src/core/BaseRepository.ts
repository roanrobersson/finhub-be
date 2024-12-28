import { DataSource, EntityTarget, ObjectLiteral, Repository } from "typeorm";

export abstract class BaseRepository<
	T extends ObjectLiteral
> extends Repository<T> {
	constructor(
		readonly model: EntityTarget<T>,
		readonly dataSource: DataSource
	) {
		super(model, dataSource.createEntityManager());
	}
}
