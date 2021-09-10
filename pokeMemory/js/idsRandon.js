/**
 * ? this code is for to generator random ids and not repeat 
 * ? if there other form of does , change it 
 */

export default () => {
  const idPokemon = [];
  while (idPokemon.length<=5) {
    const idRandon = Math.ceil(Math.random()*25);
    if (!idPokemon.includes(idRandon)) idPokemon.push(idRandon);
  }
  return idPokemon;
};