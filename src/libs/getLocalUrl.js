export default () => {
  const { edtHost } = process.env;
  let url;
  if (edtHost) {
    url = `http://${edtHost}`;
  } else if (process.client) {
    const { hostname, protocol } = window.location;
    url = `${protocol}//${hostname}`;
  }
  return url;
};
