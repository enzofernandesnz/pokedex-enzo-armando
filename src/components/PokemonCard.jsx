import PokemonImage from './PokemonImage.jsx';
import TypeBadges from './TypeBadges.jsx';
import Stats from './Stats.jsx';
import Icon from './Icon.jsx';
import { number, typeColors, pokemonTypes } from '../utils/pokemon.js';

export default function PokemonCard({ pokemon, favorite, onFavorite, onSelect }) {
  return <article className="pokemon-card" style={{ '--accent': typeColors[pokemonTypes(pokemon)[0].name] }}>
    <div className="card-top"><span className="pokemon-number">{number(pokemon.id)}</span><button className={`icon-button favorite ${favorite ? 'is-favorite' : ''}`} aria-label={`${favorite ? 'Remover' : 'Adicionar'} ${pokemon.name} ${favorite ? 'dos' : 'aos'} favoritos`} aria-pressed={favorite} onClick={() => onFavorite(pokemon.id)}><Icon name="star"/></button></div>
    <button className="card-main" onClick={() => onSelect(pokemon)} aria-label={`Ver detalhes de ${pokemon.name}`}><div className="pokemon-art"><PokemonImage pokemon={pokemon}/></div><h3>{pokemon.name}</h3></button>
    <TypeBadges pokemon={pokemon}/><Stats pokemon={pokemon} compact/>
    <button className="details-link" onClick={() => onSelect(pokemon)}>Ver detalhes <Icon name="arrow" size={16}/></button>
  </article>;
}
