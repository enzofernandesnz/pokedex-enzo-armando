import { useEffect, useRef } from 'react';
import PokemonImage from './PokemonImage.jsx';
import TypeBadges from './TypeBadges.jsx';
import Stats from './Stats.jsx';
import Icon from './Icon.jsx';
import { number, pokemonTypes, typeColors } from '../utils/pokemon.js';

export default function PokemonDetails({ pokemon, trainers, favorite, onFavorite, onClose }) {
  const dialogRef = useRef(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    const oldOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => { dialog.close(); document.body.style.overflow = oldOverflow; previousFocus?.focus(); };
  }, []);
  const owners = trainers.filter((trainer) => trainer.pokemonIds.includes(pokemon.id));
  return <dialog className="details-dialog" ref={dialogRef} aria-labelledby="detail-title" onCancel={(event) => { event.preventDefault(); onClose(); }} onClick={(event) => { if (event.target === dialogRef.current) onClose(); }}>
    <div className="detail-content" style={{ '--accent': typeColors[pokemonTypes(pokemon)[0].name] }}>
      <button className="icon-button close-button" onClick={onClose} aria-label="Fechar detalhes" autoFocus><Icon name="close"/></button>
      <div className="detail-visual"><span className="eyebrow">ARQUIVO POKÉDEX • {number(pokemon.id)}</span><PokemonImage key={pokemon.id} pokemon={pokemon} eager/><h2 id="detail-title">{pokemon.name}</h2><TypeBadges pokemon={pokemon}/></div>
      <div className="detail-info"><h3>Atributos base</h3><p className="muted">Conheça os pontos fortes deste Pokémon.</p><Stats pokemon={pokemon}/><div className="stat-total"><span>Total de atributos</span><strong>{Object.values(pokemon.stats).reduce((sum, value) => sum + value, 0)}</strong></div>
      <h3>Treinadores relacionados</h3><p className="muted">{owners.length ? owners.map((trainer) => trainer.name).join(' • ') : 'Nenhum treinador relacionado nos dados.'}</p>
      <button className="primary-button" aria-pressed={favorite} onClick={() => onFavorite(pokemon.id)}><Icon name="star" size={18}/>{favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}</button></div>
    </div>
  </dialog>;
}
