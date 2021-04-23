"use strict";

doc_ready(function () {
  var circle,
      endGame = false,
      board = [["", "", ""], ["", "", ""], ["", "", ""]],
      moves = [],
      counter = 0;

  var startGame = function startGame() {
    circle = false;

    if (circle) {
      add_class(id("tboard"), "o");
      remove_class(id("tboard"), "x");
    } else {
      add_class(id("tboard"), "x");
      remove_class(id("tboard"), "o");
    }

    id("tooltip").innerHTML = "X's turn.";
  };

  startGame();

  var gameEnd = function gameEnd() {
    endGame = true;
    remove_class(id("tboard"), "x");
    remove_class(id("tboard"), "o");
    add_class(id("prev-btn"), "show");

    for (var i = 0; i < qsa(".box").length; i++) {
      qsa(".box")[i].style.cursor = "auto";
    }
  };

  var handler = function handler(e) {
    if (endGame === false) {
      var box = e.target || e.srcElement,
          mark = circle ? "o" : "x",
          row = box.dataset.row || box.getAttribute("data-row"),
          col = box.dataset.col || box.getAttribute("data-col");
      board[row][col] = mark;
      add_class(box, mark);
      remove_class(box, "empty");

      if (circle = !circle) {
        add_class(id("tboard"), "o");
        remove_class(id("tboard"), "x");
        id("tooltip").innerHTML = "O's turn.";
      } else {
        add_class(id("tboard"), "x");
        remove_class(id("tboard"), "o");
        id("tooltip").innerHTML = "X's turn.";
      }

      moves[counter] = [counter, mark, box.dataset.row || box.getAttribute("data-row"), box.dataset.col || box.getAttribute("data-col")];
      counter++;

      for (var _row = 0; _row < board.length; _row++) {
        var _a = board[_row][0],
            _b = board[_row][1],
            _c = board[_row][2];

        if (_a && _a === _b && _b === _c) {
          gameEnd();
          id("tooltip").innerHTML = "".concat(mark.toUpperCase(), " is the winner.");
          break;
        }
      }

      for (var _col = 0; _col < board.length; _col++) {
        var _a2 = board[0][_col],
            _b2 = board[1][_col],
            _c2 = board[2][_col];

        if (_a2 && _a2 === _b2 && _b2 === _c2) {
          gameEnd();
          id("tooltip").innerHTML = "".concat(mark.toUpperCase(), " is the winner.");
          break;
        }
      }

      var a = board[0][0],
          b = board[2][2],
          c = board[0][2],
          d = board[2][0],
          f = board[1][1];

      if (a && a === b && b === f || c && c === d && d == f) {
        gameEnd();
        id("tooltip").innerHTML = "".concat(mark.toUpperCase(), " is the winner.");
      }

      if (moves.length == 9) {
        gameEnd();
        id("tooltip").innerHTML = "It's a Draw.";
      }
    }

    remove_event(e, "click", handler);
  };

  qsa(".box").forEach(function (box) {
    add_event(box, "click", handler);
  });
  add_event(id("reset-btn"), "click", function () {
    endGame = false;
    board = [["", "", ""], ["", "", ""], ["", "", ""]];
    moves = [];
    counter = 0;
    startGame();
    qsa(".box").forEach(function (box) {
      add_event(box, "click", handler);
      add_class(box, "empty");
      remove_class(box, "x");
      remove_class(box, "o");
      box.style.cursor = "pointer";
    });
    remove_class(id("prev-btn"), "show");
    remove_class(id("next-btn"), "show");
  });
  add_event(id("prev-btn"), "click", function () {
    if (counter === moves.length) {
      counter--;
    }

    if (counter >= 0) {
      add_class(id("next-btn"), "show");
      remove_class(qs("[data-row='" + moves[counter][2] + "'][data-col='" + moves[counter][3] + "']"), moves[counter][1]);

      if (counter === 0) {
        remove_class(id("prev-btn"), "show");
      } else {
        counter--;
      }
    }
  });
  add_event(id("next-btn"), "click", function () {
    if (counter < 0) {
      counter++;
    }

    if (counter < moves.length) {
      add_class(id("prev-btn"), "show");
      add_class(qs("[data-row='" + moves[counter][2] + "'][data-col='" + moves[counter][3] + "']"), moves[counter][1]);

      if (counter === moves.length - 1) {
        remove_class(id("next-btn"), "show");
      } else {
        counter++;
      }
    }
  });
});