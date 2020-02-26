
function getCookies() {
  const pairs = document.cookie.split(';');
  const cookies = {};
  for (var i=0; i<pairs.length; i++) {
    const pair = pairs[i].split('=');
    cookies[(pair[0]+'').trim()] = unescape(pair.slice(1).join('='));
  }
  return cookies;
}

function setPageCookie(page) {
  document.cookie = `page=${page}`
}

module.exports={getCookies, setPageCookie}