const service = require("./theaters.service.js");

async function list(req, res){
    const data = await service.list();

    const theaters = data.map((theater) => { 
        const row = {
            theater_id: theater.t_theater_id,
            name: theater.t_name,
            address_line_1: theater.t_address_line_1,
            address_line_2: theater.t_address_line_2,
            city: theater.t_city,
            state: theater.t_state,
            zip: theater.t_zip,
            created_at: theater.t_theater_id,
            updated_at: theater.t_updated_at,
            movies: theater.movies
        }
        return row;
      })

    res.json( { data: theaters })
}

module.exports = {
    list,
}