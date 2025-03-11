import { PrismaClient, Users } from '@prisma/client';
import { hashPassword } from '../utils/bcrypt';
import { generateToken } from '../utils/token';
import { z, ZodError } from 'zod'; // Asegúrate de importar ZodError
import { newAccount } from '../services/emailService';
import { AppError } from '../utils/errorApp';
import e from 'express';

const prisma = new PrismaClient();

const userSchema = z.object({
  name: z.string().min(1, 'Campo requerido.'),
  lastname: z.string().min(1, 'Campo requerido.'),
  email: z.string().min(1, 'Campo requerido').email('Formato de email inválido.'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres.'),
  tel: z.string().min(1, 'Campo requerido.'),
  gender: z.string().min(1, 'Campo requerido.'),
  birthday: z
    .number()
    .min(1, 'Campo requerido.')
    .refine((value) => value <= Date.now(), 'La fecha de nacimiento no puede ser futura.')
    .refine(
      (value) => value >= new Date('1900-01-01').getTime(),
      'La fecha de nacimiento no es válida.'
    ),
});

export class UserModel {
  // ? GET ALL USERS
  async getAllUsers() {
    const users = await prisma.users.findMany();
    return users;
  }

  // ? CREATE USER
  async createUser(data: Users) {
    try {
      userSchema.parse(data);
    } catch (error) {
      if (error instanceof ZodError) {
        const errorDetails = error.errors.map((e) => ({
          field: e.path.join('.'),
          message: e.message,
        }));
        throw new AppError('Validation failed', 400, errorDetails);
      }
      throw new AppError('Unknown validation error', 400);
    }

    try {
      const isExist = await prisma.users.findUnique({ where: { email: data.email } });
      if (isExist) {
        throw new AppError('El correo ya existe.', 409);
      }

      data.password = await hashPassword(data.password);
      data.token = generateToken();
      newAccount(data.name, data.email, data.token);

      const user = await prisma.users.create({ data });
      return {
        id: user.id,
        message: 'Usuario creado correctamente, revisa tu correo.',
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Internal server error', 500);
    }
  }

  // ? CREATE USER BY SUPERADMIN
  async createUserBySuperAdmin(data: Users) {
    try {
      userSchema.parse(data);
    } catch (error) {
      if (error instanceof ZodError) {
        const errorDetails = error.errors.map((e) => ({
          field: e.path.join('.'),
          message: e.message,
        }));
        throw new AppError('Validation failed', 400, errorDetails);
      }
      throw new AppError('Unknown validation error', 400);
    }

    try {
      const isExist = await prisma.users.findUnique({ where: { email: data.email } });
      if (isExist) {
        throw new AppError('El correo ya existe.', 409);
      }
      data.password = await hashPassword(data.password);
      data.status = true;

      const user = await prisma.users.create({ data });
      return {
        id: user.id,
        message: 'Usuario creado correctamente',
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Internal server error', 500);
    }
  }

  // ? UPDATE USER
  async updateUser(id: string, data: Users) {
    try {
      userSchema.parse(data);
    } catch (error) {
      if (error instanceof ZodError) {
        const errorDetails = error.errors.map((e) => ({
          field: e.path.join('.'),
          message: e.message,
        }));
        throw new AppError('Validation failed', 400, errorDetails);
      }
      throw new AppError('Unknown validation error', 400);
    }

    try {
      const existingUser = await prisma.users.findUnique({ where: { id } });

      if (!existingUser) {
        throw new AppError('User not found', 404);
      }

      if (data.email) {
        const isEmailTaken = await prisma.users.findUnique({
          where: { email: data.email },
        });
        if (isEmailTaken && isEmailTaken.id !== id) {
          throw new AppError('Email already exists', 409);
        }
      }

      if (data.password) {
        data.password = await hashPassword(data.password);
      }

      const updatedUser = await prisma.users.update({
        where: { id },
        data,
      });

      return {
        message: 'User updated successfully',
        user: updatedUser,
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Internal server error', 500);
    }
  }

  // ? PARTIAL UPDATE USER
  async partialUpdateUser(id: string, data: Partial<Users>) {
    if (Object.keys(data).length === 0) {
      throw new AppError('At least one field must be provided to update', 400);
    }

    try {
      userSchema.partial().parse(data);
    } catch (error) {
      if (error instanceof ZodError) {
        const errorDetails = error.errors.map((e) => ({
          field: e.path.join('.'),
          message: e.message,
        }));
        throw new AppError('Validation failed', 400, errorDetails);
      }
      throw new AppError('Unknown validation error', 400);
    }

    try {
      const existingUser = await prisma.users.findUnique({ where: { id } });

      if (!existingUser) {
        throw new AppError('User not found', 404);
      }

      if (data.email) {
        const isEmailTaken = await prisma.users.findUnique({
          where: { email: data.email },
        });
        if (isEmailTaken && isEmailTaken.id !== id) {
          throw new AppError('Email already exists', 409);
        }
      }

      if (data.password) {
        data.password = await hashPassword(data.password);
      }

      const updatedUser = await prisma.users.update({
        where: { id },
        data,
      });

      return {
        message: 'User partially updated successfully',
        user: updatedUser,
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      throw new AppError(
        'Internal server error',
        500,
        error instanceof Error ? error.message : undefined
      );
    }
  }

  // async changePassword(id: number, data: ) {  
    
  // }

  // ? DELETE USER
  async deleteUser(id: string) {
    try {
      const isExist = await prisma.users.findUnique({ where: { id } });
      if (!isExist) throw new AppError('User not found', 404);

      const userDeleted = await prisma.users.delete({ where: { id } });

      return {
        message: 'User deleted successfully',
        userId: userDeleted.id,
      };
    } catch (error) {
      throw new AppError(
        'Internal server error',
        500,
        error instanceof Error ? error.message : undefined
      );
    }
  }

  // ? DELETE USER BY EMAIL
  async deleteByEmail(email: string) {
    const isExist = await prisma.users.findUnique({ where: { email } });
    if (!isExist) {
      return {
        message: 'User not found',
      };
    }
    const userDeleted = await prisma.users.delete({
      where: { email },
    });

    return userDeleted;
  }

  // ? GET USER
  async getUser(id: string) {
    try {
      const user = await prisma.users.findUnique({
        where: { id },
      });
      if (!user) {
        throw new AppError('User not found', 404);
      }
      return user;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(
        'Internal server error',
        500,
        error instanceof Error ? error.message : undefined
      );
    }
  }

  // ? ACTIVE ACCOUNT
  async activeAccount(token: string) {
    const user = await prisma.users.findFirst({
      where: { token },
    });
    if (!user) {
      return {
        message: 'El token ha vencído',
      };
    }
    const userUpdated = await prisma.users.update({
      where: { id: user.id },
      data: {
        status: true,
        token: null,
      },
    });
    return {
      message: 'Cuenta activada correctamente',
    };
  }

  async getUserByEmail(email: string) {
    return await prisma.users.findUnique({
      where: { email },
    });
  }

  async getUsersByType(type: any) {
    const users = await prisma.users.findMany({
      where: { type }
    })
  }
}
