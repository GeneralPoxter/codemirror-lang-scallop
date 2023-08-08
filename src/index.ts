import {parser} from "./syntax.grammar"
import {LRLanguage, LanguageSupport, indentNodeProp, foldNodeProp, foldInside, delimitedIndent} from "@codemirror/language"
import {styleTags, tags as t} from "@lezer/highlight"

export const ScallopLanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      indentNodeProp.add({
      }),
      foldNodeProp.add({
      }),
      styleTags({
        "( )": t.paren
      })
    ]
  }),
  languageData: {
    commentTokens: {line: ";"}
  }
})

export function Scallop() {
  return new LanguageSupport(ScallopLanguage)
}
