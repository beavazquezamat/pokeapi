const ol$$ = document.querySelector('#pokedex');
let results = [];
let personajesMapeados = [];

const getCharacters = async () => {
  for (let i = 1; i <= 150; i++) {
    let url = "https://pokeapi.co/api/v2/pokemon/" + i;
    const response = await fetch(url);
    const data = await response.json();
    results.push(data);
  }
  return results;
};

const mapCharacters = (unmappedCharacters) => {
  return unmappedCharacters.map((pokemon) => ({
    name: pokemon.name,
    image: pokemon.sprites['front_default'],
    type: pokemon.types.map((type) => type.type.name).join(', '),
    id: pokemon.id
  }));

};



const showCharacters = (pokemons) => {
  for (const pokemon of pokemons) {
    let pokemonDiv$ = document.createElement("div");
    pokemonDiv$.className = "card";
    ol$$.appendChild(pokemonDiv$);

    let pokemonName$ = document.createElement("h2");
    pokemonName$.textContent = pokemon.name;
    pokemonName$.className = "card-title";
    pokemonDiv$.appendChild(pokemonName$);

    let pokemonId$ = document.createElement("h2");
    pokemonId$.textContent = "ID: " + pokemon.id;
    pokemonId$.className = "card-id";
    pokemonDiv$.appendChild(pokemonId$);

    let pokemonType$ = document.createElement("h2");
    pokemonType$.textContent = pokemon.type;
    pokemonType$.className = "card-type";
    pokemonDiv$.appendChild(pokemonType$);
    
    let pokemonImage$ = document.createElement("img");
    pokemonImage$.setAttribute("src", pokemon.image);
    pokemonImage$.setAttribute("alt", pokemon.name);
    pokemonDiv$.appendChild(pokemonImage$);
  }
};

const drawInput = (mappedCharacters) => {
  document.getElementById("buscador").hidden = false;
  document.getElementById("buscadorButton").hidden = false;

  // conseguir que la pagina no filtre solo sino solo cuano hacemos click nosotros
  document.getElementById("buscadorButton").onclick = enviarInfoAlBuscador;
  personajesMapeados = mappedCharacters;
};

function enviarInfoAlBuscador(){
  searchCharacters(personajesMapeados, document.getElementById("buscador").value);
}

const searchCharacters = (array, filter) => {
  console.log('filter', filter);
  console.log('characters', array);
  let filteredCharacters = array.filter((character) =>
    // con includes, el filtro obtiene todos los registros que contengan el texto introducido
    character.name.toLowerCase().includes(filter.toLowerCase())

    // con includes, el filtro obtiene todos los registros que SEAN IGUAL al texto introducido
    // character.name.toLowerCase() == filter.toLowerCase()
  );
  console.log(filteredCharacters);
  document.getElementById('pokedex').innerHTML = "";
  showCharacters(filteredCharacters);
};

const init = async () => {
    const unmappedCharacters = await getCharacters();
    const mappedCharacters = mapCharacters(unmappedCharacters);
    showCharacters(mappedCharacters);
    drawInput(mappedCharacters);
    
};

init();