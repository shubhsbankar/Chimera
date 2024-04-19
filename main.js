const { app, BrowserWindow, ipcMain, Tray, Menu } = require('electron');
const { autoUpdater } = require('electron-updater');
const path = require('path');
const DiscordRPC = require('discord-rpc');
const clientId = '1229882259469897801';
DiscordRPC.register(clientId);
const Updater = require('./Updater');

let win;
let splash;
let tray;
let updater;

const updateApp = async () => 
{
  await updater.checkAndUpdate();
}

function createSplashWindow() {
  splash = new BrowserWindow({
    width: 800,
    height: 450,
    frame: false,
    transparent: true,
    alwaysOnTop: false,
    resizable: false,
    icon: path.join(__dirname, 'assets/img/icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: true
    }
  });

  splash.loadFile(path.join(__dirname, 'pages/splash.html'));

  splash.once('ready-to-show', () => {
    splash.show();
    updater = new Updater({
      versionUrl: 'http://5.254.118.206/upl/updater.version',
      patchUrl: 'https://drive.usercontent.google.com/download?id=1-F4juX4kcbZtrPuMg9O3tP6QOfWR8bc8&export=download&authuser=0',
      appfirstpartUrl: 'https://drive.usercontent.google.com/download?id=1jikwy5ACfPrD5IBKF943HE12HlfE4O8H&export=download&authuser=0&confirm=t&uuid=699d3b6b-6f1f-4c8b-8e6d-ab0cb196ea0f&at=APZUnTVnLKLCMXkM4LsOH8c8itmp%3A1713402049237',
      localVersionFile: './updater.version',
      splash,
      createMainWindow
    });
    updateApp();    
  });
}

function createMainWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 500,
    frame: false,
    show: false,
    transparent: true,
    resizable: false,
    icon: path.join(__dirname, 'assets/img/icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.loadFile(path.join(__dirname, 'pages/home.html'));

  win.once('ready-to-show', () => {
    win.show();
    splash.close();
  });

  win.on('closed', () => {
    win = null;
  });

  win.on('close', (event) => {
    if (!app.isQuitting) {
      event.preventDefault();
      win.hide();
    }
  });

  autoUpdater.checkForUpdatesAndNotify();
  win.webContents.openDevTools()
}

function createTray() {
  tray = new Tray(path.join(__dirname, 'assets/img/icon.png'));

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Afficher le launcher', click: () => win.show() },
    { label: 'Fermer le launcher', click: () => app.quit() }
  ]);

  tray.setToolTip('Chimera');
  tray.setContextMenu(contextMenu);

  tray.on('click', () => win.show());
}

app.on('ready', () => {
  createSplashWindow();
  createTray();
  // Check for updates on app ready
  autoUpdater.checkForUpdatesAndNotify();

  autoUpdater.on('update-available', () => {
    console.log('Mise à jour disponible, téléchargement...');
    // Optionally you can notify the user here
    NotifyUserAboutUpdate();
    autoUpdater.downloadUpdate();
  });

  autoUpdater.on('update-downloaded', () => {
    console.log('mise à téléchargé, installation...');
    // Optionally you can notify the user here
    NotifyUserAboutInstallation();
    autoUpdater.quitAndInstall();
  });

  autoUpdater.on('error', (err) => {
    console.error('Auto updater error:', err.message);
    // Optionally you can notify the user here
    // NotifyUserAboutError();
  });
});


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createSplashWindow();
  }
});

app.on('before-quit', () => {
  app.isQuitting = true;
});



ipcMain.on('launch-exe-app', (noOfApps) => {
  const child = require('child_process').execFile;  
  function launchNextApp(noOfApps) {
    if (noOfApps <= 0) return; // Base case: no more apps to launch

    const appRootPath = app.getAppPath();
    const executablePath = path.join(appRootPath, 'app', 'dofus.exe');

    console.log(`Launching '${executablePath}' (${noOfApps} remaining)`);

    child(executablePath, function (err, data) {
        if (err) {
            console.error(`Error launching ${executablePath}:`, err);
            return;
        }
        console.log(`Output from ${executablePath}:`, data.toString());
        launchNextApp(noOfApps - 1); // Recur with decremented count
    });
}

launchNextApp(noOfApps); // Start the recursive launching
});

ipcMain.on('close-main-window', (event) => {
  if (!app.isQuitting) {
    event.preventDefault();
    win.hide();
  }
});

ipcMain.on('update-finished', () => {
  console.log("Mise à jour terminé , ouverture du launcher")
  createMainWindow();
});

autoUpdater.on('update-available', () => {
  autoUpdater.downloadUpdate();
});


const rpc = new DiscordRPC.Client({ transport: 'ipc' });
const startTimestamp = new Date();

async function setActivity() {
  if (!rpc || !win) {
    return;
  }

  rpc.setActivity({
    details: `Foudroie la nouvelle M.A.J Chimera`,
    state: 'En train de préparer sa colère de Iop',
    startTimestamp,
    largeImageKey: 'logo',
    largeImageText: 'Hypo a la prod',
    smallImageKey: 'logo',
    smallImageText: 'Hypo a la prod',
    instance: false,
    buttons: [
      {
        "label": "Faire un tour sur Chimera",
        "url": "http://chimeraf2w.com/"
      },
      {
        "label": "Guide complet de Chimera",
        "url": "https://docs.google.com/document/d/1evIwKZhYmvT4kO-bc1ox8bXhQNi9wekl10ZNSMWJr8Y/edit"
      }
    ]
  });
}

rpc.on('ready', async () => {
  setActivity();
  setInterval(() => {
    setActivity();
  }, 15 * 1000);
});

rpc.login({ clientId }).catch(console.error);