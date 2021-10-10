var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

router.post('/', async(req, res, next) => {
    var nombre = req.body.nombre;
    var apellido = req.body.apellido;
    var email = req.body.email;
    var telefono = req.body.telefono;
    var mensaje = req.body.mensaje;

    //console.log(req.body);
  
  var obj = {
    to: 'eliana.gadea@gmail.com',
    subject: 'CONTACTO WEB',
    html: nombre + " se contacto a través de la web y quiere mas informacion a este correo : " + email + ". <br> Además, hizo este comentario: " + mensaje + ".<br> Su tel es: " + telefono
  }
  var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
    
  });

  var info = await transport.sendMail(obj);

  res.render('index', {
    message: 'Mensaje enviado correctamente'
  });

});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
