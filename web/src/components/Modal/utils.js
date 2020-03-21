/* eslint-disable */
// 判断对象类型
function getType(o) {
  let _t;
  return ((_t = typeof o) == 'object'
    ? (o == null && 'null') || Object.prototype.toString.call(o).slice(8, -1)
    : _t
  ).toLowerCase();
}
// 获取元素样式
function getStyle(el, styleName) {
  return el.style[styleName]
    ? el.style[styleName]
    : el.currentStyle
    ? el.currentStyle[styleName]
    : window.getComputedStyle(el, null)[styleName];
}
function getStyleNum(el, styleName) {
  return parseInt(getStyle(el, styleName).replace(/px|pt|em/gi, ''));
}
function setStyle(el, obj) {
  if (getType(obj) == 'object') {
    for (let s in obj) {
      const cssArrt = s.split('-');
      for (let i = 1; i < cssArrt.length; i++) {
        cssArrt[i] = cssArrt[i].replace(cssArrt[i].charAt(0), cssArrt[i].charAt(0).toUpperCase());
      }
      const cssArrtnew = cssArrt.join('');
      el.style[cssArrtnew] = obj[s];
    }
  } else if (getType(obj) == 'string') {
    el.style.cssText = obj;
  }
}
export function getSize(el) {
  if (getStyle(el, 'display') != 'none') {
    return {
      width: el.offsetWidth || getStyleNum(el, 'width'),
      height: el.offsetHeight || getStyleNum(el, 'height'),
    };
  }
  const _addCss = { display: '', position: 'absolute', visibility: 'hidden' };
  const _oldCss = {};
  for (let i in _addCss) {
    _oldCss[i] = getStyle(el, i);
  }
  setStyle(el, _addCss);
  const _width = el.clientWidth || getStyleNum(el, 'width');
  const _height = el.clientHeight || getStyleNum(el, 'height');
  for (let i in _oldCss) {
    setStyle(el, _oldCss);
  }
  return { width: _width, height: _height };
}


/*
 ** randomWord 产生任意长度随机字母数字组合
 ** randomFlag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
 ** xuanfeng 2014-08-28
 */

export function randomWord(randomFlag, min, max) {
  var str = '',
    range = min,
    arr = [
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'l',
      'm',
      'n',
      'o',
      'p',
      'q',
      'r',
      's',
      't',
      'u',
      'v',
      'w',
      'x',
      'y',
      'z',
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
    ];

  // 随机产生
  if (randomFlag) {
    range = Math.round(Math.random() * (max - min)) + min;
  }
  for (var i = 0; i < range; i++) {
    let pos = Math.round(Math.random() * (arr.length - 1));
    str += arr[pos];
  }
  return str;
}

