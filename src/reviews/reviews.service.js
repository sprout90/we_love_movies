const knex = require("../db/connection");
const map_properties = require("../utils/map-properties");


const addCritic = map_properties({
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
    created_at: "critic.created_at",
    updated_at: "critic.updated_at"
}
);


async function read(reviewId){
    return knex("reviews")
    .where({"review_id": reviewId})
    .select("content", "score", "critic_id", "movie_id", "created_at", "updated_at", "review_id")
    .first();
};

async function list(){
    return knex("reviews")
    .select("review_id", "content", "score", "critic_id");
};

async function destroy(review_id){
    return knex("reviews")
    .where({review_id: review_id})
    .del();
};

async function update(updatedReview){
    await knex("reviews")
    .where({review_id: updatedReview.review_id })
    .update(updatedReview);

    const response = await knex("reviews as r")
        .where({review_id: updatedReview.review_id})
        .join("critics as c", {"r.critic_id": "c.critic_id"})
        .select("r.review_id as r_review_id","r.content as r_content", "r.score as r_score", "r.critic_id as r_critic_id", "r.movie_id as r_movie_id", "r.created_at as r_created_at", "r.updated_at as r_updated_at", "c.*")
        .first()
        .then(addCritic);

    return response;
};

module.exports = {  list, 
                    read, 
                    update,
                    destroy }