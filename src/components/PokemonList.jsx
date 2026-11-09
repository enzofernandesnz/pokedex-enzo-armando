import PokemonCard from './PokemonCard.jsx';
import Icon from './Icon.jsx';

export default function PokemonList({ pokemon, favorites, onFavorite, onSelect, onReset, favoritesOnly }) {
  if (!pokemon.length) return <div className="empty-state"><Icon name="search" size={38}/><h2>{favoritesOnly && !favorites.length ? 'Sua coleção começa aqui' : 'Nenhum Pokémon encontrado'}</h2><p>{favoritesOnly && !favorites.length ? 'Toque na estrela de um Pokémon para guardá-lo nos favoritos.' : 'Tente outro nome, número ou tipo para continuar explorando.'}</p><button className="primary-button" onClick={onReset}>{favoritesOnly && !favorites.length ? 'Explorar Pokémon' : 'Limpar filtros'}</button></div>;
  return <div className="pokemon-grid">{pokemon.map((item) => <PokemonCard key={item.id} pokemon={item} favorite={favorites.includes(item.id)} onFavorite={onFavorite} onSelect={onSelect}/>)}</div>;
}
