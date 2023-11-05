const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addMovie = mapProperties({
    movie_id: "movies.movie_id",
    title: "movies.title",
    runtime_in_minutes: "movies.runtime_in_minutes",
    rating: "movies.rating",
    description: "movies.description",
    image_url: "movies.image_url",
    created_at: "movies.created_at",
    updated_at: "movies.updated_at",
    is_showing: "movies.is_showing",
    theater_id: "movies.theater_id"
})

async function list(){
    return knex("theaters as t")
    .join("movies_theaters as mt", {"t.theater_id": "mt.theater_id" })
    .join("movies as m", {"mt.movie_id": "m.movie_id"})
    .select("t.*", "m.*", "mt.is_showing","mt.theater_id" )
    .then(addMovie);

}

module.exports = { list, }