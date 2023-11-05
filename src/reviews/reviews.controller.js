const service = require("./reviews.service.js");

async function list(req, res){
    res.json( { data: await service.list() })

}

module.exports = {
    list,
}