
exports.up = async function(knex) {
    const exists = await knex.schema.hasTable("theaters");
    if (!exists){
  
      return await knex.schema.CreateTable("theaters"), (table) => {
          table.increments("theater_id").primary();
          table.string("name");
          table.string("address_line_1");
          table.string("address_line_2");
          table.string("city");
          table.string("state");
          table.string("zip");
          table.timestamps(true, true);
      }
    }
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("theaters");
};