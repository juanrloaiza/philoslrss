import { createNuxtApiHandler } from 'trpc-nuxt'
import { publicProcedure, router } from '~/server/trpc/trpc'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const appRouter = router({
    events: publicProcedure
        .query(() => prisma.event.findMany(
            {
                take: 10,
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
