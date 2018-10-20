'use strict';

import * as vscode from 'vscode';
import * as clipboardy from 'clipboardy';
import getRubyReference from './get_ruby_reference';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('extension.copyRubyReference', () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return;
    }

    const document = editor.document;
    const selection = editor.selection;

    const ref = getRubyReference(document, selection);
    if (!ref) {
      return;
    }
    clipboardy.writeSync(ref);
    vscode.window.showInformationMessage(`${ref} in clipboard`);
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {
}
