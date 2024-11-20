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
        html: `<!doctype html>
<html lang="en" dir="auto" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<title></title>
<!--[if !mso]><!-->
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<!--<![endif]-->
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style type="text/css">
=======
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

#outlook a{padding:0;}body{margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;}table,td{border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;}img{border:0;height:auto;line-height:100%;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;}p{display:block;margin:0;}
</style>
<!--[if mso]> <noscript><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
<![endif]-->
<!--[if lte mso 11]>
<style type="text/css">

.y{width:100% !important;}
</style>
<![endif]-->
<!--[if !mso]><!-->
<link href="https://fonts.googleapis.com/css?family=Inter:700,400" rel="stylesheet" type="text/css">
<!--<![endif]-->
<style type="text/css">

@media only screen and (min-width:599px){.m{width:568px!important;max-width:568px;}.h1{width:536px!important;max-width:536px;}}
</style>
<style media="screen and (min-width:599px)">.moz-text-html .m{width:568px!important;max-width:568px;}.moz-text-html .h1{width:536px!important;max-width:536px;}
</style>
<style type="text/css">

u+.emailify .g-screen{background:#000;mix-blend-mode:screen;display:inline-block;padding:0;margin:0;}u+.emailify .g-diff{background:#000;mix-blend-mode:difference;display:inline-block;padding:0;margin:0;}p{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;}a[x-apple-data-detectors]{color:inherit!important;text-decoration:none!important;}u+.emailify a{color:inherit!important;text-decoration:none!important;}#MessageViewBody a{color:inherit!important;text-decoration:none!important;}
@media only screen and (max-width:599px){.emailify{height:100%!important;margin:0!important;padding:0!important;width:100%!important;}td.x{padding-left:0!important;padding-right:0!important;}td.b td{background-size:cover!important;}div.r.e>table>tbody>tr>td,div.r.e>div>table>tbody>tr>td{padding-right:16px!important}div.r.ys>table>tbody>tr>td,div.r.ys>div>table>tbody>tr>td{padding-left:16px!important}div.h.eya>table>tbody>tr>td{padding-top:32px!important}div.h.e>table>tbody>tr>td{padding-right:16px!important}div.h.mg>table>tbody>tr>td{padding-bottom:32px!important}div.h.ys>table>tbody>tr>td{padding-left:16px!important}td.x.t span,td.x.t>div,td.x.t{font-size:32px!important}td.x.tnq span,td.x.tnq>div,td.x.tnq{line-height:37px!important}td.b.xb>table{width:100%!important}td.xb>table>tbody>tr>td>a{display:block!important;width:100%!important;padding-left:0!important;padding-right:0!important;}td.b.xb>table{width:100%!important}td.xb>table>tbody>tr>td{width:100%!important;padding-left:0!important;padding-right:0!important;}}
@media (prefers-color-scheme:dark){.emailify.z,div.bg.z{background-color:#212429!important;}}
</style>
<meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light dark">
<meta name="supported-color-schemes" content="light dark">
<!--[if gte mso 9]>
<style>a:link{mso-style-priority:99;color:inherit;text-decoration:none;}a:visited{mso-style-priority:99;color:inherit;text-decoration:none;}li{margin-left:-1em !important}table,td,p,div,span,ul,ol,li,a,h1,h2,h3,h4,h5,h6{mso-hyphenate:none;}sup,sub{font-size: 100% !important;}
</style>
<![endif]-->
<!--[if mso]>
<style>.c{background: transparent !important; background-color: transparent !important; mso-padding-alt: 0px; !important; padding: 0px !important; border: 0px !important; border-top: 0px !important; border-right: 0px !important; border-bottom: 0px !important; border-left: 0px !important;}
</style>
<![endif]-->
</head>
<body lang="en" link="#DD0000" vlink="#DD0000" class="emailify" style="mso-line-height-rule:exactly;mso-hyphenate:none;word-spacing:normal;background-color:#1e1e1e;"><div class="bg z" style="background-color:#1e1e1e;" lang="en" dir="auto">
<!--[if mso | IE]>
<table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:600px;" width="600"><tr><td style="line-height:0;font-size:0;mso-line-height-rule:exactly;">
<![endif]--><div class="r e ys" style="background:#fffffe;background-color:#fffffe;margin:0px auto;max-width:600px;">
<table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#fffffe;background-color:#fffffe;width:100%;"><tbody><tr><td style="border:none;direction:ltr;font-size:0;padding:16px 16px 16px 16px;text-align:left;">
<!--[if mso | IE]>
<table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:middle;width:568px;">
<![endif]--><div class="m y" style="font-size:0;text-align:left;direction:ltr;display:inline-block;vertical-align:middle;width:100%;">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border:none;vertical-align:middle;" width="100%"><tbody><tr><td align="center" style="font-size:0;padding:0;word-break:break-word;">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0;"><tbody><tr><td style="width:74px;"> <img alt src="cid:logo" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="74" height="auto">
</td></tr></tbody></table>
</td></tr></tbody></table></div>
<!--[if mso | IE]>
</td></tr></table>
<![endif]-->
</td></tr></tbody></table></div>
<!--[if mso | IE]>
</td></tr></table>
<table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:600px;" width="600"><tr><td style="line-height:0;font-size:0;mso-line-height-rule:exactly;"><v:image style="border:0;height:400px;mso-position-horizontal:center;position:absolute;top:0;width:600px;z-index:-3;" src="img/9ac1cd8499717f958415a4080e6d6443.jpg" xmlns:v="urn:schemas-microsoft-com:vml"/><v:rect style="border:0;height:400px;mso-position-horizontal:center;position:absolute;top:0;width:600px;z-index:-4;" fillcolor="#000000" stroke="false" strokecolor="none" strokeweight="0" xmlns:v="urn:schemas-microsoft-com:vml"/>
<![endif]--><div class="h eya e mg ys" style="margin:0 auto;max-width:600px;">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"><tbody><tr style="vertical-align:top;"><td background="../public/virgen.jpg" style="background:#000000 url('../public/virgen.jpg') no-repeat center center / cover; background-size: cover;background-position:center center;background-repeat:no-repeat;padding:16px 16px 16px 16px;vertical-align:middle;height:368px;" height="368">
<!--[if mso | IE]>
<table border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"><tr><td style="padding:16px 16px 16px 16px;">
<![endif]--><div style="margin:0px auto;">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;margin:0;"><tbody><tr><td style>
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;margin:0;"><tbody><tr><td align="center" class="x t tnq" style="font-size:0;word-break:break-word;"><div style="text-align:center;"><p style="Margin:0;mso-line-height-alt:61px;"><span style="font-size:50px;font-family:'Inter','Helvetica',sans-serif;font-weight:700;color:#ffffff;line-height:122%;mso-line-height-alt:61px;">Bienvenido a</span></p><p style="Margin:0;mso-line-height-alt:61px;"><span style="font-size:50px;font-family:'Inter','Helvetica',sans-serif;font-weight:700;color:#ffffff;line-height:122%;mso-line-height-alt:61px;">XicoNemi ${name}</span></p></div>
</td></tr></tbody></table>
</td></tr></tbody></table></div>
<!--[if mso | IE]>
</td></tr></table>
<![endif]-->
</td></tr></tbody></table></div>
<!--[if mso | IE]>
</td></tr></table>
<table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:600px;" width="600"><tr><td style="line-height:0;font-size:0;mso-line-height-rule:exactly;">
<![endif]--><div class="r e ys" style="background:#fffffe;background-color:#fffffe;margin:0px auto;max-width:600px;">
<table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#fffffe;background-color:#fffffe;width:100%;"><tbody><tr><td style="border:none;direction:ltr;font-size:0;padding:49px 32px 49px 32px;text-align:center;">
<!--[if mso | IE]>
<table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:middle;width:536px;">
<![endif]--><div class="h1 y" style="font-size:0;text-align:left;direction:ltr;display:inline-block;vertical-align:middle;width:100%;">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border:none;vertical-align:middle;" width="100%"><tbody><tr><td align="center" class="x" style="font-size:0;padding-bottom:8px;word-break:break-word;"><div style="text-align:center;"><p style="Margin:0;mso-line-height-alt:24px;"><span style="font-size:16px;font-family:'Inter','Helvetica',sans-serif;font-weight:400;color:#777777;line-height:150%;mso-line-height-alt:24px;">Para continuar con la creaci&oacute;n de tu nueva cuenta de XicoNemi, verifica tu direcci&oacute;n de correo electr&oacute;nico abajo.</span></p></div>
</td></tr><tr><td style="font-size:0;padding:0;padding-bottom:8px;word-break:break-word;" aria-hidden="true"><div style="height:4px;line-height:4px;">&#8202;</div>
</td></tr><tr><td align="center" class="b xb" style="font-size:0;padding:0;padding-bottom:0;word-break:break-word;">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;width:364px;line-height:100%;"><tbody><tr><td align="center" bgcolor="#e6077e" class="c" role="presentation" style="background:#e6077e;border:none;border-radius:60px 60px 60px 60px;cursor:auto;mso-padding-alt:12px 0px 12px 0px;vertical-align:middle;" valign="middle">
<!--[if mso]><v:roundrect style="width:364px;height:41px;v-text-anchor:middle;" arcsize="100%" fill="t" stroke="f" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"><w:anchorlock/><v:fill type="solid" color="#e6077e"/><v:textbox inset="0,0,0,0"><center>
<![endif]--> <a href="${urlVerification.local}${token}" class="c" style="display:inline-block;width:364px;background-color:#e6077e;color:#ffffff;font-family:'Inter','Helvetica',sans-serif;font-size:13px;font-weight:normal;line-height:100%;margin:0;text-decoration:none;text-transform:none;padding:12px 0px 12px 0px;mso-padding-alt:0;border-radius:60px 60px 60px 60px;" target="_blank"> <span style="font-size:14px;font-family:'Inter','Helvetica',sans-serif;font-weight:700;color:#ffffff;line-height:121%;mso-line-height-alt:17px;">Verificar mi direcci&oacute;n de correo electr&oacute;nico</span></a>
<!--[if mso]></center></v:textbox></v:roundrect>
<![endif]-->
</td></tr></tbody></table>
</td></tr></tbody></table></div>
<!--[if mso | IE]>
</td></tr></table>
<![endif]-->
</td></tr></tbody></table></div>
<!--[if mso | IE]>
</td></tr></table>
<table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:600px;" width="600"><tr><td style="line-height:0;font-size:0;mso-line-height-rule:exactly;">
<![endif]--><div class="r e ys" style="background:#fffffe;background-color:#fffffe;margin:0px auto;max-width:600px;">
<table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#fffffe;background-color:#fffffe;width:100%;"><tbody><tr><td style="border:none;direction:ltr;font-size:0;padding:49px 32px 49px 32px;text-align:center;">
<!--[if mso | IE]>
<table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:middle;width:536px;">
<![endif]--><div class="h1 y" style="font-size:0;text-align:left;direction:ltr;display:inline-block;vertical-align:middle;width:100%;">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border:none;vertical-align:middle;" width="100%"><tbody><tr><td align="center" class="x" style="font-size:0;padding-bottom:8px;word-break:break-word;"><div style="text-align:center;"><p style="Margin:0;mso-line-height-alt:24px;"><span style="font-size:16px;font-family:'Inter','Helvetica',sans-serif;font-weight:400;color:#e6077e;line-height:150%;mso-line-height-alt:24px;">Si no has intentado crear una nueva cuenta con esta direcci&oacute;n de email recientemente, puedes ignorar este mensaje..</span></p></div>
</td></tr><tr><td style="font-size:0;padding:0;padding-bottom:0;word-break:break-word;" aria-hidden="true"><div style="height:4px;line-height:4px;">&#8202;</div>
</td></tr></tbody></table></div>
<!--[if mso | IE]>
</td></tr></table>
<![endif]-->
</td></tr></tbody></table></div>
<!--[if mso | IE]>
</td></tr></table>
<table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:600px;" width="600"><tr><td style="line-height:0;font-size:0;mso-line-height-rule:exactly;">
<![endif]--><div class="r e ys" style="background:#fffffe;background-color:#fffffe;margin:0px auto;max-width:600px;">
<table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#fffffe;background-color:#fffffe;width:100%;"><tbody><tr><td style="border:none;direction:ltr;font-size:0;padding:27px 16px 27px 16px;text-align:left;">
<!--[if mso | IE]>
<table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:middle;width:568px;">
<![endif]--><div class="m y" style="font-size:0;text-align:left;direction:ltr;display:inline-block;vertical-align:middle;width:100%;">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border:none;vertical-align:middle;" width="100%"><tbody><tr><td align="center" class="x" style="font-size:0;padding-bottom:8px;word-break:break-word;"><div style="text-align:center;"><p style="Margin:0;mso-line-height-alt:21px;"><span style="font-size:17px;font-family:'Inter','Helvetica',sans-serif;font-weight:700;color:#000000;line-height:124%;mso-line-height-alt:21px;">Descarga la App</span></p></div>
</td></tr><tr><td align="center" style="font-size:0;padding:0;padding-bottom:0;word-break:break-word;">
<!--[if mso | IE]>
<table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"><tr><td>
<![endif]-->
<table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;"><tbody><tr><td style="padding:0 16px 0 0;vertical-align:middle;">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:120px;"><tbody><tr><td style="font-size:0;height:40px;vertical-align:middle;width:120px;"> <a href="#insertUrlLink" target="_blank"> <img alt="Apple" height="40" src="cid:appstore" style="display:block;" width="120"></a>
</td></tr></tbody></table>
</td></tr></tbody></table>
<!--[if mso | IE]>
</td><td>
<![endif]-->
<table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;"><tbody><tr><td style="padding:0;padding-right:0;vertical-align:middle;">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:136px;"><tbody><tr><td style="font-size:0;height:40px;vertical-align:middle;width:136px;"> <a href="#insertUrlLink" target="_blank"> <img alt="Google" height="40" src="cid:google" style="display:block;" width="136"></a>
</td></tr></tbody></table>
</td></tr></tbody></table>
<!--[if mso | IE]>
</td></tr></table>
<![endif]-->
</td></tr></tbody></table></div>
<!--[if mso | IE]>
</td></tr></table>
<![endif]-->
</td></tr></tbody></table></div>
<!--[if mso | IE]>
</td></tr></table>
<![endif]--></div>
</body>
</html>

                `  ,
                attachments: [
                    {
                        filename: 'logo.png', 
                        path: '../public/logo.png', 
                        cid: 'logo' 
                    },
                    {
                        filename: 'virgen.jpg', 
                        path: '../public/virgen.jpg', 
                        cid: 'virgen' 
                    },
                    {
                        filename: 'google.jpg', 
                        path: '../public/google.jpg', 
                        cid: 'google' 
                    },
                    {
                        filename: 'appstore.jpg', 
                        path: '../public/appstore.jpg', 
                        cid: 'appstore' 
                    }
                ]
    }

    const result = await transport.sendMail(message);
}   