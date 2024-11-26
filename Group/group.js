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

module.exports = { ping };