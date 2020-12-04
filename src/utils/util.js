/* eslint-disable */
import Crypto from 'crypto-js'
var inBrowser = typeof window !== 'undefined'
var ua = inBrowser && navigator.userAgent.toLowerCase()
var util = {
  RegExp: {
    email: '^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$',
    mobile: '^(13|14|15|16|17||18|19)[0-9]{9}$',
    idcard: '^([1-9][0-9]{14})$|^[0-9]{17}([0-9]|X)$',
    cn: '^[\u2E80-\u9FFF]+$',
    number: '^[1-9]+$'
  },
  validate: {
    isMobile: function (v) {
      return new RegExp(util.RegExp.mobile).test((v || '').toString().trim())
    },
    isNumber: function (v) {
      return new RegExp(util.RegExp.number).test((v || '').toString().trim())
    }
  },
  /**
     * [page 页面可视区相关操作]
     * @type {Object}
     */
  page: {
    getElementsByClassName(n) {
      var classElements = [],allElements = document.getElementsByTagName('*');
      for (var i=0; i< allElements.length; i++ )
      {
        if (allElements[i].className == n ) {
          classElements[classElements.length] = allElements[i];
        }
      }
      return classElements;
    },
    getWidth: function () {
      var doc = document,
        body = doc.body,
        html = doc.documentElement,
        client = doc.compatMode == 'BackCompat' ? body : doc.documentElement
      return Math.max(html.scrollWidth, body.scrollWidth, client.clientWidth)
    },
    getHeight: function () {
      var doc = document,
        body = doc.body,
        html = doc.documentElement,
        client = doc.compatMode == 'BackCompat' ? body : doc.documentElement
      return Math.max(html.scrollHeight, body.scrollHeight, client.clientHeight)
    },
    getViewWidth: function () {
      var doc = document,
        client = doc.compatMode == 'BackCompat' ? doc.body : doc.documentElement
      return client.clientWidth
    },
    getViewHeight: function (doc) {
      var doc = document || doc,
        client = doc.compatMode == 'BackCompat' ? doc.body : doc.documentElement
      return client.clientHeight
    },
    getRemPx: function () {
      var pageWidth = util.page.getViewWidth()
      var REMPX = 12
      if (pageWidth >= 320 && pageWidth < 360) {
        REMPX = 12
      }
      if (pageWidth >= 360 && pageWidth < 375) {
        REMPX = 13.44
      }
      if (pageWidth >= 375 && pageWidth < 414) {
        REMPX = 14
      }
      if (pageWidth >= 414 && pageWidth < 640) {
        REMPX = 15.5
      }
      return REMPX
    },
    setPageInit: function() {
      var el = this.getElementsByClassName('input')
      if (/android/.test(ua)) {
        return
      }
      for(let i = 0; i < el.length; i++) {
        el[i].addEventListener('blur', function() {
          setTimeout(() => {
            var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
            window.scrollTo(0, Math.max(scrollHeight - 1, 0));
            //window.scrollTo(0, 0)
          }, 100)
        })
      }
    }
  },
  object2Query: function (query) {
    var params = []
    for (var n in query) {
      params.push(n + '=' + query[n])
    }
    return params.join('&')
  },
  object2Array: function (obj) {
    return Object.keys(obj).map((x, idx) => {
      if (x == idx) x = idx// 这就是为什么不要拿数字当做key，否则Object.keys会把Number转成String，2b
      return {name: obj[x], code: x}
    })
  },
  getPlatForm: function () {
    var userAgent = navigator.userAgent
    if (/(iPhone|iPad|iPod|iOS)/i.test(userAgent)) {
      return 'IOS'
    } else {
      return 'Android'
    }
  },
  isIphoneX: function () {
    	return /iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375)
  },
  isWeChat: function () {
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      return true
    } else {
      return false
    }
  },
  getByteLength: function (str) {
    var len = 0
    for (var i = 0; i < str.length; i++) {
      if (str.charCodeAt(i) >= 0x4e00 && str.charCodeAt(i) <= 0x9fa5) {
        len += 2
      } else {
        len++
      }
    }
    return len
  },
  isEmptyObject (e) {
    var t
    for (t in e) {
      return !1
    }
    return !0
  },

  forEach (arr, iterator, thisObject) {
    var returnValue
    if (typeof iterator === 'function') {
      for (let i = 0, len = arr.length; i < len; i++) {
        let item = arr[i]
        returnValue = iterator.call(thisObject || arr, item, i)
        if (returnValue === false) {
          break
        }
      }
    }
    return arr
  },
  /**
     * [url 地址栏相关操作方法]
     * @type {Object}
     */
  url: {
    /**
         * [getParam 获取地址栏参数]
         * @param  {[type]} o [description]
         * @return {[type]}   [description]
         */
    getParam: function (o) {
      var reg = new RegExp('(^|\\?|&|#)' + o + '=([^&#]*)(&|\x24|#)', ''),
        url = location.href,
        match = url.match(reg)
      if (match) {
        return decodeURIComponent(match[2])
      }
      return ''
    },
    urlToObject: function () {
      var url = location.href,
        reg = new RegExp('^.*\\?([a-zA-z0-9&=_%\\u2E80-\\u9FFF]*).*$'),
        match = url.match(reg),
        params = {}
      if (match && match.length > 1) {
        var urlParams = match[1]
        if (urlParams && urlParams.length > 0) {
          urlParams = urlParams.split('&')
          for (var i = 0, len = urlParams.length; i < len; i++) {
            var query = urlParams[i].split('=')
            if (query && query.length > 1) {
              try {
                params[query[0]] = decodeURIComponent(decodeURIComponent(query[1]))
              } catch (e) {}
            }
          }
        }
      }
      if (!params.invitecode) {

      }
      return params
    }
  },
  math: {
    add: function (arg1, arg2) {
      var r1,
        r2,
        m
      try {
        r1 = arg1.toString().split('.')[1].length
      } catch (e) {
        r1 = 0
      }
      try {
        r2 = arg2.toString().split('.')[1].length
      } catch (e) {
        r2 = 0
      }
      m = Math.pow(10, Math.max(r1, r2))
      return (arg1 * m + arg2 * m) / m
    },
    sub: function (arg1, arg2) {
      var r1,
        r2,
        m,
        n
      try {
        r1 = arg1.toString().split('.')[1].length
      } catch (e) {
        r1 = 0
      }
      try {
        r2 = arg2.toString().split('.')[1].length
      } catch (e) {
        r2 = 0
      }
      m = Math.pow(10, Math.max(r1, r2))
      n = (r1 >= r2) ? r1 : r2
      return ((arg1 * m - arg2 * m) / m).toFixed(n)
    },
    mult: function (arg1, arg2) {
      var m = 0,
        s1 = arg1.toString(),
        s2 = arg2.toString()
      try {
        m += s1.split('.')[1].length
      } catch (e) {}
      try {
        m += s2.split('.')[1].length
      } catch (e) {}
      return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
    },
    div: function (arg1, arg2) {
      var t1 = 0,
        t2 = 0,
        r1,
        r2
      try {
        t1 = arg1.toString().split('.')[1].length
      } catch (e) {}
      try {
        t2 = arg2.toString().split('.')[1].length
      } catch (e) {}
      r1 = Number(arg1.toString().replace('.', ''))
      r2 = Number(arg2.toString().replace('.', ''))
      return (r1 / r2) * Math.pow(10, t2 - t1)
    }
  },
  /**
     * [date 日期相关操作]
     * @type {Object}
     */
  date: {
    /**
         * [pad 日期补0]
         * @param  {[type]} source [description]
         * @param  {[type]} length [description]
         * @return {[type]}        [description]
         */
    pad: function (source, length) {
      var pre = '',
        negative = (source < 0),
        string = String(Math.abs(source))
      length = length || 2
      if (string.length < length) {
        pre = (new Array(length - string.length + 1)).join('0')
      }

      return (negative ? '-' : '') + pre + string
    },
    getDifferDay: function (time, count) {
      var dd
      if (time) {
        dd = new Date(time.replace(/-/g, '/'))
      } else {
        dd = new Date()
      }
      var targetday_milliseconds = dd.getTime() + 1000 * 60 * 60 * 24 * count
      dd.setTime(targetday_milliseconds)
      var y = dd.getFullYear()
      var m = dd.getMonth() + 1
      var d = dd.getDate()
      if (m < 10) { m = '0' + m }
      if (d < 10) { d = '0' + d }
      var res = y + '/' + m + '/' + d
      return res
    },
    /**
         * [format 日期格式化]
         * @param  {[type]} source  [description]
         * @param  {[type]} pattern [description]
         * @return {[type]}         [description]
         */
    format: function (source, pattern) {
      if (typeof pattern !== 'string') {
        return source.toString()
      }

      function replacer (patternPart, result) {
        pattern = pattern.replace(patternPart, result)
      }

      var pad = util.date.pad,
        year = source.getFullYear(),
        month = source.getMonth() + 1,
        date2 = source.getDate(),
        hours = source.getHours(),
        minutes = source.getMinutes(),
        seconds = source.getSeconds()

      replacer(/yyyy/g, pad(year, 4))
      replacer(/yy/g, pad(parseInt(year.toString().slice(2), 10), 2))
      replacer(/MM/g, pad(month, 2))
      replacer(/M/g, month)
      replacer(/dd/g, pad(date2, 2))
      replacer(/d/g, date2)

      replacer(/HH/g, pad(hours, 2))
      replacer(/H/g, hours)
      replacer(/hh/g, pad(hours % 12, 2))
      replacer(/h/g, hours % 12)
      replacer(/mm/g, pad(minutes, 2))
      replacer(/m/g, minutes)
      replacer(/ss/g, pad(seconds, 2))
      replacer(/s/g, seconds)

      return pattern
    }
  },
  getInputValue: function (id) {
    return inBrowser && $.trim($('#' + id).val())
  },
  /**
     * 获取一段随机字符串(可指定长度)
     */
  getRandom: function (len) {
    return Math.random().toString(36).substr(2, len || 15)
  },
  /**
     * 生成时间戳
     */
  timesTamp: function () {
    return parseInt(new Date().getTime() / 1e3) + ''
  },

  enJson (json) {
    var str = this.enString(JSON.stringify(json), 'a')
    return str
  },
  deJson (str) {
    var str = this.deString(str, 'a')
    if (str) {
      return JSON.parse(str)
    }
    return str
  },

  /**
     * [string2UTF8Array 字符串转成utf-8数组]
     * @param {[type]} str [字符串]
     */
  string2UTF8Array: function (str) {
    var utf8 = []
    for (var i = 0; i < str.length; i++) {
      var charcode = str.charCodeAt(i)
      if (charcode < 0x80) utf8.push(charcode)
      else if (charcode < 0x800) {
        utf8.push(0xc0 | (charcode >> 6),
          0x80 | (charcode & 0x3f))
      } else if (charcode < 0xd800 || charcode >= 0xe000) {
        utf8.push(0xe0 | (charcode >> 12),
          0x80 | ((charcode >> 6) & 0x3f),
          0x80 | (charcode & 0x3f))
      }
      // surrogate pair
      else {
        i++
        // UTF-16 encodes 0x10000-0x10FFFF by
        // subtracting 0x10000 and splitting the
        // 20 bits of 0x0-0xFFFFF into two halves
        charcode = 0x10000 + (((charcode & 0x3ff) << 10) |
                          (str.charCodeAt(i) & 0x3ff))
        utf8.push(0xf0 | (charcode >> 18),
          0x80 | ((charcode >> 12) & 0x3f),
          0x80 | ((charcode >> 6) & 0x3f),
          0x80 | (charcode & 0x3f))
      }
    }
    return utf8
  },
  /**
     * [bytes2Number utf-8数组转数字]
     * @param  {[type]} bytes  [utf-8数组]
     * @param  {[type]} offset [偏移量]
     * @return {[type]}        [数字]
     */
  bytes2Number: function (bytes, offset) {
    var value = (bytes[offset] & 255) << 24 | (bytes[offset + 1] & 255) << 16 | (bytes[offset + 2] & 255) << 8 | bytes[offset + 3] & 255
    return value
  },
  /**
     * [enMd5 md5加密]
     * @param  {[type]} str [字符串]
     * @return {[type]}     [数字]
     */
  enMD5: function (str) {
    return Crypto.MD5(str).toString()
  },
  /**
     * [string 字符串相关]
     * @type {Object}
     */
  string: {
    formatToCurrice(str) {
      if(!str) return '';
      var decimal_str = str.indexOf('.') > 0 ? str.substr(str.indexOf('.'),str.length) : '.00';

      var b=parseInt(str).toString();  
      var len=b.length;  
      if(len<=3){
        return b + decimal_str;
      }  
      var r=len%3;  
      var integer_str = r>0?b.slice(0,r)+","+b.slice(r,len).match(/\d{3}/g).join(","):b.slice(r,len).match(/\d{3}/g).join(","); 
      return integer_str + decimal_str;
    },
    /**
         * [format 格式化字符串]
         * @param  {[type]} source [description]
         * @param  {[type]} opts   [description]
         * @return {[type]}        [description]
         */
    format: function (source, opts) {
      source = String(source)
      var data = Array.prototype.slice.call(arguments, 1),
        toString = Object.prototype.toString
      if (data.length) {
        data = data.length == 1
          ? (opts !== null && (/\[object Array\]|\[object Object\]/.test(toString.call(opts))) ? opts : data) : data
        return source.replace(/#\{(.+?)\}/g, function (match, key) {
          var replacer = data[key]
          if (toString.call(replacer) == '[object Function]') {
            replacer = replacer(key)
          }
          return (typeof replacer === 'undefined' ? '' : replacer)
        })
      }
      return source
    },
    decode: function (str) {
      return str.replace(/&/g, '&amp;')
    },
    stripTags: function (source) {
      return String(source || '').replace(/<[^>]+>/g, '')
    },
    toCamelCase: function (source) {
      if (source.indexOf('-') < 0 && source.indexOf('_') < 0) {
        return source
      }
      return source.replace(/[-_][^-_]/g, function (match) {
        return match.charAt(1).toUpperCase()
      })
    },
    /**
         * [getByteLength 获取字符串字节长度]
         * @param  {[type]} str [description]
         * @return {[type]}     [description]
         */
    getByteLength: function (str) {
      var len = 0
      for (var i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) >= 0x4e00 && str.charCodeAt(i) <= 0x9fa5) {
          len += 2
        } else {
          len++
        }
      }
      return len
    },
    _keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
    /**
         * 64位编码程序
         */
    encodeBase64: function (input) {
      var _keyStr = this._keyStr
      var output = ''
      var chr1, chr2, chr3, enc1, enc2, enc3, enc4
      var i = 0

      input = this._utf8_encode(input)
      while (i < input.length) {
        chr1 = input.charCodeAt(i++)
        chr2 = input.charCodeAt(i++)
        chr3 = input.charCodeAt(i++)
        enc1 = chr1 >> 2
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4)
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6)
        enc4 = chr3 & 63
        if (isNaN(chr2)) {
          enc3 = enc4 = 64
        } else if (isNaN(chr3)) {
          enc4 = 64
        }
        output = output +
                _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                _keyStr.charAt(enc3) + _keyStr.charAt(enc4)
      }
      return output
    },
    /**
         * 64位解码程序
         */
    decodeBase64: function (input) {
      var _keyStr = this._keyStr
      var output = ''
      var chr1, chr2, chr3
      var enc1, enc2, enc3, enc4
      var i = 0
      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '')
      while (i < input.length) {
        enc1 = _keyStr.indexOf(input.charAt(i++))
        enc2 = _keyStr.indexOf(input.charAt(i++))
        enc3 = _keyStr.indexOf(input.charAt(i++))
        enc4 = _keyStr.indexOf(input.charAt(i++))
        chr1 = (enc1 << 2) | (enc2 >> 4)
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2)
        chr3 = ((enc3 & 3) << 6) | enc4
        output = output + String.fromCharCode(chr1)
        if (enc3 != 64) {
          output = output + String.fromCharCode(chr2)
        }
        if (enc4 != 64) {
          output = output + String.fromCharCode(chr3)
        }
      }
      output = this._utf8_decode(output)
      return output
    },
    _utf8_encode: function (str) {
      str = str.replace(/\r\n/g, '\n')
      var utftext = ''
      for (var n = 0; n < str.length; n++) {
        var c = str.charCodeAt(n)
        if (c < 128) {
          utftext += String.fromCharCode(c)
        } else if ((c > 127) && (c < 2048)) {
          utftext += String.fromCharCode((c >> 6) | 192)
          utftext += String.fromCharCode((c & 63) | 128)
        } else {
          utftext += String.fromCharCode((c >> 12) | 224)
          utftext += String.fromCharCode(((c >> 6) & 63) | 128)
          utftext += String.fromCharCode((c & 63) | 128)
        }
      }
      return utftext
    },
    _utf8_decode: function (utftext) {
      var str = ''
      var i = 0
      var c = 0, c1 = 0, c2 = 0
      while (i < utftext.length) {
        c = utftext.charCodeAt(i)
        if (c < 128) {
          str += String.fromCharCode(c)
          i++
        } else if ((c > 191) && (c < 224)) {
          c2 = utftext.charCodeAt(i + 1)
          str += String.fromCharCode(((c & 31) << 6) | (c2 & 63))
          i += 2
        } else {
          c2 = utftext.charCodeAt(i + 1)
          c3 = utftext.charCodeAt(i + 2)
          str += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63))
          i += 3
        }
      }
      return str
    }
  },
  /**
   * 
   * @param {function} fn 延时执行的函数 
   * @param {time} wait 延时多少
   */
  throttle: function (fn, wait) {
    var ctx;
    var args;
    var rtn;
    var timeoutID;
    var last = 0;
    var call = function () {
        timeoutID = null;
        last = +new Date();
        rtn = fn.apply(ctx, args);
        ctx = null;
        args = null;
    };
    return function () {
        ctx = this;
        args = arguments;
        var delta = new Date() - last;
        if (!timeoutID) {
            if (delta >= wait) {
                call();
            } else {
                timeoutID = setTimeout(call, wait - delta);
            }
        }
        return rtn;
    };
},
}
 /* eslint-enable */
export default util
