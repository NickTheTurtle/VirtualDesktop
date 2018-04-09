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
      action() {}
    }, {
      name: "Minimize Window",
      action() {}
    }, {
      name: "Maximize Window",
      action() {}
    }, {
      name: "Close Window",
      action() {}
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
