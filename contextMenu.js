(function() {
  var menu = chrome.contextMenus.create({
    title: "Wicket Source",
    contexts: [ "all" ],
    enabled: false,
    onclick: function() {}
  });

  chrome.extension.onRequest.addListener(function (request) {
    if (request.hasOwnProperty('wicketsource')) {
      var ws = request.wicketsource;
      if (ws == null) {
        chrome.contextMenus.update(menu, {
          enabled: false,
          title: "Wicket Source"
        });
        return;
      }
      var idx = ws.indexOf(':');
      if (idx > -1) {
        ws = ws.substring(idx + 1);
      }
      ws = ws.replace(/\.java:/, ':');
      chrome.contextMenus.update(menu, {
        enabled: true,
        title: "Wicket Source - " + ws,
        onclick: function () {
          var ajax = new XMLHttpRequest();
          var url = "http://localhost:9123/open?src=" + encodeURIComponent(request.wicketsource);
          ajax.open("GET", url, true);
          ajax.send();
        }
      });
    }
  });
})();

