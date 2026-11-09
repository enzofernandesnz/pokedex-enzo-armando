import { stats } from '../utils/pokemon.js';

export default function Stats({ pokemon, compact = false }) {
  return <dl className={compact ? 'stats compact' : 'stats'}>{stats.map(([key, label]) => <div className="stat" key={key}>
    <dt>{label}</dt><dd>{pokemon.stats[key]}</dd>
    {!compact && <div className="stat-track" aria-hidden="true"><span style={{ width: `${Math.min(100, pokemon.stats[key] / 255 * 100)}%` }}/></div>}
  </div>)}</dl>;
}
