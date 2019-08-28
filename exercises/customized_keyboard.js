const env = require('../.env');
const Telegraf = require('telegraf');
const bot = new Telegraf(env.token);

// markup will in charge to build custom keyboard
const Markup = require('telegraf/markup');

// below you will set items of keyboard
// resize will resize keyboard with settled items
// extra will create custom keyboard
const multiListOfMiscellaneousEmojis = [
    ['🐷', '👾','🖖'],
    [,'😼','🛀','🤦‍'],
    ['♀','🤧','🤢'],
    ['🤩','🤫','💕']
];
const customKeyboard = Markup.keyboard(multiListOfMiscellaneousEmojis).resize().extra();

// creating middleware function
bot.start(async ctx => {
    const name = ctx.update.message.from.first_name;
    const message = `Seja bem vindo, ${name}`;
    await ctx.reply(message);
    await ctx.reply(
        'qual bebida você prefere?',
        Markup.keyboard(['Coca', 'Pepsi']).resize().oneTime().extra()
    );
});

// we don't need to set index because We Don't have multiplegroups (will be coca or pepsi)
const sodas = ['Coca', 'Pepsi'];
bot.hears(sodas, async ctx => {
    await ctx.reply(`Nossa! Eu também gosto de ${ctx.match}`);
    const preferredEmojiMessage = 'Escolha o seu emoji predileto dentre os que estão abaixo';
    ctx.reply(preferredEmojiMessage, customKeyboard);
});

const miscellaneousEmojis = ['🐷', '👾', '🖖', '😼', '🛀', '🤦‍', '♀', '🤧', '🤢', '🤩','🤫','💕'];

bot.hears(
    miscellaneousEmojis,
    async ctx => await ctx.reply(`Eu também adoro esse emoji ${ctx.match}!`)
);

bot.startPolling();
