const fs = require('fs');
const mime = require('mime-types');
const { MessageMedia } = require('whatsapp-web.js');

const makeSticker = async (message) => {
    if (message.hasMedia && message.isGif) {
        message.downloadMedia().then(media => {
            message.reply(media, message.from, {
                sendMediaAsSticker: true,
                stickerAuthor: "Kunal Chauhan",
                stickerName: "Created By Kunal Chauhan & uma"
            });
        });
        message.react("✅");
    }
    else if (message.hasMedia) {
        message.downloadMedia().then(async media => {
            const extension = mime.extension(media.mimetype);
            if (extension === 'jpeg') {
                const mediaPath = './downloaded-media/';
                if (!fs.existsSync(mediaPath)) {
                    fs.mkdirSync(mediaPath);
                }
                const filename = new Date().getTime();
                const fullFilename = mediaPath + filename + '.' + extension;
                try {
                    fs.writeFileSync(fullFilename, media.data, { encoding: 'base64' });
                    message.reply(new MessageMedia(media.mimetype, media.data, filename), message.from, {
                        sendMediaAsSticker: true,
                        stickerAuthor: "Kunal Chauhan",
                        stickerName: "Created By Kunal Chauhan & uma"
                    });
                    message.react("✅");
                    fs.unlinkSync(fullFilename);
                } catch (err) {
                    console.log('Failed to save the file:', err);
                }
            }
            else if (extension === 'mp4') {
                message.downloadMedia().then(media => {
                    message.reply(media, message.from, {
                        sendMediaAsSticker: true,
                        stickerAuthor: "Kunal Chauhan",
                        stickerName: "Created By Kunal Chauhan & uma"
                    });
                });
                message.react("✅");
            }
        });
    } else {
        message.reply(`Send an image or gif or video with caption *!sticker* `);
    }
}

module.exports = { makeSticker };