//ACORDEÃO (ABRIR E FECHAR CONTEÚDOS)
document.querySelectorAll(".titulo-acordeao").forEach(botao => {
    botao.addEventListener("click", () => {
        let conteudo = botao.nextElementSibling; //pegue o próximo elemento
        let simbolo = botao.querySelector("span");

        // Alterna entre block e none usando operador ternário
        conteudo.style.display = conteudo.style.display === "block" ? "none" : "block";
        simbolo.textContent = conteudo.style.display === "block" ? "−" : "+";
    });
});

//BOTÕES
function mostrarConteudo(id) {
    let conteudo = document.getElementById(id);
    let estavaAberto = conteudo.style.display === "block";

    // Fecha todos os blocos de guerra em uma linha
    document.querySelectorAll(".conteudo").forEach(bloco => bloco.style.display = "none");

    // Só reabre se ele já não estivesse aberto antes
    if (!estavaAberto) conteudo.style.display = "block";
}

//QUIZ (DADOS E LÓGICA)
const perguntas = [
    {
        pergunta: "Qual característica é típica dos mamíferos?",
        alternativas: ["Possuem penas", "Produzem leite para os filhotes", "Respiram apenas pelas brânquias", "Todos põem ovos"],
        correta: 1,
        explicacao: "Os mamíferos possuem glândulas mamárias que produzem leite para alimentar seus filhotes, sendo essa uma de suas principais características."
    },
    {
        pergunta: "Como são chamados os animais que comem plantas e outros animais?",
        alternativas: ["Herbívoros", "Carnívoros", "Onívoros", "Insetívoros"],
        correta: 2,
        explicacao: "Os animais onívoros se alimentam tanto de vegetais quanto de outros animais, como acontece com os porcos e os seres humanos."
    },
    {
        pergunta: "Qual destes animais é um mamífero?",
        alternativas: ["Tartaruga", "Sapo", "Golfinho", "Sardinha"],
        correta: 2,
        explicacao: "O golfinho é um mamífero aquático que respira pelos pulmões e produz leite para alimentar seus filhotes."
    },
    {
        pergunta: "Onde as capivaras costumam viver?",
        alternativas: ["Perto de rios e lagos", "Apenas em desertos", "Em regiões polares", "Somente no alto das montanhas"],
        correta: 0,
        explicacao: "As capivaras vivem geralmente próximas a rios, lagos e áreas alagadas, pois utilizam a água para se proteger, regular a temperatura corporal e realizar atividades diárias."
    },
    {
        pergunta: "Como os mamíferos respiram?",
        alternativas: ["Por brânquias", "Por pulmões", "Apenas pela pele", "Por penas"],
        correta: 1,
        explicacao: "Todos os mamíferos respiram por meio dos pulmões, inclusive os que vivem na água, como as baleias e os golfinhos."
    },
    {
        pergunta: "Qual desses mamíferos põe ovos?",
        alternativas: ["Capivara", "Onça-pintada", "Canguru", "Ornitorrinco"],
        correta: 3,
        explicacao: "O ornitorrinco é um mamífero monotremado, grupo raro de mamíferos que se reproduzem por meio da postura de ovos."
    },
    {
        pergunta: "Qual grupo inclui animais como os cangurus?",
        alternativas: ["Monotremados", "Marsupiais", "Placentários", "Roedores"],
        correta: 1,
        explicacao: "Os cangurus são marsupiais, mamíferos cujos filhotes nascem pouco desenvolvidos e continuam seu desenvolvimento, geralmente, dentro de uma bolsa chamada marsúpio."
    },
    {
        pergunta: "Qual é a principal função dos pelos nos mamíferos?",
        alternativas: ["Permitir a respiração", "Produzir leite", "Ajudar no isolamento térmico e na proteção do corpo", "Permitir a reprodução"],
        correta: 2,
        explicacao: "Os pelos ajudam a conservar o calor corporal e também podem desempenhar funções de proteção e percepção do ambiente, dependendo da espécie."
    },
    {
        pergunta: "Qual alternativa apresenta apenas mamíferos placentários?",
        alternativas: ["Canguru, ornitorrinco e coala", "Cachorro, cavalo e elefante", "Ornitorrinco, equidna e cachorro", "Canguru, gato e equidna"],
        correta: 1,
        explicacao: "Esses três animais são mamíferos placentários. Neles, a placenta permite a troca de nutrientes, gases e resíduos entre a mãe e o embrião durante o desenvolvimento no útero."
    },
    {
        pergunta: "Por que os morcegos são classificados como mamíferos, e não como aves?",
        alternativas: ["Porque conseguem voar", "Porque possuem asas cobertas por penas", "Porque possuem pelos e glândulas mamárias", "Porque vivem principalmente durante a noite"],
        correta: 2,
        explicacao: "Apesar de voarem, os morcegos são mamíferos porque possuem pelos e glândulas mamárias que produzem leite para os filhotes. Suas asas são formadas por membranas de pele sustentadas por dedos alongados, e não por penas."
    }
];

let perguntaAtual = 0;
let pontos = 0;

function mostrarPergunta() {
    let pergunta = perguntas[perguntaAtual];
    
    document.getElementById("progresso").textContent = `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;
    document.getElementById("pergunta").textContent = pergunta.pergunta;
    
    let alternativasContainer = document.getElementById("alternativas");
    alternativasContainer.innerHTML = ""; // Limpa anterior

    pergunta.alternativas.forEach((alternativa, indice) => {
        let botao = document.createElement("button");
        botao.textContent = alternativa;
        botao.onclick = () => verificarResposta(indice);
        alternativasContainer.appendChild(botao);
    });

    document.getElementById("feedback").textContent = "";
    document.getElementById("proxima").style.display = "none";
}

function verificarResposta(indice) {
    let pergunta = perguntas[perguntaAtual];
    let botoes = document.querySelectorAll("#alternativas button");

    botoes.forEach(btn => btn.disabled = true);

    if (indice === pergunta.correta) {
        botoes[indice].classList.add("correta");
        document.getElementById("feedback").textContent = `Resposta correta!\n${pergunta.explicacao}`;
        pontos++;
        document.getElementById("pontuacao").textContent = `Pontos: ${pontos}`;
    } else {
        botoes[indice].classList.add("errada");
        botoes[pergunta.correta].classList.add("correta");
        document.getElementById("feedback").textContent = `Resposta incorreta.\n${pergunta.explicacao}`;
    }

    document.getElementById("proxima").style.display = "block";
}

function proximaPergunta() {
    perguntaAtual++;
    if (perguntaAtual < perguntas.length) {
        mostrarPergunta();
    } else {
        mostrarResultado();
    }
}

function mostrarResultado() {
    let msg = pontos === perguntas.length ? "Excelente! Você acertou todas!" : 
              pontos >= 7 ? "Muito bom! Ótimo conhecimento." : "Vale a pena revisar o conteúdo.";

    document.getElementById("quiz-container").innerHTML = `
        <h3>Resultado final</h3>
        <p>Você acertou <strong>${pontos}</strong> de <strong>${perguntas.length}</strong> questões.</p>
        <p>${msg}</p>
        <button id='refazer' onclick='refazerQuiz()'>Refazer Quiz</button>
    `;
    }

function refazerQuiz() {
    perguntaAtual = 0;
    pontos = 0;
    document.getElementById("quiz-container").innerHTML = `
        <p id="progresso"></p>
        <h3 id="pergunta"></h3>
        <div id="alternativas"></div>
        <p id="feedback"></p>
        <button id="proxima" onclick="proximaPergunta()">Próxima pergunta</button>
    `;
    mostrarPergunta();
}

// Inicialização automática do Quiz
if (document.getElementById("quiz-container")) {
    mostrarPergunta();
}
