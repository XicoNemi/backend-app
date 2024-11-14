
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
const saltRounds = 10;

const prisma = new PrismaClient();
const inputDate = "02/01/2024"; // Ejemplo de fecha dada
const [day, month, year] = inputDate.split("/").map(Number);
const parsedDate = new Date(year, month - 1, day); // Crear objeto Date
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
                birthday: parsedDate,
                type: 'COMMON',
                active:true
            }, {
                name: "Luis Octavio",
                lastname: "Lopez Martinez",
                email: "octaviodevtech@gmail.com",
                password: hashedPassword,
                tel: "1234567890",
                birthday: parsedDate,
                active:true
            }, {
                name: "XicoNemi",
                lastname: "Organización",
                email: "xiconemi@gmail.com",
                password: hashedPassword,
                tel: "1234567890",
                birthday: parsedDate,
                active:true,
                type:'ADMIN'
            }
        ]
    })
    const events = await prisma.event.createMany(
        {
            data: [
                {
                    name: "Carrera al monumental virgen de guadalupe",
                    startDate: new Date(),
                    endDate: new Date(),
                },
                {
                    name: "Caminata por senderos de la boca del diablo ",
                    startDate: new Date(),
                    endDate: new Date(),
                },
                {
                    name: "Tour por el centro de Xicotepec",
                    startDate: new Date(),
                    endDate: new Date(),
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
                Schedule: new Date(),
                locationId: 1,
                type: 'BAR_CLUB'
            },
            {
                name: "Alitas",
                description: "Alitas de sabores",
                Schedule: new Date(),
                locationId: 2,
                type: 'RESTAURANTE'
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