
exports.up = function(knex) {
   
      return knex.schema
        .dropTableIfExists("reviews")
        .createTable("reviews", table => {
          table.increments("review_id").primary();
          table.specificType("content", "varchar");
          table.integer("score");
          table.integer("critic_id");
          table.integer("movie_id");
          table.foreign("critic_id").references("critics.critic_id");
          table.foreign("movie_id").references("movies.movie_id");
          table.timestamps(true, true);
      }
    )
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("reviews");
};
