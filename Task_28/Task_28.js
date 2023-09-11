const containter = document.querySelector('.container')
const tmpl = document.getElementById("tmpl")
const elemCreate = document.getElementById("elemCreate")


const elemFromPattern = () =>{
    let clone = tmpl.content.cloneNode(true)
    let elem = clone.querySelector("div")
    
    elem.textContent = elem.textContent + (containter.children.length - 1)
    
    containter.append(elem)
}

elemCreate.addEventListener("click", elemFromPattern)