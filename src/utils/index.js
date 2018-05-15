// @flow
// https://stackoverflow.com/questions/9870512/how-to-obtain-the-query-string-from-the-current-url-with-javascript
export const getQueryStringValue = (key: string): string =>
  decodeURIComponent(
    window.location.search.replace(
      new RegExp(
        `^(?:.*[&\\?]${encodeURIComponent(key).replace(
          /[.+*]/g,
          '\\$&'
        )}(?:\\=([^&]*))?)?.*$`,
        'i'
      ),
      '$1'
    )
  );
