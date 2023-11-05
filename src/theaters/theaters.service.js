const knex = require("../db/connection");


async function list(){
    return knex("theaters")
    .select("*");
}

module.exports = { list, }