let addBtn = document.querySelector('.add-btn')
let modelCont = document.querySelector('.model-cont')
let mainCont = document.querySelector('.main-cont')
let textAreaCont = document.querySelector('.textArea-cont')
let allPriorityColors = document.querySelectorAll('.priority-color')

// let colors = ["lightpink", "lightgreen", "lightblue", "black"]
let addTaskFlag = false
// let modelPriorityColor = colors[colors.length-1]
let modalPrioritycolor = 'black'

console.log(addTaskFlag)

// Selecting color for the task
allPriorityColors.forEach(function (colorElem) {
    colorElem.addEventListener('click', function () {
        allPriorityColors.forEach(function (priorityColorElem) {
            priorityColorElem.classList.remove('active')
        })
        colorElem.classList.add('active')

        modalPrioritycolor = colorElem.classList[0] // lightpink
        console.log(modalPrioritycolor)
    })


})

addBtn.addEventListener('click', function () {
    // Display the model
    addTaskFlag = !addTaskFlag
    console.log(addTaskFlag)

    if (addTaskFlag == true) {
        modelCont.style.display = 'flex'
    }
    else {
        modelCont.style.display = 'none'
    }
})

modelCont.addEventListener('keydown', function (e) {
    let key = e.key

    if (key === 'Shift') {
        createTicket(modalPrioritycolor, shortid(), textAreaCont.value)
        modelCont.style.display = 'none'
        console.log(textAreaCont.value)
        textAreaCont.value = ''
    }
})

function createTicket(ticketColor, ticketId, ticketTask) {
    let ticketCont = document.createElement('div')
    ticketCont.setAttribute('class', 'ticket-cont')

    ticketCont.innerHTML = `<div class="ticket-color ${ticketColor}"></div>
                            <div class="ticket-id">${ticketId}</div>
                            <div class="task-area">${ticketTask}</div>`

    mainCont.appendChild(ticketCont)
}