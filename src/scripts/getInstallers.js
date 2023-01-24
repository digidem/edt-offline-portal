// Read manifest
const { readFileSync, writeFileSync } = require("fs");
const path = require("path");
const wget = require("wget-improved");
const cliProgress = require("cli-progress");
const colors = require("colors");
const parseAppsManifest = require("../libs/parseAppsManifest");

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
      colors.yellow(Math.round(params.value) + "/" + params.total) +
      " --[" +
      bar +
      "]-- "
    );
  }
}

function downloadFile(app, installer, bar, workFolder) {
  const installerName = `${app.slug}-${app.version}-${installer.platform}.${installer.extension}`;
  const outputDir = `${workFolder}/${installerName}`;
  const src = installer.link;
  /* TODO: compare versions between local and remote and only download if different */
  const download = wget.download(src, outputDir, {});
  download.on("error", (err) => {
    console.log(err);
    bar.stop();
  });
  download.on("start", () => {});
  download.on("end", (message) => {
    try {
      const localAppManifest = readFileSync(
        path.join(workFolder, "/localAppManifest.json"),
        {
          encoding: "utf8",
          flag: "r",
        }
      );
      const localApps = JSON.parse(localAppManifest);
      localApps.push({
        message,
        src,
        version: app.version,
        dir: `/${installerName}`,
      });
      writeFileSync(
        `${workFolder}/localAppManifest.json`,
        JSON.stringify(localApps)
      );
    } catch (err) {
      console.error(err);
    }
    bar.stop();
  });
  download.on("progress", (progress) => {
    bar.update(progress * 100);
  });
}

/* Start of program */
console.log(
  "\n Starting download of installers for all applications in the appManifest.json \n"
);
const workFolder = path.join(process.cwd(), "src", "static");
const appManifest = readFileSync(path.join(workFolder, "/appManifest.json"), {
  encoding: "utf8",
  flag: "r",
});
const apps = JSON.parse(appManifest);
try {
  writeFileSync(`${workFolder}/localAppManifest.json`, JSON.stringify([]));
} catch (err) {
  console.error(err);
}

const multibar = new cliProgress.MultiBar(
  {
    clearOnComplete: false,
    hideCursor: true,
    format: formatter,
  },
  cliProgress.Presets.shades_grey
);
apps.forEach((app) => {
  const installers = parseAppsManifest(app.installers).filter((i) => i);
  installers.forEach((installer) => {
    const installerBar = multibar.create(100, 0, {
      payload: `${app.slug}/${installer.platform}.${installer.extension}`,
    });
    try {
      downloadFile(app, installer, installerBar, workFolder);
    } catch (error) {
      console.log(error);
    }
  });
});
