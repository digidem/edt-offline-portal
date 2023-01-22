module.exports = (installers) => {
  let localAppManifest = [];
  try {
    localAppManifest = require("../static/localAppManifest.json");
  } catch (err) {
    /* eslint-disable no-console */
    console.log("Cannot find local app manifest", err);
  }
  return installers.map((i) => {
    const localInstallerDir = localAppManifest.filter(
      (localApp) => localApp.src === i
    )[0]?.dir;
    const extension = i.split(".").pop().toLowerCase();
    let platform;
    if (extension === "zip" || extension === "gz") {
      if (RegExp("\\b" + "linux" + "\\b").test(i)) platform = "linux";
      if (RegExp("\\b" + "macos" + "\\b").test(i)) platform = "mac";
      if (RegExp("\\b" + "windows" + "\\b").test(i)) platform = "windows";
    }
    if (extension === "exe" || extension === "msi") platform = "windows";
    else if (extension === "deb" || extension === "appimage")
      platform = "linux";
    else if (extension === "dmg") platform = "mac";
    else if (extension === "apk") platform = "android";
    return {
      link: i,
      platform,
      extension,
      dir: localInstallerDir || null,
      filename: localInstallerDir ? localInstallerDir.split("/")[1] : null,
    };
  });
};
