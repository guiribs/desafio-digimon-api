document.getElementById('botao-todos-digimons').addEventListener('click', buscarTodosDigimons);
document.getElementById('botao-nivel').addEventListener('click', buscarDigimonPorNivel);
document.getElementById('botao-nome').addEventListener('click', buscarDigimonPorNome);

async function buscarTodosDigimons() {
    const resposta = await fetch('https://digimon-api.vercel.app/api/digimon');
    const dados = await resposta.json();
    exibirDigimons(dados);
}

async function buscarDigimonPorNivel() {
    const nivel = prompt("Digite o nível:");
    if (nivel) {
        const resposta = await fetch(`https://digimon-api.vercel.app/api/digimon/level/${nivel}`);
        const dados = await resposta.json();
        exibirDigimons(dados);
    }
}

async function buscarDigimonPorNome() {
    const nome = prompt("Digite o nome:");
    if (nome) {
        const resposta = await fetch(`https://digimon-api.vercel.app/api/digimon/name/${nome}`);
        const dados = await resposta.json();
        exibirDigimons(dados);
    }
}

function exibirDigimons(digimons) {
    const conteudo = document.getElementById('conteudo');
    conteudo.innerHTML = '';
    digimons.forEach(digimon => {
        const cartao = document.createElement('div');
        cartao.classList.add('cartao-digimon');
        cartao.innerHTML = `
            <h3>${digimon.name}</h3>
            <img src="${digimon.img}" alt="${digimon.name}">
            <p>Nível: ${digimon.level}</p>
        `;
        conteudo.appendChild(cartao);
    });
}
