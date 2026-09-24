import {
    telegramMessageOptionsSchema,
    telegramMessageRequestSchema,
    telegramMessageResponseSchema,
    telegramMessageOutputSchema,
    type telegramMessageOptions,
    type telegramMessageOutput,
    telegramMessageInputSchema
} from "./schemas";

export async function sendTelegramMessage(
    options: telegramMessageOptions
    ) {
    const parsedInput = telegramMessageOptionsSchema.parse(options);
    const requestBody = telegramMessageRequestSchema.parse({
        chat_id: parsedInput.chatId,
        message: parsedInput.message
    });

    const response = await fetch(`https://api.telegram.org/bot${parsedInput.botToken}/sendMessage`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
    });

    const responseData = await response.json();
    return telegramMessageOutputSchema.parse(
        {
            ok: true,
            chatId: parsedInput.chatId,
            messageId: responseData.result?.message_id
        }
    );
}