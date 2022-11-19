const cron = require("cron");
module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);

        const serverId = '473632099354673152';
        const date = new Date('2022-12-09T07:00:00Z');
        const emojis = '🎢 🇫🇷 --> '

        let updateTitle = cron.job("*/1 * * * *", function(){
            let title = emojis + timeTillDate(date);
            client.guilds.find(val => val.id === serverId).setName(title).then(r => console.info('Set server name to: ' + r.name));
        });

        updateTitle.start();
    },
};

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
