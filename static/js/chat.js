let channelDiv = document.getElementById("channelDiv")
let messageDiv = document.getElementById("messageDiv")
let messageBox = document.getElementById("messageBox")
let statusMessage = document.getElementById("statusMessage")

let channelID = 0

async function updateMessages(id) {
    try {
        let response = await fetch("/api/chat/getmessages/" + id);
        let messages = await response.json()
        statusMessage.innerText = ""
        document.querySelectorAll(".messageParagraph").forEach(el => el.remove());
        for (let i in messages) {
            let messageParagraph = document.createElement("p")
            let timeParagraph = document.createElement("p")
            messageParagraph.appendChild(document.createTextNode(messages[i]["creator"]["username"] + ": " + messages[i]["content"]))
            messageParagraph.classList.add("messageParagraph")
            messageParagraph.id = "messageParagraph" + messages[i]["id"]
            messageParagraph.appendChild(timeParagraph)

            let date = new Date(Number(messages[i]["created"].split(".")[0]));
            let utcHours = date.getUTCHours().toString().padStart(2, '0');
            let utcMinutes = date.getUTCMinutes().toString().padStart(2, '0');
            let timeZoneOffset = date.getTimezoneOffset();
            console.log(timeZoneOffset)
            let hours = (utcHours - timeZoneOffset / 60 + 5).toString().padStart(2, '0');
            let minutes = utcMinutes.toString().padStart(2, '0');
            let time = (hours + ":" + minutes)

            messageParagraph.innerHTML = "<span style='color: #515051; font-size: 14px;'>" + time + "</span> " + messageParagraph.innerHTML
            messageDiv.append(messageParagraph)
        }
    }
    catch {
        statusMessage.innerText = "Not connected"
    }
}

function selectChannel(id) {
    channelID = id

    let selectedButton = channelDiv.querySelector(".selected");
    if (selectedButton) {
        selectedButton.classList.remove("selected");
    }

    let channelButton = document.getElementById("channelButton" + id)
    if (channelButton) {
        channelButton.classList.add("selected")
    }
    else {
        console.log("channelButton not found")
    }

    updateMessages(id)
}

async function updateRooms() {
    let response = await fetch("/api/chat/listrooms");
    let rooms = await response.json()
    for (let i in rooms) {
        let channelButton = document.createElement("button")
        channelButton.appendChild(document.createTextNode(rooms[i]["name"]))
        channelButton.id = "channelButton" + rooms[i]["id"]
        channelButton.onclick = function () { selectChannel(rooms[i]["id"]) }

        channelDiv.append(channelButton)
    }

    selectChannel(1)
}

async function sendMessage(content, id) {
    fetch("/api/chat/send/" + String(id), {
        method: "POST",
        body: JSON.stringify({
            content: content
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
}

messageBox.addEventListener("keyup", function onEvent(event) {
    if (event.key === "Enter") {
        if (!messageBox.value == "") {
            if (messageBox.value.length < 140) {
                sendMessage(messageBox.value, channelID)
                updateMessages(channelID)
                messageBox.value = ""
            }
        }
    }
})

function update() {
    updateMessages(channelID)

    setTimeout(update, 1500);
}

window.addEventListener("load", function () {
    updateRooms()
    update()
})