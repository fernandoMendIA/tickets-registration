import {Router} from 'express';
import {usuarioController} from '../controllers/Usuarios.js';

export const usuariosRouter = Router();

usuariosRouter.post('/registro', usuarioController.registrarUsuario);
usuariosRouter.post('/iniciarsesion', usuarioController.iniciarSesion);
usuariosRouter.post('/cerrarsesion', usuarioController.cerrarSesion);

