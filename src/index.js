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
    MANOBRABILIDADE: 4,
    PODER: 4, 
    PONTOS: 0,
};

async function rollDice(){
    return Math.floor(Math.random() * 6)+1;
}

async function getRandomBlock(){
    let random = Math.random();
    let result;

    switch(true){
        case random < 0.33:
            result = "RETA"
            break;
        case random < 0.66:
            result = "CURVA"
            break;
        default:
            result = "CONFRONTO"
    }
return result;
}
async function logRollResult(characterName, block, diceResult, attribute){
    console.log(`${characterName} rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}
async function playRaceEngine(character1, character2){
    for(let round = 1; round <=5; round++){
        console.log(`🏁 Round ${round}`);

        //sortear bloco
        let block =  await getRandomBlock();
        console.log(`Bloco: ${block}`);
        let diceResult1 = await rollDice();
let diceResult2 = await rollDice();

let totalSkill_1 = 0;
let totalSkill_2 = 0;

if(block==="RETA"){
    totalSkill_1 = diceResult1 + character1.VELOCIDADE;
    totalSkill_2 = diceResult2 + character1.VELOCIDADE;

    await logRollResult(character1.NOME, "velocidade", diceResult1,character1.VELOCIDADE);
    await logRollResult(character2.NOME, "velocidade", diceResult2,character2.VELOCIDADE);
    
}
if(block==="CURVA"){
    totalSkill_1 = diceResult1 + character1.MANOBRABILIDADE;
    totalSkill_2 = diceResult2 + character2.MANOBRABILIDADE;

    await logRollResult(character1.NOME, "manobrabilidade", diceResult1,character1.MANOBRABILIDADE);
    await logRollResult(character2.NOME, "manobrabilidade", diceResult2,character2.MANOBRABILIDADE);
}
if(block==="CONFRONTO"){
    let powerResult1 = diceResult1 + character1.PODER;
    let powerResult2 = diceResult2 + character2.PODER;

    console.log(`${character1.NOME} confrontou com ${character2.NOME}`);
    await logRollResult(character1.NOME, "poder", diceResult1,character1.PODER);
    await logRollResult(character2.NOME, "poder", diceResult2,character2.PODER);

//opção com ternário
/*
character2.PONTOS -= powerResult1 > powerResult2 && character2.PONTOS > 0 ? 1 : 0;
character1.PONTOS -= powerResult2 > powerResult1 && character1.PONTOS > 0 ? 1 : 0;

console.log(powerResult1===powerResult2 ? "Empate no confronto! Ninguém perde pontos." : "");
*/

if(powerResult1 > powerResult2 && character2.PONTOS > 0){
        console.log(`${character1.NOME} venceu o confronto! ${character2.NOME} perdeu 1 ponto.`);
        character2.PONTOS--;
        
}
 if(powerResult2 > powerResult1 && character1.PONTOS > 0){
        console.log(`${character2.NOME} venceu o confronto! ${character1.NOME} perdeu 1 ponto.`);
        character1.PONTOS--;
}
if(powerResult1 === powerResult2){
    console.log("Empate no confronto! Ninguém perde pontos.");
}
}
// verificando vencedor do round

if(totalSkill_1 > totalSkill_2){
    console.log(`🏆 ${character1.NOME} venceu o round!\n`);
    character1.PONTOS++;
}else if(totalSkill_2 > totalSkill_1){
    console.log(`🏆 ${character2.NOME} venceu o round!\n`);
    character2.PONTOS++;
}
}}

async function declareWinner(character1, character2){
    console.log("🏁 Fim de corrida!");
    console.log(`${character1.NOME} fez ${character1.PONTOS} pontos.`);
    console.log(`${character2.NOME} fez ${character2.PONTOS} pontos.`);
    if(character1.PONTOS > character2.PONTOS){
        console.log(`🏆 ${character1.NOME} é o grande vencedor!`);
    } else if(character2.PONTOS > character1.PONTOS){
        console.log(`🏆 ${character2.NOME} é o grande vencedor!`);
    }else{
        console.log("A corrida terminou empatada!");
    }
}


(async function main(){
    console.log(`Iniciando a corrida entre ${player1.NOME} e ${player2.NOME}...\n`);

    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);
})()
//função auto invocável