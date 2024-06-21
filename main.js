const {Client, MessageMedia, LocalAuth} = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { flipACoin } = require('./Gamble/Gamble');
const {greet} = require('./UserInteraction/UserInteraction');
const fs = require('fs');
const mime = require('mime-types');
const axios = require('axios');
const { getPokemon } = require('./media/Pokemon');
const { getRandom } = require('./anime/anime');

const client = new Client({
    authStrategy:new LocalAuth(),
    puppeteer: {
        executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    }
}); // create an client object

client.once('ready',()=>{ // once the client is ready 'ready' is a event name
    console.log('ready'); // will print the that the client is ready to be used
});
client.on('qr',(qr)=>{ //when client is making a qr we will create qr for that respective client 
    qrcode.generate(qr,{small:true}); // this will genrate the qr in the terminal
});


client.on('message_create', async message=>{
    const content = message.body;
    if(content==="!ping"){
        client.sendMessage(message.from,'pong');
    }
    if(content==='Hey uma'){
        const Contact = message.getContact();
        greet(message,Contact);
        message.react("✅");
    }
    if(content==='!flip'){
        flipACoin(message);
        message.react("✅");
    }
    if(content==='!sticker'){ // so if the message starts with !sticker then it's a sticker
        if(message.hasMedia){ // if a message has a media that media will be used to create stickers
            message.downloadMedia().then(media => { // now we will save that media
                if (media) {
                    const mediaPath = './downloaded-media/'; // the path where the media will be stored
                    if (!fs.existsSync(mediaPath)) { // if the dir do not exist create one
                        fs.mkdirSync(mediaPath);
                    }
                    const extension = mime.extension(media.mimetype); // MIME types means what kind of media so we are basically getting our media type extension
                    const filename = new Date().getTime(); // so to make a file unique will set that file name to the curretn time
    
                    const fullFilename = mediaPath + filename + '.' + extension; //the file name will be this here
                    try {
                        fs.writeFileSync(fullFilename, media.data, { encoding: 'base64' }); // create a file and name is this with a base64 encoding
                        MessageMedia.fromFilePath(filePath = fullFilename) // a MessageMedia from the the path
                        message.reply(new MessageMedia(media.mimetype, media.data, filename),message.from,{  // send the message with this property 
                            sendMediaAsSticker: true,
                            stickerAuthor:"Kunal Chauhan",
                            stickerName:"Created By Kunal Chauhan & uma"
                        });
                        message.react("✅");
                        // client.sendMessage(message.from, new MessageMedia(media.mimetype, media.data, filename), {  // send the message with this property 
                        //     sendMediaAsSticker: true,
                        //     stickerAuthor:"Kunal Chauhan",
                        //     stickerName:"Created By Kunal Chauhan & uma"
                        // });
                        fs.unlinkSync(fullFilename) // so this right here is used to delete the file
                    } catch (err) {
                        console.log('Failed to save the file:', err);
                    }
                }
            });
        }else{
            message.reply(`send image with caption *!sticker* `)
        }
    }
    if(content==='!meme'){
        const meme = await axios("https://meme-api.com/gimme").then(res=>res.data);
        const media = await MessageMedia.fromUrl(meme.url);
        message.react("✅")
        message.reply(media,message.from,{caption:"*Here is a crispy Meme*"})
    }
    if(content.startsWith("!pokemon")){
        const pokemonData = await getPokemon(content);
        if(pokemonData.status!=="Found"){
            await client.searchMessages(message.from,'Pokemon Not found')
        }
        else{
            const media = await MessageMedia.fromUrl(pokemonData.img);
            message.react("✅")
            message.reply(media,message.from,{caption:`*Name : ${pokemonData.name}*\n*height : ${pokemonData.h}*\n*weight :${pokemonData.w}*\n*PokeIndex:${pokemonData.PokeIndex}*`})
        }

    }
    if(content.startsWith("!getrandomanime")){
        const data = await getRandom();
        message.react("✅")
        const media = await MessageMedia.fromUrl(data.CharacterImage);
        message.reply(media,message.from,{caption:
            `Anime Name : ${data.AnimeName}\nCharacter Name : ${data.CharacterName}
            `})
    }
});
client.initialize(); // starts and ask for the auth process.
