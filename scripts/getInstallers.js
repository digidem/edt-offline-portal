// Read manifest
const { readFileSync } = require("fs");
const path = require("path");
const { mkdirp } = require("mkdirp");
const wget = require("wget-improved");
const cliProgress = require("cli-progress");
const colors = require("colors");
const parseAppsManifest = require("../libs/parseAppsManifest");

function downloadFile(src, output, bar) {
  const download = wget.download(src, output, {});
  download.on("error", (err) => {
    console.log(err);
    bar.stop();
  });
  download.on("start", () => {});
  download.on("end", (output) => {
    bar.stop();
  });
  download.on("progress", (progress) => {
    bar.update(progress * 100);
  });
}

function formatter(options, params, { payload }) {
  const bar = options.barCompleteString.substr(
    0,
    Math.round(params.progress * options.barsize)
  );
  if (params.value >= params.total) {
    return (
      "# " +
      colors.grey(payload) +
      "   " +
      colors.green(params.value + "/" + params.total) +
      " --[" +
      bar +
      "]-- "
    );
  } else {
    return (
      "# " +
      payload +
      "   " +
      colors.yellow(params.value + "/" + params.total) +
      " --[" +
      bar +
      "]-- "
    );
  }
}

function run() {
  console.log(
    "\n Starting download of installers for all applications in the appManifest.json \n"
  );
  const workFolder = path.join(process.cwd(), "static");
  const appManifest = readFileSync(path.join(workFolder, "/appManifest.json"), {
    encoding: "utf8",
    flag: "r",
  });
  const apps = JSON.parse(appManifest);
  const multibar = new cliProgress.MultiBar(
    {
      clearOnComplete: false,
      hideCursor: true,
      format: formatter,
    },
    cliProgress.Presets.shades_grey
  );
  apps.forEach((app) => {
    const installers = parseAppsManifest(app.installers);
    installers.forEach((installer) => {
      const installerBar = multibar.create(100, 0, {
        payload: `${app.slug}/${installer.platform}.${installer.extension}`,
      });
      const dir = `${workFolder}/installers/${app.slug}`;
      mkdirp.sync(dir);
      const path = `${workFolder}/installers/${app.slug}/${installer.platform}.${installer.extension}`;
      try {
        downloadFile(installer.link, path, installerBar);
      } catch (error) {
        console.log(error);
      }
    });
  });
}

run();
