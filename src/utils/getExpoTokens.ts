// import ExpoPushToken from "../models/expoTokenModel";
// export default function getAllExpoPushTokensFromDB(){

//     const tokens = ExpoPushToken.find({}).then((tokens) => {
//         return tokens.map((token) => token.token);
        
//     })

//     return [
//         'ExponentPushToken[ib6PMKPBl4D79C9jwZSZTO]',
//     ];
// }

import ExpoPushToken from "../models/expoTokenModel"; // Asegúrate de importar el modelo correctamente

export default async function getAllExpoPushTokensFromDB() {
  try {
    // Obtener todos los tokens desde la base de datos
    const tokens = await ExpoPushToken.find({});

    // Retornar los tokens en el formato correcto
    return tokens.map((token) => token.token); // Devolvemos solo los tokens como un array
  } catch (error) {
    console.error("Error al obtener los tokens de la base de datos:", error);
    return []; // En caso de error, retornamos un array vacío
  }
}
