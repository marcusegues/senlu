export const formatServiceName = service =>
  service
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

// https://stackoverflow.com/questions/9870512/how-to-obtain-the-query-string-from-the-current-url-with-javascript
export const getQueryStringValue = key => {
  return decodeURIComponent(
    window.location.search.replace(
      new RegExp(
        '^(?:.*[&\\?]' +
          encodeURIComponent(key).replace(/[\.\+\*]/g, '\\$&') +
          '(?:\\=([^&]*))?)?.*$',
        'i'
      ),
      '$1'
    )
  );
};
