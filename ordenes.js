require('dotenv').config()
const Sequelize = require('sequelize');
const path = process.env.DB_PATH;
const sequelize = new Sequelize(path);

async function obtenerTodasLasOrdenes() {

   let ordenes = await sequelize.query('SELECT * FROM ordenes', { type: sequelize.QueryTypes.SELECT})
   return ordenes;
}

async function obtenerOrdenesPorUsuario(usuarioId) {
   let ordenes = await sequelize.query('SELECT * FROM ORDENES O, DETALLEORDENES DO, ESTADOORDENES EO,PRODUCTOS P WHERE o.id_orden=do.id_orden and do.id_producto=p.id_producto and o.estado=eo.id_estado AND cliente = :cliente',
    { replacements: {cliente: usuarioId}, type: sequelize.QueryTypes.SELECT})
   return ordenes;
}

function crearOrdenes(data) {
console.log(data);
const { fecha, cliente, valor_total, metodo_de_pago, estado }=data;
   let ordenes = sequelize.query('INSERT INTO Ordenes ( fecha, cliente, valor_total, metodo_de_pago, estado) VALUES (?,?,?,?,?)',
   {replacements : [fecha, cliente, valor_total, metodo_de_pago, estado ]}
   ).then(projects => {
      console.log(projects)
      const id_orden=projects[0]
      const { detalleordenes }= data;
      for(i=0; i < detalleordenes.length; i++){
         let resultado2 = sequelize.query('INSERT INTO DETALLEORDENES (id_orden, id_producto, cantidad, precio) VALUES (?, ?, ?, ?)', {
                     replacements: [id_orden, detalleordenes[i].id_producto, detalleordenes[i].cantidad, detalleordenes[i].precio]
                 });
         }         
   })
   .catch(err => console.error (err))
 return ordenes;
}

async function eliminarOrdenes(data) {
   let detalleordenes= await sequelize.query('DELETE FROM DETALLEORDENES WHERE id_orden=?', { replacements: data});
   let ordenes = await  sequelize.query('DELETE FROM Ordenes WHERE id_orden = ?',
   { replacements: data}
   ).then(function(cambios) {
      console.log(cambios)
  }) 
}

async function actualizarPedido(data, id) {
   const {estado} = data
   let ordenes = await  sequelize.query('UPDATE ordenes SET estado= :estado WHERE id_orden= :id',
   { replacements: {estado, id}}
   ).then(function(cambios) {
      console.log(cambios)
  }) 
}


module.exports = {obtenerTodasLasOrdenes, crearOrdenes, eliminarOrdenes, obtenerOrdenesPorUsuario, actualizarPedido}