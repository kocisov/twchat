const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    acceptFirstMouse: true,
    center: true,
    fullscreen: false,
    fullscreenable: false,
    height: 600,
    minHeight: 420,
    minWidth: 600,
    titleBarStyle: 'hidden-inset',
    width: 800,
  })

  mainWindow.loadURL(url.format({
    // pathname: path.join(__dirname, 'index.html'),
    host: 'localhost:3000',
    protocol: 'http:',
    slashes: true
  }))

  mainWindow.webContents.openDevTools()
  
  mainWindow.on('browser-window-created', (e, window) => {
    window.setMenu(null)
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
