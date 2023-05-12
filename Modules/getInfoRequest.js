import { getCookie } from ".Modules/getCookies.js"


  const responseGet = fetch('https://edu.strada.one/api/user/me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${getCookie('token')}`
    }
  })

  

export { responseGet, getCookie }
