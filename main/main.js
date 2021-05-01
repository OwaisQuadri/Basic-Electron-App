//imports
const { app, BrowserWindow, Menu, ipcMain } = require('electron')
const path = require('path')
const url = require('url')
//set env
process.env.NODE_ENV = "development"
//create window
let mainWindow;
function createWindow() {
    //configure window
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 400,
        minHeight: 400,
        webPreferences: {
            nodeIntegration: true
        }
    });
    //configure main menu
    let mainMenu = [
        {
            label: 'File',
            submenu: [{
                label: 'Some Action'
            }, { type: 'separator' }, {
                label: 'Quit',
                accelerator: 'CmdOrCtrl+Q',
                click() {
                    app.quit()
                }
            }]
        }

    ]
    //if mac, shift start
    if (process.platform == "darwin") { mainMenu.unshift({}) }
    //if development, add devtools
    if (process.env.NODE_ENV != "production") {
        mainMenu.push({
            label: 'DevTools',
            submenu: [{
                label: 'Toggle DevTools',
                role: "toggleDevTools",
                accelerator: 'CmdOrCtrl+I',
                acceleratorWorksWhenHidden: false,
            }, {
                label: 'Reload',
                role: 'reload',
                accelerator: 'F5'
            }]
        })
    }
    //load menu
    const appMenu = Menu.buildFromTemplate(mainMenu)
    Menu.setApplicationMenu(appMenu)
    //load window
    mainWindow.loadURL(path.join("file://", __dirname, "../renderer/index.html"))
    mainWindow.show()
}
app.on('ready', () => {
    createWindow()
    mainWindow.on('closed', () => {
        app.quit()
    })
})
