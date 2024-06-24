const { Client, MessageMedia, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { flipACoin } = require('./Gamble/Gamble');
const { greet } = require('./UserInteraction/UserInteraction');
const fs = require('fs');
const mime = require('mime-types');
const axios = require('axios');
const { getPokemon } = require('./media/Pokemon');
const { getRandom, getWaifu , getFact } = require('./anime/anime');

// Initialize WhatsApp client
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    }
});

// Event: when client is ready
client.once('ready', () => {
    console.log('Client is ready');
});

// Event: when QR code is generated
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

// Event: when a new message is received
client.on('message_create', async (message) => {
    const content = message.body;

    // Ensure content is a string and not empty before processing
    if (typeof content !== 'string' || content.trim() === '') {
        return;
    }
    // Command: !ping
    if (content === "!ping") {
        client.sendMessage(message.from, 'pong');
        message.react("✅");
    }
    // Command: Hey uma
    else if (content === 'Hey uma') {
        const contact = message.getContact();
        greet(message, contact);
        message.react("✅");
    }
    // Command: !flip
    else if (content === '!flip') {
        flipACoin(message);
        message.react("✅");
    }
    // Command: !sticker
    else if (content === '!sticker') {
        if (message.hasMedia) {
            message.downloadMedia().then(media => {
                const mediaPath = './downloaded-media/';
                if (!fs.existsSync(mediaPath)) {
                    fs.mkdirSync(mediaPath);
                }
                const extension = mime.extension(media.mimetype);
                const filename = new Date().getTime();
                const fullFilename = mediaPath + filename + '.' + extension;
                try {
                    fs.writeFileSync(fullFilename, media.data, { encoding: 'base64' });
                    message.reply(new MessageMedia(media.mimetype, media.data, filename), message.from, {
                        sendMediaAsSticker: true,
                        stickerAuthor: "Kunal Chauhan",
                        stickerName: "Created By Kunal Chauhan & uma"
                    });
                    message.react("✅");
                    fs.unlinkSync(fullFilename);
                } catch (err) {
                    console.log('Failed to save the file:', err);
                }
            });
        } else {
            message.reply(`Send an image with caption *!sticker* `);
        }
    }
    // Command: !meme
    else if (content === '!meme') {
        const meme = await axios("https://meme-api.com/gimme").then(res => res.data);
        const media = await MessageMedia.fromUrl(meme.url);
        message.react("✅");
        message.reply(media, message.from, { caption: "*Here is a crispy Meme*" });
    }
    // Command: !pokemon
    else if (content.startsWith("!pokemon")) {
        const pokemonData = await getPokemon(content);
        if (pokemonData.status !== "Found") {
            await client.searchMessages(message.from, 'Pokemon Not found');
        } else {
            const media = await MessageMedia.fromUrl(pokemonData.img);
            message.react("✅");
            message.reply(media, message.from, {
                caption: `*Name : ${pokemonData.name}*\n*Height : ${pokemonData.h}*\n*Weight : ${pokemonData.w}*\n*PokeIndex: ${pokemonData.PokeIndex}*`
            });
        }
    }
    // Command: !getrandomanime
    else if (content.startsWith("!getrandomanime")) {
        const data = await getRandom();
        message.react("✅");
        const media = await MessageMedia.fromUrl(data.CharacterImage);
        message.reply(media, message.from, {
            caption: `Anime Name : ${data.AnimeName}\nCharacter Name : ${data.CharacterName}`
        });
    }
    // Command: !roll
    else if(content.startsWith("!roll")){
        let roll = ""+Math.floor(Math.random()*6);
        message.react("✅");
        message.reply(roll,message.from);
    }
    // Command: !waifu
    else if(content.startsWith("!waifu")){
        const url = await getWaifu();
        const media = await MessageMedia.fromUrl(url)
        message.reply(media,message.from,{caption:"*Here You go Darling!!😘*"});
        message.react("😍");
    }
    // Command: !fact
    else if(content.startsWith("!fact")){
        let fact = await getFact();
        fact = `_${fact.fact}_`;
        message.reply(fact,message.from);
        message.react("🤔");
    }
});

// Initialize the client
client.initialize();
