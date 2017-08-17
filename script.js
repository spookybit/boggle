const board = document.querySelector('.board');
const currentWord = document.querySelector('.currentWord');

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
    let letter = rollDice(dice).toUpperCase();
    if (letter === "Q") {
      letter = "Qu";
    }
    return `<span class="dice" data-clicked=false>${letter}</span>`
  }).join('');
  // console.log(board);
  // board.forEach(dice => dice.addEventListener('click', console.log(dice)));
  // let items = board.getElementsByTagName("span");
  // console.log(items);
  // items.forEach(dice => dice.addEventListener('click', console.log(dice)))
  const stuff = board.querySelectorAll(".dice")
  // console.log(stuff);
  stuff.forEach(dice => dice.addEventListener('click', toggleDice));
}

function toggleDice(e) {
  if (this.dataset.clicked === "true") {
    this.dataset.clicked = "false";
    currentWord.innerHTML += this.innerHTML;
  } else {
    this.dataset.clicked = "true";
  }

  // this[data-clicked]="true";
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
