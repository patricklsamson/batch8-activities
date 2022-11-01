class Helper {
  // ONCE FIRST VALUE OR CHARACTER INPUTTED IS A NUMBER IN ALL NAME INPUTS ACROSS THE DOM, ALERT WILL EXEECUTE
  static first_char() {
    qsel_all("[id*='-name']").forEach((input) => {
      add_event(input, "keyup", () => {
        if (
          input.value.length > 0 &&
          !(
            input.value.charCodeAt(0) > 31 &&
            (input.value.charCodeAt(0) < 48 || input.value.charCodeAt(0) > 57)
          )
        ) {
          alert("Invalid input!");
          input.value = "";
        }
      });
    });
  }

  static click_copy(element) {
    // ONE CLICK COPY FUNCTION OF A STRING OR TEXT
    add_event(element, "click", () => {
      document.execCommand("copy");
    });

    // SETS OR PASSES THE TEXT COPIED INTO THE CLIPBOARD FOR PASTING
    add_event(element, "copy", (e) => {
      e.preventDefault();

      if (e.clipboardData) {
        e.clipboardData.setData("text/plain", `0${element.textContent}`);
      }
    });
  }

  static time_stamp() {
    const today = new Date(),
      month =
        today.getMonth() < 10
          ? `0${today.getMonth() + 1}`
          : today.getMonth() + 1,
      date = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate(),
      dateFull = `${month}/${date}/${today.getFullYear()}`,
      hour = today.getHours() < 10 ? `0${today.getHours()}` : today.getHours(),
      minute =
        today.getMinutes() < 10 ? `0${today.getMinutes()}` : today.getMinutes(),
      seconds =
        today.getSeconds() < 10 ? `0${today.getSeconds()}` : today.getSeconds(),
      timeFull = `${hour}:${minute}:${seconds}`;

    return `${dateFull} - ${timeFull}`;
  }

  // ONCE NEGATIVE OR MINUS SIGN IS INPUTTED IN ALL AMOUNT INPUTS ACROSS THE DOM, ALERT WILL EXECUTE
  static negative_char() {
    qsel_all("[id*='-amount']").forEach((input) => {
      add_event(input, "keyup", (e) => {
        if ((e.which || e.keyCode) == 189) {
          alert("Amount cannot be negative!");

          // CHECKS IF INPUT ID INCLUDES "dec" (DECIMAL INPUTS), THEN CHANGES ITS VALUE ACCORDINGLY
          if (input.id.includes("dec")) {
            input.value = "00";
          } else {
            input.value = "";
          }
        }
      });
    });
  }

  // RESTRICT NUMBER INPUT IN ALL ACCOUNT INPUTS ACROSS THE DOM
  static num_only() {
    qsel_all("[id*='-account']").forEach((input) => {
      add_att(input, "onkeypress", "return num_only(event)");
    });

    qsel_all("[id*='-amount']").forEach((input) => {
      add_att(input, "onkeypress", "return num_only(event)");
    });
  }

  // UI FOR ADDING COMMAS WHILE TYPING IN ALL AMOUNT INPUTS ACROSS THE DOM
  static type_comma() {
    qsel_all("[id*='-amount']").forEach((input) => {
      add_event(input, "keyup", (e) => {
        // SKIP FOR ARROW KEYS
        if (
          (e.which >= 37 && e.which <= 40) ||
          (e.keyCode >= 37 && e.keyCode <= 40)
        ) {
          return;
        }

        if (input.value) {
          input.value = num_commas(input.value.split(",").join(""));
        }
      });
    });
  }

  // FORCING ALL DECIMAL INPUTS ACROSS THE DOM TO ADD ZERO WHEN IT IS STILL A SINGLE DIGIT NUMBER
  static dec_addZero() {
    qsel_all("[id*='-dec']").forEach((input) => {
      add_event(input, "change", () => {
        if (!isNaN(input.value) && input.value.length == 1) {
          input.value = `0${input.value}`;
        }
      });
    });
  }

  static password_match(password, confirmPassword, message) {
    add_event(password, "keyup", function () {
      if (this.value == confirmPassword.value && this.value.length != 0) {
        remove_class(message, "fa-times");
        add_class(message, "fa-check");
      } else if (
        this.value != confirmPassword.value &&
        confirmPassword.value.length >= 1
      ) {
        remove_class(message, "fa-check");
        add_class(message, "fa-times");
      } else if (this.value.length == 0) {
        remove_class(message, "fa-check");
        remove_class(message, "fa-times");
      }
    });

    add_event(confirmPassword, "keyup", function () {
      if (this.value == password.value && this.value.length != 0) {
        remove_class(message, "fa-times");
        add_class(message, "fa-check");
      } else if (this.value != password.value && password.value.length >= 1) {
        remove_class(message, "fa-check");
        add_class(message, "fa-times");
      } else if (this.value.length == 0) {
        remove_class(message, "fa-check");
        remove_class(message, "fa-times");
      }
    });
  }

  // FOR RESETTING ALL FORMS AT ONCE
  static reset() {
    qsel_all("form").forEach((form) => {
      form.reset();
    });
  }
}
