#!/usr/bin/env node

const botToken = process.env.BOT_TOKEN;

if (typeof botToken == 'undefined' || botToken === null) {
    console.error('Bot token not set');
    process.exit(9);
}

const fs = require('node:fs');
const path = require('node:path');
const { Client, GatewayIntentBits, Partials } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessageReactions,
    ],
    partials: [Partials.User, Partials.Message, Partials.Reaction],
    allowedMentions: {
        repliedUser: true
    }
});

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.login(botToken).then(r => console.info());