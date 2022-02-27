let circle,
  endGame = false,
  board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
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
    prevHistory: function () {
      let moveNum, moveMark;

      // PUSHING THE ITEMS OF MAIN ARRAY TO THE TEMPORARY ARRAY
      this.historyStorage.push(
        ...this.history.splice(this.history.length - 1, 1)
      );

      for (i = 0; i < this.historyStorage.length; i++) {
        // HISTORY P INNER HTML ADD STRIKETHROUGH
        add_class(
          id("history-wrap").querySelectorAll(this.historyStorage[i].inner)[
            this.history.length
          ],
          this.historyStorage[i].delete
        );

        // REMOVE THE MARKS ONE BY ONE
        remove_class(
          qsel(
            `[data-row="${this.historyStorage[i].rowPos}"][data-col="${this.historyStorage[i].colPos}"]`
          ),
          this.historyStorage[i].marker
        );
      }

      // CONSOLE LOG OF HISTORY PER BUTTON PRESS
      for (i = 0; i < this.historyStorage.length; i++) {
        moveNum =
          this.historyCounter -
          this.historyStorage.indexOf(this.historyStorage[i]);
      }

      for (i = 0; i < this.historyStorage.length; i++) {
        moveMark = this.historyStorage[i].marker;
      }

      if (has_class(id("prev-btn"), "show")) {
        console.log(
          `Move ${moveNum} with mark ${moveMark.toUpperCase()} was undone.`
        );

        console.log(...this.historyStorage);
        console.log(...this.history);
      }

      // SHOW NEXT BUTTON
      if (this.historyStorage.length < this.history.length) {
        add_class(id("next-btn"), "show");
      }

      // HIDE PREVIOUS BUTTON
      if (this.history.length == 0) {
        remove_class(id("prev-btn"), "show");
      }
    },
    nextHistory: function () {
      let moveNum, moveMark;

      // PUSHING THE ITEMS OF TEMPORARY ARRAY BACK TO THE MAIN ARRAY
      this.history.push(
        ...this.historyStorage.splice(this.historyStorage.length - 1, 1)
      );

      for (i = 0; i < this.history.length; i++) {
        // HISTORY P INNER HTML REMOVE STRIKETHROUGH
        remove_class(
          id("history-wrap").querySelectorAll(this.history[i].inner)[
            this.history.indexOf(this.history[i])
          ],
          this.history[i].delete
        );

        // PUT THE MARKS ONE BY ONE BACK IN THE BOARD AGAIN
        add_class(
          qsel(
            `[data-row="${this.history[i].rowPos}"][data-col="${this.history[i].colPos}"]`
          ),
          this.history[i].marker
        );
      }

      // CONSOLE LOG OF HISTORY PER BUTTON PRESS
      for (i = 0; i < this.history.length; i++) {
        moveNum = this.history.indexOf(this.history[i]) + 1;
      }

      for (i = 0; i < this.history.length; i++) {
        moveMark = this.history[i].marker;
      }

      if (has_class(id("next-btn"), "show")) {
        console.log(
          `Move ${moveNum} with mark ${moveMark.toUpperCase()} was redone.`
        );

        console.log(...this.history);
        console.log(...this.historyStorage);
      }

      // SHOW PREVIOUS BUTTON
      if (this.history.length < this.historyStorage.length) {
        add_class(id("prev-btn"), "show");
      }

      // HIDE NEXT BUTTON
      if (this.historyStorage.length == 0) {
        remove_class(id("next-btn"), "show");
      }
    },
  };
// ADDED OBJECT EXERCISE

const circleTurn = () => {
  add_class(id("tboard"), "o");
  remove_class(id("tboard"), "x");
  id("tooltip").innerHTML = "Player O's turn.";
};

const crossTurn = () => {
  add_class(id("tboard"), "x");
  remove_class(id("tboard"), "o");
  id("tooltip").innerHTML = "Player X's turn.";
};

const startGame = () => {
  circle = false;
  id("player").innerHTML = "X";

  if (circle) {
    circleTurn();
  } else {
    crossTurn();
  }
};

const markChecker = () => {
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

const gameEnd = () => {
  endGame = true;
  remove_class(id("tboard"), "x");
  remove_class(id("tboard"), "o");
  add_class(id("prev-btn"), "show");

  for (i = 0; i < qsel_all(".box").length; i++) {
    remove_class(qsel_all(".box")[i], "empty");
  }
};

const handler = (e) => {
  if (!endGame) {
    const box = e.target || e.srcElement,
      mark = circle ? "o" : "x",
      row = box.dataset.row || box.getAttribute("data-row"),
      col = box.dataset.col || box.getAttribute("data-col");

    board[row][col] = mark;
    add_class(box, mark);
    remove_class(box, "empty");

    if ((circle = !circle)) {
      circleTurn();
    } else {
      crossTurn();
    }

    // OLD CODE
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
      delete: "strike",
    };

    historyObj.historyCounter++;
    // ADDED OBJECT EXERCISE

    const position = () => {
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

      let text;

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
    };

    // ADDED OBJECT EXERCISE
    console.log(
      // `Move ${historyCounter}: Player ${mark.toUpperCase()} puts their mark on the ${position()} box.`
      `Move ${historyObj.historyCounter}: Player ${historyObj.history[
        historyObj.historyCounter - 1
      ].marker.toUpperCase()} puts their mark on the ${position()} box.`
    );
    // ADDED OBJECT EXERCISE

    const element = create_el("p");

    id("history-wrap").appendChild(element);

    // ADDED OBJECT EXERCISE
    // element.innerHTML = `${historyCounter} = ${mark.toUpperCase()} => ${position()}`;
    element.innerHTML = `${
      historyObj.historyCounter
    } = ${mark.toUpperCase()} => ${position()}`;
    // ADDED OBJECT EXERCISE

    const scorer = (el) => {
      setTimeout(() => {
        let element = create_el("span");

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

    const winMessage = () => {
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

      // OLD CODE - BUG WHEN ALL SQUARES ARE FILLED UP BUT THERE SHOULD BE A WINNER NOT A DRAW
      // if (historyObj.history.length == 9) {
      //   id("tooltip").innerHTML = "It's a draw!";
      //   console.log("The players ended in a draw.");
      //   scorer("draw");
      // } else {
      //   id("tooltip").innerHTML = `Player ${mark.toUpperCase()} wins!`;
      //   console.log(`Player ${mark.toUpperCase()} is the winner!`);
      //   scorer(mark);
      // }

      // NEW CODE
      let a = board[0][0],
        b = board[2][2],
        c = board[0][2],
        d = board[2][0],
        f = board[1][1];

      if (historyObj.history.length == 9) {
        if (
          (a && a === f && f === b) ||
          ((a && a === b && b === f) || (c && c === d && d === f))
        ) {
          id("tooltip").innerHTML = `Player ${mark.toUpperCase()} wins!`;
          console.log(`Player ${mark.toUpperCase()} is the winner!`);
          scorer(mark);
        } else {
          id("tooltip").innerHTML = "It's a draw!";
          console.log("The players ended in a draw.");
          scorer("draw");
        }
      } else {
        id("tooltip").innerHTML = `Player ${mark.toUpperCase()} wins!`;
        console.log(`Player ${mark.toUpperCase()} is the winner!`);
        scorer(mark);
      }
      // ADDED OBJECT EXERCISE
    };

    // HORIZONTAL WINNING COMBOS
    for (let row = 0; row < board.length; row++) {
      let a = board[row][0],
        b = board[row][1],
        c = board[row][2];

      if (a && a === b && b === c) {
        gameEnd();
        winMessage();
        return;
      }
    }

    // VERTICAL WINNING COMBOS
    for (let col = 0; col < board.length; col++) {
      let a = board[0][col],
        b = board[1][col],
        c = board[2][col];

      if (a && a === b && b === c) {
        gameEnd();
        winMessage();
        return;
      }
    }

    // DIAGONAL WINNING COMBOS
    let a = board[0][0],
      b = board[2][2],
      c = board[0][2],
      d = board[2][0],
      f = board[1][1];

    if ((a && a === b && b === f) || (c && c === d && d === f)) {
      gameEnd();
      winMessage();
    }

    // ADDED OBJECT EXERCISE
    // if (history.length == 9) {
    //   gameEnd();
    //   winMessage();
    // }

    if (historyObj.history.length == 9) {
      gameEnd();
      winMessage();
    }
    // ADDED OBJECT EXERCISE
  }

  remove_event(e.target || e.srcElement, "click", handler);
};

const reset = () => {
  endGame = false;
  board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  // ADDED OBJECT EXERCISE
  // history = [];
  // historyCounter = 0;
  // historyStorage = [];

  // OLD SOLUTION
  // counter = 0;

  historyObj.history = [];
  historyObj.historyCounter = 0;
  historyObj.historyStorage = [];
  // ADDED OBJECT EXERCISE

  startGame();
  markChecker();

  console.clear();
  id("history-wrap").innerHTML = "";

  qsel_all(".box").forEach((box) => {
    add_event(box, "click", handler);
    add_class(box, "empty");
    remove_class(box, "x");
    remove_class(box, "o");
  });

  remove_class(id("prev-btn"), "show");
  remove_class(id("next-btn"), "show");
};

// const prevHistory = (arr1, arr2) => {
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
