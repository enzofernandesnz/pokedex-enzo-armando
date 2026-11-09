import { typeColors } from '../utils/pokemon.js';

export default function Filters({ types, selected, onSelect }) {
  return <div className="filters" role="group" aria-label="Filtrar por tipo"><button className={selected === 'all' ? 'filter selected' : 'filter'} aria-pressed={selected === 'all'} onClick={() => onSelect('all')}>Todos os tipos</button>
    {types.map((type) => <button key={type.id} className={selected === String(type.id) ? 'filter selected' : 'filter'} aria-pressed={selected === String(type.id)} onClick={() => onSelect(String(type.id))}><span className="type-dot" style={{ background: typeColors[type.name] }}/>{type.name === 'Typeless' ? 'Sem tipo' : type.name}</button>)}
  </div>;
}
