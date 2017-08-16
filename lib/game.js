const Board = require("./board");

document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementById('boggleCanvas');
  const ctx = canvas.getContext('2d');

  new Board(ctx).start();
});
