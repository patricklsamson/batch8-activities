"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var circle,
    endGame = false,
    board = [["", "", ""], ["", "", ""], ["", "", ""]],
    i,
    // history = [],
// historyCounter = 0,
// historyStorage = [];
// OLD SOLUTION
// counter = 0;
// ADDED OBJECT EXERCISE
historyObj = {
  history: [],
  historyCounter: 0,
  historyStorage: [],
  prevHistory: function prevHistory() {
    var _this$historyStorage;

    var moveNum, moveMark; // PUSHING THE ITEMS OF MAIN ARRAY TO THE TEMPORARY ARRAY

    (_this$historyStorage = this.historyStorage).push.apply(_this$historyStorage, _toConsumableArray(this.history.splice(this.history.length - 1, 1)));

    for (i = 0; i < this.historyStorage.length; i++) {
      // HISTORY P INNER HTML ADD STRIKETHROUGH
      add_class(id("history-wrap").querySelectorAll(this.historyStorage[i].inner)[this.history.length], this.historyStorage[i]["delete"]); // REMOVE THE MARKS ONE BY ONE

      remove_class(qsel("[data-row=\"".concat(this.historyStorage[i].rowPos, "\"][data-col=\"").concat(this.historyStorage[i].colPos, "\"]")), this.historyStorage[i].marker);
    } // CONSOLE LOG OF HISTORY PER BUTTON PRESS


    for (i = 0; i < this.historyStorage.length; i++) {
      moveNum = this.historyCounter - this.historyStorage.indexOf(this.historyStorage[i]);
    }

    for (i = 0; i < this.historyStorage.length; i++) {
      moveMark = this.historyStorage[i].marker;
    }

    if (has_class(id("prev-btn"), "show")) {
      var _console, _console2;

      console.log("Move ".concat(moveNum, " with mark ").concat(moveMark.toUpperCase(), " was undone."));

      (_console = console).log.apply(_console, _toConsumableArray(this.historyStorage));

      (_console2 = console).log.apply(_console2, _toConsumableArray(this.history));
    } // SHOW NEXT BUTTON


    if (this.historyStorage.length < this.history.length) {
      add_class(id("next-btn"), "show");
    } // HIDE PREVIOUS BUTTON


    if (this.history.length == 0) {
      remove_class(id("prev-btn"), "show");
    }
  },
  nextHistory: function nextHistory() {
    var _this$history;

    var moveNum, moveMark; // PUSHING THE ITEMS OF TEMPORARY ARRAY BACK TO THE MAIN ARRAY

    (_this$history = this.history).push.apply(_this$history, _toConsumableArray(this.historyStorage.splice(this.historyStorage.length - 1, 1)));

    for (i = 0; i < this.history.length; i++) {
      // HISTORY P INNER HTML REMOVE STRIKETHROUGH
      remove_class(id("history-wrap").querySelectorAll(this.history[i].inner)[this.history.indexOf(this.history[i])], this.history[i]["delete"]); // PUT THE MARKS ONE BY ONE BACK IN THE BOARD AGAIN

      add_class(qsel("[data-row=\"".concat(this.history[i].rowPos, "\"][data-col=\"").concat(this.history[i].colPos, "\"]")), this.history[i].marker);
    } // CONSOLE LOG OF HISTORY PER BUTTON PRESS


    for (i = 0; i < this.history.length; i++) {
      moveNum = this.history.indexOf(this.history[i]) + 1;
    }

    for (i = 0; i < this.history.length; i++) {
      moveMark = this.history[i].marker;
    }

    if (has_class(id("next-btn"), "show")) {
      var _console3, _console4;

      console.log("Move ".concat(moveNum, " with mark ").concat(moveMark.toUpperCase(), " was redone."));

      (_console3 = console).log.apply(_console3, _toConsumableArray(this.history));

      (_console4 = console).log.apply(_console4, _toConsumableArray(this.historyStorage));
    } // SHOW PREVIOUS BUTTON


    if (this.history.length < this.historyStorage.length) {
      add_class(id("prev-btn"), "show");
    } // HIDE NEXT BUTTON


    if (this.historyStorage.length == 0) {
      remove_class(id("next-btn"), "show");
    }
  }
}; // ADDED OBJECT EXERCISE

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

var markChecker = function markChecker() {
  if (id("mark-checker").checked) {
    circle = true;
    id("player").innerHTML = "O";
    id("mark-holder-wrap").querySelectorAll("p")[0].id = "o";
    id("mark-holder-wrap").querySelectorAll("p")[1].id = "x";
    id("mark-holder1").innerHTML = "O";
    id("mark-holder2").innerHTML = "X";
    circleTurn();
  } else {
    circle = false;
    id("player").innerHTML = "X";
    crossTurn();
  }
};

var gameEnd = function gameEnd() {
  endGame = true;
  remove_class(id("tboard"), "x");
  remove_class(id("tboard"), "o");
  add_class(id("prev-btn"), "show");

  for (i = 0; i < qsel_all(".box").length; i++) {
    remove_class(qsel_all(".box")[i], "empty");
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
    } // OLD CODE
    // moves[counter] = [counter, mark, row, col];
    // counter++;
    // ADDED OBJECT EXERCISE
    // history[historyCounter] = [historyCounter, mark, row, col, "p", "strike"];
    // historyCounter++;


    historyObj.history[historyObj.historyCounter] = {
      marker: mark,
      rowPos: row,
      colPos: col,
      inner: "p",
      "delete": "strike"
    };
    historyObj.historyCounter++; // ADDED OBJECT EXERCISE

    var position = function position() {
      // OLD CODE
      // if (row == 0 && col == 0) {
      //   return "top leftmost box";
      // } else if (row == 0 && col == 1) {
      //   return "top middle box";
      // } else if (row == 0 && col == 2) {
      //   return "top rightmost box";
      // } else if (row == 1 && col == 0) {
      //   return "middle leftmost box";
      // } else if (row == 1 && col == 1) {
      //   return "middle box";
      // } else if (row == 1 && col == 2) {
      //   return "middle rightmost box";
      // } else if (row == 2 && col == 0) {
      //   return "bottom leftmost box";
      // } else if (row == 2 && col == 1) {
      //   return "bottom middle box";
      // } else if (row == 2 && col == 2) {
      //   return "bottom rightmost box";
      // }
      var text;

      switch (row + col) {
        case "0" + "0":
          text = "top leftmost";
          break;

        case "0" + "1":
          text = "top middle";
          break;

        case "0" + "2":
          text = "top rightmost";
          break;

        case "1" + "0":
          text = "middle leftmost";
          break;

        case "1" + "1":
          text = "middle";
          break;

        case "1" + "2":
          text = "middle rightmost";
          break;

        case "2" + "0":
          text = "bottom leftmost";
          break;

        case "2" + "1":
          text = "bottom middle";
          break;

        case "2" + "2":
          text = "bottom rightmost";
          break;
      }

      return text;
    }; // ADDED OBJECT EXERCISE


    console.log( // `Move ${historyCounter}: Player ${mark.toUpperCase()} puts their mark on the ${position()} box.`
    "Move ".concat(historyObj.historyCounter, ": Player ").concat(historyObj.history[historyObj.historyCounter - 1].marker.toUpperCase(), " puts their mark on the ").concat(position(), " box.")); // ADDED OBJECT EXERCISE

    var element = create_el("p");
    id("history-wrap").appendChild(element); // ADDED OBJECT EXERCISE
    // element.innerHTML = `${historyCounter} = ${mark.toUpperCase()} => ${position()}`;

    element.innerHTML = "".concat(historyObj.historyCounter, " = ").concat(mark.toUpperCase(), " => ").concat(position()); // ADDED OBJECT EXERCISE

    var scorer = function scorer(el) {
      setTimeout(function () {
        var element = create_el("span");
        element.innerHTML = "l";
        id(el).appendChild(element);

        for (i = 4; i < id(el).querySelectorAll("span").length; i += 5) {
          add_class(id(el).querySelectorAll("span")[i - 1], "five");
          add_class(id(el).querySelectorAll("span")[i - 1], "img");
          add_class(id(el).querySelectorAll("span")[i - 1], "con");
          id(el).querySelectorAll("span")[i].innerHTML = " - ";
        }
      }, 250);
    };

    var winMessage = function winMessage() {
      // ADDED OBJECT EXERCISE
      // if (history.length == 9) {
      //   id("tooltip").innerHTML = "It's a draw!";
      //   console.log("The players ended in a draw.");
      //   scorer("draw");
      // } else {
      //   id("tooltip").innerHTML = `Player ${mark.toUpperCase()} wins!`;
      //   console.log(`Player ${mark.toUpperCase()} is the winner!`);
      //   scorer(mark);
      // }
      if (historyObj.history.length == 9) {
        id("tooltip").innerHTML = "It's a draw!";
        console.log("The players ended in a draw.");
        scorer("draw");
      } else {
        id("tooltip").innerHTML = "Player ".concat(mark.toUpperCase(), " wins!");
        console.log("Player ".concat(mark.toUpperCase(), " is the winner!"));
        scorer(mark);
      } // ADDED OBJECT EXERCISE

    }; // HORIZONTAL WINNING COMBOS


    for (var _row = 0; _row < board.length; _row++) {
      var _a = board[_row][0],
          _b = board[_row][1],
          _c = board[_row][2];

      if (_a && _a === _b && _b === _c) {
        gameEnd();
        winMessage();
        return;
      }
    } // VERTICAL WINNING COMBOS


    for (var _col = 0; _col < board.length; _col++) {
      var _a2 = board[0][_col],
          _b2 = board[1][_col],
          _c2 = board[2][_col];

      if (_a2 && _a2 === _b2 && _b2 === _c2) {
        gameEnd();
        winMessage();
        return;
      }
    } // DIAGONAL WINNING COMBOS


    var a = board[0][0],
        b = board[2][2],
        c = board[0][2],
        d = board[2][0],
        f = board[1][1];

    if (a && a === b && b === f || c && c === d && d == f) {
      gameEnd();
      winMessage();
    } // ADDED OBJECT EXERCISE
    // if (history.length == 9) {
    //   gameEnd();
    //   winMessage();
    // }


    if (historyObj.history.length == 9) {
      gameEnd();
      winMessage();
    } // ADDED OBJECT EXERCISE

  }

  remove_event(e.target || e.srcElement, "click", handler);
};

var reset = function reset() {
  endGame = false;
  board = [["", "", ""], ["", "", ""], ["", "", ""]]; // ADDED OBJECT EXERCISE
  // history = [];
  // historyCounter = 0;
  // historyStorage = [];
  // OLD SOLUTION
  // counter = 0;

  historyObj.history = [];
  historyObj.historyCounter = 0;
  historyObj.historyStorage = []; // ADDED OBJECT EXERCISE

  startGame();
  markChecker();
  console.clear();
  id("history-wrap").innerHTML = "";
  qsel_all(".box").forEach(function (box) {
    add_event(box, "click", handler);
    add_class(box, "empty");
    remove_class(box, "x");
    remove_class(box, "o");
  });
  remove_class(id("prev-btn"), "show");
  remove_class(id("next-btn"), "show");
}; // const prevHistory = (arr1, arr2) => {
//   let moveNum, moveMark;
//   // PUSHING THE ITEMS OF MAIN ARRAY TO THE TEMPORARY ARRAY
//   arr1.push(...arr2.splice(arr2.length - 1, 1));
//   for (i = 0; i < arr1.length; i++) {
//     // HISTORY P INNER HTML ADD STRIKETHROUGH
//     add_class(
//       id("history-wrap").querySelectorAll(arr1[i][4])[arr1[i][0]],
//       arr1[i][5]
//     );
//     // REMOVE THE MARKS ONE BY ONE
//     remove_class(
//       qsel(`[data-row="${arr1[i][2]}"][data-col="${arr1[i][3]}"]`),
//       arr1[i][1]
//     );
//   }
//   // CONSOLE LOG OF HISTORY PER BUTTON PRESS
//   for (i = 0; i < arr1.length; i++) {
//     moveNum = arr1[i][0] + 1;
//   }
//   for (i = 0; i < arr1.length; i++) {
//     moveMark = arr1[i][1];
//   }
//   if (has_class(id("prev-btn"), "show")) {
//     console.log(
//       `Move ${moveNum} with mark ${moveMark.toUpperCase()} was undone.`
//     );
//     console.log(...arr1);
//     console.log(...arr2);
//   }
// };
// const nextHistory = (arr1, arr2) => {
//   let moveNum, moveMark;
//   // PUSHING THE ITEMS OF TEMPORARY ARRAY BACK TO THE MAIN ARRAY
//   arr1.push(...arr2.splice(arr2.length - 1, 1));
//   for (i = 0; i < arr1.length; i++) {
//     // HISTORY P INNER HTML REMOVE STRIKETHROUGH
//     remove_class(
//       id("history-wrap").querySelectorAll(arr1[i][4])[arr1[i][0]],
//       arr1[i][5]
//     );
//     // PUT THE MARKS ONE BY ONE BACK IN THE BOARD AGAIN
//     add_class(
//       qsel(`[data-row="${arr1[i][2]}"][data-col="${arr1[i][3]}"]`),
//       arr1[i][1]
//     );
//   }
//   // CONSOLE LOG OF HISTORY PER BUTTON PRESS
//   for (i = 0; i < arr1.length; i++) {
//     moveNum = arr1[i][0] + 1;
//   }
//   for (i = 0; i < arr1.length; i++) {
//     moveMark = arr1[i][1];
//   }
//   if (has_class(id("next-btn"), "show")) {
//     console.log(
//       `Move ${moveNum} with mark ${moveMark.toUpperCase()} was redone.`
//     );
//     console.log(...arr1);
//     console.log(...arr2);
//   }
// };
// const showBtn = (btn, arr1, arr2) => {
//   if (arr1.length < arr2.length) {
//     add_class(btn, "show");
//   }
// };
// const hideBtn = (btn, arr) => {
//   if (arr.length == 0) {
//     remove_class(btn, "show");
//   }
// };