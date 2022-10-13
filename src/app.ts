const express = require("express");
const { Client, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

console.log("Bot Id ", process.env.DISCORD_BOT);
console.log("Discord Channel Id ", process.env.DISCORD_CHANNEL_ID);
console.log("Port ", process.env.POR);

const client = new Client({
    intents: [
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent,
    ],
});

client.login(process.env.DISCORD_BOT);

client.on('ready', () => {
    const channel = client.channels.cache.get(process.env.DISCORD_CHANNEL_ID);
    // channel.send('Hello world!');
    console.log(`Logged in as ${client.user.tag}!`);
});

// reply to messages
client.on('messageCreate', (msg: any) => {
    if (msg.content === 'Hello') {
        msg.reply('Hello Ruz');
    }
})

app.listen( () => {
    console.log(`Connected successfully on port ${process.env.PORT}`);
});