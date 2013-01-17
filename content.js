document.addEventListener('mouseup', function (e) {
  var ws = null;
  var el = e.srcElement;

  while (ws == null && el && el.getAttribute) {
    ws = el.getAttribute("wicketsource");
    el = el.parentNode;
  }
  chrome.extension.sendRequest({
    wicketsource: ws
  });
});
