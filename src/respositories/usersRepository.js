
import { prisma } from "../utils/db.js";

export const usersRepository = {
  save: async (user) => {
    const newUser = await prisma.users.create({
      data: user,
    });
    return newUser;
  },

  findByEmail :async (email) => {
    const user = await prisma.users.findFirst({
      where: {
        email: email,
      },
    });
      
    return user;
  }
};


