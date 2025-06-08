"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const MainWindow_1 = __importDefault(require("./ui/MainWindow"));
let mainWindow = null;
electron_1.app.on('ready', () => {
    mainWindow = new MainWindow_1.default();
    console.log('Main window created');
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});
// 写入账号密码到文本
electron_1.ipcMain.on('save-credentials', (event, { game, gameurl, username, password }) => {
    const filePath = path.join(electron_1.app.getPath('desktop'), '账号密码.txt');
    const line = `游戏名: ${game} ${gameurl ? '网址: ' + gameurl + ' ' : ''}账号: ${username} 密码: ${password}\r\n`;
    fs.appendFile(filePath, line, (err) => {
        if (err) {
            console.error('写入失败:', err);
        }
    });
});
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', () => {
    if (mainWindow === null) {
        mainWindow = new MainWindow_1.default();
        mainWindow.on('closed', () => {
            mainWindow = null;
        });
    }
});
