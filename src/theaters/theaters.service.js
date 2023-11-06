const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

const reduceMovies = reduceProperties("theater_id",
    {
    theater_id:["theater","theaters.theater_id"],
    name:["theater","theaters.name"],
    address_line_1:["theater","theaters.address_line_1"],
    address_line_2:["theater","theaters.address_line_2"],
    city:["theater","theaters.city"],
    state:["theater","theaters.state"],
    zip:["theater","theaters.zip"],
    created_at:["theater","theaters.created_at"],
    updated_at:["theater","theaters.updated_at"],
    movie_id: ["movies", null, "movie_id"],
    title:["movies",null,"title"],
    runtime_in_minutes:["movies", null,"runtime_in_minutes"],
    rating:["movies", null, "rating"],
    description:["movies", null, "description"],
    image_url:["movies", null, "image_url" ],
    created_at:["movies", null,"created_at" ],
    updated_at:["movies", null, "updated_at"],
    is_showing:["movies", null, "is_showing"],
    theater_id:["movies", null, "theater_id"]
})

async function list(){
    return knex("theaters as t")
    .join("movies_theaters as mt", {"t.theater_id": "mt.theater_id" })
    .join("movies as m", {"mt.movie_id": "m.movie_id"})
    .select("t.theater_id as t_theater_id", "t.name as t_name", "t.address_line_1 as t_address_line_1", "t.address_line_2 as t_address_line_2", "t.city as t_city", "t.state as t_state", "t.zip as t_zip", "t.created_at as t_created_at", "t.updated_at as t_updated_at",
         "m.*", 
         "mt.is_showing","mt.theater_id" )
    .then(reduceMovies);

}

module.exports = { list, }