import { useEffect, useState } from 'react';
import data from './data/pokedex-data.json';
import { filterPokemon } from './utils/pokemon.js';
import useStoredState from './hooks/useStoredState.js';
import Header from './components/Header.jsx';
import SearchBar from './components/SearchBar.jsx';
import Filters from './components/Filters.jsx';
import PokemonList from './components/PokemonList.jsx';
import PokemonDetails from './components/PokemonDetails.jsx';
import PokemonImage from './components/PokemonImage.jsx';
import Trainers from './components/Trainers.jsx';
import Icon from './components/Icon.jsx';

export default function App() {
  const [view, setView] = useState('pokedex');
  const [query, setQuery] = useState('');
  const [type, setType] = useState('all');
  const [sort, setSort] = useState('id');
  const [selected, setSelected] = useState(null);
  const [favorites, setFavorites] = useStoredState('pokedex-favorites', [], (value) => Array.isArray(value) && value.every((id) => Number.isInteger(id) && data.pokemon.some((p) => p.id === id)) && new Set(value).size === value.length);
  const [theme, setTheme] = useStoredState('pokedex-theme', 'light', (value) => ['light', 'dark'].includes(value));
  useEffect(() => { document.documentElement.dataset.theme = theme; }, [theme]);

  // A lista é derivada dos estados, sem duplicar os dados originais.
  const filtered = filterPokemon(data.pokemon, { query, type, sort, favorites, favoritesOnly: view === 'favorites' });
  function toggleFavorite(id) { setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]); }
  function clearFilters() { setQuery(''); setType('all'); setSort('id'); }
  function navigate(nextView) { setView(nextView); clearFilters(); }
  function randomPokemon() { setSelected(data.pokemon[Math.floor(Math.random() * data.pokemon.length)]); }

  return <><a href="#main" className="skip-link">Pular para o conteúdo</a><Header view={view} onView={navigate} theme={theme} onTheme={() => setTheme((current) => current === 'light' ? 'dark' : 'light')} favoriteCount={favorites.length}/>
    <main id="main" className="main-container">
      {view === 'pokedex' && <section className="hero"><div className="hero-copy"><span className="eyebrow"><span className="live-dot"/> GUIA DE CAMPO • REGIÃO DE KANTO</span><h1>Grandes aventuras.<br/><span>151 descobertas.</span></h1><p>Todo Pokémon tem uma história.<br/>Encontre seus favoritos e conheça cada detalhe.</p><button className="primary-button" onClick={randomPokemon}><Icon name="shuffle" size={18}/>Surpreenda-me</button><div className="hero-meta"><span><strong>{data.pokemon.length}</strong> Pokémon</span><span><strong>{data.trainers.length}</strong> treinadores</span><span><strong>01</strong> região</span></div></div><div className="hero-visual"><div className="hero-orbit"/><span className="hero-number">025</span><div className="hero-pikachu"><PokemonImage pokemon={data.pokemon.find((p) => p.id === 25)} eager/></div><div className="hero-caption"><span className="electric-dot"/>PIKACHU <span>• Electric</span></div><span className="hero-note">Seu próximo encontro começa aqui.</span></div></section>}
      {view === 'trainers' ? <Trainers trainers={data.trainers} pokemon={data.pokemon} onSelect={setSelected}/> : <section className="catalog" aria-label={view === 'favorites' ? 'Pokémon favoritos' : 'Catálogo de Pokémon'}><div className="section-heading"><div><span className="eyebrow">{view === 'favorites' ? 'SUA COLEÇÃO' : 'EXPLORE A COLEÇÃO'}</span><h2>{view === 'favorites' ? 'Meus favoritos' : 'Encontre seu Pokémon'}<span>.</span></h2></div><span className="count-pill">{view === 'favorites' ? favorites.length : data.pokemon.length} Pokémon</span></div>
        <SearchBar query={query} onQuery={setQuery} sort={sort} onSort={setSort}/><Filters types={data.types} selected={type} onSelect={setType}/>
        <div className="results-bar"><span role="status">{filtered.length} {filtered.length === 1 ? 'Pokémon encontrado' : 'Pokémon encontrados'}</span>{(query || type !== 'all') && <button onClick={clearFilters}>Limpar filtros <Icon name="close" size={14}/></button>}</div>
        <PokemonList pokemon={filtered} favorites={favorites} onFavorite={toggleFavorite} onSelect={setSelected} favoritesOnly={view === 'favorites'} onReset={() => { clearFilters(); if (view === 'favorites' && !favorites.length) navigate('pokedex'); }}/>
      </section>}
    </main><footer><div><span className="footer-brand"><span className="pokeball"/>Pokédex de Kanto</span><span>Atividade 03 • React + Vite</span></div><p>Integrantes: <strong>Enzo Fernandes</strong> e <strong>Armando Schoenstatt</strong></p><small>Projeto educacional. Pokémon e seus personagens pertencem aos respectivos titulares.</small></footer>
    {selected && <PokemonDetails pokemon={selected} trainers={data.trainers} favorite={favorites.includes(selected.id)} onFavorite={toggleFavorite} onClose={() => setSelected(null)}/>}
  </>;
}
