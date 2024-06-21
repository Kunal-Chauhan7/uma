const randomChar = require('anime-character-random');

const getRandom = async ()=>{
    const data = await randomChar.GetChar();
    return data;
}

module.exports = {getRandom}