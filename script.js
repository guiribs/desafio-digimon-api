const inputBusca = document.getElementById('search-input');
const botaoBusca = document.getElementById('search-button');
const listaDigimon = document.getElementById('digimon-list');
const carregando = document.getElementById('spinner');
let todosOsDigimons = [];

async function buscarTodosOsDigimons() {
    try {
        carregando.style.display = 'block';
        const resposta = await fetch('https://digimon-api.vercel.app/api/digimon');
        todosOsDigimons = await resposta.json();
        carregando.style.display = 'none';
    } catch (erro) {
        console.error('Erro ao buscar Digimons:', erro);
        carregando.style.display = 'none';
    }
}

function exibirDigimons(digimons) {
    listaDigimon.innerHTML = '';
    digimons.forEach(digimon => {
        const cartaDigimon = document.createElement('div');
        cartaDigimon.classList.add('digimon-card');
        cartaDigimon.innerHTML = `
            <img src="${digimon.img}" alt="${digimon.name}">
            <h3>${digimon.name}</h3>
            <p>${digimon.level}</p>
        `;
        listaDigimon.appendChild(cartaDigimon);
    });
}

function buscarComAutocomplete(evento) {
    const termo = evento.target.value.toLowerCase();
    const digimonsFiltrados = todosOsDigimons.filter(digimon =>
        digimon.name.toLowerCase().includes(termo) || 
        digimon.level.toLowerCase().includes(termo)
    );
    exibirDigimonsComPaginacao(digimonsFiltrados);
}

let paginaAtual = 1;
const itensPorPagina = 20;

function exibirDigimonsComPaginacao(digimons, pagina = 1) {
    listaDigimon.innerHTML = '';
    const indiceInicial = (pagina - 1) * itensPorPagina;
    const indiceFinal = indiceInicial + itensPorPagina;
    const digimonsPaginados = digimons.slice(indiceInicial, indiceFinal);

    digimonsPaginados.forEach(digimon => {
        const cartaDigimon = document.createElement('div');
        cartaDigimon.classList.add('digimon-card');
        cartaDigimon.innerHTML = `
            <img src="${digimon.img}" alt="${digimon.name}">
            <h3>${digimon.name}</h3>
            <p>${digimon.level}</p>
        `;
        listaDigimon.appendChild(cartaDigimon);
    });

    renderizarControlesDePaginacao(digimons.length, pagina);
}

function renderizarControlesDePaginacao(totalDeItens, paginaAtual) {
    const containerPaginacao = document.getElementById('pagination');
    containerPaginacao.innerHTML = '';
    const totalDePaginas = Math.ceil(totalDeItens / itensPorPagina);

    for (let i = 1; i <= totalDePaginas; i++) {
        const botaoPagina = document.createElement('button');
        botaoPagina.textContent = i;
        botaoPagina.classList.add('page-button');
        if (i === paginaAtual) {
            botaoPagina.classList.add('active');
        }
        botaoPagina.addEventListener('click', () => exibirDigimonsComPaginacao(todosOsDigimons, i));
        containerPaginacao.appendChild(botaoPagina);
    }
}

botaoBusca.addEventListener('click', () => {
    const termo = inputBusca.value.toLowerCase();
    if (termo.trim() === '') {
        exibirDigimonsComPaginacao(todosOsDigimons, 1);
    } else {
        const digimonsFiltrados = todosOsDigimons.filter(digimon =>
            digimon.name.toLowerCase().includes(termo) ||
            digimon.level.toLowerCase().includes(termo)
        );
        exibirDigimonsComPaginacao(digimonsFiltrados, 1);
    }
});

inputBusca.addEventListener('input', buscarComAutocomplete);

// Iniciar a busca de todos os Digimons para poder fazer o autocomplete
buscarTodosOsDigimons();
