const board = document.querySelector('.board');
const currentWord = document.querySelector('.currentWord');
const table = document.querySelector('.wordTable');

let lastLetter = [];
let curWord = "Current Word: ";

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
    curWord += letter;
    return `<span class="dice" data-clicked=false data-number=${parseInt(i)}><p class="letter">${letter}</p></span>`
  }).join('');

  const stuff = board.querySelectorAll(".dice")
  stuff.forEach(dice => dice.addEventListener('click', toggleDice));
}

function toggleDice(e) {
  let num = parseInt(this.dataset.number);

  if (lastLetter.length === 0) {
    click(this, num);
  } else {
    let validMoves = nextValidMove(lastLetter[lastLetter.length - 1]);

    if (lastLetter[lastLetter.length - 1] === num) {
      unclick(this, num);
    } else if (validMoves.includes(num) && !lastLetter.includes(num)) {
      click(this, num);
    }
  }
}

function click(tag, num) {
  let letter;
  if (tag.innerHTML.slice(-6, -4) === 'Qu') {
    letter = tag.innerHTML.slice(-6, -4).toUpperCase();
  } else {
    letter = tag.innerHTML.slice(-5, -4);
  }
  tag.dataset.clicked = "true";
  currentWord.innerHTML += letter;
  lastLetter.push(num);
}

function unclick(tag, num) {
  let wordLength = currentWord.innerHTML.length;
  lastLetter = lastLetter.slice(0, (lastLetter.length - 1));

  tag.dataset.clicked = "false";
  if (currentWord.innerHTML.slice(wordLength - 2)  === "QU") {
    currentWord.innerHTML = currentWord.innerHTML.slice(0, -2);
  } else {
    currentWord.innerHTML = currentWord.innerHTML.slice(0, -1);
  }
}

function nextValidMove(num) {
  num = parseInt(num);
  let validArray = [];

  if (!(num <= 4)) validArray.push(num - 5);
  if (!(num <= 4) && !(num === 4 || num === 9 || num === 14 || num === 19 || num ===24)) validArray.push(num - 4);
  if (!(num <= 4) && !(num === 0 || num === 5 || num === 10 || num === 15 || num ===20)) validArray.push(num - 6);
  if (!(num >= 20)) validArray.push(num + 5);
  if (!(num >= 20) && !(num === 4 || num === 9 || num === 14 || num === 19 || num ===24)) validArray.push(num + 6);
  if (!(num >= 20) && !(num === 0 || num === 5 || num === 10 || num === 15 || num ===20)) validArray.push(num + 4);
  if (!(num === 4 || num === 9 || num === 14 || num === 19 || num ===24)) validArray.push(num + 1);
  if (!(num === 0 || num === 5 || num === 10 || num === 15 || num ===20)) validArray.push(num - 1);

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

function submit() {
  let word = currentWord.innerHTML.slice(19);
  if (word.length === 0) return;

  let points = calcPoints(word);
  let row = table.insertRow(1);

  row.className = "addedWord";

  row.innerHTML = `
  <td class="entry">${word}</td>
  <td class="points">${points}</td>
  `


  currentWord.innerHTML = currentWord.innerHTML.slice(0,19);

  lastLetter = [];
  let dice = board.querySelectorAll('.dice');
  dice.forEach(dice => dice.dataset.clicked = "false");

  let totalPoints = 0;
  let allPoints = table.querySelectorAll('.points');
  allPoints.forEach(row => totalPoints += parseInt(row.innerHTML));

  let total = table.querySelector('.total');
  total.innerHTML = totalPoints;


}

function calcPoints(word) {
  let length = word.length;
  if (length <= 2) return 0;
  if (length <= 4) return 1;
  if (length === 5) return 2;
  if (length === 6) return 3;
  if (length === 7) return 5;
  if (length >= 8) return 11;
}

function reset() {
  shake(dice, board);
  lastLetter = [];
  currentWord.innerHTML = "Current Word:&nbsp;";

  let removeRows = table.querySelectorAll(".addedWord");
  removeRows.forEach(row => row.remove());

  let total = table.querySelector('.total');
  total.innerHTML = 0;
}

shake(dice, board);
