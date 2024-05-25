import { Usuario } from '../models/usuario.js'
import jwt from 'jsonwebtoken'
import BannedToken from '../models/bannedtoken.js'

export class usuarioController {

  static async registrarUsuario (req, res) {

    const { nombreusuario, correo, contrasenia } = req.body;
    const usuario = await Usuario.registrarUsuario({ nombreusuario, correo, contrasenia });
    if (usuario) {
      res.status(201).json({ mensaje: 'Usuario registrado', usuario });
    } else {
      res.status(500).json({ mensaje: 'No se pudo registrar el usuario' });
    }
  }

  static async iniciarSesion (req, res) {
    console.log('mifuncion')
    try {
      const { email, password } = req.body.data.attributes;

      const correo = email
      const contrasenia = password
      console.log(correo, contrasenia)
      // console.log(req.headers)

      const usuario = await Usuario.findByEmail({ correo });
      if (!usuario)
          return res.status(401).json({ error : 'Correo inválido' });

      const validarContrasena = await usuario.compararContrasenia(contrasenia);
      if (!validarContrasena)
          return res.status(401).json({ error : 'Contraseña inválida' });

      // Creación de token
      const token = jwt.sign({ usuarioId: usuario._id }, 'clave_secreta', {expiresIn: '3h'});
      const saveToken = new BannedToken({ token: token, activo: true });
      await saveToken.save();
      
      // Configuración de cookie
      // res.cookie('token', token, {
      //     httpOnly: true, // Elimina el acceso desde JavaScript
      //     // secure: process.env.NODE_ENV === 'production', // Solo HTTPS en producción
      //     sameSite: 'strict', // Ayuda a prevenir ataques CSRF
      //     maxAge: 3 * 60 * 60 * 1000 // 3 horas en milisegundos
      // });

      // res.json({ token });
      return res.json({
        token_type: "Bearer",
        expires_in: "24h",
        access_token: token,
        refresh_token: token,
      });


    } catch(error) {
        res.status(500).json({ message: 'Verifique los datos' });
    }
  };

  static async cerrarSesion (req, res) {
    try {
      // const token = req.headers.authorization?.split(' ')[1];
      // console.log(token)
      // if (!token) {
      //     return res.status(401).json({ mensaje: 'No hay token de autenticación' });
      // }

      // Marcar el token como inactivo en la base de datos
      // const banedtoken = await BannedToken.findOneAndUpdate({ token: token }, { activo: false }, {new:true});
      // console.log(banedtoken)

      // Crear un token inválido sin firma
      // const invalidToken = jwt.sign({ usuarioId: null }, 'clave_invalida', { expiresIn: '1ms' });

      // Set cookie con token inválido
      // res.cookie('token', invalidToken, {
      //     httpOnly: true,
      //     // secure: process.env.NODE_ENV === 'production', // Solo HTTPS en producción
      //     sameSite: 'strict',
      //     maxAge: 1 // Invalida la cookie inmediatamente
      // });

      res.json({ mensaje: 'Sesión cerrada correctamente' });
  }
  catch (error) {
      res.status(500).json({ mensaje: error.message });
    }
  }

}

