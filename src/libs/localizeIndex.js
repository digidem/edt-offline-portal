export default (page, i18n, locale) => {
  if (!page || !i18n || !locale) return page;
  let title = page.title;
  let description = page.description;
  if (locale !== i18n.defaultLocale) {
    if (page[`title_${locale}`]) title = page[`title_${locale}`];
    if (page[`description_${locale}`])
      description = page[`description_${locale}`];
  }
  return {
    title,
    description,
  };
};
