import { Router } from 'express';
import controllersUser from '../controllers/controllersUser.js';

const routerUser = Router();

// LOGIN
routerUser.post('/login', controllersUser.loginUser);

// CREAR USUARIO
routerUser.post('/', controllersUser.createUser);

// LEER TODOS LOS USUARIOS
routerUser.get('/', controllersUser.readAllUsers);

// LEER USUARIO POR ID
routerUser.get('/:id', controllersUser.readUser);

// ACTUALIZAR
routerUser.put('/:id', controllersUser.updateUser);

// ELIMINAR
routerUser.delete('/:id', controllersUser.deleteUser);

export default routerUser;