document.addEventListener('mousedown', function (e) {
  var ws = null;
  var el = e.target;

  if (e.button != 2) {
    return;
  }

  while (ws == null && el && el.getAttribute) {
    ws = el.getAttribute("wicketsource");
    el = el.parentNode;
  }
  chrome.extension.sendRequest({
    wicketsource: ws
  });
});
