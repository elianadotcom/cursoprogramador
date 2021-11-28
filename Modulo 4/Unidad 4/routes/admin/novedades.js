var express = require('express');
var router = express.Router();
var novedadesModel = require('./../../models/novedadesModel');


/* GET home page. */
router.get('/', async function (req, res, next) {
    var novedades = await novedadesModel.getNovedades();
    res.render('admin/novedades', {
        layout:'admin/layout',
        usuario: req.session.nombre,
        novedades
    });
});

/* para eliminar novedad*/
router.get('/eliminar/:id' , async (req, res, next) => {
    var id = req.params.id;
    await novedadesModel.deleteNovedadesById(id);
    res.redirect('/admin/novedades')
}); /*cierra get eliminar*/

/*form para agregar*/

router.get('/agregar', (req, res, next) => {
    res.render('admin/agregar', {
        layout: 'admin/layout'
    }) //cierra el render//
}); //cierra el get//

router.post('/agregar', async (req, res, next) => {
    try {
        if (req.body.titular != "" && req.body.fecha != "" && req.body.comentarios != "") {
            await novedadesModel.insertNovedades(req.body);
            res.redirect('/admin/novedades')        
        } else {
            res.render('admin/agregar', {
                layout: 'admin/layout',
                error: true, message: 'Todos los campos son requeridos'
        })
    } 
 } catch (error) {
    console.log(error)
    res.render('admin/agregar', {
        layout: 'admin/layout',
        error: true, message: 'No se cargo la novedad'
    });
}
});
//modificar//

router.get('/modificar/id', async (req, res, next) => {
    var id = req.params.id;
    var novedad = await novedadesModel.getNovedadesById(id);
    res.render('admin/modificar', {
        layout: 'admin/layout',
        novedad
    });
});

router.post('/modificar', async (req, res, next) => {
    try {
        var obj = {
            titular: req.body.titular,
            comentarios: req.body.comentarios,
        }

        console.log(obj)
        await novedadesModel.modificarNovedadesById(obj, req.body.id);
        res.redirect('/admin/novedades');
    } catch (error) {
        res.render('admin/modificar', {
            layout: 'admin/layout',
            error: true,
            message: 'No se modifico la novedad'
        })
    }
});

router.get('/modificar/:id', async (req, res, next) => {
    var id = req.params.id;
    var novedad = await novedadesModel.getNovedadesById(id);
    res.render('admin/modificar', {
        layout: 'admin/layout',
        novedad
    });
});


module.exports = router