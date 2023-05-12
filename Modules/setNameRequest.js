import { getCookie } from "./Modules/getCookies.js";


  const response =  fetch('https://edu.strada.one/api/user/', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${getCookie('token')}`
    },
    body: JSON.stringify({ name: `${localStorage.getItem('name')}` })
  })


export {response, getCookie}
