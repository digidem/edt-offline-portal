export default async (content, locale) => {
  let index = null;
  let indexSlug = "index";
  if (locale && locale !== "en") indexSlug = `index_${locale}`;
  if (Array.isArray(content)) {
    index = content.filter((c) => c.slug === indexSlug)[0];
  } else index = await content(indexSlug).fetch();
  return index;
};
