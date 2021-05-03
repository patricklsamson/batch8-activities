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
    moves = [],
    storage = [];
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

    for (i = 0; i < qsa(".box").length; i++) {
      qsa(".box")[i].style.cursor = "auto";
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

      // moves[counter] = [counter, mark, row, col];
      // counter++;

      history[historyCounter] = [historyCounter, mark, row, col];
      historyCounter++;

      const position = () => {
        if (row == 0 && col == 0) {
          return "top leftmost box";
        } else if (row == 0 && col == 1) {
          return "top middle box";
        } else if (row == 0 && col == 2) {
          return "top rightmost box";
        } else if (row == 1 && col == 0) {
          return "middle leftmost box";
        } else if (row == 1 && col == 1) {
          return "middle box";
        } else if (row == 1 && col == 2) {
          return "middle rightmost box";
        } else if (row == 2 && col == 0) {
          return "bottom leftmost box";
        } else if (row == 2 && col == 1) {
          return "bottom middle box";
        } else if (row == 2 && col == 2) {
          return "bottom rightmost box";
        }
      };

      console.log(
        `Move ${historyCounter}: Player ${mark.toUpperCase()} puts their mark on the ${position()}.`
      );

      moves.push([mark, row, col]);

      for (let row = 0; row < board.length; row++) {
        let a = board[row][0],
          b = board[row][1],
          c = board[row][2];

        if (a && a === b && b === c) {
          gameEnd();

          id(
            "tooltip"
          ).innerHTML = `Player ${mark.toUpperCase()} is the winner.`;

          console.log(`Player ${mark.toUpperCase()} is the winner.`);
          return;
        }
      }

      for (let col = 0; col < board.length; col++) {
        let a = board[0][col],
          b = board[1][col],
          c = board[2][col];

        if (a && a === b && b === c) {
          gameEnd();
          id(
            "tooltip"
          ).innerHTML = `Player ${mark.toUpperCase()} is the winner.`;

          console.log(`Player ${mark.toUpperCase()} is the winner.`);
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
        id("tooltip").innerHTML = `Player ${mark.toUpperCase()} is the winner.`;
        console.log(`Player ${mark.toUpperCase()} is the winner.`);
      }

      if (moves.length == 9) {
        gameEnd();
        id("tooltip").innerHTML = "The players ended in a draw.";
        console.log("The players ended in a draw.");
      }
    }

    remove_event(e.target || e.srcElement, "click", handler);
  };

  qsa(".box").forEach((box) => {
    add_event(box, "click", handler);
  });

  add_event(id("reset-btn"), "click", () => {
    endGame = false;
    board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];

    history = [];
    historyCounter = 0;
    moves = [];
    storage = [];
    // counter = 0;

    console.clear();
    remove_class(id("modal"), "hide");
    id("mark-checker").checked = false;
    startGame();

    qsa(".box").forEach((box) => {
      add_event(box, "click", handler);
      add_class(box, "empty");
      remove_class(box, "x");
      remove_class(box, "o");
      box.style.cursor = "pointer";
    });

    remove_class(id("prev-btn"), "show");
    remove_class(id("next-btn"), "show");
  });

  add_event(id("prev-btn"), "click", () => {
    storage.push(...moves.splice(moves.length - 1, 1));

    for (i = 0; i < storage.length; i++) {
      remove_class(
        qs(`[data-row="${storage[i][1]}"][data-col="${storage[i][2]}"]`),
        storage[i][0]
      );
    }

    if (storage.length < moves.length) {
      add_class(id("next-btn"), "show");
    }

    if (moves.length == 0) {
      remove_class(id("prev-btn"), "show");
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
    moves.push(...storage.splice(storage.length - 1, 1));

    for (i = 0; i < moves.length; i++) {
      add_class(
        qs(`[data-row="${moves[i][1]}"][data-col="${moves[i][2]}"]`),
        moves[i][0]
      );
    }

    if (moves.length < storage.length) {
      add_class(id("prev-btn"), "show");
    }

    if (storage.length == 0) {
      remove_class(id("next-btn"), "show");
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
});
