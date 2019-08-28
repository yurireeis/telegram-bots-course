const env = require('../.env');
const Telegraf = require('telegraf');
const bot = new Telegraf(env.token);

// bult-in commands: /start

bot.start(context => {
    const from = context.update.message.from;
    console.log(from);
    context.reply(`Seja bem vindo, ${from.first_name}`);
});

// monitoring text
// in the case below, we don't call the next middleware, because next fuction is commented
bot.on('text', async (context, next) => {
    await context.reply('Mid 1');
    // next();
});

// we set async-await to assure the execution order
bot.on('text', async (context, next) => {
    await context.reply('Mid 2');
    next();
});

// polling: asking server if some new task must be executed
bot.startPolling();
