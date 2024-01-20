import { Scalars } from 'prisma-generator-pothos-codegen';
import { createYoga } from 'graphql-yoga'
import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import { DateTimeResolver } from 'graphql-scalars'
import { Prisma } from '.prisma/client';


import type PrismaTypes from "@pothos/plugin-prisma/generated";
import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '../../lib/prisma'

const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes; // required for @pothos/plugin-prisma integration (which is required)
  // Scalars: Scalars<Prisma.Decimal, Prisma.InputJsonValue | null, Prisma.InputJsonValue>; // required to define correct types for created scalars.
  Scalars: {
    Date: {
      Input: Date;
      Output: Date;
    }
  }
}>({
  plugins: [PrismaPlugin],
  prisma: {
    client: prisma,
  }
})

builder.queryType({})

builder.mutationType({})

builder.addScalarType("Date", DateTimeResolver, {});

builder.prismaObject("Account", {
  fields: (t) => ({
    id: t.exposeID('id'),
    email: t.exposeString('email'),
    name: t.exposeString('name', { nullable: true }),
    transactions: t.relation("transactions")
  })
})

builder.prismaObject("Transaction", {
  fields: (t) => ({
    id: t.exposeID('id'),
    from: t.exposeInt('from'),
    to: t.exposeInt('to'),
    amount: t.exposeFloat('amount'),
    currency: t.exposeString('currency'),
    description: t.exposeString('description', { nullable: true }),
    createdAt: t.expose('createdAt', {
      type: 'Date'
    }),
    initiator: t.relation('initiator')
  })
})

builder.queryField('accounts', (t) =>
  t.prismaField({
    type: ['Account'],
    resolve: async (query, _parent, _args, _info) =>
      prisma.account.findMany(query)
  })
)

builder.queryField('transactions', (t) =>
  t.prismaField({
    type: ['Transaction'],
    resolve: async (query, _parent, _args, _info) =>
      prisma.transaction.findMany(query)
  })
)

builder.mutationField('createTransaction', (t) =>
  t.prismaField({
    type: 'Transaction',
    args: {
      from: t.arg.int({ required: true }),
      to: t.arg.int({ required: true }),
      amount: t.arg.float({ required: true }),
      currency: t.arg.string({ required: true }),
      description: t.arg.string(),
    },
    resolve: async (query, _parent, args, _info) =>
      prisma.transaction.create({
        ...query,
        data: {
          from: args.from,
          to: args.to,
          amount: args.amount,
          currency: args.currency,
          description: args.description
        }
      })
  })
)

// builder.queryField('transaction', (t) =>
//   t.prismaField({
//     type: 'Transaction',
//     args: {
//       id: t.arg.id({ required: true }),
//     },
//     nullable: true,
//     resolve: async (query, _parent, args, _info) =>
//       prisma.transaction.findUnique({
//         ...query,
//         where: {
//           id: Number(args.id)
//         }
//       })
//   })
// )

// builder.queryField('drafts', (t) =>
//   t.prismaField({
//     type: ['Post'],
//     resolve: async (query, _parent, _args, _info) =>
//       prisma.post.findMany({
//         ...query,
//         where: { published: false }
//       })
//   })
// )

// builder.queryField('filterPosts', (t) =>
//   t.prismaField({
//     type: ['Post'],
//     args: {
//       searchString: t.arg.string({ required: false })
//     },
//     resolve: async (query, _parent, args, _info) => {
//       const or = args.searchString
//         ? {
//           OR: [
//             { title: { contains: args.searchString } },
//             { content: { contains: args.searchString } },
//           ],
//         }
//         : {}
//       return prisma.post.findMany({
//         ...query,
//         where: { ...or }
//       })
//     }
//   })
// )

// builder.mutationField('signupUser', (t) =>
//   t.prismaField({
//     type: 'User',
//     args: {
//       name: t.arg.string({ required: false }),
//       email: t.arg.string({ required: true }),
//     },
//     resolve: async (query, _parent, args, _info) =>
//       prisma.user.create({
//         ...query,
//         data: {
//           email: args.email,
//           name: args.name
//         }
//       })
//   })
// )

// builder.mutationField('deletePost', (t) =>
//   t.prismaField({
//     type: 'Post',
//     args: {
//       id: t.arg.id({ required: true }),
//     },
//     resolve: async (query, _parent, args, _info) =>
//       prisma.post.delete({
//         ...query,
//         where: {
//           id: Number(args.id),
//         }
//       })
//   })
// )

// builder.mutationField('publish', (t) =>
//   t.prismaField({
//     type: 'Post',
//     args: {
//       id: t.arg.id({ required: true }),
//     },
//     resolve: async (query, _parent, args, _info) =>
//       prisma.post.update({
//         ...query,
//         where: {
//           id: Number(args.id),
//         },
//         data: {
//           published: true,
//         }
//       })
//   })
// )

// builder.mutationField('createDraft', (t) =>
//   t.prismaField({
//     type: 'Post',
//     args: {
//       title: t.arg.string({ required: true }),
//       content: t.arg.string(),
//       authorEmail: t.arg.string({ required: true }),
//     },
//     resolve: async (query, _parent, args, _info) =>
//       prisma.post.create({
//         ...query,
//         data: {
//           title: args.title,
//           content: args.content,
//           author: {
//             connect: { email: args.authorEmail }
//           }
//         }
//       })
//   })
// )

const schema = builder.toSchema()

export default createYoga<{
  req: NextApiRequest
  res: NextApiResponse
}>({
  schema,
  graphqlEndpoint: '/api/graphql'
})

export const config = {
  api: {
    bodyParser: false
  }
}
