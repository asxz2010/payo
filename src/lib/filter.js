/**
 * 截取字符串
 * @param {String} str (字符串)
 * @param {Integer} len (长度)
 */
const cutString = (str, len) => {
  if (str && str.length > len) {
    str = str.substring(0, len)
  }
  return str
}

export {
  cutString
}
