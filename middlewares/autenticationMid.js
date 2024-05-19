import Bannedtoken from '../models/bannedtoken.js'
import jwt from 'jsonwebtoken'
import { Usuario } from '../models/usuario.js'
export const autenticar = async (req, res, next) => {
  try {
      const token = req.headers.authorization?.split(' ')[1];
      console.log(token)
      if (!token) {
          return res.status(401).json({ mensaje: 'No existe el token de autenticación' });
      }

      const dbActiveTokens = await Bannedtoken.find({ token: token, activo: true });
      if (dbActiveTokens.length === 0) {
          return res.status(401).json({ mensaje: 'El token ha cerrado sesión' });
      }

      const decodificar = jwt.verify(token, 'clave_secreta');
      req.usuario = await Usuario.findById(decodificar.usuarioId);
      next();
  }
  catch (error) {
      res.status(400).json({ error: error.message });
  }
};