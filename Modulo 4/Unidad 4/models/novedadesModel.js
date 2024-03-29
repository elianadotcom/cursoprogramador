var pool = require('./bd');

//listado de novedades//
async function getNovedades() {
    var query = "select * from novedades";
    var rows = await pool.query(query);
    return rows;
}

async function deleteNovedadesById(id) {
    var query = "delete from novedades where id = ?";
    var rows = await pool.query(query, [id]);
    return rows;
}

async function insertNovedades(obj) {
    try {
        var query = "insert into novedades set ?";
        var rows = await pool.query(query, [obj])
        return rows;

    } catch (error) {
        console.log(error);
        throw error;
    } //cierra catch//
} //cierra insert//


/*para modificar novedad x id*/

async function getNovedadesById(id) {
    var query = "select * from novedades where id=? "
    var rows = await pool.query(query, [id]);
    return rows[0];

}

/*update*/
async function modificarNovedadesById(obj, id) {
    try {
        var query = "update novedades set ? where id=? ";
        var rows = await pool.query(query, [obj, id]);
        return rows;
    }catch (error) {
        throw error;
    }
}

async function buscarNovedades(busqueda) {
    var query = "select * from novedades where titular like ? OR comentarios like ?";
    var rows = await pool.query(query, ['%' + busqueda + '%', '%' + busqueda + '%', '%' + busqueda + '%']);
    return rows;
}


module.exports = { getNovedades, deleteNovedadesById, insertNovedades, getNovedadesById, modificarNovedadesById, buscarNovedades }