export function UrlDecode(zipStr: any) {
  var uzipStr = ''
  for (var i = 0; i < zipStr.length; i += 1) {
    var chr = zipStr.charAt(i)
    if (chr === '+') {
      uzipStr += ' '
    } else if (chr === '%') {
      var asc = zipStr.substring(i + 1, i + 3)
      if (parseInt('0x' + asc) > 0x7f) {
        uzipStr += decodeURI('%' + asc.toString() + zipStr.substring(i + 3, i + 9).toString())
        i += 8
      } else {
        uzipStr += AsciiToString(parseInt('0x' + asc))
        i += 2
      }
    } else {
      uzipStr += chr
    }
  }
  return uzipStr
}

function StringToAscii(str: any) {
  return str.charCodeAt(0).toString(16)
}
function AsciiToString(asccode: any) {
  return String.fromCharCode(asccode)
}
