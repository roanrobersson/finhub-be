import { relations } from "drizzle-orm";
import {
	boolean,
	integer,
	pgTable,
	primaryKey,
	text
} from "drizzle-orm/pg-core";

// Permission

export const permission = pgTable("permission", {
	id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
	name: text("name").unique().notNull(),
	description: text("description").notNull()
});

export const permissionRelations = relations(permission, ({ many }) => ({
	roles: many(roleToPermission)
}));

// Role

export const role = pgTable("role", {
	id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
	name: text("name").unique().notNull(),
	description: text("description").notNull()
});

export const roleRelations = relations(role, ({ many }) => ({
	permissions: many(roleToPermission)
}));

// RoleToPermission

export const roleToPermission = pgTable(
	"role_to_permission",
	{
		roleId: integer("role_id")
			.notNull()
			.references(() => role.id, { onDelete: "cascade" }),
		permissionId: integer("permission_id")
			.notNull()
			.references(() => permission.id)
	},
	(table) => [
		{
			pk: primaryKey({ columns: [table.roleId, table.permissionId] })
		}
	]
);

export const roleToPermissionRelations = relations(
	roleToPermission,
	({ one }) => ({
		permission: one(permission, {
			fields: [roleToPermission.permissionId],
			references: [permission.id]
		}),
		role: one(role, {
			fields: [roleToPermission.roleId],
			references: [role.id]
		})
	})
);

// User
export const user = pgTable("user", {
	id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
	name: text("name").notNull(),
	email: text("email").unique().notNull(),
	password: text("password").notNull(),
	isActive: boolean("is_active").notNull().default(true)
});

export const userRelations = relations(user, ({ many }) => ({
	roles: many(userToRole)
}));

// UserToRole

export const userToRole = pgTable(
	"user_to_role",
	{
		userId: integer("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		roleId: integer("role_id")
			.notNull()
			.references(() => role.id)
	},
	(table) => [
		{
			pk: primaryKey({ columns: [table.userId, table.roleId] })
		}
	]
);

export const userToRoleRelations = relations(userToRole, ({ one }) => ({
	user: one(user, {
		fields: [userToRole.userId],
		references: [user.id]
	}),
	role: one(role, {
		fields: [userToRole.roleId],
		references: [role.id]
	})
}));
