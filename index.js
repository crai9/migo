#!/usr/bin/env node
let cron = require('cron');

const {Client, IntentsBitField} = require('discord.js');

const myIntents = new IntentsBitField();
myIntents.add(IntentsBitField.Flags.Guild, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.MessageContent);

const client = new Client({ intents: myIntents });

const botToken = process.env.BOT_TOKEN;
const serverId = '473632099354673152';
const miguelId = '152190878247682048';

const date = new Date('2022-12-09T07:00:00Z');
const emojis = '🎢 🇫🇷 --> '

if (typeof botToken == 'undefined' || botToken === null) {
    console.error('Bot token not set');
    process.exit(9);
}

client.on('ready', () => {
    console.log('Ready!');

    let updateTitle = cron.job("*/1 * * * *", function(){
        let title = emojis + timeTillDate(date);
        client.guilds.find(val => val.id === serverId).setName(title).then(r => console.info('Set server name to: ' + r.name));
    });

    updateTitle.start();
});

client.on('message', message => {
    if (message.content === '!days')
    {
        message.reply(emojis + timeTillDate(date))
            .catch(console.error);
    }

    if (message.content.includes('mig') || message.author.id === miguelId) {
        if (message.guild) {
            message.react(message.guild.emojis.find(val => val.name === 'migo'))
                .catch(console.error);
        }
    }
});

client.on('error', console.error);

function timeTillDate(futureDate) {
    let ONE_HOUR = 1000 * 60 * 60;
    let now = new Date();

    let nowMs = now.getTime();
    let futureDateMs = futureDate.getTime();

    let differenceMs = Math.abs(nowMs - futureDateMs);

    let totalHours = (differenceMs/ONE_HOUR);
    let days = (totalHours/24);
    let hours = Math.floor(totalHours % 24);

    return Math.floor(days) + ' days, ' + hours + ' hours';
}

client.login(botToken)
    .then(token => console.info('Logged in with token: ' + token))
    .catch(token => console.error('Issue logging in with token: ' + token));
