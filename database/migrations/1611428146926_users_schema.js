"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UsersSchema extends Schema {
  up() {
    this.create("users", (table) => {
      table.increments();
      table.string("nome", "100");
      table.string("email", "254");
      table.string("empresa", "200");
      table.enu("critica", [1, 2, 3, 4]);
      table.text("outraCritica", "longtext");
      table.timestamps();
    });
  }

  down() {
    this.drop("users");
  }
}

module.exports = UsersSchema;
