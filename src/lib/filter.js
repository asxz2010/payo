const cutString = (str, len) => {
  if (str && str.length > len) {
    str = str.substring(0, len)
  }
  console.log(str, len)
  return str
}

export {
  cutString
}
