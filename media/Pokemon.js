let pokemonData = {};
const getPokemon = async(pokemon)=>{
    let pokemonMessage = pokemon.split(" ");
    let PokemonName = pokemonMessage[1]; 
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${PokemonName}`)
    if (res.status !== 200) {
        return { "status": "NotFound" };
    }
    else{
        const data = await fetch(res.url).then(res => res.json());
        pokemonData = {
            "status":"Found",
            "h":data.height,
            "w":data.weight,
            "PokeIndex":data.id,
            "name":data.name,
            "img":`https://img.pokemondb.net/artwork/large/${data.name}.jpg`,
        }
        return pokemonData;
    }
}

module.exports = {getPokemon}