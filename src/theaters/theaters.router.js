const router = require("express").Router();
const controller = require("./theaters.controller")
const methodNotAllowed = require("../errors/methodNotAllowed");

router
    .route("/")
    .get(controller.list)
    .all(methodNotAllowed);


/*router
    .route("/:movieId")
    .get(controller.read)
    .all(methodNotAllowed);

    module.exports = router;
*/

module.exports = router;