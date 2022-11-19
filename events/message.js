module.exports = {
    name: 'messageCreate',
    async execute(message) {
        console.log(`${message.author.username} says '${message.content}'`);

        const miguelId = '152190878247682048';
        const date = new Date('2022-12-09T07:00:00Z');
        const emojis = '🎢 🇫🇷 --> '

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
