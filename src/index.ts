import {parser} from "./syntax.grammar"
import {LRLanguage, LanguageSupport, indentNodeProp, foldNodeProp, foldInside, delimitedIndent} from "@codemirror/language"
import {styleTags, tags as t} from "@lezer/highlight"

export const ScallopLanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      styleTags({
        LineComment: t.lineComment,
        String: t.string,
        Boolean: t.bool,
        Keyword: t.keyword,
        Var: t.variableName,
        Identifier: t.name,
        ArithOp: t.arithmeticOperator,
        LogicOp: t.logicOperator,
        CompareOp: t.compareOperator,
        "( )": t.paren,
        "{ }": t.brace,
      })
    ]
  }),
  languageData: {
    commentTokens: {line: "//"}
  }
})

export function Scallop() {
  return new LanguageSupport(ScallopLanguage)
}
