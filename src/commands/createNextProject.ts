import * as vscode from 'vscode';
import * as path from 'path';


export function createNextProject() {
  const command = {
    "title": "Create Next.js Project",
    "command": "npx create-next-app",
  };

  selectParentFolderAndRun(command.command);
}

async function selectParentFolderAndRun(command: string) {
  const projectFolder = await selectProjectFolder();
  if (!projectFolder) {
    return;
  }
  const [parentPath, projectName, uri] = projectFolder;
  await executeCreateCommand(parentPath, projectName, command);
  vscode.window.showInformationMessage(`Next.js project successfully created 🤘🏻`);
}


async function selectProjectFolder(): Promise<[string, string, vscode.Uri] | null> {
  const value = await vscode.window.showQuickPick(["Select project folder", "Cancel"], {
    placeHolder: "Select project folder",
  });

  if (value === "Cancel") {
    return null;
  }

  const result = await vscode.window.showOpenDialog({
    canSelectFolders: true,
    canSelectFiles: false,
  });

  if (!result) {
    return null;
  }
  const pathToProject = result[0].path;
  const seperator = path.sep;
  const projectName = pathToProject.split(seperator).slice(-1)[0];
  const parentPath = pathToProject.substring(0, pathToProject.lastIndexOf(seperator));

  return [parentPath, projectName, result[0]];
}

async function executeCreateCommand(path: string, projectName: string, command: string) {
  const terminal = vscode.window.createTerminal({
    cwd: path
  });

  terminal.show();
  terminal.sendText(command + " " + projectName, true);
}

