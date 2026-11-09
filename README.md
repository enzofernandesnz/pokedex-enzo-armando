# Pokédex de Kanto

**Atividade 03 — Desenvolvimento e Integração de Aplicações Web**  
**Integrantes: [Enzo Fernandes](https://github.com/enzofernandesnz) e [Armando Schoenstatt](https://github.com/Armando-Schoenstatt)**  
Professor: João Paulo Aramuni

Aplicação educacional em **React + Vite**, com identidade visual própria, que permite explorar os 151 Pokémon e os 12 treinadores do arquivo fornecido pelo professor.

## Como executar

Instale o [Node.js](https://nodejs.org/) 22.12 ou superior (recomendado: versão 24 LTS). Abra um terminal **na pasta que contém o `package.json`** e execute:

```bash
npm install
npm run dev
```

Abra **http://127.0.0.1:5173** no navegador. Se a porta estiver ocupada, o Vite mostrará outro endereço no terminal. Para encerrar, pressione `Ctrl+C` nesse terminal.

Para verificar os testes e gerar a versão de produção:

```bash
npm test
npm run build
npm run preview
```

A prévia de produção fica em **http://127.0.0.1:4173**. Os arquivos compilados ficam em `dist/`. O `index.html` deve ser servido por um servidor HTTP; não basta abri-lo com um duplo clique.

## Funcionalidades

- Catálogo completo com ID, nome, tipos e os seis atributos em cada card.
- Pesquisa instantânea por nome parcial ou ID exato; aceita `25`, `025` e `#025`.
- Filtro por todos os tipos cadastrados no JSON, combinado com a pesquisa.
- Detalhes em modal com barras de atributos, total e treinadores relacionados.
- Consulta dos treinadores, quantidade de insígnias e equipes clicáveis.
- Favoritos persistidos no navegador com `localStorage`.
- Ordenação por ID, nome, HP, ataque, defesa, ataque especial, defesa especial e velocidade.
- Sorteio de Pokémon pelo botão **Surpreenda-me**.
- Temas claro e escuro, com preferência salva no navegador.
- Layout responsivo para computador, tablet e celular.
- Estados vazios, alternativa para imagens indisponíveis, navegação por teclado e modal fechável com `Esc`.

## Fonte de dados

O arquivo original está em **`src/data/pokedex-data.json`**, importado localmente. Os dados da Pokédex não dependem de uma API, servidor de banco de dados ou conexão com a internet durante a consulta.

- [Enunciado da atividade](https://github.com/joaopauloaramuni/desenvolvimento-e-integracao-de-aplicacoes-web/blob/main/ATIVIDADES/ATIVIDADE%2003.md)
- [JSON original do professor](https://github.com/joaopauloaramuni/desenvolvimento-e-integracao-de-aplicacoes-web/blob/main/ATIVIDADES/ATIVIDADE%2003%20-%20JSON/data/pokedex-data.json)

O conteúdo original foi preservado, inclusive particularidades: Mew possui `types: []`, exibido como **Sem tipo informado**, e as equipes de Koga e Lance contêm repetições. Os tipos cadastrados sem Pokémon associados retornam uma mensagem de lista vazia. Nenhuma informação foi completada com suposições.

### Imagens e fontes

As ilustrações são carregadas do [repositório de sprites da PokéAPI](https://github.com/PokeAPI/sprites), no padrão:

```text
https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/{id}.png
```

Não há consultas à API de dados da PokéAPI. Somente imagens externas são utilizadas. As fontes **DM Sans** e **Outfit** vêm do Google Fonts. Imagens e fontes exigem internet; se estiverem indisponíveis, o aplicativo mantém os dados e as funcionalidades, exibindo uma alternativa visual e usando fontes do sistema.

Pokémon e suas imagens pertencem aos respectivos titulares. Projeto educacional sem afiliação oficial.

## Organização

```text
pokedex-react/
├── public/                 # Ícone da aplicação
├── src/
│   ├── components/         # Cabeçalho, busca, filtros, cards, detalhes e treinadores
│   ├── css/index.css       # Estilos responsivos e temas
│   ├── data/               # JSON original do professor
│   ├── hooks/              # Persistência de estado com localStorage
│   ├── utils/pokemon.js    # Busca, filtro, ordenação e associação das equipes
│   ├── App.jsx             # Estados compartilhados e composição das telas
│   └── main.jsx            # Ponto de entrada React
├── tests/pokemon.test.js   # Testes da lógica e integridade dos dados
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## Conceitos de React aplicados

| Conceito | Aplicação |
| --- | --- |
| Componentes funcionais | `Header`, `PokemonCard`, `PokemonList`, `PokemonDetails`, entre outros |
| Props | Dados e callbacks passados de `App` para os componentes |
| `useState` | Pesquisa, filtro, ordenação, navegação e Pokémon selecionado |
| `useEffect` | Aplicação do tema, persistência e ciclo de vida do modal |
| Hook personalizado | `useStoredState` reutilizado para tema e favoritos |
| `map()` | Renderização dos Pokémon, tipos, atributos e equipes |
| Eventos | `onChange`, `onClick`, `onError` e `onCancel` |
| Estado derivado | A lista filtrada é calculada a partir dos filtros ativos |

Os atributos são apresentados conforme os valores do JSON. Nas barras, a escala visual vai de 0 a 255. A ordenação por atributos é decrescente; a ordenação por nome e ID é crescente.

## Verificação manual

Validação realizada: **9 testes automatizados aprovados** e **compilação de produção concluída com sucesso**. A verificação visual automatizada no navegador não foi concluída; use o roteiro abaixo para revisar a apresentação e as interações.

1. Pesquise `Bulba` e confira Bulbasaur. Pesquise `#025` e confira Pikachu.
2. Combine pesquisa com tipos e confira a mensagem quando não houver resultado.
3. Abra um Pokémon, confira os seis atributos e feche com `Esc`.
4. Marque uma estrela, abra Favoritos e recarregue a página para conferir a persistência.
5. Abra Treinadores, encontre Ash e abra um Pokémon da equipe.
6. Alterne o tema, teste a ordenação e o sorteio.
7. Reduza a largura da janela para conferir o layout de celular.

## Publicação e entrega

Repositório da dupla: [pokedex-enzo-armando](https://github.com/enzofernandesnz/pokedex-enzo-armando).

Cada integrante deve entregar no Canvas o **link do mesmo repositório**, conforme o enunciado. As pastas `node_modules` e `dist` são geradas localmente e não fazem parte do controle de versão.

### Como colaborar

Depois de aceitar o convite do GitHub, cada integrante pode clonar o projeto e criar uma branch para uma alteração real:

```bash
git clone https://github.com/enzofernandesnz/pokedex-enzo-armando.git
cd pokedex-enzo-armando
npm install
git switch -c melhoria-descricao-curta
```

Após implementar e revisar a alteração, execute `npm test` e `npm run build`, confira `git diff`, adicione os arquivos alterados com `git add` e crie um commit com uma mensagem descritiva. Envie a branch e abra um pull request pelo GitHub. Cada pessoa deve usar sua própria conta e um e-mail vinculado a ela no Git.

Sugestões de contribuições futuras: comparação de dois Pokémon, revisão de acessibilidade ou novos testes das interações. Essas sugestões não representam contribuições já realizadas.

O professor solicita participação dos dois integrantes em pair programming. Enzo e Armando Schoenstatt devem revisar e executar o projeto juntos, alternando os papéis de quem conduz e quem revisa. Este README não registra sessões ou contribuições que não tenham sido realizadas.

Referências de estudo: [React](https://react.dev/learn) e [Vite](https://vite.dev/guide/).
