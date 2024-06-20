/**
 * This is the API-handler of your app that contains all your API routes.
 * On a bigger app, you will probably want to split this file up into multiple files.
 */
import { createNuxtApiHandler } from 'trpc-nuxt'
import { publicProcedure, router } from '~/server/trpc/trpc'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const appRouter = router({
    events: publicProcedure
        .query(() => {
            // This is what you're returning to your client
            return prisma.event.findMany();
        })
})

export type AppRouter = typeof appRouter;

// export API handler
export default createNuxtApiHandler({
    router: appRouter,
    createContext: () => ({}),
})
