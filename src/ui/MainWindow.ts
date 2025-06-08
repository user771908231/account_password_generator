import { BrowserWindow } from 'electron';
import * as path from 'path';

export default class MainWindow extends BrowserWindow {
    constructor() {
        super({
            width: 540,
            height: 480,
            resizable: false,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
            },
        });
        // 使用 path.resolve 保证打包后路径正确
        this.loadFile(path.resolve(__dirname, '../../public/index.html'));
    }
}