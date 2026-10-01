import {Hono} from "hono";
import { McpServer, WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/server';
import { Client } from '@modelcontextprotocol/client';
import { strict as check } from 'node:assert';

import { sendTelegramMessage, telegramMessageInputSchema } from "sendkit-core";
import { create } from "node:domain";
const { url, era } = { url: 'http://localhost:3000', era: 'modern' };


function createServer(botToken: string){
    const server = new McpServer({ 
        name: 'remote-sendkit-server', 
        version: '1.0.0' 
    });
    server.registerTool(
        'telegram',
        {
            description: 'Send a message via Telegram',
            inputSchema: telegramMessageInputSchema.shape
        },
        async (options) => {
            const result = await sendTelegramMessage({ ...options, botToken: botToken});
            return {
                content: [{ type: 'text', text: `Message sent to ${options.chatId}: ${options.message}` }]
            };
        } 
    );

    return server;
}

// Establish new Hono app
const app = new Hono(); 

app.post('/:botToken/mcp', async (c) => {
    const botToken = c.req.param('botToken');
    const server = createServer(botToken);

    const transport = new WebStandardStreamableHTTPServerTransport({
        sessionIdGenerator: undefined,
        enableJsonResponse: true
    });

    await server.connect(transport);

    try {
        return await transport.handleRequest(c.req.raw);

    } finally {
        await server.close();
    }
});

app.notFound((c) => {
    return c.json({ message: 'Not Found' }, 404);
})


const port = Number(process.env.PORT || 3000);

export default {
    port, 
    fetch: app.fetch,
}