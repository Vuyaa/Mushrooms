
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
];

//For loop that adds a different comment depending on the pokemon size
document.write('<ul>')
for (i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height < 5) {
		document.write("<li>")
    document.write(pokemonList[i].name + ": " + pokemonList[i].types + pokemonList[i].height + " meter high <------He is tiny")
    document.write("</li>") 
  }	else if (pokemonList[i].height >= 5 && pokemonList[i].height < 8) {
    document.write("<li>")
    document.write(pokemonList[i].name + ": " + pokemonList[i].types + pokemonList[i].height + " meter high <------Just a normal sized pokemon")
    document.write("</li>")
  } else  {
		document.write("<li>")
    document.write(pokemonList[i].name + ": " + pokemonList[i].types + pokemonList[i].height + " meter high <------This one is enormous")
    document.write("</li>")
  };
}
document.write('</ul>')

