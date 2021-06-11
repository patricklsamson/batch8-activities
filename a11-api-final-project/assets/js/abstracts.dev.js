"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ytScript = create_el("script");
var i,
    j,
    player,
    done = false;
ytScript.src = "https://www.youtube.com/iframe_api";

var onPlayerReady = function onPlayerReady(e) {
  e.target.playVideo();
};

var stopVideo = function stopVideo() {
  player.stopVideo();
};

var onPlayerStateChange = function onPlayerStateChange(e) {
  if (e.data == YT.PlayerState.PLAYING && !done) {
    stopVideo();
    done = true;
  }
};

var onYouTubeIframeAPIReady = function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    videoId: "DxIDKZHW3-E",
    playerVars: {
      playsinline: 1
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    }
  });
};

var loadQuote = function loadQuote() {
  match_media("only screen and (min-width: 992px)", 992, function match() {
    fetch("https://api.quotable.io/random?maxLength=100&?tags=faith,famous-quotes,friendship,future,happiness,inspirational,life,love,proverb,religion,success,wisdom").then(function (response) {
      return response.json();
    }).then(function (data) {
      return id("quote").innerHTML = data.content;
    }).then(function (data) {
      return console.log("Screen Min Width = 992px\nQuotes Character Length = ".concat(data.length));
    });
  }, function unmatch() {
    fetch("https://api.quotable.io/random?maxLength=30&?tags=faith,famous-quotes,friendship,future,happiness,inspirational,life,love,proverb,religion,success,wisdom").then(function (response) {
      return response.json();
    }).then(function (data) {
      return id("quote").innerHTML = data.content;
    }).then(function (data) {
      return console.log("Screen Max Width = 991px\nQuotes Character Length = ".concat(data.length));
    });
  });
};

var searchAdvice = function searchAdvice() {
  id("advice-ul").innerHTML = "";

  if (id("advice").value.length >= 2) {
    fetch("https://api.adviceslip.com/advice/search/".concat(id("advice").value)).then(function (response) {
      return response.json();
    }).then(function (data) {
      for (i = 0; i < data.slips.length; i++) {
        id("advice-ul").innerHTML += "<li class=\"mb-05\">".concat(data.slips[i].advice, "</li>");
      }
    })["catch"](function () {
      id("advice-ul").innerHTML += "No advice slips found matching that search term.";
    });
  }

  id("advice-form").reset();
};

var randomAdvice = function randomAdvice(e) {
  id("advice-form").reset();
  id("advice-ul").innerHTML = "";
  add_class(id("advice-dice-btn"), "rolling");
  setTimeout(function () {
    remove_class(id("advice-dice-btn"), "rolling");
    fetch("https://api.adviceslip.com/advice").then(function (response) {
      return response.json();
    }).then(function (data) {
      id("advice-ul").innerHTML += "<p class=\"talign\">".concat(data.slip.advice, "</p>");
    });
  }, 500);
  remove_event(e.target || e.srcElement, "click", randomAdvice);
  setTimeout(function () {
    add_event(e.target || e.srcElement, "click", randomAdvice);
  }, 1000);
};

var Location =
/*#__PURE__*/
function () {
  function Location(name, number, message) {
    _classCallCheck(this, Location);

    this.name = name;
    this.number = number;
    this.message = message;
    this.ipInfo = [];
  }

  _createClass(Location, null, [{
    key: "locationStorage",
    value: function locationStorage() {
      var location;

      if (localStorage.getItem("location") === null) {
        location = [];
      } else {
        location = JSON.parse(localStorage.getItem("location"));
      }

      return location;
    }
  }, {
    key: "send_location",
    value: function send_location(newLocation) {
      var location = Location.locationStorage();
      location.push(newLocation);
      localStorage.setItem("location", JSON.stringify(location));
    }
  }]);

  return Location;
}();

var sendLocation = function sendLocation(name, number, message) {
  if (id("sos-name").value.length >= 3) {
    var newLocation = new Location(name, number, message);
    fetch("https://ipinfo.io/json?token=d17cf2c04985a8").then(function (response) {
      return response.json();
    }).then(function (data) {
      return newLocation.ipInfo.push(data);
    });
    setTimeout(function () {
      Location.send_location(newLocation);
    }, 2000);
    id("sos-name").value = "";
    id("sos-form").reset();
    qsel(".selected").innerHTML = "Code";
  }
};