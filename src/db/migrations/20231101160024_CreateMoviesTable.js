
exports.up = async function(knex) {

    const exists = await knex.schema.hasTable("movies");
    if (!exists){
  
      return knex.schema.CreateTable("movies"), (table) => {
          table.increments("movie_id").primary();
          table.string("title");
          table.integer("runtime_in_minutes");
          table.string("rating");
          table.string("description");
          table.string("image_url");
          table.timestamps(true, true);
      }
    }
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("movies");
};
