import { parser } from "./syntax.grammar";
import {
  LRLanguage,
  LanguageSupport,
  HighlightStyle,
  syntaxHighlighting,
  syntaxTree,
} from "@codemirror/language";
import { linter, type Diagnostic } from "@codemirror/lint";
import { styleTags, tags as t } from "@lezer/highlight";

export const ScallopLanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      styleTags({
        LineComment: t.lineComment,
        String: t.string,
        Boolean: t.bool,
        Number: t.number,
        Identifier: t.name,
        FFIdentifier: t.annotation,
        FAIdentifier: t.annotation,
        "Keyword!": t.keyword,
        "Tag!": t.tagName,
        Adornment: t.propertyName,
        "Type CustomType/Identifier": t.typeName,
        "EnumConst/Identifier Constructor/Identifier": t.typeOperator,
        "Var/Identifier": t.variableName,
        ArithOp: t.arithmeticOperator,
        LogicOp: t.logicOperator,
        WordOp: t.logicOperator,
        CompareOp: t.compareOperator,
        Aggregator: t.macroName,
      }),
    ],
  }),
  languageData: {
    commentTokens: { line: "//" },
  },
});

export function ScallopHighlighter(theme: String) {
  let chalky = "#e5c07b",
    coral = "#e06c75",
    cyan = "#56b6c2",
    ivory = "#abb2bf",
    stone = "#7d8799",
    malibu = "#61afef",
    sage = "#98c379",
    whiskey = "#d19a66",
    violet = "#c678dd";
  if (theme === "light") {
    (chalky = "#c18401"),
      (coral = "#e45649"),
      (cyan = "#0184bc"),
      (ivory = "#abb2bf"),
      (stone = "#7d8799"),
      (malibu = "#4078f2"),
      (sage = "#50a14f"),
      (whiskey = "#986801"),
      (violet = "#a626a4");
  }

  return syntaxHighlighting(
    HighlightStyle.define([
      { tag: [t.keyword, t.propertyName, t.operator], color: violet },
      { tag: t.variableName, color: coral },
      { tag: t.name, color: malibu },
      { tag: [t.tagName, t.bool], color: whiskey },
      { tag: [t.typeName, t.number], color: chalky },
      { tag: t.annotation, color: cyan },
      { tag: t.comment, color: stone },
      { tag: [t.string, t.typeOperator, t.macroName], color: sage },
    ])
  );
}

export const ScallopLinter = linter((view) => {
  const diagnostics: Diagnostic[] = [];
  syntaxTree(view.state).iterate({
    enter: (node) => {
      if (node.type.isError) {
        diagnostics.push({
          from: node.from,
          to: node.to,
          severity: "error",
          message: "Syntax error",
        });
      }
    },
  });
  return diagnostics;
});

export function Scallop() {
  return new LanguageSupport(ScallopLanguage);
}
