const { MessageMedia } = require('whatsapp-web.js');
const { AnimeWallpaper, AnimeSource } = require('anime-wallpaper');
const wallpaperClient = new AnimeWallpaper();
const wallpaper = async (message , content) => {
    if(content.split(" ").length < 2) {
        const wallpaperUrl = await wallpaperClient.random({resolutions : "1920x1080"})
        const randomIndex = Math.floor(Math.random() * wallpaperUrl.length);
        const media = await MessageMedia.fromUrl(wallpaperUrl[randomIndex].image);
        message.reply("*Here You go Darling!!😘*")
        message.reply(media, message.from, { caption: wallpaperUrl[randomIndex].title });
        message.react("😍");
    }
    else{
        let character = content.split(" ")[1];
        const wallpaperUrl = await wallpaperClient.search({ title: `${character}` }, AnimeSource.Wallpapers);
        const randomIndex = Math.floor(Math.random() * wallpaperUrl.length);
        const media = await MessageMedia.fromUrl(wallpaperUrl[randomIndex].image);
        message.reply("*Here You go Darling!!😘*");
        message.reply(media, message.from, { caption: wallpaperUrl[randomIndex].title });
        message.react("😍");
    }
}

module.exports = { wallpaper };