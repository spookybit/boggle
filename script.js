const board = document.querySelector('.board');
const currentWord = document.querySelector('.currentWord');

let lastLetter = [];

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
  board.innerHTML = shuffled.map((dice, i) => {
    let letter = rollDice(dice).toUpperCase();
    if (letter === "Q") {
      letter = "Qu";
    }
    return `<span class="dice" data-clicked=false data-number=${parseInt(i)}>${letter}</span>`
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
  if (lastLetter.length === 0) {

  }
  if (this.dataset.clicked === "true") {
    this.dataset.clicked = "false";
    currentWord.innerHTML = currentWord.innerHTML.slice(0, -1);
  } else {
    // console.log(nextValidMove(this.dataset.number));
    // console.log(parseInt(this.dataset.number));
    nextValidMove(this.dataset.number);
    this.dataset.clicked = "true";
    currentWord.innerHTML += this.innerHTML;
    lastLetter.push(this.dataset.number);
  }

  // this[data-clicked]="true";
}

function nextValidMove(num) {
  let validArray = [];
  // validArray.push(num + 5);
  // validArray.push(num - 5);
  // validArray.push(num + 1);
  // validArray.push(num - 5);
  // validArray.push(num + 6);
  // validArray.push(num + 4);
  // validArray.push(num - 6);
  // validArray.push(num - 4);
  // console.log(num);
  // if (num === 1) console.log(num);
  if (num <= 4) validArray.push(num - 5);
  // unless (num >= 19) validArray.push(num + 5);
  // unless (num === 4 || num === 9 || num === 14 || num === 19 || num ===24) validArray.push(num + 1);
  // unless (num === 0 || num === 5 || num === 10 || num === 15 || num ===20) validArray.push(num - 1);

  console.log(validArray);
  return validArray;
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
