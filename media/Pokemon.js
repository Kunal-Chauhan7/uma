const { MessageMedia } = require('whatsapp-web.js');
let pokemonData = {};
const getPokemon = async (pokemon, message) => {
    let pokemonMessage = pokemon.split(" ");
    let PokemonName = pokemonMessage[1];
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${PokemonName}`)
    if (res.status !== 200) {
        message.reply("Pokemon Not found");
    }
    else {
        const data = await fetch(res.url).then(res => res.json());
        pokemonData = {
            "status": "Found",
            "h": data.height,
            "w": data.weight,
            "PokeIndex": data.id,
            "name": data.name,
            "img": `https://img.pokemondb.net/artwork/large/${data.name}.jpg`,
        }
        const media = await MessageMedia.fromUrl(pokemonData.img);
        message.react("✅");
        message.reply(media, message.from, {
            caption: `*Name : ${pokemonData.name}*\n*Height : ${pokemonData.h}*\n*Weight : ${pokemonData.w}*\n*PokeIndex: ${pokemonData.PokeIndex}*`
        });
    }
}

module.exports = { getPokemon }