const randomChar = require('anime-character-random');
const client = require('nekos.life');
const neko = new client();
const axios = require('axios');


const getRandom = async ()=>{
    const data = await randomChar.GetChar();
    return data;
}

const getWaifu = async ()=>{
    const url = await neko.waifu();
    return url.url;    
}

const getFact = async ()=>{
    const fact = await neko.fact();
    return fact;
}

const SearchAnime = async (query) => {
    try {
        let SearchQuery = query.split(" ");
        if (SearchQuery.length > 1) {
            let searchElement = SearchQuery.slice(1).join(' ');
            let response = await axios.get(`https://api.jikan.moe/v4/anime?q=${searchElement}&sfw`);
            let searchResult = response.data.data[0];

            if (searchResult) {
                const data = {
                    found:true,
                    name: `${searchResult.title_english} || ${searchResult.title_japanese}`,
                    malLink: searchResult.url,
                    malId: searchResult.mal_id,
                    imgUrl: searchResult.images.jpg.large_image_url,
                    episodes: searchResult.episodes,
                    airing: searchResult.status,
                    duration: searchResult.duration,
                    summary: searchResult.synopsis,
                }
                return data;
            } else {
                const data = {
                    found:false,
                }
                return data;
            }
        }
    } catch (error) {
        console.error("Error searching anime:", error.message);
    }
}
module.exports = {getRandom , getWaifu , getFact , SearchAnime}