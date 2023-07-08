const posts = document.getElementsByClassName("post")
for (let i = 0; i < posts.length; i++) {
    let post = posts[i]
    let commentButton = post.children["commentButton"]
    let commentId = post.children["commentId"]
    let commentDiv = post.children["commentDiv"]
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

        fetch("/comment", {
            method: "POST",
            body: JSON.stringify({
                id: id,
                title: title,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => response.json())
            .then((json) => console.log(json));

        commentDiv.classList.add("hidden")
    });
}