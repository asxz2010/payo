<template>
</template>

<script>
  // const api = 'http://api.51pyvip.com/'
  const api = 'http://api.payovip.com/'

  // 窗口高度
  const html_height = window.innerHeight

  // 验证邮箱格式
  const check_email = /^[a-zA-Z0-9]+@[a-z0-9]{2,5}\.[a-z]{2,3}(\.[a-z]{2,3})?$/

  // 设置cookie
  const setCookie = (c_name, value, expire) => {
    var date = new Date()
    date.setSeconds(date.getSeconds() + expire)
    document.cookie = c_name + "=" + escape(value) + "; expires=" + date.toGMTString()
  }

  // 获取cookie
  const getCookie = c_name => {
    if (document.cookie.length > 0) {
      let c_start = document.cookie.indexOf(c_name + "=")
      if (c_start != -1) {
        c_start = c_start + c_name.length + 1
        let c_end = document.cookie.indexOf(";", c_start)
        if (c_end == -1) c_end = document.cookie.length
        return unescape(document.cookie.substring(c_start, c_end))
      }
    }
    return ""
  }

  // 删除cookie
  const delCookie = c_name => {
    setCookie(c_name, "", -1)
  }

  // 时间戳
  const timestamp = Math.round(new Date() / 1000)

  // 截取字符串
  const cutString = (str, len) =>{
    if(str && str.length>len){
      str = str.substring(0, len)
    }
    return str
  }

  export default {
    api,
    html_height,
    check_email,
    setCookie,
    getCookie,
    delCookie,
    timestamp,
    cutString
  }
</script>

<style>
</style>
