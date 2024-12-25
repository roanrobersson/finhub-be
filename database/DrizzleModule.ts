import { Module } from "@nestjs/common";

import { DrizzleAsyncProvider, drizzleProvider } from "./DrizzleProvider";

@Module({ providers: [...drizzleProvider], exports: [DrizzleAsyncProvider] })
export class DrizzleModule {}
