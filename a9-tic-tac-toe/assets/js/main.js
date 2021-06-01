doc_ready(() => {
  startGame();
  add_event(id("mark-checker"), "click", markChecker);

  add_event(id("proceed-btn"), "click", () => {
    add_class(id("modal"), "hide");
  });

  qsel_all(".box").forEach((box) => {
    add_event(box, "click", handler);
  });

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
    // ADDED OBJECT EXERCISE
    // prevHistory(historyStorage, history);
    // showBtn(id("next-btn"), historyStorage, history);
    // hideBtn(id("prev-btn"), history);
    historyObj.prevHistory();
    // ADDED OBJECT EXERCISE

    // OLD CODE
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
    // ADDED OBJECT EXERCISE
    // nextHistory(history, historyStorage);
    // showBtn(id("prev-btn"), history, historyStorage);
    // hideBtn(id("next-btn"), historyStorage);
    historyObj.nextHistory();
    // ADDED OBJECT EXERCISE

    // OLD CODE
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
