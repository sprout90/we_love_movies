const router = require("express").Router({mergeParams: true});
const controller = require("./movies.controller")
const cors = require("cors");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
    .route("/")
    .get(controller.list)
    .all(methodNotAllowed);


router
    .route("/:movieId")
    .get(controller.read)
    .all(methodNotAllowed);

router
    .route("/:movieId/theaters")
    .get(controller.readAtTheaters)
    .all(methodNotAllowed);

router
    .route("/:movieId/reviews")
    .get(controller.readWithReviews)
    .all(methodNotAllowed);

module.exports = router;
