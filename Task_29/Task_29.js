const labelAge = document.getElementById("labelAge")
const ageInput = document.getElementById("ageInput")

const form = document.getElementById("form")
const firstName = document.getElementById("firstName")
const secondName = document.getElementById("secondName")

ageInput.addEventListener("input",function (){
    labelAge.textContent = "Возвраст: " + this.value 
})


const sendForm = (e) =>{
    e.preventDefault();

    let name = firstName.value
    let surname = secondName.value
    let gender = form.querySelector("input[name=gender]:checked").value
    let age = ageInput.value

    alert(`Имя: ${name} \n
    Фамилия: ${surname} \n
    Пол: ${gender} \n
    Возраст: ${age}
    `)
    
    firstName.value = ""
    secondName.value = ""
    age.value = ""
}

form.addEventListener("submit", sendForm)