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
      chrome.contextMenus.update(menu, {
        enabled: wicketsource != null
      });
    }
  });


})();
