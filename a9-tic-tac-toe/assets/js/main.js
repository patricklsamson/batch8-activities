doc_ready(() => {
  let circle,
    endGame = false,
    board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ],
    i,
    history = [],
    historyCounter = 0,
    historyStorage = [],
    moves = [],
    movesStorage = [];
  // counter = 0;

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

  startGame();

  add_event(id("mark-checker"), "click", () => {
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
  });

  add_event(id("proceed-btn"), "click", () => {
    add_class(id("modal"), "hide");
  });

  const gameEnd = () => {
    endGame = true;
    remove_class(id("tboard"), "x");
    remove_class(id("tboard"), "o");
    add_class(id("prev-btn"), "show");

    for (i = 0; i < qsel_all(".box").length; i++) {
      qsel_all(".box")[i].style.cursor = "auto";
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
      box.style.cursor = "auto";

      if ((circle = !circle)) {
        circleTurn();
      } else {
        crossTurn();
      }

      // moves[counter] = [counter, mark, row, col];
      // counter++;

      history[historyCounter] = [historyCounter, mark, row, col, "p", "strike"];
      historyCounter++;

      const position = () => {
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

      console.log(
        `Move ${historyCounter}: Player ${mark.toUpperCase()} puts their mark on the ${position()} box.`
      );

      const element = create_el("p");

      id("history-wrap").appendChild(element);
      element.innerHTML = `${historyCounter} = ${mark.toUpperCase()} => ${position()}`;

      moves.push([mark, row, col]);

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
        if (moves.length == 9) {
          id("tooltip").innerHTML = "It's a draw!";
          console.log("The players ended in a draw.");
          scorer("draw");
        } else {
          id("tooltip").innerHTML = `Player ${mark.toUpperCase()} wins!`;
          console.log(`Player ${mark.toUpperCase()} is the winner!`);
          scorer(mark);
        }
      };

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

      let a = board[0][0],
        b = board[2][2],
        c = board[0][2],
        d = board[2][0],
        f = board[1][1];

      if ((a && a === b && b === f) || (c && c === d && d == f)) {
        gameEnd();
        winMessage();
      }

      if (moves.length == 9) {
        gameEnd();
        winMessage();
        // id("tooltip").innerHTML = "It's a draw!";
        // console.log("The players ended in a draw.");
        // scorer("draw");
      }
    }

    remove_event(e.target || e.srcElement, "click", handler);
  };

  qsel_all(".box").forEach((box) => {
    add_event(box, "click", handler);
  });

  const reset = () => {
    endGame = false;
    board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];

    history = [];
    historyCounter = 0;
    historyStorage = [];
    moves = [];
    movesStorage = [];
    // counter = 0;

    startGame();
    markChecker();

    console.clear();
    id("history-wrap").innerHTML = "";

    qsel_all(".box").forEach((box) => {
      add_event(box, "click", handler);
      add_class(box, "empty");
      remove_class(box, "x");
      remove_class(box, "o");
      box.style.cursor = "pointer";
    });

    remove_class(id("prev-btn"), "show");
    remove_class(id("next-btn"), "show");
  };

  add_event(id("reset-btn"), "click", reset);

  add_event(id("newGame-btn"), "click", () => {
    reset();
    remove_class(id("modal"), "hide");
    id("mark-checker").checked = false;
    startGame();
    id("mark-holder-wrap").querySelectorAll("p")[0].id = "x";
    id("mark-holder-wrap").querySelectorAll("p")[1].id = "o";
    id("mark-holder1").innerHTML = "X";
    id("mark-holder2").innerHTML = "O";
    id("x").innerHTML = "<q id='mark-holder1'>X</q> =&nbsp;";
    id("o").innerHTML = "<q id='mark-holder2'>O</q> =&nbsp;";
    id("draw").innerHTML = "<q>Draws</q> =&nbsp;";
  });

  add_event(id("prev-btn"), "click", () => {
    movesStorage.push(...moves.splice(moves.length - 1, 1));

    for (i = 0; i < movesStorage.length; i++) {
      remove_class(
        qsel(
          `[data-row="${movesStorage[i][1]}"][data-col="${movesStorage[i][2]}"]`
        ),
        movesStorage[i][0]
      );
    }

    if (movesStorage.length < moves.length) {
      add_class(id("next-btn"), "show");
    }

    if (moves.length == 0) {
      remove_class(id("prev-btn"), "show");
    }

    historyStorage.push(...history.splice(history.length - 1, 1));

    for (i = 0; i < historyStorage.length; i++) {
      add_class(
        id("history-wrap").querySelectorAll(historyStorage[i][4])[
          historyStorage[i][0]
        ],
        historyStorage[i][5]
      );
    }

    // if (counter == moves.length) {
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

  add_event(id("next-btn"), "click", () => {
    moves.push(...movesStorage.splice(movesStorage.length - 1, 1));

    for (i = 0; i < moves.length; i++) {
      add_class(
        qsel(`[data-row="${moves[i][1]}"][data-col="${moves[i][2]}"]`),
        moves[i][0]
      );
    }

    if (moves.length < movesStorage.length) {
      add_class(id("prev-btn"), "show");
    }

    if (movesStorage.length == 0) {
      remove_class(id("next-btn"), "show");
    }

    history.push(...historyStorage.splice(historyStorage.length - 1, 1));

    for (i = 0; i < history.length; i++) {
      remove_class(
        id("history-wrap").querySelectorAll(history[i][4])[history[i][0]],
        history[i][5]
      );
    }

    // if (counter < 0) {
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

  add_event(id("history"), "click", () => {
    toggle_class(id("board-wrap"), "hide");
  });
});
