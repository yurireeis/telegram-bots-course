const env = require('../.env');
const session = require('telegraf/session');
const Stage = require('telegraf/stage');
const Telegraf = require('telegraf');
const Composer = require('telegraf/composer');
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');
const WizardScene = require('telegraf/scenes/wizard');

let description = '';
let price = 0;
let date = null;

const confirmation = Extra.markup(Markup.inlineKeyboard([
    Markup.callbackButton('Sim', 'y'),
    Markup.callbackButton('Não', 'n')
]));

// Here comes de FIRST step: ask for the price
// basically a component to do something
// enclose user in some context until some condition be fullfield
const priceHandler = new Composer();

priceHandler.hears(/(\d+)/, ctx => {
    price = ctx.markup[1];
    const message = 'Para pagar que dia?';
    ctx.reply(message);
    ctx.wizard.next();
});

// use will send user to a previous condition (while some condition is true...)
priceHandler.use(ctx => ctx.reply('Apenas números são aceitos...'));


// Here comes de SECOND step: ask for the payment date
const dateHandler = new Composer();

dateHandler.hears(/(\d{2}\/\d{2}\/\d{4})/, ctx => {
    date = ctx.match[1];
    const descriptionBrief = `Descrição: ${description}`;
    const priceBrief = `Preço: ${price}`;
    const dateBrief = `Data: ${date}`;
    const message = `Aqui está o resumo da sua compra:\n${descriptionBrief}\n${priceBrief}\n${dateBrief}\nConfirma?`;
    ctx.reply(message, confirmation);
    context.wizard.next();
});

dateHandler.use(ctx => ctx.reply('Entre com uma data no formato DD/MM/YYYY (ex.: 30/10/1986)'));

// Here comes de THIRD step: ask for transaction confirmation
const confirmationHandler = new Composer();

confirmationHandler.action('s', ctx => {
    ctx.reply('Compra confirmada!');
    // exiting this wizard scene
    ctx.scene.leave();
});

confirmationHandler.action('n', ctx => {
    ctx.reply('Compra excluída!');
    // exiting this wizard scene
    ctx.scene.leave();
});

confirmationHandler.use(ctx => ctx.reply('Apenas confirme', confirmation));

// here we set all steps needed for the wizard scene
const wizardShop = new WizardScene('shop', ctx => {
    // first middleware
    // we assume here that anything of user types will be the item description
    const message = 'O que você comprou?';
    ctx.reply(message);
    ctx.wizard.next();
}, ctx => {
    // second middleware
    description = ctx.update.message.text;
    const message = 'Quanto foi?';
    ctx.reply(message);
},
    priceHandler,
    dateHandler,
    confirmationHandler
);

const bot = new Telegraf(env.token);
// here we defined the default scene (wizard shop is a well defined scene)
const stage = new Stage([wizardShop], { default: 'compra' });
new
bot.usenew(session());
bot.use(stage.middleware());
bot.startPolling();
