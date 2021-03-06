// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu, Tray, dialog} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
function createWindow () {
  // Create the browser window.

  mainWindow = new BrowserWindow({ width: 350, height: 500})
  app.isQuiting = false
  mainWindow.on('minimize',function(event){
      event.preventDefault();
      mainWindow.hide();
  });

  mainWindow.on('close', function (event) {
    if(!app.isQuiting){
        event.preventDefault();
        mainWindow.hide();
    }

      return false;
  });

  mainWindow.setMenu(null);
  //dialog.showMessageBox(mainWindow, {"title":"fuck q8800", "message":"run!!!"})
  tray = new Tray("icon.png"); 
  tray.setToolTip('This is program for fucking Q8800 speaker')
  // tray.on('click', () => {
  //   mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
  // })

  var contextMenu = Menu.buildFromTemplate([
      { label: 'Show App', click:  function(){
          mainWindow.show();
      } },
      { label: 'Quit', click:  function(){
          app.isQuiting = true;
          app.quit();
      } }
  ]);
  tray.setContextMenu(contextMenu)
  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
  //mainWindow.toggleDevTools();

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

const shouldQuit = app.makeSingleInstance(() => {
  // Someone tried to run a second instance, we should focus our window.
  if (mainWindow) {
    mainWindow.show()
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
