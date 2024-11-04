import { PrismaClient, TypeUser, User } from "@prisma/client";
import { hashPassword } from "../utils/bcrypt";
import { token } from "../utils/token";
import { z, ZodError } from "zod"; // Asegúrate de importar ZodError
import { newAccount } from "../services/emailService";

const prisma = new PrismaClient();

const userSchema = z.object({
    name: z.string().min(1, "Campo requerido."),
    lastname: z.string().min(1, "Campo requerido."),
    email: z.string().min(1, "Campo requerido").email("Formato de email inválido."), // Valida que sea un email
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres."),
});

export class UserModel {

    async getAllUsers() {
        const users = await prisma.user.findMany();
        return users;
    }

    async createUser(data: User) {

        try {
            userSchema.parse(data);
        } catch (error) {
            if (error instanceof ZodError) { //error de validación
                return {
                    message: error.errors.map(e => e.message).join(", ")
                };
            }
            return { message: "Error desconocido" };
        }

        // Verificar si el usuario ya existe
        const isExist = await prisma.user.findUnique({ where: { email: data.email } });
        if (isExist) {
            return {
                message: "El correo ya existe."
            };
        }

        data.password = await hashPassword(data.password);
        data.token = token;
        newAccount(data.name, data.email, data.token);
        const user = await prisma.user.create({ data });
        return {
            message: "Usuario creado correctamente."
        };
    }

    async newTypeUser(data: TypeUser) {
        const typeUser = await prisma.typeUser.create({ data });
        return typeUser;
    }

    async updateUser(id: number, data: User) {
        try {
            userSchema.parse(data);
        } catch (error) {
            if (error instanceof ZodError) {
                return {
                    message: error.errors.map(e => e.message).join(", ")
                };
            }
            return { message: "Error desconocido" };
        }
        // Verificar si el usuario ya existe
        const isExist = await prisma.user.findUnique({ where: { email: data.email } });
        if (isExist && isExist.id !== id) {
            return {
                message: "El correo ya existe."
            };
        }
        data.password = await hashPassword(data.password);
        const user = await prisma.user.update({
            where: { id },
            data
        });
        return {
            message: "Usuario actualizado correctamente."
        };
    }

    async deleteUser(id: number) {
        const userDeleted = await prisma.user.delete({
            where: { id }
        })
        if (!userDeleted) {
            return {
                message: "Usuario no encontrado."
            };
        }
        return userDeleted;
    }

    async getUser(id: number) {
        const user = await prisma.user.findUnique({
            where: { id }
        })
        if(!user) {
            return {
                message: "Usuario no encontrado."
            };
        }
        return user;
    }

    async activeAccount(token: string) {
        const user = await prisma.user.findFirst({
            where: { token }
        });
        if (!user) {
            return {
                message: "El token ha vencído"
            };
        }
        const userUpdated = await prisma.user.update({
            where: { id: user.id },
            data: {
                active: true,
                token: null
            }
        });
        return {
            message: "Cuenta activada correctamente"
        };
    }
}
