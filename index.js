const prompt = require('prompt-sync')({sigint: true}); // Importa o prompt-sync para entrada de dados, ele é instalado via este comando: npm install prompt-sync.

let jogador = "";

function novoJogo() {
    jogador = prompt("Insira seu nome participante: ");

    console.log(
    "Bem-vindo ao Show do Milhão, " + jogador + "!" +
    "\nEsse jogo consiste em uma série de 15 perguntas e respostas."
    );

  function preparacao() {
    let resposta = prompt("Está pronto?\nDigite: Sim ou Não.");

    if (resposta && (resposta[0] === "S" || resposta[0] === "s")) {
        jogoExecutando(); 
    } 

    else {
        console.log("Aguardamos pacientemente, tome seu tempo.");
        preparacao(); // chamada recursiva controlada
    }
  }
}

function jogoExecutando(){
    //As questões serão sobre geografia e história.
    const questoes = [
        {
        pergunta: "Qual o maior país do mundo?",
        correta: "Rússia",
        falsas: ["Canadá", "China", "Estados Unidos"]
        },
        {
        pergunta: "Qual país é conhecido como a terra do sol nascente?",
        correta: "Japão",
        falsas: ["China", "Tailândia", "Coreia do Sul"]
        },
        {
        pergunta: "Qual região do Brasil costuma nevar?",
        correta: "Sul",
        falsas: ["Sudeste", "Norte", "Centro-Oeste"]
        },
        {
        pergunta: "O que significa a sigla em inglês EUA?",
        correta: "Estados Unidos da América",
        falsas: ["União das Américas", "Estados Unidos Asiáticos", "Estados Unidos Africanos"]
        },
        {
        pergunta: "Quais países do Oriente Médio estão em conflito neste momento?",
        correta: "Israel e Irã",
        falsas: ["Egito e Turquia", "Arábia Saudita e Jordânia", "Síria e Líbano"]
        },
        {
        pergunta: "O território brasileiro é cortado por quais fusos horários?",
        correta: "Quatro",
        falsas: ["Três", "Cinco", "Dois"]
        },
        {
        pergunta: "Onde estão localizados os prédios dos três poderes no Brasil?",
        correta: "Brasília",
        falsas: ["Rio de Janeiro", "São Paulo", "Belo Horizonte"]
        },
        {
        pergunta: "Em qual estado está a maior parte da floresta amazônica?",
        correta: "Amazonas",
        falsas: ["Pará", "Rondônia", "Acre"]
        },
        {
        pergunta: "Quais estados o bioma Caatinga domina?",
        correta: "Nordestinos",
        falsas: ["Sulinos", "Centro-Oeste", "Região Norte"]
        },
        {
        pergunta: "Quais estados fazem fronteira com o Oceano Atlântico?",
        correta: "Litorâneos",
        falsas: ["Centro-Oeste", "Sul apenas", "Norte apenas"]
        },
        {
        pergunta: "Qual estado tem atraso por fuso-horário na virada do ano novo?",
        correta: "Acre",
        falsas: ["Bahia", "Paraná", "Piauí"]
        },
        {
        pergunta: "Quais ilhas pertencem ao território brasileiro?",
        correta: "Fernando de Noronha",
        falsas: ["Galápagos", "Ilhas Canárias", "Ilha de Páscoa"]
        },
        {
        pergunta: "Onde os portugueses atracaram ao chegar no Brasil pela primeira vez?",
        correta: "Porto Seguro",
        falsas: ["Salvador", "Recife", "Rio de Janeiro"]
        },
        {
        pergunta: "O Mar Vermelho faz divisa com quais países?",
        correta: "Egito, Sudão e Arábia Saudita",
        falsas: ["Irã, Iraque e Líbano", "Israel, Jordânia e Síria", "Turquia, Chipre e Grécia"]
        },
        {
        pergunta: "Qual lugar do mundo está mais atrasado em relação aos fusos horários?",
        correta: "Ilhas Baker e Howland",
        falsas: ["Havaí", "Nova Zelândia", "Ilhas Fiji"]
        }
    ];
    
    let pontos = 0; //"pontos" significa quantas questões foram acertadas pelo jogador.
    //os valores de cada variável rodada ou intervalos definidos nas regras do jogo (leia o ReadME). 
    let rodada_5 = 10000; //10 mil cada.
    let rodada_10 = 30000; //30 mil cada.
    let rodada_13 = 100000; //100 mil cada.
    let rodada_14 = 200000; //200 mil, caso o jogador erre o valor totalizado das anteriores será cortado ao meio, levando para casa apenas a metade da soma dos valores anteriores.
    let rodada_15 = 1000000; //1 milhão, mas com o risco de perder todo o dinheiro somado das anteriores.

    for (let rodada = 0; rodada < questoes.length; rodada++) {
        console.log(`Rodada ${rodada + 1}`);

        let perguntaAtual = questoes[rodada].pergunta;
        let correta = questoes[rodada].correta;
        let falsas = questoes[rodada].falsas;

        // Junta todas as alternativas e embaralha
        let alternativas = [correta, ...falsas]; //o "..." serve para concatenar arrays.
        alternativas.sort(() => Math.random() - 0.5); // nessa linha, o método sort() está sendo usado para embaralhar as alternativas de forma aleatória. E o math.random() gera um número aleatório entre 0 e 1. Subtraindo 0.5, o resultado pode ser positivo ou negativo, o que faz com que a ordem dos elementos seja alterada de maneira imprevisível.

        console.log(perguntaAtual);
        for (let i = 0; i < alternativas.length; i++) {
            console.log(`\n${i + 1}ªalternativa - ${alternativas[i]}`);
        }

        let respostaUsuario = prompt("\nDigite o número da alternativa correta (1 a 4): ");
        
        if (alternativas[respostaUsuario - 1] === correta) {
            console.log("\nResposta correta!");
            pontos++;
        } 

        else {
            console.log("\nResposta errada!");
            console.log(`Fim do jogo. Pontuação total: ${pontos}`);
            break; // Encerra o jogo ao errar uma pergunta.
        }
        
        console.log(`Fim do jogo. Pontuação total: ${pontos}`);
    }
}

novoJogo();
jogoExecutando();