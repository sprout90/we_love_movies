
exports.up = async function(knex) {

  const exists = await knex.schema.hasTable("critics");
  if (!exists){

    return knex.schema.CreateTable("critics"), (table) => {
        table.increments("critic_id").primary();
        table.string("preferred_name");
        table.string("surname");
        table.string("organization_name");
        table.timestamps(true, true);
    }
  }
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("critics");
};
