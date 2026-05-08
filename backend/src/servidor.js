import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import routerUser from "./routes/routerUser.js";
import routerProducts from "./routes/routerProducts.js";

const servidor = express();

// Permitir conexiones del frontend
servidor.use(cors());
servidor.use(express.json());
servidor.use(morgan('dev'));

// Carpeta de imágenes
servidor.use('/imagenes', express.static('imagenes'));
servidor.use('/users', routerUser);

servidor.use('/products', routerProducts);
servidor.get('/', (solicitud, respuesta) => {

    respuesta.send("Servidor funcionando");

});

export default servidor;