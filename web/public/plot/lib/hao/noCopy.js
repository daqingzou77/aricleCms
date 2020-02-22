function KeyDown() {
  return (
    !(
      112 == event.keyCode ||
      123 == event.keyCode ||
      (event.ctrlKey && 82 == event.keyCode) ||
      (event.ctrlKey && 78 == event.keyCode) ||
      (event.shiftKey && 121 == event.keyCode) ||
      (event.altKey && 115 == event.keyCode) ||
      ('A' == event.srcElement.tagName && event.shiftKey)
    ) || ((event.keyCode = 0), (event.returnValue = !1))
  );
}
// (document.onkeydown = KeyDown),
//   (document.oncontextmenu = function() {
//     event.returnValue = !1;
//   }),
//   (document.onselectstart = function() {
//     event.returnValue = !1;
//   }),
//   (document.oncopy = function() {
//     event.returnValue = !1;
//   });
