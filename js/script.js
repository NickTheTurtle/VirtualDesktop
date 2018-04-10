let applications = [FileSystem, Browser];

let windows = [{
  index: 0,
  minimized: false,
  application: "File System",
  position: [0, 0],
  size: [Infinity, Infinity],
  title: "Documents"
}];

let data = {
  currentApp: "File System",
  drawer: true,
  applications,
  windows,
  maxSize: [0, 0],
  resizeWindowIndex: NaN,
  dragWindowIndex: NaN,
  dragInitialCoord: [NaN, NaN]
};

let dragResizeWindow;

let app = new Vue({
  el: '#app',
  data,
  methods: {
    switchApp(app) {
      this.currentApp = app;
      let application = _.find(this.applications, (a) => a.name === app);
      let windows = _.filter(this.windows, (a) => a.application === app);
      if (windows.length) {
        let maxIndex = _.maxBy(this.windows, (a) => a.index).index;
        let minIndex = _.maxBy(windows, (a) => -a.index).index;
        for (let i = 0; i < windows.length; i++) {
          windows[i].index += maxIndex - minIndex + 1;
          windows[i].minimized = false;
        }
        return maxIndex - minIndex + 1;
      } else {
        let index = this.windows.length ? _.maxBy(this.windows, (a) => a.index).index + 1 : 0;
        this.windows.push({
          index,
          minimized: false,
          application: app,
          position: [0, 0],
          size: [...this.maxSize],
          title: ""
        });
        return index;
      }
    },
    switchWindow(index) {
      let maxIndex = _.maxBy(this.windows, (a) => a.index).index;
      let win = _.find(this.windows, (a) => a.index === index);
      if (index !== maxIndex) {
        win.index = maxIndex + 1;
        win.minimized = false;
        this.currentApp = win.application;
        return maxIndex + 1;
      }
      return index;
    },
    resizeContent() {
      let content = $("#content > div");
      let container = $("#container");
      if (content && container) {
        this.maxSize = [content.width(), content.height() - parseInt(container.css("padding-top")) * 2];
        for (let i = 0; i < this.windows.length; i++) {
          this.windows[i].size = [Math.min(this.windows[i].size[0], this.maxSize[0] - this.windows[i].position[0]), Math.min(this.windows[i].size[1], this.maxSize[1] - this.windows[i].position[1])];
        }
      }
    },
    startResize(index) {
      index = this.switchWindow(index);
      if (isNaN(this.dragWindowIndex)) {
        this.resizeWindowIndex = index;
        dragResizeWindow = _.find(this.windows, (a) => a.index === index);
      }
    },
    stopResizeDrag() {
      this.resizeWindowIndex = NaN;
      this.dragWindowIndex = NaN;
      this.dragInitialCoord = [NaN, NaN];
    },
    resizingDraggingWindow(event) {
      window.getSelection().removeAllRanges();
      if (!isNaN(this.resizeWindowIndex)) {
        dragResizeWindow.size = [Math.min(event.clientX - dragResizeWindow.position[0] + $(`#windows-${this.resizeWindowIndex}-resize`).width() / 2, this.maxSize[0] - dragResizeWindow.position[0]), event.clientY - dragResizeWindow.position[1] - $("#menubar").height() + $(`#windows-${this.resizeWindowIndex}-resize`).height() / 2]
      } else if (!isNaN(this.dragWindowIndex)) {
        dragResizeWindow.position = [Math.max(Math.min(event.clientX - this.dragInitialCoord[0], this.maxSize[0] - dragResizeWindow.size[0]), 0), Math.min(Math.max(event.clientY - this.dragInitialCoord[1], 0), this.maxSize[1] - dragResizeWindow.size[1])];
      }
    },
    startDrag(index, event) {
      index = this.switchWindow(index);
      if (isNaN(this.resizeWindowIndex)) {
        let win = _.find(this.windows, (a) => a.index === index);
        this.dragWindowIndex = index;
        this.dragInitialCoord = [event.clientX - win.position[0], event.clientY - win.position[1]];
        dragResizeWindow = _.find(this.windows, (a) => a.index === index);
      }
    },
    minimizeWindow(index) {
      _.find(this.windows, (a) => a.index === index).minimized = true;
    },
    maximizeWindow(index) {
      let win = _.find(this.windows, (a) => a.index === index);
      win.position = [0, 0];
      win.size = [...this.maxSize];
    },
    closeWindow(index) {
      this.windows = _.filter(this.windows, (a) => a.index !== index);
      if (!this.windows.length) {
        this.currentApp = "File System";
      } else {
        this.currentApp = _.maxBy(this.windows, (a) => a.index).application;
      }
    },
    newWindow({
      index = _.maxBy(this.windows, (a) => a.index).index + 1,
      application,
      title = "",
      position = [0, 0],
      size = [...this.maxSize],
      minimized = false,
      data = []
    }) {
      this.windows.push({
        index,
        application,
        title,
        position,
        size,
        minimized,
        data
      });
    }
  },
  mounted() {
    let content = $("#content > div");
    let container = $("#container");
    let drawer = $("#drawer");
    if (content && container && drawer) {
      this.maxSize = [content.width() - parseInt(container.css("padding-left")) * 2 - drawer.width(), content.height() - parseInt(container.css("padding-top")) * 2];
      for (let i = 0; i < this.windows.length; i++) {
        this.windows[i].size = [Math.min(this.windows[i].size[0], this.maxSize[0]), Math.min(this.windows[i].size[1], this.maxSize[1])];
      }
    }
  }
});
