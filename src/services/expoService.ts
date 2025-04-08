import { Expo } from 'expo-server-sdk';
import getAllExpoPushTokensFromDB from '../utils/getExpoTokens';

const expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });


//notificacion a todos los registrados
export const sendPushNotifications = async (message: string) => {
    const messages = [];

    // Fetch all tokens from the database (this is just a placeholder, replace with your actual DB call)
    const tokens = await getAllExpoPushTokensFromDB(); // Implement this function to fetch tokens from your DB

    for (const token of tokens) {
        if (!Expo.isExpoPushToken(token)) {
            console.error(`Push token ${token} is not a valid Expo push token`);
            continue;
        }

        messages.push({
            to: token,
            sound: 'default',
            body: message,
            data: { message },
            title: 'Nuevo evento creado',
            vibrate: [0, 250, 250, 250], // Patrón de vibración (solo Android)
        });
    }

    let chunks = expo.chunkPushNotifications(messages);
    for (let chunk of chunks) {
        try {
            let receipts = await expo.sendPushNotificationsAsync(chunk);
            console.log(receipts);
        } catch (error) {
            console.error(error);
        }
    }
}

export default sendPushNotifications