"use strict";

function docReady(callback) {
  if (document.readyState != "loading") callback();else if (document.addEventListener) document.addEventListener("DOMContentLoaded", callback);else document.attachEvent("onreadystatechange", function () {
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
    if (i >= 0) classes.splice(i, 1);else {
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

function matchHeights() {
  var i = 0;
  var items = document.querySelectorAll(".mh");
  var itemsHeight = [];
  console.log(items);
  console.log(itemsHeight);

  for (i = 0; i < items.length; i++) {
    itemsHeight.push(items[i].offsetHeight);
  }

  var maxHeight = Math.max.apply(Math, itemsHeight);

  for (i = 0; i < items.length; i++) {
    items[i].style.height = maxHeight + "px";
  }
}