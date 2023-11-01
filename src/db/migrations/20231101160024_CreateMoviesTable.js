
exports.up = function(knex) {
   
      return knex.schema
        .dropTableIfExists("movies")
        .createTable("movies", table => {
          table.increments("movie_id").primary();
          table.string("title");
          table.integer("runtime_in_minutes");
          table.string("rating");
          table.specificType("description", "varchar");
          table.string("image_url");
          table.timestamps(true, true);
        }
      );
  }

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("movies");
};
