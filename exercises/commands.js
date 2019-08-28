// we have some built-in commands, but we can create custom commands too
// you can see all built-in commands on BotFather
const env = require('../.env');
const Telegraf = require('telegraf');
const bot = new Telegraf(env.token);

bot.start(ctx => {
    const nome = ctx.update.message.from.first_name;
    ctx.reply(`Seja bem vindo, ${nome}!\nAvise caso você precise de ajuda`);
});

bot.command('ajuda', ctx => {
    const message = `
        /ajuda: vou mostrar as opções
        \n/ajuda2: para testar via hears
        \n/op2: opção genérica
        \n/op3: outra opção genérica qualquer
    `;
    ctx.reply(message);
});

bot.hears('/ajuda2', ctx => ctx.reply('eu também consigo capturar comandos'));

bot.hears('/\/op(2|3)/i', ctx => ctx.reply('resposta padrão para comandos genéricos'));

bot.startPolling();
