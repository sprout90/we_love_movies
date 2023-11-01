
exports.up = function(knex) {
   
      return knex.schema
          .dropTableIfExists("movies_theaters")
          .createTable("movies_theaters", table => {
          table.integer("movie_id");
          table.integer("theater_id");
          table.foreign("movie_id").references("movies.movie_id");
          table.foreign("theater_id").references("theaters.theater_id");
          table.boolean("is_showing");
          table.timestamps(true, true);
      }
    )
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("movies_theaters");
};
