import knex from "knex";
const dbPA = knex({
  client: "sqlite3",
  connection: {
    filename: "db/grocery.db",
  },
  useNullAsDefault: true,
});
export default dbPA;
