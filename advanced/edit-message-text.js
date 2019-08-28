const env = require('../.env');
const Telegraf = require('telegraf');
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');
const bot = new Telegraf(env.token);

let level = 3;
const getLevel = () => {
    let label = '';
    for (let i = 0; i < 5; i++) {
        label += (level === i) ? '||' : '='; 
    }
    return label;
};

const buttons = () => Extra.markup(Markup.inlineKeyboard([
    Markup.callbackButton('<<', '<'),
    Markup.callbackButton(getLevel(), 'result'),
    Markup.callbackButton('>>', '>')
], { columns: 3 }));

bot.start(ctx => {
    const name = ctx.update.message.from.first_name;
    const message = `Seja bem vindo, ${name}`;
    const levelMessage = `Nível: ${level}`;

    ctx.reply(message);
    ctx.reply(levelMessage, buttons());
});

bot.action('<', ctx => {
    switch (level) {
        case 1:
            ctx.answerCbQuery('Chegou no limite inferior');
            break;
        default:
            level -= 1;
            ctx.editMessageText(`Nível: ${level}`, buttons);
            break;
    }
});

bot.action('>', ctx => {
    switch (level) {
        case 5:
            ctx.answerCbQuery('Chegou no limite superior');
            break;
        default:
            level += 1;
            ctx.editMessageText(`Nível: ${level}`, buttons);
            break;
    }
});

bot.action('result', ctx => ctx.answerCbQuery(`O nível atual está em: ${level}`));

bot.startPolling();
