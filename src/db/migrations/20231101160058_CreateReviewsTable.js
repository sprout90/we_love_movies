
exports.up = async function(knex) {
    const exists = await knex.schema.hasTable("reviews");
    if (!exists){
  
      return await knex.schema.CreateTable("reviews"), (table) => {
          table.increments("review_id").primary();
          table.string("content");
          table.string("score");
          table.foreign("critic_id").references("critics");
          table.foreign("movie_id").references("movies");
          table.timestamps(true, true);
      }
    }
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("reviews");
};
