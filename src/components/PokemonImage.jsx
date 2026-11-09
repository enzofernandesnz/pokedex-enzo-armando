import { useState } from 'react';

export default function PokemonImage({ pokemon, eager = false }) {
  const [failed, setFailed] = useState(false);
  return failed
    ? <div className="image-fallback" role="img" aria-label={`Imagem de ${pokemon.name} indisponível`}><span className="pokeball"/><small>Imagem indisponível</small></div>
    : <img className="pokemon-image" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`} alt={pokemon.name} loading={eager ? 'eager' : 'lazy'} width="240" height="240" onError={() => setFailed(true)} />;
}
