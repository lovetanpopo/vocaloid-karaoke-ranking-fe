import http from "http";

// eslint-disable-next-line @typescript-eslint/no-var-requires
let app = require("./server").default;

const server = http.createServer(app);
const port = Number(process.env.PORT) || 3000;

let currentApp = app;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
server.listen(port, "0.0.0.0", (error: Error) => {
  if (error) {
    console.log(error);
  }

  console.log("🚀 started:" + port);
});

if (module.hot) {
  console.log("✅  Server-side HMR Enabled!");

  module.hot.accept("./server", () => {
    console.log("🔁  HMR Reloading `./server`...");

    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      app = require("./server").default;
      server.removeListener("request", currentApp);
      server.on("request", app);
      currentApp = app;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  });
}
