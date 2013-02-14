(function() {

  var wicketsource, menu;

  menu = chrome.contextMenus.create({
    title: "Wicket Source",
    contexts: ["all"],
    onclick: function (info) {
      if (wicketsource) {
        var ajax = new XMLHttpRequest();
        var url = "http://localhost:9123/open?src=" + encodeURIComponent(wicketsource);
        ajax.open("GET", url, true);
        ajax.send();
      }
    },
    enabled: false
  });

  chrome.extension.onRequest.addListener(function (request) {
    if (request.hasOwnProperty('wicketsource')) {
      wicketsource = request.wicketsource;
      if (wicketsource != null) {
        var idx = wicketsource.indexOf(':');
        if (idx > -1) {
          wicketsource = wicketsource.substring(idx + 1);
        }
        wicketsource = wicketsource.replace(/\.java:/, ':');
        chrome.contextMenus.update(menu, {
          enabled: true,
          title: "Wicket Source - " + wicketsource
        });
      } else {
        chrome.contextMenus.update(menu, {
          enabled: false,
          title: "Wicket Source"
        });
      }
    }
  });


})();
