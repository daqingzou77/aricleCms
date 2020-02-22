export const formatDateToString = function (date, _fmt) {
  let fmt = 'DD/MM/YYYY HH:mm:ss'
  if (typeof _fmt !== 'undefined') {
    fmt = _fmt
  }
  if (typeof date === 'number') {
    date = new Date(date)
  }
  if (/(y+)/.test(fmt)) {
    if (typeof date === 'string') {
      date = new Date(date)
    }
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}
