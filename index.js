let cron = require('cron');
const Discord = require('discord.js');
const client = new Discord.Client();

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
        let title = emojis + time_till_date(date);
        client.guilds.find(val => val.id === serverId).setName(title).then(r => console.info('Set server name to: ' + r.name));
    });

    updateTitle.start();
});

client.on('message', message => {
    if (message.content === '!days')
    {
        message.reply(emojis + time_till_date(date))
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

function time_till_date(date2) {
    let ONE_HOUR = 1000 * 60 * 60;
    let date1 = new Date();

    let date1_ms = date1.getTime();
    let date2_ms = date2.getTime();

    let difference_ms = Math.abs(date1_ms - date2_ms);

    let total_hours = (difference_ms/ONE_HOUR);
    let days = (total_hours/24);
    let hours = Math.floor(total_hours % 24);

    return Math.floor(days) + 'Days, ' + hours + 'Hours';
}

client.login(botToken)
    .then(token => console.info('Logged in with token: ' + token))
    .catch(token => console.error('Issue logging in with token: ' + token));
