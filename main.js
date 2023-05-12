/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable space-before-blocks */
/* eslint-disable no-multi-spaces */
/* eslint-disable no-trailing-spaces */
/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable no-multiple-empty-lines */
import { getCookie } from "./Modules/getCookies.js";
import { responseGet } from "./Modules/getInfoRequest.js";
import { responseGetMessages } from "./Modules/getMessagesRequest.js";
import { response } from "./Modules/setNameRequest.js";
import { getItem, setItem } from "./Modules/localStorage.js";
console.log(responseGet)
console.log(getCookie("token"))


window.addEventListener("DOMContentLoaded", () => {
  if (typeof getCookie("token") !== "undefined" && getCookie("token") !== ''.trim() && getCookie("token") !== '``'){
    document.querySelector("#popupAuth").classList.add("none")
    getItem()
    dataOfScroll.classList.remove("none")
    async function lol () {
      console.log(await responseGet);
      const resultGet = await (await responseGet).json()
      console.log(resultGet);



      const emailUser = resultGet.email
      userEmail = emailUser
      console.log(emailUser)
      chatName = getItem()


      let msgs = await (await responseGetMessages).json()

 
      console.log(msgs.messages)

      msgs = msgs.messages
      allMessages = msgs
      

      
      for (let i = 0; i < 20; i++) {


        const date = new Date(msgs[i].createdAt);
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);
        console.log(formattedDate)


        if (emailUser !==  msgs[i].user.email){
          message.textContent = msgs[i].user.name + ": " + msgs[i].text
          time.textContent = new Date(msgs[i].createdAt).toLocaleTimeString('nu');
          msgCopy = template.content.cloneNode(true);
          msgCopy.querySelector(".myMessageDiv").setAttribute("value",`${formattedDate}`)
          msgCopy.querySelector(".myMessageDiv").classList.add("someMessageDiv")
          msgCopy.querySelector(".myMessageDiv").classList.remove("myMessageDiv")
          chat.prepend(msgCopy)
        } else {
          time.textContent = new Date(msgs[i].createdAt).toLocaleTimeString('nu');
          message.textContent = msgs[i].user.name + ": " + msgs[i].text
          msgCopy = template.content.cloneNode(true);
          msgCopy.querySelector(".myMessageDiv").setAttribute("value",`${formattedDate}`)
          chat.prepend(msgCopy)
        }
        count++
      }
      chat.scrollTo(0, chat.scrollHeight)


      
      console.log(resultGet);
      
      async function setNameFun (){
        await response
      }
      setNameFun()
    }
    lol()
    console.log(chatName)
  } else { 
    document.querySelector("#popupAuth").classList.remove("none")
    console.log(responseGet)
  }
})


const socket = new WebSocket(`wss://edu.strada.one/websockets?${getCookie("token")}`);


const container = document.querySelector(".container")
const chat = document.querySelector(".chatWindow")
const template = document.querySelector('template');
console.log(template);
const message =  template.content.querySelector(".message");
const time =  template.content.querySelector(".time");
console.log(message);
console.log(time);
let msgCopy = template.content.cloneNode(true);
console.log(msgCopy)
let chatName = ""

let userEmail = ""
let count = 0
let countMsgs = 20
let allMessages = ""

const dataOfScroll = document.createElement("p")
dataOfScroll.setAttribute(`onmousedown`, "return false")

dataOfScroll.classList.add("dataClass")
dataOfScroll.classList.add("none")
console.log(dataOfScroll.classList)

container.append(dataOfScroll)
const formChat = document.querySelector("#inputForm")
formChat.addEventListener("submit", sendMessage)

async function sendMessage (e) {
  e.preventDefault()
  const date = new Date();
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);
  const input = document.querySelector(".input").value
  if (input.trim() !== "" && chatName !== "") {
    socket.send(JSON.stringify({ text: input }));
    message.textContent = `${chatName}: ` + input
    time.textContent = new Date().toLocaleTimeString('nu');
    msgCopy = template.content.cloneNode(true);
    msgCopy.querySelector(".myMessageDiv").setAttribute("value",`${formattedDate}`)
    chat.append(msgCopy)
    document.querySelector(".input").value = ""
    chat.scrollTo(0, chat.scrollHeight)
  } else if (chatName === ""){
    alert("Сначала введите имя!")
    openParametres()
  }
}

const params = document.querySelector(".parametres")
params.addEventListener("click", openParametres)
function openParametres (e){
  document.querySelector("#popupParams").classList.remove("none")
}

const inputNameForm = document.querySelector(".inputFormParams")
inputNameForm.addEventListener("submit", setName)
function setName (e){
  e.preventDefault()
  const name = document.querySelector(".inputName").value
  if (name.trim() !== ""){
    // console.log(name)
    
    chatName = name
    setItem(chatName)
    

    async function setNameFun (){
      await response
    }
    setNameFun()
    
    
    // document.location.reload()
    document.querySelector("#popupParams").classList.add("none")
  } else {
    alert("Имя должно быть не пустым")
  }
}

const closeNameSet = document.querySelectorAll(".closeButton")
closeNameSet.forEach(element => {
  element.addEventListener("click", closeNameParams)
});
const closeNameParametr = document.querySelector("#closeNameParams").addEventListener("click", () => {
  location.reload()
})

function closeNameParams (){
  document.querySelector("#popupParams").classList.add("none")
  document.querySelector("#popupConfirm").classList.add("none")
}
document.querySelector(".modalName").addEventListener("click", () => {
  document.querySelector("#popupParams").classList.add("none")
  location.reload()
  // document.querySelector("#popupAuth").classList.add("none")
  // document.querySelector("#popupConfirm").classList.add("none")
})


document.querySelector(".modal_box").addEventListener("click", (e) => {
  e.stopPropagation()
})





const getCode = document.querySelector("#getCode")
getCode.addEventListener("click", getCodeFun)
const inputEmailForm = document.querySelector(".inputFormAuth")
inputEmailForm.addEventListener("submit", getCodeFun)
async function getCodeFun (e){
  e.preventDefault()
  if (document.querySelector(".inputAuth").value.trim() !== "" && document.querySelector(".inputAuth").value.includes("@")){
    const mail = {
      email: `${document.querySelector(".inputAuth").value}`
    }
    
    const response = await fetch('https://edu.strada.one/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(mail)
    });
    userEmail = document.querySelector(".inputAuth").value
    const result = await response.json();
    alert(result.message);
  } else {
    alert("Введите корректный email")
  }
}


const useCode = document.querySelector("#useCode")
useCode.addEventListener("click", () => {
  document.querySelector("#popupAuth").classList.add("none")
  document.querySelector("#popupConfirm").classList.remove("none")
})

const backButton = document.querySelector(".backButton")
backButton.addEventListener("click", (e) => {
  document.querySelector("#popupConfirm").classList.add("none")
  document.querySelector("#popupAuth").classList.remove("none")
})

const allErrors = {
  undefined: 'Некорректный токен!',
  'Nothing to geocode': 'Введите название',
  'Internal error': 'Страница не найдена',
  'Invalid API key. Please see https://openweathermap.org/faq#error401 for more info.': 'Ошибка api'
};



const confirmForm = document.querySelector(".inputFormConfirm")
confirmForm.addEventListener("submit", authorize)



async function authorize (e){
  const token = document.querySelector(".inputConfirm").value
  document.cookie = `token=${token}; max-age=3600`
  try {
    e.preventDefault()
    
    

    const responseGet2 = await fetch('https://edu.strada.one/api/user/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        Authorization: `Bearer ${getCookie('token')}`
      }
    })
    result2 = await responseGet2.json()
    chatName = result2.email
    userEmail = chatName
    console.log(chatName)
    setItem(chatName)
    


    
    const responseSet = await fetch('https://edu.strada.one/api/user/', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        Authorization: `Bearer ${getCookie('token')}`
      },
      body: JSON.stringify({ name: `${chatName}` })
    })

    
    
    console.log(responseSet.status)
    if (!((responseSet).status >= 200 && (responseSet).status < 299)) {
      throw new Error(`Ошибка: ${allErrors[responseSet.message]}`);
    } else {
      const result = await (await responseGet).json();
      console.log(result);
      console.log(result.status)
      chatName = (await response).email
      
      document.querySelector(".modalName").classList.remove("none")
      document.querySelector("#popupConfirm").classList.add("none")

      const responseGetMessages2 = fetch('https://edu.strada.one/api/messages/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${getCookie('token')}`
        }
      })



      let msgs = await (await responseGetMessages2).json()
      console.log(msgs)







      

      console.log(msgs.messages)

      msgs = msgs.messages
      allMessages = msgs
      


      const date = new Date();
      const options = { day: 'numeric', month: 'short', year: 'numeric' };
      const formattedDate = date.toLocaleDateString('en-US', options);


      console.log(userEmail)
      for (let i = 0; i < 20; i++) {


        const date = new Date(msgs[i].createdAt);
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);



        if (userEmail !==  msgs[i].user.email){
          message.textContent = msgs[i].user.name + ": " + msgs[i].text
          time.textContent = new Date(msgs[i].createdAt).toLocaleTimeString('nu');
          msgCopy = template.content.cloneNode(true);
          msgCopy.querySelector(".myMessageDiv").setAttribute("value",`${formattedDate}`)
          msgCopy.querySelector(".myMessageDiv").classList.add("someMessageDiv")
          msgCopy.querySelector(".myMessageDiv").classList.remove("myMessageDiv")
          chat.prepend(msgCopy)
        } else {
          message.textContent = msgs[i].user.name + ": " + msgs[i].text
          time.textContent = new Date(msgs[i].createdAt).toLocaleTimeString('nu');
          msgCopy = template.content.cloneNode(true);
          msgCopy.querySelector(".myMessageDiv").setAttribute("value",`${formattedDate}`)
          chat.prepend(msgCopy)
        }
        count++
      }
      chat.scrollTo(0, chat.scrollHeight)
      dataOfScroll.classList.remove("none")
    }
  } catch (e) {
    alert(e.message)
  }
}




console.log(getCookie("token"))

socket.onmessage = async function (event) {
  console.log(event) 
  const emailUser = userEmail
  const jsonEvent = JSON.parse(event.data)
  console.log(jsonEvent)
  console.log(emailUser)

  const date = new Date();
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);


  
  if (jsonEvent.user.email !==  emailUser){    
    message.textContent = jsonEvent.user.name + ": " + jsonEvent.text
    msgCopy = template.content.cloneNode(true);
    msgCopy.querySelector(".myMessageDiv").setAttribute("value",`${formattedDate}`)
    msgCopy.querySelector(".myMessageDiv").classList.add("someMessageDiv")
    msgCopy.querySelector(".myMessageDiv").classList.remove("myMessageDiv")
    chat.append(msgCopy)
  } 
  chat.scrollTo(0, chat.scrollHeight)
};




chat.addEventListener('scroll', scroll);



function scroll (){
  if (chat.scrollTop < 200){
    countMsgs += 20
    if (count === 300){
      const p = document.createElement("p");
      p.textContent = "Вся история загружена"
      p.style = "width:100%;text-align:center;align-self:center;margin-top:30px;background-color:grey;"
      chat.prepend(p)
      chat.removeEventListener("scroll", scroll)
    } else {
      for (let i = count; i < countMsgs; i++) {


        const date = new Date(allMessages[i].createdAt);
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);

        if (userEmail !==  allMessages[i].user.email){
          message.textContent = allMessages[i].user.name + ": " + allMessages[i].text
          time.textContent = new Date(allMessages[i].createdAt).toLocaleTimeString('nu');
          msgCopy = template.content.cloneNode(true);
          msgCopy.querySelector(".myMessageDiv").setAttribute("value",`${formattedDate}`)
          msgCopy.querySelector(".myMessageDiv").classList.add("someMessageDiv")
          msgCopy.querySelector(".myMessageDiv").classList.remove("myMessageDiv")
          chat.prepend(msgCopy)
        } else {
          message.textContent = allMessages[i].user.name + ": " + allMessages[i].text
          time.textContent = new Date(allMessages[i].createdAt).toLocaleTimeString('nu');
          msgCopy = template.content.cloneNode(true);
          msgCopy.querySelector(".myMessageDiv").setAttribute("value",`${formattedDate}`)
          chat.prepend(msgCopy)
        }
        count++
      }
    }
  } 
}



const exitChat = document.querySelector("#exitSession")
exitChat.addEventListener("click", exitChatFun)

function exitChatFun (){
  console.log("exit")
  dataOfScroll.classList.add("none")
  setItem("")
  document.cookie = `token=`
  location.reload()
}


chat.addEventListener("scroll", scrollEnd)
function scrollEnd (){
  dataOfScroll.classList.add("opacity")
  let timer = setTimeout(() => {
    dataOfScroll.classList.remove("opacity")
  }, 1500)
  if (!dataOfScroll.classList.opacity){
    while (timer--) {
      window.clearTimeout(timer); // will do nothing if no timeout with id is present
    }
  }
}
chat.addEventListener("scroll",()=>{
  const dataClassY = document.querySelector(".dataClass").getBoundingClientRect().top
  const dataClassYBottom = document.querySelector(".dataClass").getBoundingClientRect().bottom
  document.querySelectorAll(".preMessage").forEach(e=>{
    if(e.getBoundingClientRect().top >= dataClassY && e.getBoundingClientRect().top <= dataClassYBottom){
      
      dataOfScroll.textContent = `${e.lastElementChild.getAttribute("value")}`
    }
  })
})
