//Create a variable to append our array to a IIFE to avoid accessing the global state
let pokemonRepository = (function (){
	

	// Create an array of objects(pokemons) and assign atributes to them
	let pokemonList = [
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
	
	//IIFE part with functions getAll and add
	function getAll() {
		return pokemonList;
	}
	
  function add(pokemon){
  
    if (typeof pokemon !== 'object'){
      alert ('New pokemon has to be an object data type')
    }
    else pokemonList.push(pokemon)
	}
	
return{
	getAll:getAll,
	add: add
}
})()
	
	document.write('<ul>')
//Acces to the pokemonList array inside the IIFE
  pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.add(pokemon)
	
//whole If-else statement has to be in its own {}curly parenthesis !!without semicolons!!
//each action within the statements has to be in its own curly parentesis eg. if (//parameters) {}
	   if (pokemon.height < 5) {
     
			document.write("<li>")
		 document.write(pokemon.name + ": " + pokemon.types + pokemon.height + " meter high <------He is tiny")    
		 document.write("</li>") 
     
		}	else if (pokemon.height >= 5 && pokemon.height < 8) {
	
      document.write("<li>")
			document.write(pokemon.name + ": " + pokemon.types + pokemon.height + " meter high <------Just a normal sized pokemon")
			document.write("</li>")

    } else  {
			document.write("<li>")
			document.write(pokemon.name + ": " + pokemon.types + pokemon.height + " meter high <------This one is enormous")
		 document.write("</li>")
		}
		});

	document.write('</ul>')