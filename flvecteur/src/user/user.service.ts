import { Injectable } from '@nestjs/common';

import { PrismaClient, user } from '@prisma/client';
const prisma = new PrismaClient({
  log: [
    {
      emit: 'stdout',
      level: 'query',
    },
    'info',
    `warn`,
    `error`,
  ],
});

@Injectable()
export class UserService {
  async findOne(username): Promise<user | undefined> {
    return await prisma.user.findFirst({
      where: {
        username,
      },
    });
  }

  async findOneEmail(email): Promise<user | undefined> {
    return await prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  getAlluser(): Promise<user[]> {
    return prisma.user.findMany({
      include: {
        commentaires: true,
      },
    });
  }

  createUser(user): Promise<any> {
    return prisma.user.create({
      data: {
        username: user.username,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        mdp: user.password,
        pouvoir: 'utilisateur',
        createdat: new Date(),
        updatedat: new Date(),
      },
    });
  }
}
