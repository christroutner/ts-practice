/*
  Running through code in prisma docs
*/

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// async function main (): Promise<void> {
//   console.log('running primsa examples')
//   // ... you will write your Prisma Client queries here
//   const allUsers = await prisma.user.findMany()
//   console.log(allUsers)
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })

class PrismaLocal {
  async runQueries (): Promise<void> {
    try {
      console.log('running primsa examples')
      
      // Create a new user
      // await prisma.user.create({
      //   data: {
      //     name: 'Alice',
      //     email: 'alice@prisma.io',
      //     posts: {
      //       create: { title: 'Hello World' },
      //     },
      //     profile: {
      //       create: { bio: 'I like turtles' },
      //     },
      //   },
      // })
      
      // Update the post record by marking the post as published.
      const post = await prisma.post.update({
        where: { id: 1 },
        data: { published: true },
      })
      console.log(post)
      

      // Get all users
      const allUsers = await prisma.user.findMany({
        include: {
          posts: true,
          profile: true,
        },
      })
      console.dir(allUsers, { depth: null })

      // Disconnect from database
      await prisma.$disconnect()
    } catch (err) {
      console.error('Error in runQueries(): ', err)
      await prisma.$disconnect()
      process.exit(1)
    }
  }
}

export default PrismaLocal
