

import idsRandon from "./idsRandon.js";

export default async () => {
  const ids = idsRandon();
  let pokemons = [];
  let pokemonAll = [];
  let pokemonClone = [];
  let pokemonRandom = [];
  let key = 0;

  for (const id of ids) {
    key++;
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await res.json();
      if (!res.ok) throw new Error("error al comunicarse con la api");
      const pokemon = {
        name: data.name,
        avatar: data.sprites.other.dream_world.front_default,
        id: key,
      };
      pokemons = [...pokemons, pokemon];
      pokemonClone = [
        ...pokemonClone,
        {
          name: data.name,
          avatar: data.sprites.other.dream_world.front_default,
          id: key + 6
        }
      ];
    } catch (error) {
      console.log(error);
    }
  }
  
  pokemonAll = [...pokemons, ...pokemonClone];
  
/*   while (pokemonAll.length > 0) {
    const randon = Math.ceil(Math.random() * (pokemonAll.length - 1));
    const pokemon = pokemonAll.splice(randon, 1);
    pokemonRandom.push(pokemon[0]);
  } */

  pokemonRandom = pokemonAll.sort( () => .5 - Math.random() );

  return pokemonRandom;
};
