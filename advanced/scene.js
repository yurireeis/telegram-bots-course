const env = require('../.env');
const session = require('telegraf/session');
const Telegraf = require('telegraf');
const Stage = require('telegraf/stage');
const Scene = require('telegraf/scenes/base');

const { enter, leave } = Stage;
const bot = new Telegraf(env.token);

bot.start(ctx => {
    const name = ctx.update.message.from.first_name;
    ctx.reply(`Seja bem vindo, ${name}`);
    ctx.reply(`Entre com /echo ou /sum para iniciar`);
});

const echoScene = new Scene('echo');

echoScene.enter(ctx => ctx.reply('Entrando em Echo Scene'));
echoScene.leave(ctx => ctx.reply('Saindo de Echo Scene'));
echoScene.command('sair', leave());

echoScene.on('text', ctx => ctx.reply(ctx.message.text));

// message is basically the default case
echoScene.on('message', ctx => ctx.reply('eu aceito apenas mensagens de texto'));

let sum = 0;
const sumScene = new Scene('sum');

sumScene.enter(ctx => ctx.reply('Entrando em Sum Scene'));
sumScene.leave(ctx => ctx.reply('Saindo de Sum Scene'));

sumScene.use(async (ctx, next) => {
    const message = `Você está em scene. Escreva números pra somar`;
    const otherCommandsMessage = 'Outros commandos: /zerar /sair'
    await ctx.reply(message);
    await ctx.reply(otherCommandsMessage);
    // allowing next middlewares execution
    next();
});

sumScene.command('zerar', ctx => {
    sum = 0;
    const message = `Valor: ${sum}`;
    ctx.reply(message);
});

sumScene.command('sair', leave());

sumScene.hears(/(\d+)/m, ctx => {
    sum += parseInt(ctx.match[1]);
    ctx.reply(`Valor: ${sum}`);
});

sumScene.on('message', ctx => ctx.reply('Apenas números, por favor.'));

// here comes the stage receiving all the stages available
const stage = new Stage([
    echoScene,
    sumScene
]);

// here we advise that bot will use the session
bot.use(session());
bot.use(stage.middleware());

// and here we will dispose all commands
bot.command('soma', enter('sum'));
bot.command('echo', enter('echo'));
bot.on('message', ctx => ctx.reply('entre com /soma ou /echo para iniciar...'));

bot.startPolling();
