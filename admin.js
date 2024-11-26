const isAdmin = async (message) => {
    const chat = await message.getChat();
    const author = await message.author;
    for (let participant of chat.participants) {
        if(participant.isAdmin){
            if(participant.id._serialized=== author){
                return true;
            }
        }
    }
    return false;
}

module.exports = { isAdmin };