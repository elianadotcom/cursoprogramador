var pool = require('./bd');

//listado de novedades//
async function getNovedades() {
    var query ='select * from novedades';
    var rows = await pool.query(query);
    return rows;
}
module.exports = { getNovedades }