//imports
const { app , BrowserWindow , Menu , ipcMain } = require('electron')
const path = require('path')
const url = require('url')
//create window
let mainWindow;
function createWindow(){
    //configure window
    mainWindow = new BrowserWindow({
        width:800,
        height:600
    });
    //configure main menu
    

    //load window
    mainWindow.webContents.openDevTools()
    mainWindow.loadURL(path.join("file://",__dirname,"../renderer/index.html"))
    mainWindow.show()
}
app.on('ready', ()=>{
    createWindow()
    mainWindow.on('closed', ()=>{
        app.quit()
    })
})
