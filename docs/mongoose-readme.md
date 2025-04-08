# 📘 MongoDB Data Dictionary

Este documento describe los esquemas y modelos utilizados en MongoDB para la aplicación. Cada modelo incluye una descripción detallada de sus campos y su propósito.

---

## 🔹 ExpoPushToken Schema

### Definición del Esquema
```javascript
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
```

### Descripción del Modelo
| Campo      | Tipo   | Requerido | Único | Descripción                                      |
|------------|--------|-----------|-------|--------------------------------------------------|
| token      | String | ✅         | ✅     | El token único para cada dispositivo registrado. |
| createdAt  | Date   | ❌         | ❌     | La fecha en la que el token fue registrado. Se establece automáticamente al momento de crear el documento. |

---

## 🔹 Message Schema

### Definición del Esquema
```javascript
import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
  senderId: number;
  receiverId: number;
  message: string;
  timestamp: Date;
}

const MessageSchema = new Schema<IMessage>({
  senderId: { type: Number, required: true },
  receiverId: { type: Number, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export const MessageModel = mongoose.model<IMessage>('Message', MessageSchema);
```

### Descripción del Modelo
| Campo       | Tipo   | Requerido | Descripción                                                                 |
|-------------|--------|-----------|-----------------------------------------------------------------------------|
| senderId    | Number | ✅         | El identificador del usuario que envió el mensaje.                          |
| receiverId  | Number | ✅         | El identificador del usuario que recibe el mensaje.                         |
| message     | String | ✅         | El contenido del mensaje.                                                   |
| timestamp   | Date   | ❌         | La fecha y hora en que se envió el mensaje. Se establece automáticamente.   |

---

## 🛠️ Notas Adicionales
- **ExpoPushToken Schema**: Este esquema se utiliza para almacenar los tokens de notificaciones push de Expo. Cada token es único y está asociado a un dispositivo específico.
- **Message Schema**: Este esquema se utiliza para gestionar los mensajes enviados entre usuarios. Incluye información sobre el remitente, el destinatario, el contenido del mensaje y la fecha de envío.

---

Si necesitas agregar más esquemas o realizar ajustes, no dudes en hacerlo. Este documento está diseñado para ser una referencia clara y útil para los desarrolladores que trabajen con los modelos de MongoDB en este proyecto.