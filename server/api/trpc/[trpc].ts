import { createNuxtApiHandler } from 'trpc-nuxt'
import { publicProcedure, router } from '~/server/trpc/trpc'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

export const appRouter = router({
    events: publicProcedure
        .input(z.object({
            skip: z.number().default(0)
        }))
        .query(async ({ input }) => prisma.event.findMany(
            {
                skip: input.skip,
                take: 3,
                orderBy: { pubDate: 'desc' }
            }
        ))
})

export type AppRouter = typeof appRouter;

// export API handler
export default createNuxtApiHandler({
    router: appRouter,
    createContext: () => ({}),
})
