import nodemailer, { Transporter } from 'nodemailer';
import { urlVerification } from '../utils/urlVerification';


const transport: Transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

const url = urlVerification.development

export const newAccount = async (name:string, email: string, token: string) => {
    const message = {
        from: "support@xiconemi.com",
        to: email,
        subject: "Verify your email",
        html: `<!DOCTYPE html>
                <html lang="es">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Verifica tu correo electrónico</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #ffffff;
                            color: #333333;
                            margin: 0;
                            padding: 0;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }
                        .email-container {
                            max-width: 600px;
                            padding: 20px;
                            border: 1px solid #e0e0e0;
                            border-radius: 8px;
                            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                        }
                        .header {
                            text-align: center;
                            font-size: 24px;
                            font-weight: bold;
                            margin-bottom: 20px;
                        }
                        .content {
                            font-size: 16px;
                            line-height: 1.5;
                            color: #555555;
                        }
                        .cta-button {
                            display: inline-block;
                            background-color: #4CAF50; /* Verde pasto */
                            color: #ffffff;
                            padding: 12px 20px;
                            border-radius: 5px;
                            font-weight: bold;
                            text-align: center;
                            text-decoration: none;
                            margin: 20px 0;
                            transition: background-color 0.3s;
                        }
                        .cta-button:hover {
                            background-color: #367e3a; /* Verde pasto oscuro */
                        }
                        .footer {
                            font-size: 12px;
                            color: #777777;
                            text-align: center;
                            margin-top: 30px;
                            border-top: 1px solid #e0e0e0;
                            padding-top: 15px;
                        }
                    </style>
                </head>
                <body>
                    <div class="email-container">
                        <div class="header">
                            <h1>Bienvenido a XicoNemi ${name}</h1>
                        </div>
                        <div class="content">
                            <p>Hola,</p>
                            <p>Gracias por registrarte en XicoNemi, tu aplicación ideal para explorar Xicotepec.</p>
                            <p>Para completar tu registro, verifica tu correo electrónico haciendo clic en el siguiente botón:</p>
                            <a href="${url}${token}" class="cta-button">Verificar Correo</a>
                            <p>Si no creaste una cuenta con nosotros, ignora este mensaje.</p>
                        </div>
                        <div class="footer">
                            <p>¡Felices senderos! 🌲</p>
                            <p>Equipo de XicoNemi</p>
                            <p>Contáctanos en support@xiconemi.com</p>
                        </div>
                    </div>
                </body>
                </html>

                `   
    }

    const result = await transport.sendMail(message);
}   