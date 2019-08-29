const env = require('../.env');
const Telegram = require('telegraf/telegram');
const axios = require('axios');
const Markup = require('telegraf/markup');

const message = message => {
    const url = `${env.apiUrl}/sendMessage?chat_id=${env.userID}&text=${encodeURI(message)}`; 
    axios.get(url).catch(e => console.log(e));
};


const options = [['Ok', 'Cancelar']];

const keyboard = Markup.keyboard(options).resize().oneTime().extra();

const telegram = new Telegram(env.token);

telegram.sendMessage(
    env.userID,
    'Essa é uma mensagem com teclado',
    keyboard
);

setInterval(() => {
    message('Enviando mensagem de forma assíncrona');
}, 3000);
