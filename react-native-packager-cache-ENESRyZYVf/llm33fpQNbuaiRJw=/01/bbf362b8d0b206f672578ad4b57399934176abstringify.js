var getFunctionName = require('./getFunctionName');

function replacer(key, value) {
  if (typeof value === 'function') {
    return getFunctionName(value);
  }
  return value;
}

module.exports = function stringify(x) {
  try {
    return JSON.stringify(x, replacer, 2);
  } catch (e) {
    return String(x);
  }
};