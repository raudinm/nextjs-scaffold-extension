import * as vscode from 'vscode';
import { 
	createNextProject, generateAtomicDesignStructure, installDependencies 
} from './commands';


export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand("nextjscaffold.createNextProject", createNextProject),
		vscode.commands.registerCommand("nextjscaffold.addDependencies", installDependencies),
		vscode.commands.registerCommand("nextjscaffold.generateAtomicDesignStructure", generateAtomicDesignStructure)
	);
}

// this method is called when your extension is deactivated
export function deactivate() {}
