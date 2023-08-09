import { parser } from "./syntax.grammar";
import { LRLanguage, LanguageSupport } from "@codemirror/language";
import { styleTags, tags as t } from "@lezer/highlight";

export const ScallopLanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      styleTags({
        LineComment: t.lineComment,
        String: t.string,
        Boolean: t.bool,
        Number: t.number,
        "Keyword!": t.keyword,
        Type: t.typeName,
        "Tag!": t.constant(t.name),
        Identifier: t.name,
        "Var/Identifier Expr/Identifier": t.function(t.variableName),
        ArithOp: t.arithmeticOperator,
        LogicOp: t.logicOperator,
        WordOp: t.logicOperator,
        CompareOp: t.compareOperator,
      }),
    ],
  }),
  languageData: {
    commentTokens: { line: "//" },
  },
});

export function Scallop() {
  return new LanguageSupport(ScallopLanguage);
}
