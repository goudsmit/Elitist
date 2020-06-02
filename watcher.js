class Watcher {
  constructor(path) {
    this.path = path
  }
  watch() {
    const watcher = require("chokidar").watch(this.path, {
        ignored: ['/[\/\\]\./', '*.cache'],
        ignoreInitial: true,
        persistent: true
    })
    // .on('all', (event, path) => {
    //   console.log(event, path)
    //   this.win.webContents.send('file-update', path)
    // })
    .on('add', (path) => {
      console.log('ADD: ', path)
      this.win.webContents.send('new-file', path)      
    })
    .on('change', (path) => {
      console.log("CHANGE: ",path)
      this.win.webContents.send('file-update', path)
    })
    this.watcher = watcher
  }
  
}
exports.Watcher = Watcher