import {z} from "zod";

export const telegramMessageInputSchema = z.object({
    chatId: z.string().min(1, "Chat ID required").max(100),
    message: z.string().min(1, "Message required").max(4096)
});

export const telegramMessageOptionsSchema = telegramMessageInputSchema.extend({
    botToken: z.string().min(1, "Bot token required").max(100),
});

export const telegramMessageRequestSchema = z.object({
    chat_id: z.string().min(1).max(100),
    text: z.string().min(1).max(4096)
});

export const telegramMessageResponseSchema = z.object({
    // use optional instead of nullable for human-debugging
    ok: z.boolean(),
    result: z.object({
        message_id: z.number(),
        text: z.string()
    }).nullable(),
    description: z.string().nullable()
});

export const telegramMessageOutputSchema = z.object({
    ok: z.literal(true),
    chatId: z.string(),
    messageId: z.number()
});


export type telegramMessageInput = z.infer<typeof telegramMessageInputSchema>;
export type telegramMessageOptions = z.infer<typeof telegramMessageOptionsSchema>;
export type telegramMessageOutput = z.infer<typeof telegramMessageOutputSchema>;