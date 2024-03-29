import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'
import { getSentenceToxicity } from '~/utils/tensorflow'

let post = {
    id: 1,
    name: 'Hello World',
}

export const postRouter = createTRPCRouter({
    hello: publicProcedure.input(z.object({ text: z.string() })).query(({ input }) => ({
        greeting: `Hello ${input.text}`,
    })),

    create: publicProcedure.input(z.object({ name: z.string().min(1) })).mutation(async ({ input }) => {
        // simulate a slow db call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        post = { id: post.id + 1, name: input.name }
        return post
    }),

    getSentenceInference: publicProcedure
        .input(z.object({ sentence: z.string() }))
        .mutation(async ({ input, ctx }) => getSentenceToxicity(input.sentence, ctx.loadedModel)),

    getSentencesInference: publicProcedure
        .input(z.object({ sentence: z.array(z.string()) }))
        .mutation(async ({ input, ctx }) => getSentenceToxicity(input.sentence, ctx.loadedModel)),
    getLatest: publicProcedure.query(() => post),
})
