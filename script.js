const board = document.querySelector('.board');

const dice = ['aaafrs',
'aaeeee',
'aafirs',
'adennn',
'aeeeem',
'aeegmu',
'aegmnn',
'afirsy',
'bjkqxz',
'ccenst',
'ceiilt',
'ceilpt',
'ceipst',
'ddhnot',
'dhhlor',
'dhlnor',
'dhlnor',
'eiiitt',
'emottt',
'ensssu',
'fiprsy',
'gorrvw',
'iprrry',
'nootuw',
'ooottu']

function shake(dice, board){
  const shuffled = shuffleDice(dice);
  board.innerHTML = shuffled.map(dice => {
    const letter = rollDice(dice);
    return `<span>${letter}</span>`
  })
  console.log(board);
}

function rollDice(dice) {
  return dice[Math.floor(Math.random() * dice.length)]
}

function shuffleDice(diceArray) {
  for (let i = dice.length; i ; i--) {
    let j = Math.floor(Math.random()*i);
    [diceArray[i-1], diceArray[j]] = [diceArray[j], diceArray[i-1]]
  }
  return diceArray;
}

shake(dice, board);
