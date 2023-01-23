const pokemonName = document.querySelector('.pokemon__name');
const pokemonId = document.querySelector('.pokemon__id');
const pokemonImg = document.querySelector('.pokemon__img');

const form = document.querySelector('.form');
const input = document.querySelector('.pokemon__search');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIResponse.status === 200) {
        const pokedata = await APIResponse.json();
        return pokedata;
    }
}
const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...';
    pokemonId.innerHTML = '';
    const data = await fetchPokemon(pokemon);
    if (data){
        pokemonImg.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonId.innerHTML = data.id + ' - ';
        pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        searchPokemon = data.id;
    } else {
        pokemonImg.style.display = 'none';
        pokemonName.innerHTML = 'Not Found )='
        pokemonId.innerHTML = '';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

btnPrev.addEventListener('click', () => {
    if (searchPokemon > 1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }    
});

btnNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);