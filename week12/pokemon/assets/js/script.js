const P = new Pokedex.Pokedex();

const pokeOptions = {
    protocol: "http",
    hostname: "127.0.0.1:5500",
    versionPath: "/api/v2",
    cache: true,
    timeout: 60 * 1000,
    cacheImages: true
}

$('document').ready(function () {
    $('#ex3button').click(function (e) {
        getPokemon();
    });
});

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

function addPokemon(pokemon) {
    console.log(pokemon);
    let name = pokemon.name;
    let url = pokemon.url.split('/');
    let id = url[url.length - 2];
    console.log(id);
    $('#ex3content')
        .prepend($('<div class="row"></div>')
            .append($('<div class="poke-panel"></div>')
                .append($('<div class="poke-loader"></div>')
                    .append($('<span class="loader"></span>')
                    )
                ).append($('<img class="poke-icon"></img>')
                    .attr('src', `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`)
                    .on('load', function () {
                        console.log($(this));
                        $(this).siblings('.poke-loader').css("visibility", "hidden");
                    })
                ).append($('<div class="poke-name"></div>')
                    .text(name)
                )
            )
        );
}

function random(min, max) {
    return Math.random() * (Math.abs(min) + max) + min;
}