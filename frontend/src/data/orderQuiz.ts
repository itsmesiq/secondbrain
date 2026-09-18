import type { MysticOrder, OrderData, QuizQuestion } from '@/types/orderQuiz.types';

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

export const orders: Record<MysticOrder, OrderData> = {
    Arcane: {
        name: 'Arcane',

        symbol: '/images/orders/arcane-symbol.png',
        leader: '/images/orders/arcane-leader.jpg',
        details: '/images/orders/arcane-details.jpg',
        sprite: '/images/orders/arcane-sprite.png',

        archetype: 'Mage',
        element: 'Éter',

        quote: 'Todo conhecimento é um novo mundo à espera.',

        lore: `O Arcane é movido pela sede de entender. Onde outros veem rotina,
ele vê padrões. Onde alguns veem limites, ele enxerga possibilidades.

Seu caminho é feito de perguntas, experimentos e descobertas. Ele transforma
curiosidade em criação, conhecimento em poder e ideias em realidade.

No universo Etherea, o Arcane é aquele que conecta o invisível, traduz o caos
e encontra sentido onde outros apenas observam.`,

        tags: ['Conhecimento', 'Curiosidade', 'Descoberta'],
        accent: 'var(--arcane-purple)',
    },

    Vanguard: {
        name: 'Vanguard',

        symbol: '/images/orders/vanguard-symbol.png',
        leader: '/images/orders/vanguard-leader.jpg',
        details: '/images/orders/vanguard-details.jpg',
        sprite: '/images/orders/vanguard-sprite.png',

        archetype: 'Warrior',
        element: 'Fogo',

        quote: 'Movimento hoje. Liberdade amanhã.',
        lore: `O Vanguard é movido pela ação. Ele acredita que a verdadeira transformação nasce da disciplina e da constância.

Enquanto outros observam, ele avança. Não teme o esforço, o desconforto ou os recomeços — pois sabe que é na fricção que o caráter é forjado.

No universo Etherea, o Vanguard é aquele que abre caminho, transforma intenções em resultados e inspira pelo exemplo.`,
        tags: ['Disciplina', 'Ação', 'Resiliência'],
        accent: 'var(--vanguard-red)',
    },

    Verdant: {
        name: 'Verdant',

        symbol: '/images/orders/verdant-symbol.png',
        leader: '/images/orders/verdant-leader.jpg',
        details: '/images/orders/verdant-details.jpg',
        sprite: '/images/orders/verdant-sprite.png',

        archetype: 'Druid',
        element: 'Vida',

        quote: 'Raízes profundas sustentam amanhãs mais fortes.',
        lore: `O Verdant é guiado pela harmonia entre o corpo, a mente e o mundo ao seu redor. Ele entende que toda evolução verdadeira nasce do equilíbrio e do cuidado contínuo.

Enquanto muitos buscam apenas resultados, ele cultiva o processo. Vê força na constância, na simplicidade e na conexão com o essencial.

No universo Etherea, o Verdant é aquele que lembra que crescer também é saber preservar — a si mesmo, aos outros e ao que realmente importa.`,
        tags: ['Equilíbrio', 'Saúde', 'Crescimento'],
        accent: 'var(--verdant-green)',
    },

    Forge: {
        name: 'Forge',

        symbol: '/images/orders/forge-symbol.png',
        leader: '/images/orders/forge-leader.jpg',
        details: '/images/orders/forge-details.jpg',
        sprite: '/images/orders/forge-sprite.png',

        archetype: 'Engineer',
        element: 'Terra',

        quote: 'Ideias também mudam mundos.',
        lore: `The Forge acredita que construir é um ato de resistência. Ela transforma ideias em lugares, caos em estrutura e visão em realidade.

Entre o concreto e o sonho, encontra beleza no processo. Seu trabalho não é apenas erguer, mas criar espaços onde pessoas possam existir melhor.

Ela vê potencial onde outros veem ruínas, e acredita que todo detalhe importa — da fundação ao último raio de luz.

Constrói hoje o amanhã que gostaria de habitar.`,
        tags: ['Construção', 'Trabalho', 'Criatividade'],
        accent: 'var(--forge-yellow)',
    },

    Veil: {
        name: 'Veil',

        symbol: '/images/orders/veil-symbol.png',
        leader: '/images/orders/veil-leader.jpg',
        details: '/images/orders/veil-details.jpg',
        sprite: '/images/orders/veil-sprite.png',

        archetype: 'Rogue',
        element: 'Sombra',

        quote: 'O que é invisível também transforma.',
        lore: `The Veil observa o que os outros não veem. Entre sombras e silêncios, encontra padrões, conecta fragmentos e revela verdades que mudam destinos.

Ela se move entre mundos — física e mentalmente — como quem dança no limite do visível. Carrega o mistério como ferramenta, não como fuga. Para ela, conhecimento é poder, e a intuição é mapa.

Onde outros veem escuridão, ela enxerga possibilidades. The Veil não apenas descobre segredos — ela os protege, redefine e transforma em algo maior.`,
        tags: ['Introspecção', 'Estratégia', 'Mistério'],
        accent: 'var(--veil-blue)',
    },

    Ballad: {
        name: 'Ballad',

        symbol: '/images/orders/ballad-symbol.png',
        leader: '/images/orders/ballad-leader.jpg',
        details: '/images/orders/ballad-details.jpg',
        sprite: '/images/orders/ballad-sprite.png',

        archetype: 'Bard',
        element: 'Som',

        quote: 'Algumas verdades só podem ser ditas em forma de canção.',
        lore: `The Ballad é uma barda que transforma emoções em pontes. Ela acredita que histórias têm o poder de curar, provocar e unir — mesmo em mundos em ruínas.

Com sua música, revela o que muitos tentam esconder, dá voz ao que foi silenciado e desperta novas formas de ver a realidade. Viaja por entre cidades e fronteiras, levando consigo melodias, memórias e perguntas.

No universo Etherea, The Ballad é a lembrança de que a sensibilidade também é força. Ela encontra beleza no caos e acredita que a imaginação pode ser o primeiro passo para um futuro melhor.`,
        tags: ['Expressão', 'Imaginação', 'Experiência'],
        accent: 'var(--ballad-pink)',
    },
};
