const axios= require('axios');

const getWaifu = async ()=>{
    const data = await axios(`https://api.waifu.pics/sfw/waifu`).then(res=>res.data);
    console.log(data.url);
}

getWaifu();