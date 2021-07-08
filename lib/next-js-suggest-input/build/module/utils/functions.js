export function removeLineBreaks(value) {
  return value.replace(/(\r\n|\n|\r)/gm, '');
}
var htmlEntityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  '\'': '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;',
};
export function escapeHtml(value) {
  /* eslint-disable */
  return String(value).replace(/[&<>"'`=\/]/g, function (s) {
    return htmlEntityMap[s];
  });
  /* eslint-enable */
}
export function safeHtmlString(value) {
  return escapeHtml(removeLineBreaks(value));
}
//# sourceMappingURL=functions.js.map