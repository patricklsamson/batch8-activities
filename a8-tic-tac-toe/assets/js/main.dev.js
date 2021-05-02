"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

doc_ready(function () {
  var circle,
      endGame = false,
      board = [["", "", ""], ["", "", ""], ["", "", ""]],
      i,
      moves = [],
      storage = []; // counter = 0;

  var circleTurn = function circleTurn() {
    add_class(id("tboard"), "o");
    remove_class(id("tboard"), "x");
    id("tooltip").innerHTML = "Player O's turn.";
  };

  var crossTurn = function crossTurn() {
    add_class(id("tboard"), "x");
    remove_class(id("tboard"), "o");
    id("tooltip").innerHTML = "Player X's turn.";
  };

  var startGame = function startGame() {
    circle = false;
    id("player").innerHTML = "X";

    if (circle) {
      circleTurn();
    } else {
      crossTurn();
    }
  };

  startGame();
  add_event(id("mark-checker"), "click", function () {
    if (id("mark-checker").checked) {
      circle = true;
      id("player").innerHTML = "O";
      circleTurn();
    } else {
      circle = false;
      id("player").innerHTML = "X";
      crossTurn();
    }
  });
  add_event(id("proceed-btn"), "click", function () {
    add_class(id("modal"), "hide");
  });

  var gameEnd = function gameEnd() {
    endGame = true;
    remove_class(id("tboard"), "x");
    remove_class(id("tboard"), "o");
    add_class(id("prev-btn"), "show");

    for (i = 0; i < qsa(".box").length; i++) {
      qsa(".box")[i].style.cursor = "auto";
    }
  };

  var handler = function handler(e) {
    if (!endGame) {
      var box = e.target || e.srcElement,
          mark = circle ? "o" : "x",
          row = box.dataset.row || box.getAttribute("data-row"),
          col = box.dataset.col || box.getAttribute("data-col");
      board[row][col] = mark;
      add_class(box, mark);
      remove_class(box, "empty");

      if (circle = !circle) {
        circleTurn();
      } else {
        crossTurn();
      } // moves[counter] = [counter, mark, row, col];
      // counter++;


      moves.push([mark, row, col]);

      for (var _row = 0; _row < board.length; _row++) {
        var _a = board[_row][0],
            _b = board[_row][1],
            _c = board[_row][2];

        if (_a && _a === _b && _b === _c) {
          gameEnd();
          id("tooltip").innerHTML = "Player ".concat(mark.toUpperCase(), " is the winner.");
          return;
        }
      }

      for (var _col = 0; _col < board.length; _col++) {
        var _a2 = board[0][_col],
            _b2 = board[1][_col],
            _c2 = board[2][_col];

        if (_a2 && _a2 === _b2 && _b2 === _c2) {
          gameEnd();
          id("tooltip").innerHTML = "Player ".concat(mark.toUpperCase(), " is the winner.");
          return;
        }
      }

      var a = board[0][0],
          b = board[2][2],
          c = board[0][2],
          d = board[2][0],
          f = board[1][1];

      if (a && a === b && b === f || c && c === d && d == f) {
        gameEnd();
        id("tooltip").innerHTML = "Player ".concat(mark.toUpperCase(), " is the winner.");
      }

      if (moves.length == 9) {
        gameEnd();
        id("tooltip").innerHTML = "The players ended in a Draw.";
      }
    }

    remove_event(e.target || e.srcElement, "click", handler);
  };

  qsa(".box").forEach(function (box) {
    add_event(box, "click", handler);
  });
  add_event(id("reset-btn"), "click", function () {
    endGame = false;
    board = [["", "", ""], ["", "", ""], ["", "", ""]];
    moves = [];
    storage = []; // counter = 0;

    remove_class(id("modal"), "hide");
    id("mark-checker").checked = false;
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
    var _storage;

    (_storage = storage).push.apply(_storage, _toConsumableArray(moves.splice(moves.length - 1, 1)));

    for (i = 0; i < storage.length; i++) {
      remove_class(qs("[data-row=\"".concat(storage[i][1], "\"][data-col=\"").concat(storage[i][2], "\"]")), storage[i][0]);
    }

    if (storage.length < moves.length) {
      add_class(id("next-btn"), "show");
    }

    if (moves.length == 0) {
      remove_class(id("prev-btn"), "show");
    } // if (counter == moves.length) {
    //   counter--;
    // }
    // if (counter >= 0) {
    //   add_class(id("next-btn"), "show");
    //   remove_class(
    //     qs(
    //       "[data-row='" +
    //         moves[counter][2] +
    //         "'][data-col='" +
    //         moves[counter][3] +
    //         "']"
    //     ),
    //     moves[counter][1]
    //   );
    //   if (counter == 0) {
    //     remove_class(id("prev-btn"), "show");
    //   } else {
    //     counter--;
    //   }
    // }

  });
  add_event(id("next-btn"), "click", function () {
    var _moves;

    (_moves = moves).push.apply(_moves, _toConsumableArray(storage.splice(storage.length - 1, 1)));

    for (i = 0; i < moves.length; i++) {
      add_class(qs("[data-row=\"".concat(moves[i][1], "\"][data-col=\"").concat(moves[i][2], "\"]")), moves[i][0]);
    }

    if (moves.length < storage.length) {
      add_class(id("prev-btn"), "show");
    }

    if (storage.length == 0) {
      remove_class(id("next-btn"), "show");
    } // if (counter < 0) {
    //   counter++;
    // }
    // if (counter < moves.length) {
    //   add_class(id("prev-btn"), "show");
    //   add_class(
    //     qs(
    //       "[data-row='" +
    //         moves[counter][2] +
    //         "'][data-col='" +
    //         moves[counter][3] +
    //         "']"
    //     ),
    //     moves[counter][1]
    //   );
    //   if (counter == moves.length - 1) {
    //     remove_class(id("next-btn"), "show");
    //   } else {
    //     counter++;
    //   }
    // }

  });
});