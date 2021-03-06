import * as vscode from 'vscode';
import {Factory} from '../../src/factory';

export function eventSave(e) {
    if (e.fileName.includes(Factory.settings.configFile)) {
        vscode.window.showInformationMessage("Config successfully updated!");
        Factory.settings.initConfig();
        Factory.client.unload();
    } else {
        Factory.status.loading(`Upload file: ${e.fileName}`);
        
        Factory.client.copy(e.fileName, e.fileName.replace(vscode.workspace.rootPath, '')).then(
            result => {
                Factory.status.dispose();
            },
            error => console.log(error)
        );        
    }    
}