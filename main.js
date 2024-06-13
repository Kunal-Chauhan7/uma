const {Client} = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { flipACoin } = require('./Gamble/Gamble');
const {greet} = require('./UserInteraction/UserInteraction');

const client = new Client(); // create an client object

client.once('ready',()=>{ // once the client is ready 'ready' is a event name
    console.log('ready'); // will print the that the client is ready to be used
});
client.on('qr',(qr)=>{ //when client is making a qr we will create qr for that respective client 
    qrcode.generate(qr,{small:true}); // this will genrate the qr in the terminal
});

client.on('message_create',message=>{
    if(message.body==="!ping"){
        client.sendMessage(message.from,'pong');
    }
    if(message.body==='Hey uma'){
        const Contact = message.getContact();
        greet(message,Contact);
    }
    if(message.body==='!flip'){
        flipACoin(message);
    }
});
client.initialize(); // starts and ask for the auth process.
