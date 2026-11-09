import Icon from './Icon.jsx';

export default function Header({ view, onView, theme, onTheme, favoriteCount }) {
  return <header className="header"><div className="header-inner">
    <a className="brand" href="#" onClick={(event) => { event.preventDefault(); onView('pokedex'); }} aria-label="Pokédex, início"><span className="pokeball"/>poké<span className="brand-light">dex</span><span className="edition">KANTO</span></a>
    <nav aria-label="Navegação principal">
      <button className={view === 'pokedex' ? 'nav active' : 'nav'} onClick={() => onView('pokedex')} aria-current={view === 'pokedex' ? 'page' : undefined}>Explorar</button>
      <button className={view === 'favorites' ? 'nav active' : 'nav'} onClick={() => onView('favorites')} aria-current={view === 'favorites' ? 'page' : undefined}><Icon name="star" size={17}/>Favoritos <span className="nav-count">{favoriteCount}</span></button>
      <button className={view === 'trainers' ? 'nav active' : 'nav'} onClick={() => onView('trainers')} aria-current={view === 'trainers' ? 'page' : undefined}><Icon name="users" size={17}/>Treinadores</button>
    </nav>
    <button className="icon-button theme-button" onClick={onTheme} aria-label={theme === 'light' ? 'Ativar tema escuro' : 'Ativar tema claro'}><Icon name={theme === 'light' ? 'moon' : 'sun'}/></button>
  </div></header>;
}
