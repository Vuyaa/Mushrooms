//Create a variable to append our array to a IIFE to avoid accessing the global state
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    if (typeof pokemon !== "object") {
      console.log("New pokemon has to be an object data type");
    } else {
      pokemonList.push(pokemon);
    }
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".list-group");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    listpokemon.appendChild(button);
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#pokemon-modal");
    button.classList.add("btn", "btn-primary");
    pokemonList.appendChild(listpokemon);
    button.addEventListener("click", () => {
      showDetails(pokemon);
    });
  }

  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl)
      .then((response) => {
        hideLoadingMessage();
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
          console.log(pokemon);
        });
      })
      .catch(function (e) {
        hideLoadingMessage();
        console.error(e);
      });
  }

  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url)
      .then((response) => {
        hideLoadingMessage();
        return response.json();
      })
      .then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types.map((type) => type.type.name).join(",");
      })
      .catch(function (e) {
        hideLoadingMessage();
        console.error(e);
      });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      // console.log(pokemon);
      showModal(pokemon);
    });
  }

  function showModal(pokemon) {
    /* eslint-disable */
    let modalBody = $(".modal-body"),
      modalTitle = $(".modal-title");

    modalTitle.empty(), modalBody.empty();

    let pokemonImg = $('<img class="modal-img">');
    pokemonImg.attr("src", pokemon.imageUrl);
    let pokemonHeight = $("<p>Height: " + pokemon.height + "</p>"),
      pokemonTypes = $("<p>Types:" + pokemon.types + "</p>");
    modalTitle.append(pokemon.name),
      modalBody.append(pokemonImg),
      modalBody.append(pokemonHeight),
      modalBody.append(pokemonTypes);
  } /* eslint-enable */

  //IIFE part with functions getAll and add

  function showLoadingMessage() {
    console.log("Loading...");
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
    showDetails: showDetails,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
