let FileSystem = {
  name: "File System",
  shortName: "File System",
  varName: "file-system",
  icon: "folder_open",
  version: "1.0.0",
  menubar: [{
    name: "App",
    menu: [{
      name: "About",
      action() {}
    }, {
      name: "Preferences",
      action() {}
    }, {
      name: "Quit",
      action() {}
    }]
  }, {
    name: "File",
    menu: [{
      name: "New Window",
      action() {
        app.newWindow({
          application: "File System",
          title: "Documents"
        });
      }
    }, {
      name: "Minimize Window",
      action() {
        app.minimizeWindow(_.maxBy(data.windows, (a) => a.index).index);
      }
    }, {
      name: "Maximize Window",
      action() {
        app.maximizeWindow(_.maxBy(data.windows, (a) => a.index).index);
      }
    }, {
      name: "Close Window",
      action() {
        app.closeWindow(_.maxBy(data.windows, (a) => a.index).index);
      }
    }, {
      divider: true
    }, {
      name: "Open",
      action() {}
    }, {
      name: "Rename",
      action() {}
    }, {
      name: "Delete",
      action() {}
    }]
  }, {
    name: "Edit",
    menu: [{
      name: "Undo",
      action() {}
    }, {
      name: "Redo",
      action() {}
    }, {
      divider: true
    }, {
      name: "Copy",
      action() {}
    }, {
      name: "Cut",
      action() {}
    }, {
      name: "Paste",
      action() {}
    }, {
      name: "Select All",
      action() {}
    }]
  }, {
    name: "Go",
    menu: [{
      name: "Back",
      action() {}
    }, {
      name: "Forward",
      action() {}
    }]
  }],
  color: "primary"
}

Vue.component("app-file-system", {
  template: "<v-container>Hello</v-container>"
});
