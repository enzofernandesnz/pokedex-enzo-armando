import { pokemonTypes, typeColors } from '../utils/pokemon.js';

export default function TypeBadges({ pokemon }) {
  return <div className="types">{pokemonTypes(pokemon).map((type) => <span key={type.id} className="type-badge" style={{ '--type-color': typeColors[type.name] || typeColors.Typeless }}>{type.name === 'Typeless' ? 'Sem tipo informado' : type.name}</span>)}</div>;
}
