require('dotenv').config()
const express = require ('express');
const productos = require ('./productos')
const usuarios = require ('./usuarios')
const ordenes = require ('./ordenes')
const login = require ('./login')

const server = express();
server.use (express.json());

//Endpoint de Login//
server.post('/login', (req,res) => {
    const { nombre_usuario,password}=req.body;
    console.log(req.body)
    usuarios.obtenerInformacionDeUsuario(nombre_usuario).then(usuario => {
        console.log(usuario)
        if (usuario.length > 0) {
            if (password === usuario[0].password) {
                const autorizar = {
                    name: nombre_usuario,
                    rol: usuario[0].rol,
                    usuarioId: usuario[0].id_usuario
                }
                const token = login.tokenAcceso(autorizar)
                res.json(token);
            } else {
                res.status(401).json({
                    mensaje: 'Usuario/password incorrecto'
                })
            }
        } else {
            res.status(401).json({
                mensaje: 'Usuario/password incorrecto'
            })
        }
      
    })
})



//Endpoint de Productos//
server.get('/productos', login.autenticar,(req, res) => {
    productos.obtenerTodosLosProductos().then(producto => res.status(200).json({producto}))
})

server.post('/productos', login.autenticar, login.validarAdministrador,(req, res) => {
        let nuevoProducto=Object.values(req.body);
        const result = productos.crearProductos(nuevoProducto);
        result.then (producto => {
        res.status(201).json('Producto creado correctamente')})
        .catch (error => {
            res.status(409).json({
            Message: error.parent.sqlMessage
        })});
});

server.delete('/productos', login.autenticar, login.validarAdministrador,(req, res) => {
    let eliminar= Object.values(req.body);
        productos.eliminarProductos(eliminar).then(producto => {
            res.status(201).json('Producto eliminado correctamente')} )
});

server.put('/productos/:id', login.autenticar, login.validarAdministrador,(req, res) => {
     productos.actualizarProductos(req.body, req.params.id).then(producto => {
    res.status(201).json('Producto actualizado correctamente')} )
});

// Endpoint de Usuarios //
server.get('/usuarios', login.autenticar,(req, res) => {
    usuarios.obtenerTodosLosUsuarios().then(usuario => res.status(200).json({usuario}))
})

server.post('/usuarios', login.autenticar,(req, res) => {
    let nuevoUsuario= Object.values(req.body);
    const result = usuarios.crearUsuarios(nuevoUsuario);
    result.then(usuario => {
    res.status(201).json('Usuario creado correctamente')} )
    .catch (error => {
        res.status(409).json({Message:error.parent.sqlMessage})
    })
});

server.delete('/usuarios', login.autenticar, login.validarAdministrador,(req, res) => {
    let eliminar= Object.values(req.body);
     usuarios.eliminarUsuarios(eliminar).then(usuario => {
     res.status(201).json('Usuario eliminado correctamente')} )
});

server.put('/usuarios/:id', login.autenticar,(req, res) => {
    usuarios.actualizarUsuarios(req.body, req.params.id).then(usuario => {
   res.status(201).json('Usuario actualizado correctamente')} )
});

// Endpoint de Pedidos//
server.get('/ordenes', login.autenticar, (req, res) => {
    ordenes.obtenerTodasLasOrdenes().then(orden => res.status(200).json({orden}))
})

server.get ('/ordenes/byUser', login.autenticar, (req, res) => {
    const usuarios = login.obteneDatosUsuarioJwt(req.headers.authorization);
    ordenes.obtenerOrdenesPorUsuario(usuarios.usuarioId).then(orden => res.status(200).json({orden}))
}) 

server.post('/ordenes', login.autenticar, (req, res) => {
    let nuevaOrden= Object.values(req.body);
    const result = ordenes.crearOrdenes(req.body);
    result.then(orden => {
    res.status(201).json('Orden creada correctamente')} )
    .catch (error => {
        res.status(409).json({Message:error.parent.sqlMessage})
    })
});

server.delete('/ordenes', login.autenticar, (req, res) => {
    let eliminar= Object.values(req.body);
    ordenes.eliminarOrdenes(eliminar).then(orden => {
    res.status(201).json('Orden eliminada correctamente')} )
});

server.put('/ordenes/:id', login.autenticar, login.validarAdministrador, (req, res) => {
    ordenes.actualizarPedido(req.body, req.params.id).then(orden => {
   res.status(201).json('Pedido actualizado correctamente')} )
});

// Middleware Endpoint no disponible//
server.use(function (req, res, next) {
    res.status(404).send({error: "Endpoint no disponoble"})
})

// Servidor//
server.listen(process.env.DB_PORT, () => {
    console.log ('Servidor iniciado....');
});