import { getCookie } from "./Modules/getCookies.js";


  const responseGetMessages = fetch('https://edu.strada.one/api/messages/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${getCookie('token')}`
    }
  })


export{responseGetMessages, getCookie}
