const { app, shell, BrowserWindow, Menu, Tray, nativeImage } = require('electron')
//var BrowserWindow = require('browser-window');
//require("./weatherget")
// modify your existing createWindow() function
const path = require('path');

let tray = null;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 500,
    height: 500,
    frame: true,
    resizable: false,
    autoHideMenuBar: false,
    webPreferences: {
      nodeIntegration: true, enableRemoteModule: true,
            contextIsolation:false
          }
  })

  win.on('minimize',function(event){
    event.preventDefault();
    win.hide();
});

const contextmenu = Menu.buildFromTemplate([
  {label: "Show", type: "normal", click: async() =>{
    win.show();
  }}]);

  const image = nativeImage.createFromPath(
    path.join(__dirname,'src','tray.png')
  );
  tray = new Tray(image.resize({ width: 16, height: 16 }));
  tray.setToolTip("Discord Custom Status");
  tray.setContextMenu(contextmenu);

  const template = [
    {
      label: "Menu",
      submenu: [
        {
          label: 'DSDev',
          click: async () => {
            //win.webContents.reloadIgnoringCache()
            await shell.openExternal('https://discord.com/developers/applications')
          }
        }
      ]},

      {
        label: "Settings",
        click: async () =>{
          await win.loadFile("settings.html")
    }}
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
  win.loadFile('index.html')
}
  app.whenReady().then(() => {

    createWindow();
  })
  /*autoupdate*/


//RICH PRESENCE APP

//RPC В HTML script
