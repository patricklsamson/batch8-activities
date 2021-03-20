window.onload = function () {
  $$("jungle-champs").style.display = "none";
  $$("middle-champs").style.display = "none";
  $$("adc-champs").style.display = "none";
  $$("support-champs").style.display = "none";
};

docReady(function () {
  addEvent($$("top"), "click", function () {
    if (this.checked) {
      $$("top-champs").style.display = "block";
      $$("jungle-champs").style.display = "none";
      $$("middle-champs").style.display = "none";
      $$("adc-champs").style.display = "none";
      $$("support-champs").style.display = "none";
    }
  });

  addEvent($$("jungle"), "click", function () {
    if (this.checked) {
      $$("top-champs").style.display = "none";
      $$("jungle-champs").style.display = "block";
      $$("middle-champs").style.display = "none";
      $$("adc-champs").style.display = "none";
      $$("support-champs").style.display = "none";
    }
  });

  addEvent($$("middle"), "click", function () {
    if (this.checked) {
      $$("top-champs").style.display = "none";
      $$("jungle-champs").style.display = "none";
      $$("middle-champs").style.display = "block";
      $$("adc-champs").style.display = "none";
      $$("support-champs").style.display = "none";
    }
  });

  addEvent($$("adc"), "click", function () {
    if (this.checked) {
      $$("top-champs").style.display = "none";
      $$("jungle-champs").style.display = "none";
      $$("middle-champs").style.display = "none";
      $$("adc-champs").style.display = "block";
      $$("support-champs").style.display = "none";
    }
  });

  addEvent($$("support"), "click", function () {
    if (this.checked) {
      $$("top-champs").style.display = "none";
      $$("jungle-champs").style.display = "none";
      $$("middle-champs").style.display = "none";
      $$("adc-champs").style.display = "none";
      $$("support-champs").style.display = "block";
    }
  });
});
