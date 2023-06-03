import renderGraph from "kingraph";
import jsYaml from "js-yaml";
import { basicSetup, EditorView } from "codemirror";
import { EditorState } from "@codemirror/state";
import { StreamLanguage } from "@codemirror/language";
import { yaml } from "@codemirror/legacy-modes/mode/yaml";
import { githubDark } from "@ddietr/codemirror-themes/github-dark.js";

const exampleTree = `
    families:
      - parents: [Homer, Marge]
        children: [Bart, Lisa, Maggie]
      - parents: [Abe, Mona]
        children: [Homer]
      - parents: [Jacqueline, Clancy]
        children: [Marge, Patty, Selma]
  `
  .split("\n")
  .map((l) => l.replace(/^ {6}/, ""))
  .join("\n")
  .trim();

const input = new EditorView();
main.prepend(input.dom);

input.setState(
  EditorState.create({
    doc: exampleTree,
    extensions: [
      basicSetup,
      StreamLanguage.define(yaml),
      githubDark,
      EditorView.updateListener.of(onUpdate),
    ],
  })
);

function onUpdate(e) {
  render(e.state.doc.toString());
}

function render(value) {
  output.innerHTML = renderGraph(jsYaml.load(value), {
    format: "svg",
    async: false,
  });
}
