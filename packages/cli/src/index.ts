import {Command} from "commander";
import {sendTelegramMessage} from "sendkit-core";

const program = new Command();

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
        try {
            const response = await sendTelegramMessage({
                chatId,
                message,
                botToken: token
            });
            console.log(`Message sent successfully: ${response.messageId}`);
        } catch (error) {
            const details = error instanceof Error ? error.message : String(error);
            console.error(`Error sending message: ${details}`);
            process.exit(1);
        }
    });

program.parseAsync(process.argv);