const { Client, MessageMedia, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { flipACoin, rollADice } = require('./Gamble/Gamble');
const { greet } = require('./UserInteraction/UserInteraction');
const fs = require('fs');
const mime = require('mime-types');
const { getPokemon } = require('./media/Pokemon');
const { getRandomAnime, getWaifu , getFact, SearchAnime } = require('./anime/anime');
const { sendMeme } = require('./media/meme');
const { makeSticker } = require('./media/sticker');

// Initialize WhatsApp client
const uma = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    }
});

// Event: when client is ready
uma.once('ready', () => {
    console.log('Running...');
});

// Event: when QR code is generated
uma.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

var reInitializeCount = 1;
uma.on('disconnected', (reason) => {
    //Just to reinitialize on the first page refresh
    if(reInitializeCount === 1 && reason === 'NAVIGATION') {
        reInitializeCount++;
        client.initialize();
        return;
    }
    //Your code for others' reasons for disconnections
});


// Event: when a new message is received
uma.on('message_create', async (message) => {
    const content = message.body;

    // Ensure content is a string and not empty before processing
    if (typeof content !== 'string' || content.trim() === '') {
        return;
    }
    // Command: !ping
    if (content === "!ping") {
        uma.sendMessage(message.from, 'pong');
        message.react("✅");
    }
    // Command: Hey uma
    else if (content === 'Hey uma') {
        const contact = message.getContact();
        greet(message, contact);
    }
    // Command: !flip
    // Flip a coin
    else if (content === '!flip') {
        flipACoin(message);
    }
    // Command: !sticker
    // Convert an image or gif to a sticker
    else if (content === '!sticker') {
       makeSticker(message);
    }
    // Command: !meme
    //  Get a random meme
    else if (content === '!meme') {
        sendMeme(message);
    }
    // Command: !pokemon
    // Get pokemon details
    else if (content.startsWith("!pokemon")) {
        getPokemon(content,message);
    }
    // Command: !getrandomanime
    // Get a random anime character
    else if (content.startsWith("!getrandomanime")) {
        getRandomAnime(message);
    }
    // Command: !roll
    // Roll a dice
    else if(content.startsWith("!roll")){
        rollADice(message);
    }
    // Command: !waifu
    // Get a random waifu
    else if(content.startsWith("!waifu")){
        getWaifu(message);
    }
    // Command: !fact
    // Get a random fact
    else if(content.startsWith("!fact")){
        getFact(message);
        
    }
    // Command: !animeSearch
    // Search for an anime
    else if(content.startsWith("!animeSearch")){
        SearchAnime(content,message);
    }
    // Command: !everyone
    // ping everyone in the group
    else if(content.startsWith("!everyone")){
        const chat = await message.getChat();
        if(chat.isGroup){
            let What_to_ping = content.substring(10);
            let User_who_crteaed = message.getContact();
            let messageContent = `@${(await User_who_crteaed).id.user} says : \n \n *_${What_to_ping}_* \n \n `;
            let mentions = [];
            for(let participant of chat.participants){
                mentions.push(`${participant.id.user}@c.us`);
                messageContent += `@${participant.id.user} `;
            }
            await chat.sendMessage(messageContent,{mentions});
        }
        else{
            message.reply("You can only ping in groups");
        }
    }
});

// Initialize the client
uma.initialize();
