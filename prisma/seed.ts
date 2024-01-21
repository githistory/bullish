import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const accountData: Prisma.AccountCreateInput[] = [
  {
    name: 'Alice',
    email: 'alice@alice.io',
  },
  {
    name: 'Bob',
    email: 'bob@gmail.com',
  },
  {
    name: 'Cat',
    email: 'cat@hotmail.com',
  },
]

const transactionData: Prisma.TransactionCreateInput[] = [
  {
    to: 2,
    amount: 11.2,
    currency: 'HKD',
    date: '2024-02-02',
    description: 'a transfer',
    initiator: {
      connect: { id: 1 }
    }
  },
  {
    to: 3,
    amount: 2.21,
    currency: 'USD',
    date: '2024-02-05',
    description: 'another transfer',
    initiator: {
      connect: { id: 2 }
    }
  },
  {
    to: 1,
    amount: 1.2,
    currency: 'CNY',
    date: '2024-02-08',
    description: 'yet another transfer',
    initiator: {
      connect: { id: 3 }
    }
  },
]

export async function main() {
  try {
    console.log(`Start seeding ...`)
    for (const data of accountData) {
      const account = await prisma.account.create({data})
      console.log(`Created account with id: ${account.id}`)
    }
    for (const data of transactionData) {
      const transaction = await prisma.transaction.create({data})
      console.log(`Created transaction with id: ${transaction.id}`)
    }
    console.log(`Seeding finished.`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
