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
  resizeWindowIndex: NaN
};

let initial = true;

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
    resizingWindow(event) {
      let win = _.find(this.windows, (a) => a.index === this.resizeWindowIndex);
      if (!isNaN(this.resizeWindowIndex)) {
        $(`#windows-${this.resizeWindowIndex}`).width(event.clientX - win.position[0] + $(`#windows-${this.resizeWindowIndex}-resize`).width() / 2).height(event.clientY - win.position[1] - $("#menubar").height() + $(`#windows-${this.resizeWindowIndex}-resize`).height() / 2);
        win.size[0] = event.clientX - win.position[0] + $(`#windows-${this.resizeWindowIndex}-resize`).width() / 2;
        win.size[1] = event.clientY - win.position[1] - $("#menubar").height() + $(`#windows-${this.resizeWindowIndex}-resize`).height() / 2;
      }
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
