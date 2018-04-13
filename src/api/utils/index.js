export const addParamsToUrl = (url: string, params: Object) => {
  const urlObj = new URL(url);
  Object.keys(params).forEach(key =>
    urlObj.searchParams.append(key, params[key])
  );
  return urlObj;
};
