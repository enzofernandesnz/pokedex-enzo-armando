import test from 'node:test';
import assert from 'node:assert/strict';
import data from '../src/data/pokedex-data.json' with { type: 'json' };
import { filterPokemon, pokemonTypes, trainerTeam, stats } from '../src/utils/pokemon.js';

test('dados originais: 151 Pokémon únicos, atributos completos e relações válidas', () => {
  assert.equal(data.pokemon.length, 151);
  assert.equal(new Set(data.pokemon.map((p) => p.id)).size, 151);
  assert.equal(data.trainers.length, 12);
  for (const p of data.pokemon) for (const [key] of stats) assert.ok(Number.isFinite(p.stats[key]));
  for (const t of data.trainers) assert.equal(trainerTeam(t, data.pokemon).length, t.pokemonIds.length);
});
test('pesquisa por nome parcial ignora espaços e maiúsculas', () => {
  assert.deepEqual(filterPokemon(data.pokemon, { query: ' BULBA ' }).map((p) => p.id), [1]);
});
test('ID exato aceita prefixo e zeros, sem confundir 25 com 125', () => {
  for (const query of ['25', '#025', '025']) assert.deepEqual(filterPokemon(data.pokemon, { query }).map((p) => p.id), [25]);
});
test('busca e tipo são combinados e contemplam o segundo tipo', () => {
  assert.deepEqual(filterPokemon(data.pokemon, { query: 'Bulba', type: '8' }).map((p) => p.id), [1]);
  assert.equal(filterPokemon(data.pokemon, { query: 'Bulba', type: '2' }).length, 0);
});
test('nenhum resultado e tipo sem representantes não causam erro', () => {
  assert.equal(filterPokemon(data.pokemon, { query: 'inexistente' }).length, 0);
  assert.equal(filterPokemon(data.pokemon, { type: '15' }).length, 0);
});
test('Mew preserva o dado sem tipo e pode ser encontrado pelo filtro', () => {
  assert.deepEqual(data.pokemon.find((p) => p.id === 151).types, []);
  assert.equal(pokemonTypes(data.pokemon[150])[0].id, 0);
  assert.deepEqual(filterPokemon(data.pokemon, { type: '0' }).map((p) => p.id), [151]);
});
test('favoritos são combinados com pesquisa e tipo', () => {
  assert.deepEqual(filterPokemon(data.pokemon, { favoritesOnly: true, favorites: [25, 6], type: '5' }).map((p) => p.id), [25]);
  assert.equal(filterPokemon(data.pokemon, { favoritesOnly: true }).length, 0);
});
test('ordenação de todos os atributos é decrescente e não altera a origem', () => {
  const before = JSON.stringify(data.pokemon);
  for (const [key] of stats) {
    const sorted = filterPokemon(data.pokemon, { sort: key });
    assert.ok(sorted.every((p, index) => !index || sorted[index - 1].stats[key] >= p.stats[key]));
  }
  assert.equal(filterPokemon(data.pokemon, { sort: 'name' })[0].name, 'Abra');
  assert.equal(JSON.stringify(data.pokemon), before);
});
test('equipes mantêm as repetições do arquivo fornecido', () => {
  assert.deepEqual(trainerTeam(data.trainers.find((t) => t.name === 'Koga'), data.pokemon).map((p) => p.id), [48, 48, 48, 49]);
});
