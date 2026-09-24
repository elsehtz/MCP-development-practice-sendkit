import {Command} from "commander";

const program = new Command();

type TelegramResponse = {
    ok: boolean;
    result?: {
        message_id: number;
        text: string;   
    };
    description?: string;
}

program
    .name("sendkit")
    .description("A Tutorial-lvl CLI for SendKit")
    .command("telegram")
    .description("Send a Telegram message")
    .argument("<chatId>", "The chat ID to send the message to")
    .argument("<message>", "The message to send")
    .action(async (chatId, message) => {
        const token = process.env.TELEGRAM_BOT_TOKEN;
        if (!token) {
            console.error("TELEGRAM_BOT_TOKEN is not set");
            process.exit(1);
        } 
        const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message
            })
        });
        const data: TelegramResponse = await response.json();
        if (!data.ok || !response.ok) {
            console.error(`Error sending message: ${data.description}`);
        } else {
            console.log(`Message sent successfully: ${data.result?.text}`);
        }

        const messageId = data.result?.message_id;
        console.log(`Sent message to telegram chat message index/count: ${messageId}`);
        process.exit(0);
    });

program.parseAsync(process.argv);