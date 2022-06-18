function renderSingle() {
    let newObject = localStorage.getItem('viewedPost')
    let post = JSON.parse(newObject)
    console.log(post.title)
    document.getElementById('post-id').innerHTML = post.id;
    document.getElementById('post-title').innerHTML = post.title;
    document.getElementById('post-body').innerHTML = post.body;
}

renderSingle();