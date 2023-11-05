const service = require("./theaters.service.js");

async function list(req, res){
    res.json( { data: await service.list() })

}

module.exports = {
    list,
}