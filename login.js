require('dotenv').config()
const express = require('express');
const jwt = require ('jsonwebtoken');
const firma = process.env.DB_FIRMA;

//Generar token//
const tokenAcceso = (data) => {
    return jwt.sign(data, firma)
}

//Obtengo Unicamente el valor del token generado en el login//
const separarToken = (data) => {
    return data.split(' ')[1]
}

//verificar Token//
const verificarToken = (data) => {
    let v_return;
    jwt.verify(data, firma, (err, usuario) => {
        if (err){
            v_return=403
            }else{
            v_return=usuario;
            }
    });
    return v_return;
}

//Obtener datos de Usuario de JWT//
const obteneDatosUsuarioJwt = (token) => {
    const splitToken = separarToken(token);
    const resultado = verificarToken(splitToken);
    return resultado;
}

//Middleware para validar Administrador//
const validarAdministrador = (req, res, next) => {
    const usuario = obteneDatosUsuarioJwt(req.headers.authorization);
    if (usuario.rol!== 'administrador') {
        res.status(401).json({ mensaje: 'Usuario no autorizado'})   
    } else {
        next();
    }
    return;
}


// Middleware Autenticar con JWT//
const autenticar = (req, res, next) => {
    const tokenHeader = req.headers.authorization;
    if (tokenHeader === undefined) {
        res.status(401).json({ mensaje: 'Usuario no autorizado'})
      } else {
          const token = separarToken(tokenHeader);
          const verificar = verificarToken(token);
          if (verificar === 403) {
              return res.status(403).json ({mensaje: 'Acceso denegado'});
          }
          req.usuario = verificar
          console.log(token,verificar)
          next ();
      }
      return; 
}



module.exports ={tokenAcceso, autenticar, obteneDatosUsuarioJwt, validarAdministrador}