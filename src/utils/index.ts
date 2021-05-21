import { existsSync, writeFile } from "fs";
import { window } from "vscode";


export async function createFile(
fileName: string, targetDirectory: string, fileTemplate: string,
): Promise<void> {

  let targetPath = `${targetDirectory}/${fileName}`;

  
  if (existsSync(targetPath)) {
    throw Error(`${fileName} already exists`);
  }
 
  return new Promise<void>(async (resolve, reject) => {
    writeFile(
      targetPath,
      fileTemplate,
      "utf8",
      (error) => {
        if (error) {
          console.log(error, "error aqui");
          window.showErrorMessage(`${error}`);
          reject(error);
          return;
        }
        resolve();
      }
    );
  });
}
