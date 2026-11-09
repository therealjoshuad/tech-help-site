// Code Check: tiny helper script. Everything works without it; this only adds
// a saved checklist (stays on this device only) and a share button.
(function () {
  "use strict";

  var KEY = "code-check-v1";
  var boxes = Array.prototype.slice.call(document.querySelectorAll("input[data-step]"));
  var bar = document.getElementById("progress");
  var count = document.getElementById("count");
  var doneMsg = document.getElementById("done-msg");
  var resetBtn = document.getElementById("reset");
  var shareBtn = document.getElementById("share");

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY) || "{}") || {}; } catch (e) { return {}; }
  }
  function save(state) {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* private mode: fine */ }
  }

  var state = load();

  function render() {
    var done = 0;
    boxes.forEach(function (b) {
      if (b.checked) done++;
      var li = b.closest("li");
      if (li) li.classList.toggle("done", b.checked);
    });
    if (bar) { bar.max = boxes.length; bar.value = done; }
    if (count) count.textContent = done + " of " + boxes.length + " done";
    if (doneMsg) doneMsg.hidden = done !== boxes.length;
  }

  boxes.forEach(function (b) {
    b.checked = !!state[b.getAttribute("data-step")];
    b.addEventListener("change", function () {
      state[b.getAttribute("data-step")] = b.checked;
      save(state);
      render();
    });
  });

  if (resetBtn) {
    resetBtn.addEventListener("click", function () {
      state = {};
      save(state);
      boxes.forEach(function (b) { b.checked = false; });
      render();
    });
  }

  if (shareBtn) {
    var canShare = typeof navigator.share === "function";
    var canCopy = navigator.clipboard && typeof navigator.clipboard.writeText === "function";
    if (!canShare && !canCopy) {
      shareBtn.hidden = true;
    } else {
      var label = shareBtn.textContent;
      shareBtn.addEventListener("click", function () {
        var url = location.href.split("#")[0];
        if (canShare) {
          navigator.share({ title: document.title, url: url }).catch(function () {});
        } else {
          navigator.clipboard.writeText(url).then(function () {
            shareBtn.textContent = "Link copied";
            setTimeout(function () { shareBtn.textContent = label; }, 2000);
          }).catch(function () {});
        }
      });
    }
  }

  render();
})();
