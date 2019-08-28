const env = require('../.env');
const Telegraf = require('telegraf');
const bot = new Telegraf(env.token);

bot.start(ctx => {
    const name = ctx.update.message.from.first_name;
    ctx.reply(`Seja bem vindo, ${name}`);
});

// reading a texting event
bot.on('text', ctx => {
    const message = `Texto ${ctx.update.message.text} recebido com sucesso!`;
    ctx.reply(message);
});

// reading a send location event
bot.on('location', ctx => {
    const location = ctx.update.message.location;
    const message = `Entendido, você está em Lat: ${location.latitude}, Lon: ${location.longitude}`;
    ctx.reply(message);
});

// reading a send contact event
bot.on('contact', ctx => {
    const contact = ctx.update.message.contact;
    const message = `Vou lembrar do ${contact.first_name} - ${contact.phone_number}`;
    ctx.reply(message);
});

// reading a voice message event
bot.on('voice', ctx => {
    const voice = ctx.update.message.voice;
    const message = `Áudio recebido, ele possui ${voice.duration} segundos`;
    ctx.reply(message);
});

// reading a photo event
// you will receive the metadata
bot.on('photo', ctx => {
    // will be an array of photos
    const photo = ctx.update.message.photo;
    photo.forEach((frame, i) => {
        const message = `Foto ${i} tem resolução de ${frame.width}x${frame.height}`;
        ctx.reply(message);
    });
});

// reading a sticker event
bot.on('sticker', ctx => {
    const sticker = ctx.update.message.sticker;
    const message = `Estou vendo que você enviou o ${sticker.emoji} do conjunto ${sticker.set_name}`;
    ctx.reply(message);
});

bot.startPolling();
