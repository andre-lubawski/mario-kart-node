//objeto jogador
const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3, 
    PONTOS: 0,
};
const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3, 
    PONTOS: 0,
};

function rollDice(){
    Math.floor(Math.random() * 6);
}