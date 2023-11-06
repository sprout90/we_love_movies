const service = require("./reviews.service.js");


// VALIDATION FUNCTIONS

async function reviewExists(req, res, next){

    const { reviewId } = req.params;
    const review = await service.read(reviewId);
    
    if (review) {
        res.locals.review = review;
        return next();
    } else {
        next({ status: 404, message: `Review cannot be found.` });
    }
}

// SERVER FUNCTIONS

async function updateReview(req, res, next){
    const updatedReview = {
        ...req.body.data,
        review_id: res.locals.review.review_id,
      };
    
      const data = await service.update(updatedReview);

      const review = {
        review_id: data.r_review_id,
        content: data.r_content,
        score: data.r_score,
        critic_id: data.r_critic_id,
        movie_id: data.r_movie_id,
        created_at: data.r_created_at,
        updated_at: data.r_updated_at,
        critic: data.critic
      }

      res.json({ data: review });
}

async function deleteReview(req, res, next){

    await service.destroy(res.locals.review.review_id);
    res.sendStatus(204);

}

async function list(req, res){
    res.json( { data: await service.list() })

}

module.exports = {
    list,
    update: [reviewExists, updateReview],
    delete: [reviewExists, deleteReview]
}