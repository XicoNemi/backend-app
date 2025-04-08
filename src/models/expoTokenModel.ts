import mongoose from 'mongoose';

// Definir el esquema de los tokens de Expo
const expoPushTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true, // Asegura que no haya duplicados
  },
  createdAt: {
    type: Date,
    default: Date.now, // Fecha en que el token fue registrado
  },
});

// Crear el modelo a partir del esquema
const ExpoPushToken = mongoose.model('ExpoPushToken', expoPushTokenSchema);

export default ExpoPushToken;