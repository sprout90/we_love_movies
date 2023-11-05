const knex = require("../db/connection");


async function list(){
    return knex("reviews")
    .select("review_id", "content", "score", "critic_id");
}

module.exports = { list, }