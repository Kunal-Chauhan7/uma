const Nekoclient = require('nekos.life');
const neko = new Nekoclient();
const { MessageMedia } = require("whatsapp-web.js");

const ping = async (message, content) => {
    const chat = await message.getChat();
    if (!chat.isGroup) {
        message.reply("You can only ping in groups");
        return;
    }
    let What_to_ping = content.substring(10);
    let User_who_crteaed = await message.getContact();
    let messageContent = `@${User_who_crteaed.id.user} says : \n \n *_${What_to_ping}_* \n \n `;
    let mentions = [];
    for (let participant of chat.participants) {
        mentions.push(`${participant.id.user}@c.us`);
        messageContent += `@${participant.id.user} `;
    }
    await chat.sendMessage(messageContent, { mentions });
}

const pick = async (message, content) => {
    const chat = await message.getChat();
    if (!chat.isGroup) {
        message.reply("You can only ping in groups");
        return;
    }
    const userMessage = content.split(" ");
    const i = parseInt(userMessage[1]);
    const typeOfPeople = userMessage.slice(2).join(" ");
    let finalMessage = `*${i} ${typeOfPeople}* are\n\n`;
    let participants = chat.participants;
    let randomParticipants = [];
    let randomIndex;
    let mentions = [];
    for (let j = 0; j < i; j++) {
        randomIndex = Math.floor(Math.random() * participants.length);
        randomParticipants.push(participants[randomIndex]);
        participants.splice(randomIndex, 1);
    }
    for (let participant of randomParticipants) {
        finalMessage += `@${participant.id.user}`;
        mentions.push(`${participant.id.user}@c.us`);
    }
    await chat.sendMessage(finalMessage, { mentions });
}

const ship = async (message, content) => {
    const chat = await message.getChat();
    if (!chat.isGroup) {
        message.reply("You can only use this command in groups");
        return;
    }
    let text = '';
    let mentions = [];
    let randomPercentage = Math.floor(Math.random() * 100);
    const mentionInMessage = await message.getMentions();
    for (let participant of mentionInMessage) {
        mentions.push(`${participant.id.user}@c.us`);
        text += `@${participant.id.user} `;
    }
    text = text + ` has a compatibility of \n *${randomPercentage}%*`;
    if (randomPercentage === 100) {
        text += `\n\n *Perfect Match* \n You guys are made In Heaven`;
    }
    else if (randomPercentage > 80) {
        text += `\n\n *Very Good Match* \n You guys are made for each other`;
    }
    else if (randomPercentage > 60) {
        text += `\n\n *Good Match* \n You can give it a try`;
    }
    else if (randomPercentage > 40) {
        text += `\n\n *Average Match* \n You can be friends`;
    }
    else if (randomPercentage > 20) {
        text += `\n\n *Bad Match* \n Maybe try to avoid each other`;
    }
    else {
        text += `\n\n *Very Bad Match* \n Try to avoid each other`;
    }
    message.react("❤️");
    await chat.sendMessage(text, { mentions });
}
const Smug = async (message, content) => {
    const chat = await message.getChat();
    if (!chat.isGroup) {
        message.reply("You can only use this command in groups");
        return;
    }
    let User_who_crteaed = await message.getContact();
    let text = '';
    let mentions = [];
    mentions.push(`${User_who_crteaed.id.user}@c.us`);
    text = text + ` @${User_who_crteaed.id.user} got irritated By these mortals \n`;
    const mentionInMessage = await message.getMentions();
    for (let participant of mentionInMessage) {
        mentions.push(`${participant.id.user}@c.us`);
        text += `@${participant.id.user} `;
    }
    let urlSmug = (await neko.smug()).url;
    const media = await MessageMedia.fromUrl(urlSmug);
    message.react("🤷‍♂️");
    message.reply(media, message.from, { caption: text , mentions});
}
const Tickle = async (message , content) => {
    const chat = await message.getChat();
    if (!chat.isGroup) {
        message.reply("You can only use this command in groups");
        return;
    }
    let User_who_crteaed = await message.getContact();
    let text = '';
    let mentions = [];
    mentions.push(`${User_who_crteaed.id.user}@c.us`);
    text = text + ` @${User_who_crteaed.id.user} Tickled \n`;
    const mentionInMessage = await message.getMentions();
    for (let participant of mentionInMessage) {
        mentions.push(`${participant.id.user}@c.us`);
        text += `@${participant.id.user} `;
    }
    let urlTickle = (await neko.tickle()).url;
    const media = await MessageMedia.fromUrl(urlTickle);
    message.react("🪶");
    message.reply(media, message.from, { caption: text , mentions});
}
const Slap = async (message , content) => {
    const chat = await message.getChat();
    if (!chat.isGroup) {
        message.reply("You can only use this command in groups");
        return;
    }
    let User_who_crteaed = await message.getContact();
    let text = '';
    let mentions = [];
    mentions.push(`${User_who_crteaed.id.user}@c.us`);
    text = text + ` @${User_who_crteaed.id.user} Slapped \n`;
    const mentionInMessage = await message.getMentions();
    for (let participant of mentionInMessage) {
        mentions.push(`${participant.id.user}@c.us`);
        text += `@${participant.id.user} `;
    }
    let urlSlap = (await neko.slap()).url;
    const media = await MessageMedia.fromUrl(urlSlap);
    message.react("🤚");
    message.reply(media, message.from, { caption: text , mentions});
}
const Pat = async (message , content) => {
    const chat = await message.getChat();
    if (!chat.isGroup) {
        message.reply("You can only use this command in groups");
        return;
    }
    let User_who_crteaed = await message.getContact();
    let text = '';
    let mentions = [];
    mentions.push(`${User_who_crteaed.id.user}@c.us`);
    text = text + ` @${User_who_crteaed.id.user} Patted \n`;
    const mentionInMessage = await message.getMentions();
    for (let participant of mentionInMessage) {
        mentions.push(`${participant.id.user}@c.us`);
        text += `@${participant.id.user} `;
    }
    let urlPat = (await neko.pat()).url;
    const media = await MessageMedia.fromUrl(urlPat);
    message.react("🥰");
    message.reply(media, message.from, { caption: text , mentions});
}
const Neko = async () => {

}
const NekoGif = async () => {

}
const Meow = async () => {

}
const Kiss = async () => {

}
const Hug = async () => {

}
const FoxGirl = async () => {

}
const Feed = async () => {

}
const Cuddle = async () => {

}
const Woof = async () => {

}
const Goose = async () => {

}
const Gecg = async () => {

}
const Avatar = async () => {

}
const Why = async () => {

}
const CatText = async () => {

}
const OwOify = async () => {

}
module.exports = { ping, pick, ship, Smug, Tickle, Slap, Pat, Neko, NekoGif, Meow, Kiss, Hug, FoxGirl, Feed, Cuddle, Woof, Goose, Gecg, Avatar, Why, CatText, OwOify };