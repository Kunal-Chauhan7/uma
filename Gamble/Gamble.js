const flipACoin = (message)=>{
    let coinSides = ['head' , 'tails'];
        let chance = Math.floor(Math.random()*2);
        message.reply(coinSides[chance]);
}

module.exports = {flipACoin};