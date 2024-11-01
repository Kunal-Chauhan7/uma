const { Client, MessageMedia, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { flipACoin } = require('./Gamble/Gamble');
const { greet } = require('./UserInteraction/UserInteraction');
const fs = require('fs');
const mime = require('mime-types');
const axios = require('axios');
const { getPokemon } = require('./media/Pokemon');
const { getRandom, getWaifu , getFact, SearchAnime } = require('./anime/anime');

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
        message.react("✅");
    }
    // Command: !flip
    else if (content === '!flip') {
        flipACoin(message);
        message.react("✅");
    }
    // Command: !sticker
    else if (content === '!sticker') {
        if(message.hasMedia && message.isGif){
            message.downloadMedia().then(media=>{
                message.reply(media,message.from,{
                    sendMediaAsSticker:true,
                    stickerAuthor: "Kunal Chauhan",
                    stickerName: "Created By Kunal Chauhan & uma"});
            });
            message.react("✅");
        }
        else if (message.hasMedia) {
            message.downloadMedia().then(async media => {
                const extension = mime.extension(media.mimetype);
                if(extension==='jpeg'){
                    const mediaPath = './downloaded-media/';
                    if (!fs.existsSync(mediaPath)) {
                        fs.mkdirSync(mediaPath);
                    }
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
                }
                else if(extension==='mp4'){
                    message.downloadMedia().then(media=>{
                        message.reply(media,message.from,{
                            sendMediaAsSticker:true,
                            stickerAuthor: "Kunal Chauhan",
                            stickerName: "Created By Kunal Chauhan & uma"});
                    });
                    message.react("✅");
                }
            });
        } else {
            message.reply(`Send an image or gif or video with caption *!sticker* `);
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
            await uma.searchMessages(message.from, 'Pokemon Not found');
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
    else if(content.startsWith("!animeSearch")){
        const data = await SearchAnime(content);
        if(data.found){
            const media = await MessageMedia.fromUrl(data.imgUrl);
            message.reply(media,message.from,{
                caption:`*${data.name}*\n*Mal Link* : ${data.malLink}\n*Mal Number* : ${data.malId}\n*Number Of Episodes* : ${data.episodes}\n*airing* : ${data.airing}\n*duration* : ${data.duration}\n*Summary* : ${data.summary}`
            });
            message.react("👍")
        }
    }
});

// Initialize the client
uma.initialize();
