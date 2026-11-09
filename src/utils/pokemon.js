export const stats = [
  ['hp', 'HP'], ['attack', 'Ataque'], ['defense', 'Defesa'],
  ['specialAttack', 'Ataque especial'], ['specialDefense', 'Defesa especial'], ['speed', 'Velocidade'],
];

export const typeColors = {
  Typeless: '#667085', Normal: '#77745e', Fire: '#c44c22', Water: '#3272be',
  Grass: '#337c49', Electric: '#927000', Ice: '#257d8c', Fighting: '#ad463d',
  Poison: '#9650a3', Ground: '#957027', Flying: '#6b63ad', Psychic: '#c03e78',
  Bug: '#647a23', Rock: '#817139', Ghost: '#69538f', Dark: '#66564e',
  Dragon: '#6650ba', Steel: '#567b87',
};

export const number = (id) => `#${String(id).padStart(3, '0')}`;
export const pokemonTypes = (pokemon) => pokemon.types.length ? pokemon.types : [{ id: 0, name: 'Typeless' }];

// Nome parcial e ID exato (aceita também #025 e 025), combinados com os demais filtros.
export function filterPokemon(pokemon, { query = '', type = 'all', favoritesOnly = false, favorites = [], sort = 'id' } = {}) {
  const term = query.trim().toLocaleLowerCase('pt-BR');
  const numeric = /^#?\d+$/.test(term);
  return pokemon.filter((item) => {
    const matchesQuery = !term || (numeric ? item.id === Number(term.replace('#', '')) : item.name.toLocaleLowerCase('pt-BR').includes(term));
    const matchesType = type === 'all' || pokemonTypes(item).some((entry) => String(entry.id) === String(type));
    return matchesQuery && matchesType && (!favoritesOnly || favorites.includes(item.id));
  }).sort((a, b) => {
    if (sort === 'name') return a.name.localeCompare(b.name, 'pt-BR');
    if (sort === 'id') return a.id - b.id;
    return (b.stats[sort] - a.stats[sort]) || a.id - b.id;
  });
}

// Mantém inclusive repetições presentes na equipe do arquivo original.
export function trainerTeam(trainer, pokemon) {
  return trainer.pokemonIds.map((id) => pokemon.find((item) => item.id === id)).filter(Boolean);
}
