const Nekoclient = require('nekos.life');
const neko = new Nekoclient();

const greet = (message, Contact) => {
    message.reply("Hey There!! 👋 ");
    message.react("✅")
}

const Why = async (message , content) => {
    let Question = (await neko.why()).why;
    message.reply(Question);
    message.react("🤔");
}

const CatText = async (message,content) => {
    let text = (await neko.catText()).cat;
    message.reply(text);
    message.react("🐱");
}
const OwOify = async (message,content) => {
    let text = content.substring(8);
    let OwOtext = await neko.OwOify({ text: text });
    message.reply(OwOtext.owo);
    message.react("👍");
}

module.exports = { greet, Why, CatText, OwOify };