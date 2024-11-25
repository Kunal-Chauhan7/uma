const axios = require("axios");
const { MessageMedia } = require("whatsapp-web.js");
const sendMeme = async (message) => {
    const meme = await axios("https://meme-api.com/gimme").then(res => res.data);
    const media = await MessageMedia.fromUrl(meme.url);
    message.react("✅");
    message.reply(media, message.from, { caption: "*Here is a crispy Meme*" });
}

module.exports = { sendMeme }