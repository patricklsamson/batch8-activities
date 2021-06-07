"use strict";

var ytScript = create_el("script");
var i,
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
    })["catch"](function (error) {
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