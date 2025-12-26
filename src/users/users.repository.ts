import { Inject, Injectable } from "@nestjs/common";
import { Kysely } from "kysely";
import { KYSELY } from "src/database/database.module";
import { DB } from "src/database/types";
import { UserCreateRequest } from "./dto/user.request";

@Injectable()
export class UserRepository {
  constructor(
    @Inject(KYSELY) private readonly client: Kysely<DB>,
  ) { }

  async findAllUsers() {
    return this.client
      .selectFrom('user')
      .select([
        'user.user_id',
        'user.firstName',
        'user.lastName',
        'user.email',
        'user.created_at',
        'user.updated_at'
      ])
      .execute();
  }

  async findUserByEmail(email: string) {
    const record = await this.client.selectFrom('user').selectAll().where('email', '=', email).executeTakeFirst();
    return record;
  }

  async findUserById(id: string) {
    const record = await this.client.selectFrom('user').selectAll().where('user_id', '=', id).executeTakeFirst();
    return record;
  }

  async createUser(user: UserCreateRequest): Promise<any> {
    const { firstName, lastName, email, password } = user;
    const record = await this.client
      .insertInto('user')
      .values({
        firstName,
        lastName,
        email,
        password,
      })
      .returning([
        'user_id',
        'firstName',
        'lastName',
        'email',
        'created_at',
        'updated_at'
      ])
      .executeTakeFirstOrThrow();

    return record;
  }
}