const Nekoclient = require('nekos.life');
const neko = new Nekoclient();
const { MessageMedia } = require('whatsapp-web.js');

const Meow = async (message, content) => {
    let urlCat = (await neko.meow()).url;
    const media = await MessageMedia.fromUrl(urlCat);
    message.reply(media, message.from, { caption: "*Here You Have This cute kitty*" });
    message.react("🐈");
}
const Woof = async (message, content) => {
    let urlDog = (await neko.woof()).url;
    const media = await MessageMedia.fromUrl(urlDog);
    message.reply(media, message.from, { caption: "*Here You Have This cute doggo*" });
    message.react("🐕");
}

const Goose = async (message,content) => {
    let urlGoose = (await neko.goose()).url;
    const media = await MessageMedia.fromUrl(urlGoose);
    message.reply(media, message.from, { caption: "*Here You Have This cute goose*" });
    message.react("🦢");
}

module.exports = { Goose, Woof, Meow };