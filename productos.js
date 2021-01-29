require('dotenv').config()
const Sequelize = require('sequelize');
const path = process.env.DB_PATH;
const sequelize = new Sequelize(path);

async function obtenerTodosLosProductos() {

   let productos = await sequelize.query('SELECT * FROM Productos', { type: sequelize.QueryTypes.SELECT})
   return productos;
}

async function crearProductos(data) {

   let productos = await sequelize.query('INSERT INTO Productos (nombre, foto, precio, favorito) VALUES (?,?,?,?)',
   {replacements : data}
   )
   console.log(productos);
 return productos;
}


async function eliminarProductos(data) {
   let productos = await  sequelize.query('DELETE FROM Productos WHERE id_producto = ?',
   { replacements: data}
   ).then(function(cambios) {
      console.log(cambios)
  }) 
}

async function actualizarProductos(data, id) {
   const { nombre, foto, precio, favorito }=data
   let productos = await  sequelize.query('UPDATE PRODUCTOS SET nombre= :nombre, foto= :foto, precio= :precio, favorito= :favorito WHERE id_producto= :id',
   { replacements: {nombre, foto, precio, favorito, id}}
   ).then(function(cambios) {
      console.log(cambios)
  }) 
}

module.exports = {obtenerTodosLosProductos, crearProductos, eliminarProductos, actualizarProductos}
