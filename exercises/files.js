const env = require('../.env');
const Telegraf = require('telegraf');
const axios = require('axios');
const bot = new Telegraf(env.token);

bot.on('voice', async ctx => {
    // with this id we will request file directly from telegram api
    const id = ctx.update.message.voice.file_id;

    // making sync request and get filepath from response
    const response = await axios.get(`${env.apiUrl}/getFile?file_id=${id}`);
    const filepath = response.data.result.file_path;

    ctx.replyWithVoice({ url: `${env.apiFileUrl}/${filepath}` });
});

// doing the same above, but with photo
bot.on('photo', async ctx => {
    const id = ctx.update.message.photo[0].file_id;
    const response = await axios.get(`${env.apiUrl}/getFile?file_id=${id}`);
    const filepath = response.data.result.file_path;

    ctx.replyWithPhoto({ url: `${env.apiFileUrl}/${filepath}` });
});

bot.startPolling();
