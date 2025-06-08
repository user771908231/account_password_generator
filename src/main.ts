import { app, ipcMain } from 'electron';
import * as fs from 'fs';
import * as path from 'path';
import MainWindow from './ui/MainWindow';

let mainWindow: MainWindow | null = null;

app.on('ready', () => {
    mainWindow = new MainWindow();
    console.log('Main window created');
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});

// 写入账号密码到文本
ipcMain.on('save-credentials', (event, { game, gameurl, username, password }) => {
    const filePath = path.join(app.getPath('desktop'), '账号密码.txt');
    const line = `游戏名: ${game} ${gameurl ? '网址: ' + gameurl + ' ' : ''}账号: ${username} 密码: ${password}\r\n`;
    fs.appendFile(filePath, line, (err) => {
        if (err) {
            console.error('写入失败:', err);
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        mainWindow = new MainWindow();
        mainWindow.on('closed', () => {
            mainWindow = null;
        });
    }
});