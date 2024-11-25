const flipACoin = (message)=>{
    let coinSides = ['head' , 'tails'];
        let chance = Math.floor(Math.random()*2);
        message.reply(coinSides[chance]);
        message.react("✅");
}

const rollADice = (message)=>{
    let roll = ""+Math.floor(Math.random()*6);
        message.react("✅");
        message.reply(roll,message.from);
}

module.exports = {flipACoin , rollADice};