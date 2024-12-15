const randomChar = require('anime-character-random');
const Nekoclient = require('nekos.life');
const neko = new Nekoclient();
const axios = require('axios');
const { MessageMedia } = require('whatsapp-web.js');

const getRandomAnime = async (message) => {
    const data = await randomChar.GetChar();
    message.react("✅");
    const media = await MessageMedia.fromUrl(data.CharacterImage);
    message.reply(media, message.from, {
        caption: `Anime Name : ${data.AnimeName}\nCharacter Name : ${data.CharacterName}`
    });
}

const getWaifu = async (message) => {
    let urlWaifu = (await neko.waifu()).url;
    const media = await MessageMedia.fromUrl(urlWaifu);
    message.reply(media, message.from, { caption: "*Here You go Darling!!😘*" });
    message.react("😍");
}

const getFact = async (message) => {
    let fact = await neko.fact();
    fact = `_${fact.fact}_`;
    message.reply(fact, message.from);
    message.react("🤔");
}

const SearchAnime = async (query, message) => {
    let data = {};
    try {
        let SearchQuery = query.split(" ");
        if (SearchQuery.length > 1) {
            let searchElement = SearchQuery.slice(1).join(' ');
            let response = await axios.get(`https://api.jikan.moe/v4/anime?q=${searchElement}&sfw`);
            let searchResult = response.data.data[0];

            if (searchResult) {
                data = {
                    found: true,
                    name: `${searchResult.title_english} || ${searchResult.title_japanese}`,
                    malLink: searchResult.url,
                    malId: searchResult.mal_id,
                    imgUrl: searchResult.images.jpg.large_image_url,
                    episodes: searchResult.episodes,
                    airing: searchResult.status,
                    duration: searchResult.duration,
                    summary: searchResult.synopsis,
                }
            } else {
                data = {
                    found: false,
                }
            }
            if (data.found) {
                const media = await MessageMedia.fromUrl(data.imgUrl);
                message.reply(media, message.from, {
                    caption: `*${data.name}*\n*Mal Link* : ${data.malLink}\n*Mal Number* : ${data.malId}\n*Number Of Episodes* : ${data.episodes}\n*airing* : ${data.airing}\n*duration* : ${data.duration}\n*Summary* : ${data.summary}`
                });
                message.react("👍")
            }

        }
    } catch (error) {
        console.error("Error searching anime:", error.message);
    }
}
const Neko = async () => {

}
const NekoGif = async () => {

}
const FoxGirl = async () => {

}
const Gecg = async () => {

}

const Avatar = async () => {

}
module.exports = { getRandomAnime, getWaifu, getFact, SearchAnime }