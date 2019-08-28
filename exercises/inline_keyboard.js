// the inline keyboard basically gives us power to 

const env = require('../.env');
const Telegraf = require('telegraf');
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');
const bot = new Telegraf(env.token);

let contagem = 0;

// the value passed to bot will be the second value of callback
const buttons = Extra.markup(Markup.inlineKeyboard([
    Markup.callbackButton('+1', 'add 1'),
    Markup.callbackButton('+10', 'add 10'),
    Markup.callbackButton('+100', 'add 100'),
    Markup.callbackButton('-1', 'sub 1'),
    Markup.callbackButton('-10', 'sub 10'),
    Markup.callbackButton('-100', 'sub 100'),
    Markup.callbackButton('Zerar', 'reset'),
    Markup.callbackButton('Resultado', 'result')
], { columns: 3 }));

bot.start(async ctx => {
    const nome = ctx.update.message.from.first_name;
    const message = `Seja bem vindo, ${nome}`;
    await ctx.reply(message);
    const currentCount = `A contagem atual está em ${contagem}`;
    await ctx.reply(currentCount, buttons);
});

// the action will receive on match the value of the callback, grabbing the action by the first value
bot.action(/add (\d+)/, ctx => {
    contagem += parseInt(ctx.match[1]);
    const currentCount = `A contagem está em ${contagem}`;
    ctx.reply(currentCount, buttons);
});

// we don't need to set global or case insensitive because the event is passed in a controlled way
bot.action(/sub (\d+)/, ctx => {
    contagem -= parseInt(ctx.match[1]);
    const currentCount = `A contagem atual está em ${contagem}`;
    ctx.reply(currentCount, buttons);
});

bot.action('reset', ctx => {
    contagem = 0;
    const currentCount = `A contagem foi reiniciada`;
    ctx.reply(currentCount, buttons);
});

bot.action('result', ctx => {
    const currentCount = `A contagem está em ${contagem}`;
    ctx.reply(currentCount, buttons);
});

bot.startPolling();
