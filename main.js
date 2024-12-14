const { Client, LocalAuth ,  } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { flipACoin, rollADice } = require('./Gamble/Gamble');
const { greet } = require('./UserInteraction/UserInteraction');
const { getPokemon } = require('./media/Pokemon');
const { getRandomAnime, getWaifu , getFact, SearchAnime } = require('./anime/anime');
const { sendMeme } = require('./media/meme');
const { makeSticker } = require('./media/sticker');
const { ping, pick , ship, Smug, Tickle, Slap, Pat } = require('./Group/group');
const { isAdmin } = require('./admin');
const {creator , creatorNumber} = require('./superadmin');
const { wallpaper } = require('./media/wallpaper');

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
uma.on('message', async (message) => {
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
        const UserIsAdmin = await (isAdmin(message));
        const chat = await message.getChat();
        if(UserIsAdmin || message.author === creator){
            ping(message,content);
        }
        else{
            message.reply("*Either You are not an admin or you are not Kunal Chauhan!*");
        }
    }
    // Command: !pick
    // pick random people from the group
    else if(content.startsWith("!pick")){
        pick(message,content);
    }
    else if(content.startsWith("!wallpaper")){
        wallpaper(message,content);
    }
    
    else if(content.startsWith("!ship")){
        ship(message,content);
    }

    else if(content.startsWith("!smug")){
        Smug(message,content);
    }

    else if (content.startsWith("!tickle")){
        Tickle(message,content);
    }

    else if(content.startsWith("!slap")){
        Slap(message,content);
    }

    else if (content.startsWith("!pat")){
        Pat(message,content);
    }

    // else if (content.startsWith("!help")) {
    //     message.reply("Commands: \n !ping \n !flip \n !sticker \n !meme \n !pokemon \n !getrandomanime \n !roll \n !waifu \n !fact \n !animeSearch \n !everyone \n !pick \n !help");
    // }
});

/* 
            to check if the user is Kunal Chauhan
            if(message.author === creator){
            message.reply("Kunal Chauhan is here");
        }
*/

// Initialize the client
uma.initialize();
