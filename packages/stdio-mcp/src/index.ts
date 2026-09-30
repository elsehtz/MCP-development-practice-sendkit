import { McpServer } from '@modelcontextprotocol/server';
import { StdioServerTransport } from '@modelcontextprotocol/server/stdio';
import * as z from 'zod/v4';

import { telegramMessageOptionsSchema, telegramMessageOptions, sendTelegramMessage } from "sendkit-core";

function getTelegramBotToken() {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (!token) {
        throw new Error('Telegram bot token is not set in MCP client');
    }
    return token;
}

const server = new McpServer({ name: 'greeting-server', version: '1.0.0' });
server.registerTool(
    'telegram',
    {
        description: 'Send a message via Telegram',
        inputSchema: telegramMessageOptionsSchema.shape
    },
    async (options) => {
        const result = await sendTelegramMessage({ ...options });
        return {
            content: [{ type: 'text', text: `Message sent to ${options.chatId}: ${options.message}` }]
        };
    } 
);
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
}

main();