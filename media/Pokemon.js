let pokemonData = {};
const getPokemon = async(pokemon)=>{
    let pokemonMessage = pokemon.split(" ");
    let PokemonName = pokemonMessage[1]; 
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${PokemonName}`)
    if(res.status!==200){
        pokemonData = {
            "status":"NotFound"
        }
        console.log("NO such pokemon Found")
    }
    else{
        const data = await fetch(res.url).then(res => res.json());
        pokemonData = {
            "status":"Found",
            "h":data.height,
            "w":data.weight,
            "PokeIndex":data.id,
            "name":data.name,
            "img":data.sprites.front_default,
        }
        return pokemonData;
    }
}

module.exports = {getPokemon}