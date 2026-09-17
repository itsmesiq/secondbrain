import type { QuizQuestion } from '@/types/orderQuiz.types';

export const orderQuizQuestions: QuizQuestion[] = [
    {
        id: 1,
        question: 'Você encontra um problema que ninguém sabe resolver. O que faz?',
        answers: [
            {
                id: 'a',
                label: 'Vou direto tentar resolver. Pensar demais não vai fazer o problema desaparecer.',
                order: 'Vanguard',
            },
            {
                id: 'b',
                label: 'Primeiro observo o problema e tento entender o que está acontecendo por trás dele.',
                order: 'Veil',
            },
            {
                id: 'c',
                label: 'Começo a desmontar o problema e pensar em como reconstruí-lo de outra maneira.',
                order: 'Forge',
            },
            {
                id: 'd',
                label: 'Pesquiso, faço perguntas e tento descobrir por que aquilo acontece.',
                order: 'Arcane',
            },
            {
                id: 'e',
                label: 'Converso com outras pessoas. Talvez exista uma perspectiva que ainda não enxergamos.',
                order: 'Ballad',
            },
            {
                id: 'f',
                label: 'Tento encontrar uma solução que resolva o problema sem criar outros no caminho.',
                order: 'Verdant',
            },
        ],
    },

    {
        id: 2,
        question: 'Qual dessas frases mais combina com você?',
        answers: [
            {
                id: 'a',
                label: '“Se eu começar, preciso terminar.”',
                order: 'Vanguard',
            },
            {
                id: 'b',
                label: '“Nem tudo precisa ser dito.”',
                order: 'Veil',
            },
            {
                id: 'c',
                label: '“Se não existe, podemos construir.”',
                order: 'Forge',
            },
            {
                id: 'd',
                label: '“Eu preciso entender.”',
                order: 'Arcane',
            },
            {
                id: 'e',
                label: '“Tudo pode virar uma história.”',
                order: 'Ballad',
            },
            {
                id: 'f',
                label: '“Crescer também significa saber cuidar.”',
                order: 'Verdant',
            },
        ],
    },

    {
        id: 3,
        question: 'Você recebe um dia completamente livre. O que parece mais atraente?',
        answers: [
            {
                id: 'a',
                label: 'Fazer algo que vinha adiando e finalmente tirar do papel.',
                order: 'Forge',
            },
            {
                id: 'b',
                label: 'Ficar sozinho, explorar meus pensamentos e desaparecer um pouco do mundo.',
                order: 'Veil',
            },
            {
                id: 'c',
                label: 'Ler, pesquisar ou aprender alguma coisa completamente nova.',
                order: 'Arcane',
            },
            {
                id: 'd',
                label: 'Sair, conhecer lugares, ouvir música e viver alguma experiência diferente.',
                order: 'Ballad',
            },
            {
                id: 'e',
                label: 'Cuidar de mim, da minha casa, das minhas plantas ou simplesmente desacelerar.',
                order: 'Verdant',
            },
            {
                id: 'f',
                label: 'Treinar, me desafiar ou fazer alguma coisa que me deixe mais forte.',
                order: 'Vanguard',
            },
        ],
    },

    {
        id: 4,
        question: 'Quando você falha, qual é sua primeira reação?',
        answers: [
            {
                id: 'a',
                label: 'Tento novamente. Preciso descobrir onde errei.',
                order: 'Vanguard',
            },
            {
                id: 'b',
                label: 'Analiso silenciosamente o que aconteceu antes de fazer qualquer coisa.',
                order: 'Veil',
            },
            {
                id: 'c',
                label: 'Penso em uma maneira diferente de fazer aquilo funcionar.',
                order: 'Forge',
            },
            {
                id: 'd',
                label: 'Quero entender exatamente por que deu errado.',
                order: 'Arcane',
            },
            {
                id: 'e',
                label: 'Transformo aquilo em aprendizado — talvez até em uma história.',
                order: 'Ballad',
            },
            {
                id: 'f',
                label: 'Dou um passo para trás, recupero o equilíbrio e tento novamente quando estiver pronto.',
                order: 'Verdant',
            },
        ],
    },

    {
        id: 5,
        question: 'Qual ambiente faria você se sentir mais “em casa”?',
        answers: [
            {
                id: 'a',
                label: 'Uma cidade enorme, cheia de movimento, desafios e possibilidades.',
                order: 'Vanguard',
            },
            {
                id: 'b',
                label: 'Um lugar silencioso, escuro e misterioso, onde ninguém sabe exatamente o que existe.',
                order: 'Veil',
            },
            {
                id: 'c',
                label: 'Um ateliê, oficina ou estúdio cheio de ferramentas, materiais e projetos inacabados.',
                order: 'Forge',
            },
            {
                id: 'd',
                label: 'Uma biblioteca, laboratório ou sala cheia de livros e coisas para descobrir.',
                order: 'Arcane',
            },
            {
                id: 'e',
                label: 'Um palco, estúdio musical, galeria ou lugar onde pessoas possam criar e se expressar.',
                order: 'Ballad',
            },
            {
                id: 'f',
                label: 'Uma floresta, jardim ou espaço tranquilo cercado pela natureza.',
                order: 'Verdant',
            },
        ],
    },

    {
        id: 6,
        question: 'O que mais te incomoda?',
        answers: [
            {
                id: 'a',
                label: 'Sentir que estou parado enquanto poderia estar avançando.',
                order: 'Vanguard',
            },
            {
                id: 'b',
                label: 'Pessoas que tiram conclusões sem observar o que realmente está acontecendo.',
                order: 'Veil',
            },
            {
                id: 'c',
                label: 'Ver potencial sendo desperdiçado.',
                order: 'Forge',
            },
            {
                id: 'd',
                label: 'Não conseguir encontrar uma resposta para algo que me intriga.',
                order: 'Arcane',
            },
            {
                id: 'e',
                label: 'Não poder me expressar ou ser compreendido.',
                order: 'Ballad',
            },
            {
                id: 'f',
                label: 'Viver em um ritmo que não permite respirar.',
                order: 'Verdant',
            },
        ],
    },

    {
        id: 7,
        question: 'Se você pudesse desenvolver uma habilidade instantaneamente, qual escolheria?',
        answers: [
            {
                id: 'a',
                label: 'Disciplina absoluta.',
                order: 'Vanguard',
            },
            {
                id: 'b',
                label: 'Ler pessoas e situações com precisão.',
                order: 'Veil',
            },
            {
                id: 'c',
                label: 'Transformar qualquer ideia em algo concreto.',
                order: 'Forge',
            },
            {
                id: 'd',
                label: 'Aprender qualquer assunto rapidamente.',
                order: 'Arcane',
            },
            {
                id: 'e',
                label: 'Conseguir expressar exatamente aquilo que sinto.',
                order: 'Ballad',
            },
            {
                id: 'f',
                label: 'Encontrar equilíbrio em qualquer situação.',
                order: 'Verdant',
            },
        ],
    },

    {
        id: 8,
        question: 'Você precisa escolher uma dessas missões:',
        answers: [
            {
                id: 'a',
                label: 'Liderar uma equipe através de uma situação impossível.',
                order: 'Vanguard',
            },
            {
                id: 'b',
                label: 'Descobrir um segredo que ninguém deveria conhecer.',
                order: 'Veil',
            },
            {
                id: 'c',
                label: 'Construir algo que transforme a vida de outras pessoas.',
                order: 'Forge',
            },
            {
                id: 'd',
                label: 'Explorar um lugar desconhecido e descobrir como ele funciona.',
                order: 'Arcane',
            },
            {
                id: 'e',
                label: 'Contar uma história capaz de fazer pessoas completamente diferentes se conectarem.',
                order: 'Ballad',
            },
            {
                id: 'f',
                label: 'Restaurar um lugar destruído e fazê-lo florescer novamente.',
                order: 'Verdant',
            },
        ],
    },

    {
        id: 9,
        question: 'Qual dessas palavras você escolheria para representar seu futuro?',
        answers: [
            {
                id: 'a',
                label: 'FORWARD',
                order: 'Vanguard',
            },
            {
                id: 'b',
                label: 'UNKNOWN',
                order: 'Veil',
            },
            {
                id: 'c',
                label: 'BUILD',
                order: 'Forge',
            },
            {
                id: 'd',
                label: 'DISCOVER',
                order: 'Arcane',
            },
            {
                id: 'e',
                label: 'EXPRESS',
                order: 'Ballad',
            },
            {
                id: 'f',
                label: 'GROW',
                order: 'Verdant',
            },
        ],
    },

    {
        id: 10,
        question: 'E, no fundo, o que você mais quer deixar no mundo?',
        answers: [
            {
                id: 'a',
                label: 'A prova de que eu fui capaz de superar meus limites.',
                order: 'Vanguard',
            },
            {
                id: 'b',
                label: 'Algo que faça as pessoas enxergarem aquilo que normalmente não percebem.',
                order: 'Veil',
            },
            {
                id: 'c',
                label: 'Algo concreto que continue existindo depois de mim.',
                order: 'Forge',
            },
            {
                id: 'd',
                label: 'Uma ideia que faça outras pessoas continuarem questionando.',
                order: 'Arcane',
            },
            {
                id: 'e',
                label: 'Uma história, uma obra ou uma experiência que alguém nunca esqueça.',
                order: 'Ballad',
            },
            {
                id: 'f',
                label: 'Algo que continue crescendo mesmo quando eu não estiver mais ali.',
                order: 'Verdant',
            },
        ],
    },
];
