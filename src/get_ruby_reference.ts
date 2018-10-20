import { Position, Range, TextDocument, Selection } from 'vscode';

export default function getRubyReference(document: TextDocument, selection: Selection) {
  const wordRange: Range | undefined = document.getWordRangeAtPosition(selection.active);
  if (!wordRange) {
    return;
  }
  const lastPathPart = document.getText(wordRange);

  const textfromBeginningOfDocument: string = document.getText(
    new Range(new Position(0, 0), wordRange.start)
  );

  const pathPartRegexp: RegExp = /(class|module)\s+(.+)/gm;
  let pathParts = [];
  let match;
  while ((match = pathPartRegexp.exec(textfromBeginningOfDocument)) !== null) {
    pathParts.push(match[match.length - 1]);
  }

  return [...pathParts, lastPathPart].join('::');
}

