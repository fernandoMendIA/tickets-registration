import { Schema, model } from 'mongoose';
//definir el esquema
const tokenSchema = new Schema({
    // nombre: { type: String, require: true}
    token: { type: String, require: true},
    activo: { type: Boolean, require: true},
    createdAt: {
      type: Date,
      default: Date.now,
    }

});

const TokenModel = model('BannedToken',tokenSchema, 'bannedtokens');
export default TokenModel;