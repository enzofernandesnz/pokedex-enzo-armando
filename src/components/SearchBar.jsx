import Icon from './Icon.jsx';
import { stats } from '../utils/pokemon.js';

export default function SearchBar({ query, onQuery, sort, onSort }) {
  return <div className="search-row"><div className="search-box"><Icon name="search"/>
    <label className="sr-only" htmlFor="pokemon-search">Pesquisar por nome ou ID</label>
    <input id="pokemon-search" type="search" placeholder="Qual Pokémon você procura? Nome ou número..." value={query} onChange={(event) => onQuery(event.target.value)}/>
  </div><div className="sort-box"><label htmlFor="pokemon-sort">Ordenar por</label><select id="pokemon-sort" value={sort} onChange={(event) => onSort(event.target.value)}>
    <option value="id">Número ↑</option><option value="name">Nome A–Z</option>
    {stats.map(([key, label]) => <option key={key} value={key}>{label} ↓</option>)}
  </select></div></div>;
}
