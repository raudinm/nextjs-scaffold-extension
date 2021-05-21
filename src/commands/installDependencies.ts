import * as vscode from 'vscode';
import { tsConfigTemplate } from '../templates';
import { createFile } from '../utils';


export async function installDependencies(uri: vscode.Uri): Promise<void> {

  const command = `yarn add @material-ui/core @material-ui/icons @material-ui/lab`;
  const commandDev = `yarn add -D typescript @types/react @types/node`;

  const terminal = vscode.window.createTerminal({
    cwd: uri
  });

  if(vscode.workspace.workspaceFolders !== undefined) {
    let projectFolder = vscode.workspace.workspaceFolders[0].uri.fsPath;
    
    createFile("tsconfig.json", projectFolder, tsConfigTemplate);
  }
  
  terminal.show();
  terminal.sendText(command, true);

  terminal.sendText(commandDev, true);
  vscode.window.showInformationMessage(`MUI and TS dependencies successfully installed 🤘🏻`);
}

