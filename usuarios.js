require('dotenv').config()
const Sequelize = require('sequelize');
const path = process.env.DB_PATH;
const sequelize = new Sequelize(path);

async function obtenerTodosLosUsuarios() {

   let usuarios = await sequelize.query('SELECT * FROM Usuarios', { type: sequelize.QueryTypes.SELECT})
   return usuarios;
}

async function obtenerInformacionDeUsuario(data) {
   console.log (data);
    let usuarios = await sequelize.query('SELECT * FROM Usuarios WHERE nombre_usuario = :nombre_usuario', 
    { replacements: {nombre_usuario: data}, type: sequelize.QueryTypes.SELECT })
    return usuarios;

}


async function crearUsuarios(data) {

   let usuarios = await sequelize.query('INSERT INTO Usuarios (nombre_usuario, nombre_completo, correo_electronico, telefono, password, direccion, rol) VALUES (?,?,?,?,?,?,?)',
   {replacements : data}
   )
 return usuarios;
}

async function eliminarUsuarios(data) {
   let usuarios = await  sequelize.query('DELETE FROM Usuarios WHERE id_usuario = ?',
   { replacements: data}
   ).then(function(cambios) {
      console.log(cambios)
  }) 
}

async function actualizarUsuarios(data, id) {
   const { nombre_usuario, nombre_completo, correo_electronico, telefono, password, direccion, rol }=data
   let usuarios = await  sequelize.query('UPDATE usuarios SET nombre_usuario= :nombre_usuario, nombre_completo= :nombre_completo, correo_electronico= :correo_electronico, telefono= :telefono, password= :password, direccion= :direccion, rol= :rol WHERE id_usuario= :id',
   { replacements: {nombre_usuario, nombre_completo, correo_electronico, telefono, password, direccion, rol, id}}
   ).then(function(cambios) {
      console.log(cambios)
  }) 
}


module.exports = {obtenerTodosLosUsuarios, crearUsuarios, eliminarUsuarios, obtenerInformacionDeUsuario, actualizarUsuarios}
