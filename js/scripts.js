
let pokemonList = [
  { name: " Bulbasaur", types: [" grass", " poison "], height: 3 },
  { name: " Snorlax", types: [" normal", " fighting " ], height: 8 },
  { name: " Golduck", types: [" water", " psychic "], height: 5 },
];
	for (i = 0 ; i < pokemonList.length; i++)
 
			if (pokemonList[i].height < 5 ){
			document.write(pokemonList[i].name + ": " + pokemonList[i].types + pokemonList[i].height + " meter high <------He is tiny" + "<br>")
    }
				else if (pokemonList[i].height >=5 && pokemonList[i].height < 8 )
			{
			document.write(pokemonList[i].name + ": " + pokemonList[i].types + pokemonList[i].height + " meter high <------Just a normal sized pokemon" + "<br>")
		}
				else
			{
			document.write(pokemonList[i].name + ": " + pokemonList[i].types + pokemonList[i].height + " meter high <------This one is enormous" +  "<br>")
    };
		