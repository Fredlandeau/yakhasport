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
  getAlluser(): Promise<user[]> {
    return prisma.user.findMany({
      include: {
        commentaires: true,
      },
    });
  }
}
