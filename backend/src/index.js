import "dotenv/config";
import "./conection.js";

import servidor from './servidor.js';
servidor.listen(3000, () => {
    console.log('El Servidor se encuentra escuchando en el link http://localhost:3000');
});