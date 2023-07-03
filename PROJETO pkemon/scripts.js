// pegando os elementos que iremos manipular
const pokemonName = document.querySelector('.pokemon-name');
const pokemonNumber = document.querySelector('.pokemon-number');
const pokemonImage = document.querySelector('.pokemon-image');

const form = document.querySelector('form');
const input = document.querySelector('input');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

let pokemonAtual = 1;

// função que irá realizar requisição na API 
async function fetchPokemon(pokemon) {
    // defininado a url de requisição 
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    
    // realizando a requisição com fetch()
    const response = await fetch(url);
    // convertendo os dados da requisição para json()
    const data = await response.json(); 
    
    // retornando o pokemon pesquisado
    return data;
}

// função que irá carregar o pokemon no body 
async function renderPokemon(pokemon) {
    pokemonName.innerText = "Carregando...";
    pokemonNumber.innerText = "";

    const data = await fetchPokemon(pokemon);
    if (data) {
        pokemonName.innerText = data.name;
        pokemonNumber.innerText = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = "";
        pokemonAtual = data.id; 
    } 
    else {
        pokemonImage.style.display = 'none';
        pokemonName.innerText = "Não encontrado :("
    } 
}

// função submit do formulário 
form.addEventListener('submit', (e) => {
    // impede a página de dar o 'refresh'
    e.preventDefault();
    // pegando o valor digitado
    let pokemon = input.value; 
    // passando o valor digitado na função renderPokemon
    renderPokemon(pokemon);
})

//eventos dos botões btnNext e btnPrev
btnPrev.addEventListener('click', () => {
    // se o pokemon atual for maior que 1
    if (pokemonAtual >1) {
        // decrementa a variável pokemon atual
        pokemonAtual--;
        // chama a funação renderPokemon com novo valor de pokemonAtual
        renderPokemon(pokemonAtual);
    }
})

btnNext.addEventListener('click', () => {
    pokemonAtual++;
    renderPokemon(pokemonAtual)
})


renderPokemon(pokemonAtual);