const ping = async (message, content) => {
    const chat = await message.getChat();
    if (!chat.isGroup) {
        message.reply("You can only ping in groups");
        return;
    }
    let What_to_ping = content.substring(10);
    let User_who_crteaed = await message.getContact();
    let messageContent = `@${User_who_crteaed.id.user} says : \n \n *_${What_to_ping}_* \n \n `;
    let mentions = [];
    for (let participant of chat.participants) {
        mentions.push(`${participant.id.user}@c.us`);
        messageContent += `@${participant.id.user} `;
    }
    await chat.sendMessage(messageContent, { mentions });
}

const pick = async (message, content) => {
    const chat = await message.getChat();
    if (!chat.isGroup) {
        message.reply("You can only ping in groups");
        return;
    }
    const userMessage = content.split(" ");
    const i = parseInt(userMessage[1]);
    const typeOfPeople = userMessage.slice(2).join(" ");
    let finalMessage = `*${i} ${typeOfPeople}* are\n\n`;
    let participants = chat.participants;
    let randomParticipants = [];
    let randomIndex;
    let mentions = [];
    for (let j = 0; j < i; j++) {
        randomIndex = Math.floor(Math.random() * participants.length);
        randomParticipants.push(participants[randomIndex]);
        participants.splice(randomIndex, 1);
    }
    for (let participant of randomParticipants) {
        finalMessage += `@${participant.id.user}`;
        mentions.push(`${participant.id.user}@c.us`);
    }
    await chat.sendMessage(finalMessage, { mentions });
}

const ship = async (message, content) => {
    const chat = await message.getChat();
    if (!chat.isGroup) {
        message.reply("You can only use this command in groups");
        return;
    }
    let text = '';
    let mentions = [];
    let randomPercentage = Math.floor(Math.random() * 100);
    const mentionInMessage = await message.getMentions();
    for (let participant of mentionInMessage) {
        mentions.push(`${participant.id.user}@c.us`);
        text += `@${participant.id.user} `;
    }
    text = text + ` has a compatibility of \n *${randomPercentage}%*`;
    if(randomPercentage === 100){
        text += `\n\n *Perfect Match* \n You guys are made In Heaven`;
    }
    else if(randomPercentage > 80){
        text += `\n\n *Very Good Match* \n You guys are made for each other`;
    }
    else if(randomPercentage > 60){
        text += `\n\n *Good Match* \n You can give it a try`;
    }
    else if(randomPercentage > 40){
        text += `\n\n *Average Match* \n You can be friends`;
    }
    else if(randomPercentage > 20){
        text += `\n\n *Bad Match* \n Maybe try to avoid each other`;
    }
    else{
        text += `\n\n *Very Bad Match* \n Try to avoid each other`;
    }
    await chat.sendMessage(text, { mentions });
}

module.exports = { ping, pick, ship };