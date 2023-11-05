const service = require("./movies.service.js");

// VALIDATION FUNCTIONS

async function movieExists(req, res, next){

    const { movieId } = req.params;
    console.log("movieId", movieId)
    const movie = await service.read(movieId);
    
    if (movie) {
        res.locals.movie = movie;
        return next();
    } else {
        next({ status: 404, message: `Movie cannot be found.` });
    }
}

// SERVER FUNCTIONS

async function list(req, res){

    let query_data; 
    const {is_showing = "not sent"} = req.query;

    if ((is_showing) && (is_showing.toLowerCase() == "true")){
        query_data = await service.is_showing();
    } else {
        query_data = await service.list()
    }
    
    res.json( { data: query_data })
}

async function read(req, res){

    res.json( { data: res.locals.movie })
};

async function readAtTheaters(req, res){
   
    const { movieId } = req.params;
    console.log("movieId", movieId)

    query_data = await service.readAtTheaters(movieId);
    res.json( { data: query_data })
}

async function readWithReviews(req, res){
   
    const { movieId } = req.params;
    console.log("movieId", movieId)

    query_data = await service.readWithReviews(movieId);
    const reviews = query_data.map((data) =>  {
        const row = {  review_id: data.review_id,
            content: data.content,
            score: data.score,
            created_at: data.created_at,
            updated_at: data.updated_at,
            critic_id: data.critic_id,
            movie_id: data.movie_id,
            critic: {
                critic_id: data.c_critic_id,
                preferred_name: data.c_preferred_name,
                surname: data.c_surname,
                organization_name: data.c_organizaiton_name,
                created_at: data.c_created_at,
                updated_at: data.c_updated_at
            }
        }
        return row;
      });

    res.json( { data: reviews })
}
   

module.exports = {
    list,
    read: [movieExists, read],
    readAtTheaters,
    readWithReviews,
}