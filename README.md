# DelilahResto
Sistema de pedidos online para un restaurante donde los usuarios pueden registrarse, realizar un pedido, ver el estado de los pedidos. Solo los usuarios con el rol de adminidtrador podran crear nuevos productos, actualizarlos y eliminarlos. Igual podran realizar estas operaciones con la lista de usuarios y pedidos.

Requisitos:
Intalar NodeJs en un entorno Java Script, XAMPP y Postman para realizar pruebas de las APIS.

https://nodejs.org/en/download/

https://www.apachefriends.org/es/download.html

https://www.postman.com/product/api-client/


Despliegue:  

* Clonar repositorio desde github 


git clone https://github.com/raguirredelahoz/DelilahResto.git


* Intalar dependencias:         npm install


Express
Nodemon
Jsonwebtoken
Dotenv
Mysql
express-jwt


*  Base de Datos:


Desde el panel de control de XAMPP inicimos Apache y MySQL,luego accedemos a phpmyadmin a travez del botón "Admin". encontraremos la base de datos delahilahresto con las tabals de usuarios, ordenes, productos, estado de las ordenes y el detalle.



* Iniciamos el servidor:  


nodemon index.js


* Testing: 

Desde Postman podemos realizar todas las operciones CRUD en cada uno de las APIS. 


* Documentación de las APIS:


En el archivo spec.yml  encontraremos el detalle de cada API realizada en Swagger.





Autor :  Ricardo Antonio Aguirre        https://github.com/raguirredelahoz





