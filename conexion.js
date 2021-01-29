require('dotenv').config()
const Sequelize = require('sequelize');
const path = process.env.DB_PATH;
const sequelize = new Sequelize(path);

sequelize.authenticate().then(() => {
    console.log('Conectado...');    
}).catch(err => {
    console.error('Error de conexion:', err);
}).finally(() => {
    sequelize.close();
});



module.exports = sequelize;