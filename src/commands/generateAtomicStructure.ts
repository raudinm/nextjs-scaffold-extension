import * as mkdirp from "mkdirp";

import { window, workspace } from "vscode";


export const generateAtomicDesignStructure =  async (): Promise<void> => {
  
  if(workspace.workspaceFolders !== undefined) {

    let projectFolder = workspace.workspaceFolders[0].uri.fsPath;
    // Main folders
    const srcFolder = `${projectFolder}/src`;
    const hoc = `${srcFolder}/HOC`;
    const functions = `${srcFolder}/functions`;
    const components = `${srcFolder}/components`;
    const hooks = `${srcFolder}/hooks`;
    
    // Components folders
    const atoms = `${components}/atoms`;
    const layouts = `${components}/layouts`;
    const molecules = `${components}/molecules`;
    const organisms = `${components}/organisms`;
    const templates = `${components}/templates`;

    // Functions folders
    const utils = `${functions}/utils`;

    try {
      await Promise.all([
        mkdirp(hoc),
        mkdirp(hooks),
        mkdirp(atoms),
        mkdirp(layouts),
        mkdirp(molecules),
        mkdirp(utils),
        mkdirp(organisms),
        mkdirp(templates),
      ]);
      
      window.showInformationMessage("Atomic Design Directory tree successfully generated 🤘🏻");
      
    } catch(err) {
      console.log(err);
      window.showErrorMessage(err);
    }

  } else {
    window.showErrorMessage("Please open your folder project before continue");
  }
};
