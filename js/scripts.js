//Create a variable to append our array to a IIFE to avoid accessing the global state
let pokemonRepository = (function() {


  // Create an array of objects(pokemons) and assign atributes to them
  let repository = [
      {
      name: " Bulbasaur",
      types: [" grass", " poison "],
      height: 3
    },
    {
      name: " Snorlax",
      types: [" normal", " fighting "],
      height: 8
    },
    {
      name: " Golduck",
      types: [" water", " psychic "],
      height: 5
    },
  ]

  function add(pokemon) { 
    if (typeof pokemon !== 'object') {
      alert('New pokemon has to be an object data type')
    }
		else if (!('name' in pokemon) ||  !('types' in pokemon) || !('height' in pokemon)){
			alert('Object key is not specified')
    } else {repository.push(pokemon)
   }
  };
    //IIFE part with functions getAll and add
  function getAll() {
    return repository;
  }
  function addListItem(pokemon){
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);	
	  button.addEventListener('click', ()=>{
            showDetails(pokemon);
    });
	}

	function showDetails(pokemon){
	console.log(pokemon);
	};

  return {
    getAll: getAll,
    add: add,
	addListItem: addListItem
  };
})();

//Add. function allows you to add new pokemon object
  pokemonRepository.add({name: ' Jynx', types:[' Ice ', ' Psychic '], height: 5});
//Acces to the pokemonList array inside the IIFE
  pokemonRepository.getAll().forEach(function(pokemon) {
	pokemonRepository.addListItem(pokemon);
});
	