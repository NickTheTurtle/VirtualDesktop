let applications = [FileSystem, Browser];

let windows = [{
  index: 0,
  minimized: false,
  application: "File System",
  position: [0, 0],
  size: [Infinity, Infinity]
}];

let data = {
  currentApp: "File System",
  mini: true,
  drawer: true,
  applications,
  windows,
  maxSize: [0, 0],
  resizeWindowIndex: NaN,
  dragWindowIndex: NaN,
  dragInitialCoord: [NaN, NaN]
};

new Vue({
  el: '#app',
  data,
  methods: {
    switchApp(app) {
      this.currentApp = app;
      let application = _.find(this.applications, (a) => a.name === app);
      if (application.open) {

      } else {
        _.find(this.applications, (a) => a.name === app).open = true;
      }
    },
    resizeContent() {
      let content = $("#content > div");
      let container = $("#container");
      if (content && container) {
        this.maxSize = [content.width() - parseInt(container.css("padding-left")) * 2, content.height() - parseInt(container.css("padding-top")) * 2];
        for (let i = 0; i < this.windows.length; i++) {
          this.windows[i].size = [Math.min(this.windows[i].size[0], this.maxSize[0]), Math.min(this.windows[i].size[1], this.maxSize[1])];
        }
      }
    },
    startResize(index) {
      this.resizeWindowIndex = index;
    },
    stopResize() {
      this.resizeWindowIndex = NaN;
    },
    resizingDraggingWindow(event) {
      let winResize = _.find(this.windows, (a) => a.index === this.resizeWindowIndex);
      let winDrag = _.find(this.windows, (a) => a.index === this.dragWindowIndex);
      if (!isNaN(this.resizeWindowIndex)) {
        winResize.size = [event.clientX - winResize.position[0] + $(`#windows-${this.resizeWindowIndex}-resize`).width() / 2, event.clientY - winResize.position[1] - $("#menubar").height() + $(`#windows-${this.resizeWindowIndex}-resize`).height() / 2]
      } else if (!isNaN(this.dragWindowIndex)) {
        winDrag.position = [Math.min(event.clientX - this.dragInitialCoord[0], this.maxSize[0] - winDrag.size[0]), Math.max(event.clientY - this.dragInitialCoord[1], 0)];
      }
    },
    startDrag(index, event) {
      let win = _.find(this.windows, (a) => a.index === index);
      this.dragWindowIndex = index;
      this.dragInitialCoord = [event.clientX - win.position[0], event.clientY - win.position[1]];
    },
    stopDrag() {
      this.dragWindowIndex = NaN;
      this.dragInitialCoord = [NaN, NaN];
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
