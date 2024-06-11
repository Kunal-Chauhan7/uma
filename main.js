const {Client} = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

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
});

client.initialize(); // starts and ask for the auth process.
