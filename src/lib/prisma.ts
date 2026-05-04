import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  // In Prisma 7, we pass the datasource object here
  return new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  })
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = global.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') global.prisma = prisma