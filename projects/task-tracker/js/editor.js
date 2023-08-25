
function initEditor(id, mode) {
  var editor = ace.edit(id);
  editor.setTheme("ace/theme/monokai");
  editor.getSession().setMode("ace/mode/" + mode);
  editor.setOptions({
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true
  });
  return editor;
}

function compileCode() {
  var htmlCode = htmlEditor.getValue();
  var cssCode = cssEditor.getValue();
  var jsCode = jsEditor.getValue();
  var outputDisplay = document.getElementById("output-display").contentWindow.document;

  outputDisplay.open();
  outputDisplay.write(htmlCode + "<style>" + cssCode + "</style>" + "<script>" + jsCode + "</script>");
  outputDisplay.close();
}

var htmlEditor = initEditor("html-editor", "html");
var cssEditor = initEditor("css-editor", "css");
var jsEditor = initEditor("js-editor", "javascript");
htmlEditor.on("input", compileCode);
cssEditor.on("input", compileCode);
jsEditor.on("input", compileCode);