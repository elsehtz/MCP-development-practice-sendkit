import {Command} from "commander";

const program = new Command();


program
    .name("sendkit")
    .description("A Tutorial-lvl CLI for SendKit")
    .command("telegram")
    .description("Send a Telegram message")
    .argument("<chatId>", "The chat ID to send the message to")
    .argument("<message>", "The message to send")
    .action((chatId, message) => {
        console.log(`Sending message: ${message} to chat ID: ${chatId}`);
        process.exit(1);
    });

program.parseAsync(process.argv);