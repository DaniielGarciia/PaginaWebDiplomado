import mongoose from "mongoose";
mongoose

.connect(process.env.CONEXIONBD)

.then((data) => {
    console.log('Conexion exitosa a la base de datos');
}).catch((error) => {
    console.log('Error al conectar a la base de datos: ');
});