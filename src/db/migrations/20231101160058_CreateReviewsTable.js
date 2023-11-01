
exports.up = function(knex) {
   
      return knex.schema
        .dropTableIfExists("reviews")
        .CreateTable("reviews", table => {
          table.increments("review_id").primary();
          table.specificType("content", "varchar");
          table.integer("score");
          table.foreign("critic_id").references("critics");
          table.foreign("movie_id").references("movies");
          table.timestamps(true, true);
      }
    )
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("reviews");
};
