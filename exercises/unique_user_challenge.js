const env = require('../.env');
const Telegraf = require('telegraf');
const bot = new Telegraf(env.token);

// bult-in commands: /start
bot.start(context => {
    const from = context.update.message.from;
    const isMasterID = (from.id === env.userID);
    let message = 'Sinto muito, mas eu só falo com o meu mestre.';

    if (isMasterID) {
        message = 'Ao seu dispor, mestre!';
    }

    context.reply(message);
});

// polling: asking server if some new task must be executed
bot.startPolling();
