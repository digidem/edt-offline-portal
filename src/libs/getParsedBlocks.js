export default (pages, locale, root) => {
  const localizedBlocks = pages
    .filter((c) => {
      const fileName = c.path.split("/")[c.path.split("/").length - 1];
      const fileLocale = fileName.split("_")[1];
      if (!fileLocale && locale === "en") {
        return true;
      }
      return fileLocale === locale;
    })
    .sort((a, b) => a.slug.localeCompare(b.slug));
  if (root) {
    console.log("localizedBlocks", localizedBlocks);
    return localizedBlocks;
  } else {
    const blocks = localizedBlocks.filter(
      (b) => b.category !== "documentation"
    );
    const documentation = localizedBlocks.filter(
      (b) => b.category === "documentation"
    );
    return {
      blocks,
      documentation,
    };
  }
};
