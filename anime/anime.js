const randomChar = require('anime-character-random');
const axios= require('axios');

const getRandom = async ()=>{
    const data = await randomChar.GetChar();
    return data;
}

const getWaifu = async ()=>{
    const data = await axios(`https://api.waifu.pics/sfw/waifu`).then(res=>res.data);
    return data.url;
}

module.exports = {getRandom , getWaifu}