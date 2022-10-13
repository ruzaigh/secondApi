"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require("express");
const { Client, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config({ path: '../vars/.env' });
const app = express();
app.use(require("cors")());
app.use(require("body-parser").json());
const mongodb = require('mongodb');
const PORT = process.env.PORT || 3000;
const url = process.env.MONGODB_URI;
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
mongodb.MongoClient.connect(url, (err, db) => {
    const collection = db.collection("users");
    app.get("/:user", (req, res) => {
        collection.find({ user: req.params.user }).toArray((err, result) => {
            if (err) {
                res.send("Error in GET Request");
            }
            else {
                res.send(result);
            }
        });
    });
});
client.on('ready', () => {
    const channel = client.channels.cache.get(process.env.DISCORD_CHANNEL_ID);
    // channel.send('Hello world!');
    console.log(`Logged in as ${client.user.tag}!`);
});
// reply to messages
client.on('messageCreate', (msg) => {
    if (msg.content === 'Hello') {
        msg.reply('Hello Ruz');
    }
});
// base route. Responds to POST requests to the root route
app.post("/", (req, res) => {
    res.send("Sending it through the post 📬"); // always responds with the string "TODO"
});
// Responds to PUT requests to the root route
app.put("/", (req, res) => {
    res.send("Don't you dare put me up to this."); // always responds with the string "TODO"
});
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Connected successfully on port ${PORT}`);
}));
