require('dotenv').config()
const express = require ('express');
const jwt = require ('jsonwebtoken');
const expressjwt = require ('express-jwt');
const { response } = require('express');

const informacion = {nombre_completo : 'Ricardo Aguirre', contraseña: process.env.DB_CONTRASEÑA};
const firma = process.env.DB_FIRMA;
const token = jwt.sign(informacion, firma);
console.log(token);
const decodificado = jwt.verify(token,firma);
console.log(decodificado);




const app = express();



app.listen(process.env.DB_PORT, () => {
    console.log ('Servidor iniciado....');
});

