function docReady(callback) {
  if (document.readyState != "loading") callback();
  else if (document.addEventListener) document.addEventListener("DOMContentLoaded", callback);
  else
    document.attachEvent("onreadystatechange", function () {
      if (document.readyState == "complete") callback();
    });
}

function $$(element) {
  return document.getElementById(element);
}

function $s(element) {
  return document.querySelector(element);
}

function $a(element) {
  return document.querySelectorAll(element);
}

function addEvent(element, event, fn) {
  if (element.addEventListener) {
    element.addEventListener(event, fn);
  } else if (element.attachEvent) {
    element.attachEvent(event, fn);
  }
}

function removeEvent(element, event, fn) {
  if (element.removeEventListener) {
    element.removeEventListener(event, fn);
  } else if (element.detachEvent) {
    element.detachEvent(event, fn);
  }
}

function addEvents(element, events, fn) {
  events.split(" ").forEach(function (e) {
    return addEvent(element, e, fn, false);
  });
}

function removeEvents(element, events, fn) {
  events.split(" ").forEach(function (e) {
    return removeEvent(element, e, fn, false);
  });
}

function addAtt(element, attribute, val) {
  if (element.setAttribute) {
    element.setAttribute(attribute, val);
  } else {
    var att = document.createAttribute(attribute);
    att.value = val;
    element.setAttributeNode(att);
  }
}

function hClass(element, className) {
  return element.classList ? element.classList.contains(className) : new RegExp("(^| )" + className + "( |$)", "gi").test(element.className);
}

function aClass(element, className) {
  if (element.classList) {
    element.classList.add(className);
  } else {
    element.className += " " + className;
  }
}

function rClass(element, className) {
  if (element.classList) {
    element.classList.remove(className);
  } else {
    element.className = element.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
  }
}

function tClass(element, className) {
  if (element.classList) {
    element.classList.toggle(className);
  } else {
    var classes = element.className.split(" "),
      i = classes.indexOf(className);

    if (i >= 0) classes.splice(i, 1);
    else {
      classes.push(className);
      element.className = classes.join(" ");
    }
  }
}

function dataSet(element, value) {
  if (element.dataset.value) {
    return element.dataset.value;
  } else {
    return element.getAttribute("data-" + value);
  }
}

function extendObj(obj, addons) {
  if (typeof addons !== "undefined") {
    for (var prop in obj) {
      if (addons[prop] != undefined) {
        obj[prop] = addons[prop];
      }
    }
  }
}

function numOnly(e) {
  var charCode = e.which ? e.which : event.keyCode;

  return !(charCode > 31 && (charCode < 48 || charCode > 57));
}

function matchHeights(element) {
  var i = 0;
  var items = $a(element);
  var itemsHeight = [];

  console.log(items);
  console.log(itemsHeight);

  for (i = 0; i < items.length; i++) {
    itemsHeight.push(items[i].offsetHeight);
  }

  var maxHeight = Math.max(...itemsHeight);

  for (i = 0; i < items.length; i++) {
    items[i].style.height = maxHeight + "px";
  }
}

var caro = window.caro || {};

caro = (function () {
  var caro = function caro(settings) {
    var self = this;

    self.def = {
      target: $s(".caro"),
      dotsWrapper: $s(".caro-dots"),
      arrowLeft: $s(".caro-prev"),
      arrowRight: $s(".caro-next"),
      autoplay: {
        on: false,
        interval: 5000,
      },
      transition: {
        speed: 300,
        easing: "",
      },
      swipe: true,
      autoHeight: true,
      afterChangeSlide: function afterChangeSlide() {},
    };

    extendObj(self.def, settings);

    self.init();
  };

  caro.prototype.buildDots = function () {
    var self = this;

    for (var i = 0; i < self.totalSlides; i++) {
      var dot = document.createElement("span");

      addAtt(dot, "data-slide", i + 1);
      self.def.dotsWrapper.appendChild(dot);
    }

    addEvent(
      self.def.dotsWrapper,
      "click",
      function (e) {
        if (e.target && e.target.nodeName == "SPAN") {
          self.curSlide = e.target.getAttribute("data-slide");
          self.gotoSlide();
        }
      },
      false
    );
  };

  caro.prototype.getCurLeft = function () {
    var self = this;

    self.curLeft = parseInt(self.sliderInner.style.left.split("px")[0]);
  };

  caro.prototype.gotoSlide = function () {
    var self = this;

    self.sliderInner.style.transition = "left " + self.def.transition.speed / 1000 + "s " + self.def.transition.easing;
    self.sliderInner.style.left = -self.curSlide * self.slideW + "px";

    aClass(self.def.target, "isAnimating");

    setTimeout(function () {
      self.sliderInner.style.transition = "";
      rClass(self.def.target, "isAnimating");
    }, self.def.transition.speed);

    self.setDot();

    if (self.def.autoHeight) {
      self.def.target.style.height = self.allSlides[self.curSlide].offsetHeight + "px";
    }

    self.def.afterChangeSlide(self);
  };

  caro.prototype.init = function () {
    var self = this;

    function on_resize(c, t) {
      onresize = function () {
        clearTimeout(t);
        t = setTimeout(c, 100);
      };
      return onresize;
    }

    function loadedImg(el) {
      var loaded = false;

      function loadHandler() {
        if (loaded) {
          return;
        }

        loaded = true;
        self.loadedCnt++;

        if (self.loadedCnt >= self.totalSlides + 2) {
          self.updateSliderDimension();
        }
      }

      var img = el.querySelector("img");

      if (img) {
        img.onload = loadHandler;
        img.src = dataSet(img, "src");
        img.style.display = "block";

        if (img.complete) {
          loadHandler();
        }
      } else {
        self.updateSliderDimension();
      }
    }

    addEvent(
      window,
      "resize",
      on_resize(function () {
        self.updateSliderDimension();
      }),
      false
    );

    var nowHTML = self.def.target.innerHTML;
    self.def.target.innerHTML = '<div class="caro-inner">' + nowHTML + "</div>";

    self.allSlides = 0;
    self.curSlide = 0;
    self.curLeft = 0;
    self.totalSlides = self.def.target.querySelectorAll(".slide").length;

    self.sliderInner = self.def.target.querySelector(".caro-inner");
    self.loadedCnt = 0;

    var cloneFirst = self.def.target.querySelectorAll(".slide")[0].cloneNode(true);
    self.sliderInner.appendChild(cloneFirst);

    var cloneLast = self.def.target.querySelectorAll(".slide")[self.totalSlides - 1].cloneNode(true);
    self.sliderInner.insertBefore(cloneLast, self.sliderInner.firstChild);

    self.curSlide++;
    self.allSlides = self.def.target.querySelectorAll(".slide");

    self.sliderInner.style.width = (self.totalSlides + 2) * 100 + "%";

    for (var i = 0; i < self.totalSlides + 2; i++) {
      self.allSlides[i].style.width = 100 / (self.totalSlides + 2) + "%";
      loadedImg(self.allSlides[i]);
    }

    self.buildDots();
    self.setDot();
    self.initArrows();

    if (self.def.swipe) {
      addEvents(self.sliderInner, "mousedown touchstart", startSwipe);
    }

    self.isAnimating = false;

    function startSwipe(e) {
      var touch = e;

      self.getCurLeft();

      if (!self.isAnimating) {
        if (e.type == "touchstart") {
          touch = e.targetTouches[0] || e.changedTouches[0];
        }

        self.startX = touch.clientX;
        self.startY = touch.clientY;

        addEvents(self.sliderInner, "mousemove touchmove", swipeMove);
        addEvents($s("body"), "mouseup touchend", swipeEnd);
      }
    }

    function swipeMove(e) {
      var touch = e;

      if (e.type == "touchmove") {
        touch = e.targetTouches[0] || e.changedTouches[0];
      }

      self.moveX = touch.clientX;
      self.moveY = touch.clientY;

      if (Math.abs(self.moveX - self.startX) < 40) return;

      self.isAnimating = true;
      aClass(self.def.target, "isAnimating");
      e.preventDefault();

      if (self.curLeft + self.moveX - self.startX > 0 && self.curLeft == 0) {
        self.curLeft = -self.totalSlides * self.slideW;
      } else if (self.curLeft + self.moveX - self.startX < -(self.totalSlides + 1) * self.slideW) {
        self.curLeft = -self.slideW;
      }
      self.sliderInner.style.left = self.curLeft + self.moveX - self.startX + "px";
    }

    function swipeEnd(e) {
      var touch = e;

      self.getCurLeft();

      if (Math.abs(self.moveX - self.startX) === 0) return;

      self.stayAtCur = Math.abs(self.moveX - self.startX) < 40 || typeof self.moveX === "undefined" ? true : false;
      self.dir = self.startX < self.moveX ? "left" : "right";

      if (self.stayAtCur) {
      } else {
        self.dir == "left" ? self.curSlide-- : self.curSlide++;
        if (self.curSlide < 0) {
          self.curSlide = self.totalSlides;
        } else if (self.curSlide == self.totalSlides + 2) {
          self.curSlide = 1;
        }
      }

      self.gotoSlide();

      delete self.startX;
      delete self.startY;
      delete self.moveX;
      delete self.moveY;

      self.isAnimating = false;
      rClass(self.def.target, "isAnimating");
      removeEvents(self.sliderInner, "mousemove touchmove", swipeMove);
      removeEvents($s("body"), "mouseup touchend", swipeEnd);
    }

    if (self.def.autoplay.on) {
      setInterval(function () {
        if (!hClass(self.def.target, "isAnimating")) {
          if (self.curSlide == self.totalSlides) {
            self.curSlide = 0;
            self.sliderInner.style.left = -self.curSlide * self.slideW + "px";
          }

          self.curSlide++;

          setTimeout(function () {
            self.gotoSlide();
          }, 20);
        }
      }, self.def.autoplay.interval);
    }
  };

  caro.prototype.initArrows = function () {
    var self = this;

    if (self.def.arrowLeft != "") {
      addEvent(
        self.def.arrowLeft,
        "click",
        function () {
          if (!hClass(self.def.target, "isAnimating")) {
            if (self.curSlide == 1) {
              self.curSlide = self.totalSlides + 1;
              self.sliderInner.style.left = -self.curSlide * self.slideW + "px";
            }

            self.curSlide--;

            setTimeout(function () {
              self.gotoSlide();
            }, 20);
          }
        },
        false
      );
    }

    if (self.def.arrowRight != "") {
      addEvent(
        self.def.arrowRight,
        "click",
        function () {
          if (!hClass(self.def.target, "isAnimating")) {
            if (self.curSlide == self.totalSlides) {
              self.curSlide = 0;
              self.sliderInner.style.left = -self.curSlide * self.slideW + "px";
            }

            self.curSlide++;

            setTimeout(function () {
              self.gotoSlide();
            }, 20);
          }
        },
        false
      );
    }
  };

  caro.prototype.setDot = function () {
    var self = this;
    var tardot = self.curSlide - 1;

    for (var j = 0; j < self.totalSlides; j++) {
      rClass(self.def.dotsWrapper.querySelectorAll("span")[j], "active");
    }

    if (self.curSlide - 1 < 0) {
      tardot = self.totalSlides - 1;
    } else if (self.curSlide - 1 > self.totalSlides - 1) {
      tardot = 0;
    }

    aClass(self.def.dotsWrapper.querySelectorAll("span")[tardot], "active");
  };

  caro.prototype.updateSliderDimension = function () {
    var self = this;

    self.slideW = parseInt(self.def.target.querySelectorAll(".slide")[0].offsetWidth);
    self.sliderInner.style.left = -self.slideW * self.curSlide + "px";

    if (self.def.autoHeight) {
      self.def.target.style.height = self.allSlides[self.curSlide].offsetHeight + "px";
    } else {
      for (var i = 0; i < self.totalSlides + 2; i++) {
        if (self.allSlides[i].offsetHeight > self.def.target.offsetHeight) {
          self.def.target.style.height = self.allSlides[i].offsetHeight + "px";
        }
      }
    }

    self.def.afterChangeSlide(self);
  };

  return caro;
})();
