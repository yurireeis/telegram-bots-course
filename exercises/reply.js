const env = require('../.env')
const Telegraf = require('telegraf');
const bot = new Telegraf(env.token);

bot.start(async ctx => {
    const name = ctx.update.message.from.first_name;
    const message = `Seja nem vindo ${name} 😎`;
    const htmlMessage = `Destacando mensagem <b>HTML</b> <i>de várias</i> <code>formas</code> <pre>possíveis</pre> <a href="http://www.google.com">Google</a>`;
    const photoUrl = 'https://www.writeups.org/wp-content/uploads/Red-Power-Ranger-Jason-Lee-Scott.jpg';
    const videoUrl = 'http://files.cod3r.com.br/curso-bot/cod3r-end.m4v';

    // using simple reply
    await ctx.reply(message);

    // using HTML formatting
    await ctx.replyWithHTML(htmlMessage);

    // using markdown formatting
    await ctx.replyWithMarkdown('Destacando mensagem *Markdown*');

    // reply using photo
    await ctx.replyWithPhoto({ source: `${__dirname}/assets/dog.png` });

    // url with caption
    await ctx.replyWithPhoto(photoUrl, { caption: 'É hora de morfar!' });

    // reply with location
    await ctx.replyWithLocation(29.9773008, 31.1303068);

    // reply with video
    await ctx.replyWithVideo(videoUrl);
});

bot.startPolling();
