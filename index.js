let cron = require('cron');
const Discord = require('discord.js');
const client = new Discord.Client();


const token = 'NDc5NDk3NTA5MTExMzMyODc0.DlaG7A.zRWjL49JCGNSgfm-6YOXsI-LDfo';
const test_server_id = '479484990837489665';
const server_id = '473632099354673152';
const miguel_id = '152190878247682048';

const date = new Date('2022-12-09T00:00:00Z');
const emojis = '🎢 🇫🇷 --> '

client.on('ready', () => {
    console.log('ready!');

    let updateTitle = cron.job("*/1 * * * *", function(){

        let title = emojis + time_till_date(date);
        console.info('ran cron and got title -> ' + title);
        client.guilds.find(val => val.id === server_id).setName(title);

    });

    updateTitle.start();

});

client.on('message', message => {

    if (message.content === '!days')
    {
        message.reply(emojis + time_till_date(date));
    }

    let react = false;
    if (react === true)
    {
        if(message.content.includes('mig') || message.author.id === miguel_id)
        {
            if(message.guild)
            {
                message.react(message.guild.emojis.find(val => val.name === 'migo'))
                    .catch(console.error);
            }
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

client.login(token);
