import { Schema, model,connect } from 'mongoose';
import { hash, compare } from 'bcrypt';
import 'dotenv/config'

const MONGO_URI = process.env.MONGO_URI;
connect(MONGO_URI)
.then(() => {
  console.log('Conexion exitosa');
}
).catch( error => console.log('error de conexion', error));

const usuarioSchema = new Schema({
    // nombre: { type: String, require: true}
    nombreusuario: {
        type: String, 
        required : true,
        unique : true
    },
    correo : {
        type: String, 
        required : true,
        unique : true
    },
    contrasenia : {
        type: String, 
        required : true
    }
});

// hashear contrasenia
usuarioSchema.pre('save', async function (next){
    if (this.isModified('contrasenia')){
        this.contrasenia =  await hash(this.contrasenia, 10);
        // console.log(this.contrasenia);
    }
    next();
});
//comparar contrasenias
usuarioSchema.methods.compararContrasenia = async function  ( contraseniaComparar ){
    return await compare(contraseniaComparar, this.contrasenia);
};

const UsuarioModel = model('Usuario',usuarioSchema, 'usuario');

export class Usuario {
    static async registrarUsuario({ nombreusuario, correo, contrasenia }) {
        try{
            const usuario = new UsuarioModel({ nombreusuario, correo, contrasenia });
            await usuario.save();
            return usuario;
        } catch (error){
            console.error('Error al crear usuario:', error);
        }
    }
    static async findByEmail({correo}){
        try{
            const usuario = await UsuarioModel.findOne({ correo });
            return usuario
        }catch(error){
            console.error('Usuario no encontrado:', error);

        }
    }

    static async findById({id}){
        try{
            const usuario = await UsuarioModel.findById(id);
            return usuario
        }catch(error){
            console.error('Usuario no encontrado:', error);
    
        }
    }
}
