
exports.up = async function(knex) {
    const exists = await knex.schema.hasTable("movies_theaters");
    if (!exists){
  
      return await knex.schema.CreateTable("movies_theaters"), (table) => {
          table.foreign("movie_id").references("movies");
          table.foreign("theater_id").references("theaters");
          table.boolean("is_showing");
          table.timestamps(true, true);
      }
    }
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("movies_theaters");
};
