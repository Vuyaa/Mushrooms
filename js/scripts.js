//Create a variable to append our array to a IIFE to avoid accessing the global state
let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let pokemonListElement = document.querySelector('.pokemon-list');


  function add(pokemon) {
    if (
      typeof pokemon !== 'object') {
      console.log('New pokemon has to be an object data type')
    } else {
      pokemonList.push(pokemon);
    }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    button.addEventListener('click', () => {
      showDetails(pokemon);
    });
  };

  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl).then(response => {
      hideLoadingMessage();
      return response.json();
    }).then(function(json) {
      json.results.forEach(function(item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        console.log(pokemon);
      });
    }).catch(function(e) {
      hideLoadingMessage()
      console.error(e);
    });
  };

  function loadDetails(item) {
    showLoadingMessage()
    let url = item.detailsUrl;
    return fetch(url).then(response => {
      hideLoadingMessage();
      return response.json();
    }).then(function(details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types.map((type) => type.type.name).join(',');
    }).catch(function(e) {
      hideLoadingMessage()
      console.error(e);
    });
  }

  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function() {
      showModal(pokemon);
      //console.log(item);
    });
  };

  let modalContainer = document.querySelector('.modal-container');

  function showModal(pokemon) {
    modalContainer.innerText = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close')
    closeButtonElement.innerText = 'X';
    closeButtonElement.addEventListener('click', hideModal);

    let title = document.createElement('h1');
    title.innerText = pokemon.name;

    let pokemonHeight = document.createElement('p');
    pokemonHeight.innerText = "Height: " + pokemon.height;

    let pokemonTypes = document.createElement('p');
    pokemonTypes.innerText = "Type: " + pokemon.types;

    let pokemonImage = document.createElement('img');
    pokemonImage.src = pokemon.imageUrl;
    pokemonImage.setAttribute("alt", "Pokemon image");

    //We append each variable(child) to its parent(modal)
    modal.appendChild(title);
    modal.appendChild(closeButtonElement);
    modal.appendChild(pokemonImage);
    modal.appendChild(pokemonHeight);
    modal.appendChild(pokemonTypes);
    //now we append append modal(child) to its parent (modalContainer)
    modalContainer.appendChild(modal);

    modalContainer.addEventListener('click', (e) => {
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    })

    modalContainer.classList.add('is-visible');
  }


  function hideModal() {
    let modalContainer = document.querySelector('.modal-container');
    // to hide modal we need to make class designed in CSS 'inactive'
    modalContainer.classList.remove('is-visible');
  }
  //using ESC close modal and the function expression checks if we removed 'is-visible class' if true than open modal else call function "hideModal"
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });


  //IIFE part with functions getAll and add



  function showLoadingMessage() {
    console.log("Loading...")
  }

  function hideLoadingMessage() {
    console.log("");
  }



  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});