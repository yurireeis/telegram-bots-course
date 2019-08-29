const env = require('../.env');
const Telegraf = require('telegraf');
const bot = new Telegraf(env.token);

// if you want to send messages on bot private chat with user, so you can do it using ctx.update.message.from.id
bot.start(ctx => {
    const interactionUserID = ctx.update.message.from.id;
    console.log(interactionUserID);
});

bot.startPolling();
