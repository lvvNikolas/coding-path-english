

// BUTTONS HOVER
const activeBtn = document.querySelectorAll('.active-btn')
activeBtn.forEach((e)=>{
    e.addEventListener('mouseover', (event)=>{
        event.target.classList.add('active__button--hovered')
    })
    e.addEventListener('mouseout', (event)=>{
        event.target.classList.remove('active__button--hovered')
    })
    e.addEventListener('click', (event)=>{
        event.target.classList.remove('active__button--hovered')
    })
})

//END OF BUTTONS HOVER

//REVIEWS SCRIPT
function scroller(){
    const container = document.querySelector('.review__container')
    const scroller = document.querySelector('.review__scroller')
    const item = document.querySelector('.review__item')
    const items =  document.querySelectorAll('.review__item')
    const button = document.querySelector('.review__move-left')
    let pos = []
    items.forEach((e) => {
        pos.push(e.offsetLeft)
    })
    let currentIdPos = 0
    button.addEventListener('click', (event) => {
        if(currentIdPos < pos.length -1){
            currentIdPos++
            scroller.style.transform = `translateX(-${pos[currentIdPos]}px)`
           
        }
        else{
            scroller.style.transform = `translateX(0px)`
            currentIdPos = 1
        }
      
    })
    // Update left position value for transform when resize
    window.addEventListener('resize', (e)=>{
        scroller.style.transition = '0s'
        items.forEach((el,id)=>{
            pos.splice(id, 1, el.offsetLeft)
         
            scroller.style.transform = `translateX(-${pos[currentIdPos]}px)`
        })
        scroller.style.transition = 'transform 0.3s'
    })
}
//TESTING 
if(document.title === "Coding-Path международная онлайн школа программирования для детей"){
    scroller()
}

//END OF REVIEWS SCRIPT



function dataFromFormToModal(inputs){
    const arr = []
    inputs.forEach((e)=>{
       arr.push(e.value)
    })
    return arr
}

document.querySelector('.form__submit-btn').addEventListener('click', (e)=>{
   
   let dataFromMainForm =  dataFromFormToModal(document.querySelectorAll('.mainForm__inp'))
   let ModalInputs = document.querySelectorAll('.mb-3 > input')
   ModalInputs.forEach((e,j) => {
        e.value = dataFromMainForm[j]
   })
})

//Recolor active question item

function recolorActiveQuest(){
    let elements = document.querySelectorAll(".accordion-item")
}
recolorActiveQuest()

function sendingCompleteHtml(){
    let modal = document.querySelector('.modal-content')
    modal.style.position = 'relative'
    let element = document.createElement('div')
    element.innerHTML = `
        <div class = "sending_body" style = "position:absolute; top:0; left:0; width:100%; height:100%; background:white; border-radius:32px;
        display:flex; flex-direction:column; justify-content:center; align-items:center; transition: 0.5s">
            <h3 style = "color:#675CE9;">Заявка отправленна</h2>
            <svg style="margin-top:32px" width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="50" fill="#675CE9"/>
            <path d="M35 46.597L48.6883 62L69 38" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
    `
    modal.appendChild(element)
    setTimeout(()=>{
        element.querySelector('.sending_body').style.opacity = 0
    },1000)

    setTimeout(()=>{
        modal.removeChild(element)
    },2000)
}




//FORM SEND DATA
const form = document.getElementById('form')
form.addEventListener('submit', sendForm)

async function sendForm(e){
    e.preventDefault()
    // Validator
    let error = validateErrors(form)
   
    let formData = new FormData(form)
        //Add loader here
        if(error === 0){
            let response = await fetch('sendmail.php',{
                method: 'POST',
                body: formData
            })
            if(response.ok){
                let result = await response.json()
                // console.log(result)
                form.reset()
                // form.classList.remove('nowSending')
                // form.classList.add('sendingOk')
                // setInterval(()=>{
                //     form.classList.remove('sendingOk')
                // },500)
                sendingCompleteHtml()
            }
        }else{
            console.log(error)
        }

}

// FORM VALIDATION -------------------------------
function validateErrors(form){
    let err = 0
    let req = document.querySelectorAll('.mb-3 > input')
    req.forEach((e,i)=>{
        const input = e
        // formRemoveError(input)
        if(input.value === ''){
                // formAddError(input)
                err++
        }
     })
     return err;
}

//ФУНКЦИЯ ДЛЯ СОЗДАНИЯ  РЕКЛМАНЫХ БАННЕРОВ ИЛИ ОБЪЯВЛЕНИЙ НА САЙТЕ

function createBanner(text, pos = "bottom"){
    //настройки стилей в banner.scss
  
    if(document.querySelector('.banner') == null){
       let bannerContainer = document.createElement('div')
       bannerContainer.classList.add('banner')
       pos === "bottom" ? bannerContainer.style.bottom = 0 : bannerContainer.style.top = 0
       document.querySelector('body').appendChild(bannerContainer) 
    }
    // change later
    let htmlTemplate = `
        <input type="checkbox" class="bannerVisState" id="bannerVisState">
        <label for="bannerVisState" class = "bannerLabelState">убрать</label>
        <div class="banner__content">
            <h2 class = "banner__slogan">${text}</h2>
        </div>
    `
    if(document.querySelector('.banner') != null){
        let bannerBody = document.createElement('div')
        bannerBody.innerHTML = htmlTemplate
        console.log(bannerBody)
        document.querySelector('.banner').appendChild(bannerBody)
    }
}
// createBanner("рекламный текст")

const projectLinks = [
    'https://drony0610.github.io/curiosityv1/',
    'images/dest/stud-work2.png',
    'https://todo-app-sample.netlify.app/',
    'images/dest/stud-work4.png',
    'https://www.youtube.com/embed/0ZRu086S2-8'
]
document.querySelectorAll('.student-works__img').forEach((e,id)=>{
    e.addEventListener('click', (event)=>{
        let modalBg = document.querySelector('.student-works__frame__contaner')
        modalBg.style.display = 'flex'
        renderIFrameModal(modalBg, projectLinks[id], id)
    })
})
function renderIFrameModal(element, link, id){
    element.innerHTML = ""
    element.addEventListener('click',()=>{
        element.style.display = "none"
    })

    const frameTemplate = `<iframe src="${link}" frameborder="0" class="student-works-frame"></iframe>`
    const frameYoutubeTemplate = `<iframe width="80%" height="60%" src="${link}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
    const imgTemplate = `<img src = "${link}" style = "width:80%; height:80%; object-fit:contain;">`
    const divTemplate = `<div style = "width:80%; height:80%; overflow-y:scroll">
        <img src = "${link}" style = "width:100%">
    </div>`
    element.innerHTML = id === 1 ? imgTemplate : id === 3 ? divTemplate : id === 4 ? frameYoutubeTemplate : frameTemplate
   
}

// DRAGGABLE SCROL ON STUDENT WORK SECTION

let mainScrollContainer = document.querySelector('.student-works ')


let pos = {
    left:0,
    x:0
}

function dragStartHandler(e){
    if(e.target.classList != "student-works__img"){
        this.style.cursor = "grabbing"
        pos = {
            //Текущее положение скролла
            left: this.scrollLeft,
            //Положение мыши на момент старта
            x:e.clientX
        }
        this.addEventListener('mousemove', dragHandler);
        this.addEventListener('mouseup', dragEndHandler);
       
    }
}

mainScrollContainer.addEventListener('mousedown', dragStartHandler)

function dragHandler(e){
    this.style.cursor = "grabbing"
    //Разница межу координатами после смещения мыши
    const dynamycX = e.clientX - pos.x
    this.scrollLeft = pos.left - dynamycX
}
function dragEndHandler(e){
    this.style.cursor = "grab"
    this.removeEventListener('mousemove', dragHandler)
    this.removeEventListener('onmouseup',dragEndHandler)
}


