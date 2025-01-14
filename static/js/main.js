const posts = document.getElementsByClassName("post")
for (let i = 0; i < posts.length; i++) {
    let post = posts[i]
    let commentButton = post.children["commentButton"]
    let commentId = post.children["commentId"]
    let commentBurgerDiv = post.children["commentBurgerDiv"]
    let usernameElement = post.children["usernameElement"]
    let commentDiv = post.children["commentDiv"]
    let removeButton = post.children["removeButton"]
    let commentBox = commentDiv.children["commentBox"]
    let commentSave = commentDiv.children["commentDivSave"]
    let commentCancel = commentDiv.children["commentDivCancel"]

    commentButton.addEventListener("click", (e) => {
        commentDiv.classList.remove("hidden")
        commentBox.value = ""
    });
    commentCancel.addEventListener("click", (e) => {
        commentDiv.classList.add("hidden")
    });
    commentSave.addEventListener("click", (e) => {
        console.log(commentId.innerHTML)
        title = String(commentBox.value)
        id = String(commentId.innerHTML)

        commentDiv.classList.add("hidden")
        commentBurgerDiv.classList.remove("hidden")

        let para = document.createElement("p");
        const node = document.createTextNode(usernameElement.innerHTML + ": " + title);
        para.appendChild(node)
        commentBurgerDiv.append(para)

        fetch("/api/comment", {
            method: "POST",
            body: JSON.stringify({
                id: id,
                title: title,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
    });
    removeButton.addEventListener("click", (e) => {
        console.log("fart")

        post.classList.add("hidden")
        id = String(commentId.innerHTML)

        fetch("/api/delete", {
            method: "POST",
            body: JSON.stringify({
                id: id
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
    });
}