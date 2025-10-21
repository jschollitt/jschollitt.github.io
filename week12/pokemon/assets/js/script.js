const P = new Pokedex.Pokedex();

const pokeOptions = {
    protocol: "http",
    hostname: "127.0.0.1:5500",
    versionPath: "/api/v2",
    cache: true,
    timeout: 60 * 1000,
    cacheImages: true
}

window.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#ex3button").addEventListener("click", () => {
        getPokemon();
    });
})

function setLoading(element, show) {
    $(element).css("visibility", show ? "visible" : "hidden");
}

function getPokemon() {
    const interval = {
        offset: random(0, 646),
        limit: 3
    };
    P.getPokemonsList(interval).then(function (response) {
        response.results.forEach((pokemon) => {
            addPokemon(pokemon);
        });
    })
}

/**
 * JQuery version of the addPokemon function
 * @param {Pokemon} pokemon 
 */
// function addPokemon(pokemon) {
//     console.log(pokemon);
//     let name = pokemon.name;
//     let url = pokemon.url.split('/');
//     let id = url[url.length - 2];
//     console.log(id);
//     $('#ex3content')
//         .prepend($('<div class="row"></div>')
//             .append($('<div class="poke-panel"></div>')
//                 .append($('<div class="poke-loader"></div>')
//                     .append($('<span class="loader"></span>')
//                     )
//                 ).append($('<img class="poke-icon"></img>')
//                     .attr('src', `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`)
//                     .on('load', function () {
//                         console.log($(this));
//                         $(this).siblings('.poke-loader').css("visibility", "hidden");
//                     })
//                 ).append($('<div class="poke-name"></div>')
//                     .text(name)
//                 )
//             )
//         );
// }

function addPokemon(pokemon) {
    console.log(pokemon);

    const name = pokemon.name;
    const urlParts = pokemon.url.split('/');
    const id = urlParts[urlParts.length - 2];
    console.log(id);

    const container = document.getElementById('ex3content');

    // Create the elements
    const row = document.createElement('div');
    row.className = 'row';

    const panel = document.createElement('div');
    panel.className = 'poke-panel';

    const loaderWrapper = document.createElement('div');
    loaderWrapper.className = 'poke-loader';

    const loader = document.createElement('span');
    loader.className = 'loader';
    loaderWrapper.appendChild(loader);

    const img = document.createElement('img');
    img.className = 'poke-icon';
    img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;

    img.addEventListener('load', () => {
        console.log(img);
        loaderWrapper.style.visibility = 'hidden';
    });

    const nameDiv = document.createElement('div');
    nameDiv.className = 'poke-name';
    nameDiv.textContent = name;

    // Compose the structure
    panel.appendChild(loaderWrapper);
    panel.appendChild(img);
    panel.appendChild(nameDiv);
    row.appendChild(panel);

    // Prepend to container (insert at top)
    container.insertBefore(row, container.firstChild);
}


function random(min, max) {
    return Math.random() * (Math.abs(min) + max) + min;
}