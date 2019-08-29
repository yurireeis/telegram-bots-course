const env = require('../.env');
const schedule = require('node-schedule');
const Telegraf = require('telegraf');
const Telegram = require('telegraf/telegram');
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');
const telegram = new Telegram(env.token);
const bot = new Telegraf(env.token);

let counter = 1;

const buttons = Extra.markup(Markup.inlineKeyboard([
    Markup.callbackButton('Cancelar', 'cancel')
]));

const notify = () => {
    telegram.sendMessage(env.userID, `Essa  é uma mensagem de eventos [${counter++}]`, buttons);
};

const notification = new schedule.scheduleJob('*/5 * * * * *', notify);

bot.action('cancel', ctx => {
    notification.cancel();
    ctx.reply('Ok! Parei de pertubar.');
});

bot.startPolling();
