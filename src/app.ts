const express = require("express");
const { Client, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config({ path: '../vars/.env' });
const app = express();
app.use(require("cors")());
app.use(require("body-parser").json());
const mongodb = require('mongodb');
const PORT = process.env.PORT || 3000 ;
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

mongodb.MongoClient.connect(url, (err: any, db:any) => {
    const collection = db.collection("users");
    app.get("/:user", (req: any, res: any) => {
        collection.find({ user: req.params.user}).toArray((err: any, result: any) => {
            if(err){
                res.send("Error in GET Request");
            }else{
                res.send(result);
            }
        });
    });

})

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

// base route. Responds to POST requests to the root route
app.post("/", (req: any, res: any) => {
    res.send("Sending it through the post 📬") // always responds with the string "TODO"
});

// Responds to PUT requests to the root route
app.put("/", (req: any, res: any) => {
    res.send("Don't you dare put me up to this.") // always responds with the string "TODO"
});


app.listen(PORT, async() => {
    console.log(`Connected successfully on port ${PORT}`);
});
