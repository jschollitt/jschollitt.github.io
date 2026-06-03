const API_BASE = "https://pokeapi.co/api/v2";

window.addEventListener("DOMContentLoaded", () => {
    // ...
    document.querySelector("#ex3button").addEventListener("click", getPokemon);
});

function getPokemon() {
    // starting ID for the random Pokémon to fetch (0-646).
    const offset = random(0, 646);

    // number of Pokemon to fetch. Keep this low to limit impact on the API.
    const limit = 3;

    // Fetch with cache enabled to:
    // 1. Reduce load on the API.
    // 2. Speed up subsequent fetches of the same Pokémon.
    fetch(`${API_BASE}/pokemon?offset=${offset}&limit=${limit}`,
        { cache: "force-cache" })
        .then((response) => {
            // throw error, or return JSON if successful
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response.json();
        })
        .then((data) => {
            data.results.forEach((pokemon) => {
                addPokemon(pokemon);
            });
        })
        .catch((error) => {
            console.error("Failed to fetch Pokémon:", error);
        });
}

function addPokemon(pokemon) {
    console.log("Adding Pokémon:", pokemon);
    
    const name = pokemon.name;
    const urlParts = pokemon.url.split('/');
    const id = urlParts[urlParts.length - 2];

    const container = document.getElementById('ex3content');

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
        loaderWrapper.style.visibility = 'hidden';
    });
    // If the SVG fails, try the PNG version.
    img.addEventListener('error', () => {
        img.onerror = null;
        img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
        loaderWrapper.style.visibility = 'hidden';
    });

    const nameDiv = document.createElement('div');
    nameDiv.className = 'poke-name';
    nameDiv.textContent = name;

    panel.appendChild(loaderWrapper);
    panel.appendChild(img);
    panel.appendChild(nameDiv);

    container.prepend(panel);
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}