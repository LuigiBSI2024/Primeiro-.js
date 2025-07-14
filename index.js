const prompt = require('prompt-sync')({sigint: true}); // Importa o prompt-sync para entrada de dados, ele é instalado via este comando: npm install prompt-sync

let jogador;

function novoJogo() {
    jogador = prompt("Insira seu nome participante: ");

    console.log(
        "\nBem-vindo ao Show do Milhão, " + jogador + "!" +
        "\nEsse jogo consiste em uma série de 15 perguntas e respostas."
    );

}

function preparacao() {
            
console.log("Está pronto? Digite: Sim ou Não. \n");
let resposta = prompt("Sua resposta: ");

    if (resposta[0] === "S" || resposta[0] === "s") {
        jogoExecutando(); 
    } 

    else {
        console.log("Aguardamos pacientemente, tome seu tempo.");
        preparacao();    
    }
}

function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

novoJogo();
preparacao();

function exibirRodadaAtual(rodada) {
    //Declarando uma constante objeto para substituir o uso de vários "if" ou "switch case".
const rodada_atual = [
    {
        condicao: (rodada) => rodada <= 4,
        Rodada: 1,
        Jogador: jogador
    },

    {
        condicao: (rodada) => rodada > 4 && rodada <= 9,
        Rodada: 2,
        Jogador: jogador
    },

    {
        condicao: (rodada) => rodada > 9 && rodada <= 12,
        Rodada: 3,
        Jogador: jogador
    },

    {
        condicao: (rodada) => rodada === 13,
        Rodada: 4,
        Jogador: jogador
    },

    {
        condicao: (rodada) => rodada === 14,
        Rodada: 5,
        Jogador: jogador 
    }
];

    for (const iterar_rodada_atual of rodada_atual) {
        if (iterar_rodada_atual.condicao(rodada)) {
            return {
                rodada: iterar_rodada_atual.Rodada, 
                jogador: iterar_rodada_atual.Jogador
            };
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

    let pontos = 0;
    for (let contagem_pergunta = 0; contagem_pergunta < questoes.length; contagem_pergunta++) {
        console.log(`\nPergunta ${contagem_pergunta + 1} \n`);
        console.log(`Jogador: ${exibirRodadaAtual(contagem_pergunta).jogador}`); // Exibe o nome do jogador.
        console.log(`${exibirRodadaAtual(contagem_pergunta).rodada}ª Rodada \n`); // Exibe a rodada atual com base na contagem de perguntas.

        let perguntaAtual = questoes[contagem_pergunta].pergunta;
        let correta = questoes[contagem_pergunta].correta;
        let falsas = questoes[contagem_pergunta].falsas;

        // Junta todas as alternativas e embaralha
        let alternativas = [correta, ...falsas]; //o "..." serve para concatenar arrays. Ele funciona como um operador de espalhamento, que "espalha" os elementos de um array em outro array ou em uma função, sendo nesse caso, o array "falsas" está sendo espalhado dentro do array "alternativas".
        alternativas.sort(() => Math.random() - 0.5); // nessa linha, o método sort() está sendo usado para embaralhar as alternativas de forma aleatória. E o math.random() gera um número aleatório entre 0 e 1. Subtraindo 0.5, o resultado pode ser positivo ou negativo, o que faz com que a ordem dos elementos seja alterada de maneira imprevisível.

        console.log(perguntaAtual);
        for (let i = 0; i < alternativas.length; i++) {
            console.log(`${i + 1}ª alternativa - ${alternativas[i]}`);
        }

        console.log(`\n${formatarMoeda(calcularValorTotal(pontos))} esse será o valor em dinheiro caso pare agora. ` +
        `\nCaso deseje parar aperte qualquer outra tecla fora dos números específicados abaixo.`); // Atualiza o valor do prêmio a cada resposta correta.

        let respostaUsuario = prompt("\nDigite o número da alternativa correta (1 a 4): ");

        if (alternativas[respostaUsuario - 1] === correta) {
            console.log("\nResposta correta!");
            pontos++; // Incrementa só se acertar
        } 

        else if (falsas.includes(alternativas[respostaUsuario - 1])) {
            console.log(`\nResposta errada! A resposta correta era: ${correta}`);
            console.log(`Faltava ${(exibirRodadaAtual(contagem_pergunta).rodada - 5)*-1} Rodada(s).`);

            if (exibirRodadaAtual(contagem_pergunta).rodada === 4) {
                console.log(`Parabéns, ${jogador}! Você ganhou ${formatarMoeda(calcularValorTotal(pontos)/2)}!`);
                console.log(`Obrigado pela sua participação neste programa. Faltava apenas ${(exibirRodadaAtual(contagem_pergunta).rodada-5)*-1} Rodada(s) para o fim.`);
                break;
            }

            else if (exibirRodadaAtual(contagem_pergunta).rodada === 5) {
                console.log(`Infelizmente esta era a pergunta final, você perdeu todo o valor adquirido. \nObrigado pela sua participação neste programa.`);
                break;
            }
            break;
        }

        else {
            const informarRodada = exibirRodadaAtual(contagem_pergunta).rodada;
            console.log(`Você escolheu parar o jogo na rodada ${informarRodada}, ainda faltava ${(informarRodada - 5)*-1}.`);
            break;
        }
        
    }
    console.log(`\nFim do jogo. Pontuação total: ${pontos}`);
    console.log(`Parabéns, ${jogador}! Você ganhou ${formatarMoeda(calcularValorTotal(pontos))}!`);
    novaPartida();
}

function calcularValorTotal(pontos) {

    //Cálculo do valor total ganho pelo jogador.
    let premio = 0; 
    //os valores de cada variável rodada ou intervalos definidos nas regras do jogo (leia o ReadME). 
    const rodada_5 = 10000; //10 mil cada.
    const rodada_10 = 30000; //30 mil cada.
    const rodada_13 = 100000; //100 mil cada.
    const rodada_14 = 200000; //200 mil, caso o jogador erre o valor totalizado das anteriores será cortado ao meio, levando para casa apenas a metade da soma dos valores anteriores.
    const rodada_15 = 1000000; //1 milhão, mas com o risco de perder todo o dinheiro somado das anteriores.

    //Calculando o prêmio com base na quantidade de pontos.
    premio = pontos * rodada_5;
    // O math.abs() é o módulo do javascript, que retorna o valor absoluto de um número, ou seja, o número sem sinal negativo.
    // Ele é usado aqui para garantir que o cálculo funcione corretamente, mesmo que o jogador tenha parado o jogo antes de atingir a pontuação mínima para cada rodada.
    let premio_2 = premio + Math.abs((pontos-5)) * rodada_10;
    let premio_3 = premio_2 + Math.abs((pontos - 10)) * rodada_13;
    let premio_4 = premio_3 + rodada_14;
    let premio_5 = premio_4 + rodada_15;
    
    if (pontos > 0 && pontos <= 5) {
        return premio;
    }

    else if (pontos > 5 && pontos <= 10) {
        return premio_2;
    }

    else if (pontos > 10 && pontos <= 13) {
        return premio_3;
    }

    else if (pontos === 14) {
        return premio_4;
    }
    else if (pontos === 15) {
        return premio_5;
    }
    return premio;

}

function novaPartida(){
    console.log(`\nDeseja jogar novamente?`);
    let reiniciarJogo = prompt("Digite: Sim ou Não. \nSua resposta: ");
    if (reiniciarJogo && (reiniciarJogo[0] === "S" || reiniciarJogo[0] === "s")) {
        novoJogo();
        preparacao();
    }
    else {
        console.log("\nObrigado por jogar! Até a próxima.");
    }
}

