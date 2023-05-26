let addBtn = document.querySelector('.add-btn')
let removeBtn = document.querySelector('.remove-btn')
let modelCont = document.querySelector('.model-cont')
let mainCont = document.querySelector('.main-cont')
let textAreaCont = document.querySelector('.textArea-cont')
let allPriorityColors = document.querySelectorAll('.priority-color')
let toolboxColors = document.querySelectorAll('.color')
let colors = ["light-pink", "light-green", "light-blue", "black"]

let lockClass = 'fa-lock' // close lock
let unlockClass = 'fa-lock-open' // open-lock

let addTaskFlag = false
let removeTaskFlag = false

let modelPriorityColor = colors[colors.length - 1]

let ticketsArr = []
console.log(addTaskFlag)

// Making tasks visible based on color
for (let i = 0; i < toolboxColors.length; i++) {
    toolboxColors[i].addEventListener('click', function () {
        let selectedToolboxColor = toolboxColors[i].classList[0]

        let filterTickets = ticketsArr.filter(function (ticket) {
            return selectedToolboxColor === ticket.ticketColor
        })
        console.log(filterTickets)

        let allTickets = document.querySelectorAll('.ticket-cont')

        for (let i = 0; i < allTickets.length; i++) {
            allTickets[i].remove()
        }

        filterTickets.forEach(function (filteredTicket) {
            createTicket(filteredTicket.ticketColor, filteredTicket.ticketId, filteredTicket.ticketTask)
        })
    })
}

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

removeBtn.addEventListener('click', function () {
    removeTaskFlag = !removeTaskFlag

    if (removeTaskFlag == true) {
        alert('delete button has been activated')
        removeBtn.style.color = 'red'
    }
    else {
        removeBtn.style.color = 'white'
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
                            <div class="task-area">${ticketTask}</div>
                            <div class="ticket-lock">
                            <i class="fa-solid fa-lock"></i>
                          </div>`

    mainCont.appendChild(ticketCont)

    ticketsArr.push({ ticketColor, ticketId, ticketTask })

    console.log(ticketsArr)

    handleRemoval(ticketCont)

    handleLock(ticketCont)

    handleColor(ticketCont)
}

function handleRemoval(ticket) {
    ticket.addEventListener('click', function () {
        if (!removeTaskFlag) return

        else {
            ticket.remove()
        }
    })
}



function handleLock(ticket) {
    let ticketLockElem = ticket.querySelector('.ticket-lock')

    let ticketLockIcon = ticketLockElem.children[0]

    let ticketTaskArea = ticket.querySelector('.task-area')



    ticketLockIcon.addEventListener('click', function () {
        if (ticketLockIcon.classList.contains(lockClass)) {
            ticketLockIcon.classList.remove(lockClass)
            ticketLockIcon.classList.add(unlockClass)
            ticketTaskArea.setAttribute('contenteditable', 'true')
        } else {
            ticketLockIcon.classList.remove(unlockClass)
            ticketLockIcon.classList.add(lockClass)
            ticketTaskArea.setAttribute('contenteditable', 'false')
        }
    })

}

function handleColor(ticket) {
    let ticketColorBand = ticket.querySelector('.ticket-color')

    ticketColorBand.addEventListener('click', function () {
        let currentColor = ticketColorBand.classList[1]
        console.log(currentColor)
        let currentColorIdx = colors.findIndex(function (color) {
            return currentColor === color
        })
        currentColorIdx++
        let newTicketColorIdx = currentColorIdx % colors.length
        let newTicketColor = colors[newTicketColorIdx]
        console.log(newTicketColor)

        ticketColorBand.classList.remove(currentColor)
        ticketColorBand.classList.add(newTicketColor)
    })
}