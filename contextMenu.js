(function() {

  var wicketsource;

  chrome.extension.onRequest.addListener(function (request) {
    wicketsource = request.wicketsource;
  });

  chrome.contextMenus.create({
    title: "Wicket Source",
    contexts: ["all"],
    onclick: function (info) {
      if (wicketsource) {
        var ajax = new XMLHttpRequest();
        var url = "http://localhost:9123/open?src=" + encodeURIComponent(wicketsource);
        ajax.open("GET", url, true);
        ajax.send();
      }
    }
  });

})();
