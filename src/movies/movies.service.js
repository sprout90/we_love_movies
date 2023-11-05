const knex = require("../db/connection");


async function list(){
    return knex("movies")
    .select("movie_id as id", "title", "runtime_in_minutes", "rating", "description", "image_url");
}

async function is_showing(){
    return knex("movies as m")
    .distinct()
    .join("movies_theaters as mt", {"m.movie_id": "mt.movie_id" })
    .where({"mt.is_showing": true})
    .select("m.movie_id", "m.title", "m.runtime_in_minutes", "m.rating", "m.description", "m.image_url");

}

async function read(movieId){
    return knex("movies")
    .where({"movie_id": movieId})
    .select("title", "runtime_in_minutes", "rating", "description", "image_url", "created_at", "updated_at", "movie_id")
    .first();
}

async function readAtTheaters(movieId){
    return knex("movies as m")
    .distinct()
    .join("movies_theaters as mt", {"m.movie_id": "mt.movie_id" })
    .join("theaters as t", {"mt.theater_id": "t.theater_id"})
    .where({"mt.is_showing": true})
    .andWhere({"m.movie_id": movieId})
    .select("t.theater_id", "t.name", "t.address_line_1", "t.address_line_2", "t.city", "t.state", "t.zip", "t.created_at", "t.updated_at", "mt.is_showing", "m.movie_id" );

}

async function readWithReviews(movieId){
    return knex("movies as m")
    .distinct()
    .join("reviews as r", {"m.movie_id": "r.movie_id" })
    .join("critics as c", {"r.critic_id": "c.critic_id"})
    .where({"m.movie_id": movieId})
    .select("r.review_id","r.content","r.score","r.created_at", "r.updated_at", "r.critic_id", "r.movie_id", "c.critic_id as c_critic_id", "c.preferred_name as c_preferred_name","c.surname as c_surname","c.organization_name as c_organization_name","c.created_at as c_created_at","c.updated_at as c_updated_at");

}



module.exports = {  list,
                    is_showing,
                    read, 
                    readAtTheaters,
                    readWithReviews};