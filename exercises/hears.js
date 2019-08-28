const env       = require('../.env');
const moment    = require('moment');
const Telegraf  = require('telegraf');
const bot       = new Telegraf(env.token);

moment.locale('pt-BR');

// specific word
bot.hears('pizza', ctx => ctx.reply('Quero!'));

// multiple words
bot.hears(['fígado', 'chuchu'], ctx => ctx.reply('Passo!'));

// emojis
bot.hears('🐷', ctx => ctx.reply('Bacon!'));

// using regex expression
bot.hears(/burguer/i, ctx => ctx.reply('Bora!'));

// using array of regex expressions
bot.hears([/salada/i, /brocolis/i], ctx => ctx.reply('Passo!'));

// capturing some data with regex
bot.hears(/(\d{2}\/\d{2}\/\d{4})/, ctx => {
    const data = moment(ctx.match[1], 'DD/MM/YYYY');
    const message = `${ctx.match[1]} foi ${data.format('dddd')}`
    ctx.reply(message);
});

bot.startPolling();
