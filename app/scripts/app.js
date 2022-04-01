
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
scroller()
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
function scrollFromHeaderToSecondSection(){
    const headerMoreBtn = document.querySelectorAll('.header__button')
    const header = document.querySelector('.header')

    headerMoreBtn[1].addEventListener('click', (e)=>{
        // Здесь + 20 потому что по мимо высоты самого хедера там у nav есть еще margin 20px который тоже добавляет 20 px к высоте прокрутки
        window.scroll(0, header.offsetHeight + 20)
    })
}
scrollFromHeaderToSecondSection()
