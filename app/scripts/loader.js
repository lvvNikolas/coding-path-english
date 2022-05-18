let element = document.createElement('div')
element.classList.add('main__loader')
let svgLoading = document.createElement('img')
svgLoading.src = 'images/loader.svg'
svgLoading.classList.add('loader-svg')
element.appendChild(svgLoading)
document.querySelector('body').appendChild(element)

window.addEventListener('load', ()=>{
    setTimeout(()=>{
        document.querySelector('body').removeChild(element)
    },50)
})