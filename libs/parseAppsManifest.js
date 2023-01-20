export default (installers) => {
  return installers.map((i) => {
    const extension = i.split(".").pop().toLowerCase();
    let platform;
    if (extension === "zip" || extension === "gz") {
      console.log("Oh its a zip!");
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
    };
  });
};
