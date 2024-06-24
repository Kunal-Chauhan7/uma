const randomChar = require('anime-character-random');
const client = require('nekos.life');
const neko = new client();


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
module.exports = {getRandom , getWaifu , getFact}