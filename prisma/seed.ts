
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
const saltRounds = 10;

const prisma = new PrismaClient();

async function main() {

    const hashedPassword = await bcrypt.hash("12345678", saltRounds)
    console.log('<========== Start seeding =========>');
    await prisma.user.deleteMany()
    const users = await prisma.user.createMany({
        data: [
            {
                name: "Jazziel",
                lastname: "Rodriguez Lopez",
                email: "jazzielrodriguezlopez@gmail.com",
                password: hashedPassword,
                tel: "1234567890",
                birthday: 946684800,
                type: 'COMMON',
                active: true
            }, {
                name: "Luis Octavio",
                lastname: "Lopez Martinez",
                email: "octaviodevtech@gmail.com",
                password: hashedPassword,
                tel: "1234567890",
                birthday: 946684800,
                active: true
            }, {
                name: "XicoNemi",
                lastname: "Organización",
                email: "xiconemi@gmail.com",
                password: hashedPassword,
                tel: "1234567890",
                birthday: 946684800,
                active: true,
                type: 'ADMIN'
            }
        ]
    })
    const events = await prisma.event.createMany(
        {
            data: [
                {
                    name: "Carrera al monumental virgen de guadalupe",
                    startDate: 946684800,
                    endDate: 946684800,
                                        status: 'ACTIVO'
                },
                {
                    name: "Caminata por senderos de la boca del diablo ",
                    startDate: 946684800,
                    endDate: 946684800,
                                        status: 'ACTIVO'
                },
                {
                    name: "Tour por el centro de Xicotepec",
                    startDate: 946684800,
                    endDate: 946684800,
                                        status: 'ACTIVO'
                }
            ]
        }
    )

    const location = await prisma.location.createMany({
        data: [
            {
                street: "Calle 5 de mayo",
                lat: "20.3000",
                lng: "20.3000",
            },
            {
                street: "Calle 2 de abril",
                lat: "20.3000",
                lng: "20.3000",
            }
        ]
    })

    const pointsOfInterest = await prisma.pointOfInterest.createMany({
        data: [
            {
                name: "Monumental virgen de guadalupe",
                description: "Monumento a la virgen de guadalupe",
                image: "https://www.google.com",
                locationId: 1,
            },
            {
                name: "Boca del diablo",
                description: "Sendero de la boca del diablo",
                image: "https://www.google.com",
                locationId: 2,
            }
        ]
    })

    const promotions = await prisma.promotion.createMany({
        data: [
            {
                name: "Promocion 1",
                description: "Descripcion 1"
            },
            {
                name: "Promocion 2",
                description: "Descripcion 2"
            }
        ]
    })

    const establishments = await prisma.establishment.createMany({
        data: [
            {
                name: "Mr. Cheve",
                description: "negocio familiar donde hay peleas los jueves",
                schedule: 11111,
                locationId: 1,
                type: 'BAR_CLUB',
                image: "https://www.pexels.com/es-es/foto/jardin-bailando-piedras-celebracion-17510249/"
            },
            {
                name: "Alitas",
                description: "Alitas de sabores",
                schedule: 11111,
                locationId: 2,
                type: 'RESTAURANTE',
                image: "https://www.pexels.com/es-es/foto/jardin-bailando-piedras-celebracion-17510249/"
            }
        ]
    })

    const itineraries = await prisma.itinerary.createMany({
        data: [{
            name: "Visita familiar ",
            description: "Visita familiar a diferentes lugares como establecimientos, negocios de cultura y demas",
            type: 'FAMILIAR'
        },
        {
            name: "Visita gastronomica ",
            description: "Negocios y resataurantes de 5 estrellas",
            type: 'GASTRONOMICO'
        }
        ]
    })

    const travel = await prisma.travel.createMany({
        data: [
            {
                name: "Viaje a xochipila",
                distance: "2 kilometros",
                time: "2 horas"
            },
            {
                name: "Viaje a la boca del diablo",
                distance: "5 kilometros",
                time: "3 horas"
            }
        ]
    })

}

main()
    .then(async () => {
        console.log('<========== Seeding finished. =========>')
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })