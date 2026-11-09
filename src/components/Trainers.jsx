import { useState } from 'react';
import { trainerTeam, number } from '../utils/pokemon.js';
import PokemonImage from './PokemonImage.jsx';
import Icon from './Icon.jsx';

export default function Trainers({ trainers, pokemon, onSelect }) {
  const [query, setQuery] = useState('');
  const visible = trainers.filter((trainer) => trainer.name.toLowerCase().includes(query.trim().toLowerCase()));
  return <section><div className="section-heading"><div><span className="eyebrow">PESSOAS & EQUIPES</span><h2>Os treinadores de Kanto<span>.</span></h2><p className="muted">Conheça suas insígnias e os Pokémon que os acompanham.</p></div><span className="count-pill">{trainers.length} treinadores</span></div>
    <div className="search-box trainer-search"><Icon name="search"/><label className="sr-only" htmlFor="trainer-search">Pesquisar treinador</label><input id="trainer-search" type="search" placeholder="Pesquisar treinador..." value={query} onChange={(event) => setQuery(event.target.value)}/></div>
    <div className="trainer-grid">{visible.map((trainer) => <article className="trainer-card" key={trainer.id}><div className="trainer-header"><span className="trainer-avatar">{trainer.name.split(' ').map((word) => word[0]).slice(0, 2).join('')}</span><div><h3>{trainer.name}</h3><span className="muted">{trainer.badges} {trainer.badges === 1 ? 'insígnia' : 'insígnias'} conquistadas</span></div></div><div className="trainer-team">{trainerTeam(trainer, pokemon).map((item, index) => <button key={`${item.id}-${index}`} onClick={() => onSelect(item)} aria-label={`Ver detalhes de ${item.name}, da equipe de ${trainer.name}`}><PokemonImage pokemon={item}/><span>{item.name}</span><small>{number(item.id)}</small></button>)}</div></article>)}</div>
    {!visible.length && <div className="empty-state"><h3>Nenhum treinador encontrado</h3><button className="primary-button" onClick={() => setQuery('')}>Limpar pesquisa</button></div>}
  </section>;
}
