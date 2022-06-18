let postHolder = document.querySelector('#post-holder');
let postForm = document.querySelector('#post-form');
let postHead = document.querySelector('#title');
let postContent = document.querySelector('#body');

let postContainer = [];

function getPosts() {
  let oldPosts =  fetch('https://jsonplaceholder.typicode.com/posts')
  oldPosts.then((response) => response.json())
  .then((data) => {
    postContainer = data
    let postBox = '';
    postContainer.forEach(post => {
        postBox += `
        <div class="col-lg-4 col-md-6 mb-4">
        <div class="card h-100 no-border">
            <div class="card-body">
                <p>${post.id}</p>
                <h6 class="post-title">${post.title}</h6>
                <p class="post-body">${post.body}</p>
                <div class="d-flex justify-content-between flex-wrap">
                    <button class="btn btn-primary" onclick="singlePost(${post.id})">View</button>
                    <button class="btn btn-secondary" onclick="updatePost(${post.id})">Update</button>
                    <button class="btn btn-danger" onclick="deletePost(${post.id})">Delete</button>
                </div>
            </div>
        </div>
    </div>
    `
    });
    postHolder.innerHTML = postBox;
  })
}

getPosts();

postForm.addEventListener('submit', createPost)

function createPost(e) {
    e.preventDefault();
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
        title: postHead.value,
        body: postContent.value,
        userId: 2,
  }),
  headers: {
    'Content-type': 'application/json',
  }
})
  .then((response) => response.json())
  .then((data) => {
    postContainer.unshift(data);
    let postBox = '';
    postContainer.forEach(post => {
        postBox += `
        <div class="col-lg-4 col-md-6 mb-4">
        <div class="card h-100 no-border">
            <div class="card-body">
                <p>${post.id}</p>
                <h6 class="post-title">${post.title}</h6>
                <p class="post-body">${post.body}</p>
                <div class="d-flex justify-content-between flex-wrap">
                    <button class="btn btn-primary" onclick="singlePost(${post.id})">View</button>
                    <button class="btn btn-secondary" onclick="updatePost(${post.id})">Update</button>
                    <button class="btn btn-danger" onclick="deletePost(${post.id})">Delete</button>
                </div>
            </div>
        </div>
    </div>
    `
    });
    postHolder.innerHTML = postBox;    
  });
}

createPost;

function updatePost(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            id: id,
            title: postHead.value,
            body: postContent.value,
            userId: 1,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((data) => {
            let postTitles = document.querySelectorAll('.post-title');
            let postBodies = document.querySelectorAll('.post-body');
            postTitles.forEach((postTitle, index) => {
                if(index + 1 === id) {
                    if(data.title !== "") {
                        postTitle.innerHTML = data.title;
                    }                    
                }
            })
            
            postBodies.forEach((postBody, index) => {
                if(index + 1 === id) {
                    if(data.body !== "" ) {
                        postBody.innerHTML = data.body;
                    }                   
                }
            })
        });
}

updatePost(id);

function singlePost(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((response) => response.json())
        .then((data) => {
            //console.log(data);
            localStorage.setItem('viewedPost', JSON.stringify(data))
            window.location.href = `post.html?id=${id}`
    });
}

singlePost(id);


function deletePost(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
    })
        .then((response) => response.json())
        .then((data) => {
            postContainer = postContainer.filter(post => post.id !== id)
            //console.log(postContainer)
            let postBox = '';
            postContainer.forEach(post => {
            postBox += `
                <div class="col-lg-4 col-md-6 mb-4">
                    <div class="card h-100 no-border">
                        <div class="card-body">
                            <p>${post.id}</p>
                            <h6 class="post-title">${post.title}</h6>
                            <p class="post-body">${post.body}</p>
                            <div class="d-flex justify-content-between flex-wrap">
                                <button class="btn btn-primary" onclick="singlePost(${post.id})">View</button>
                                <button class="btn btn-secondary" onclick="updatePost(${post.id})">Update</button>
                                <button class="btn btn-danger" onclick="deletePost(${post.id})">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            `
        });
    postHolder.innerHTML = postBox;            
        })
}

deletePost(id);


/*function renderUI (arr) {
    let postBox = '';
    arr.forEach(post => {
        postBox += `
        <div class="col-md-4 mb-4">
        <div class="card h-100">
            <div class="card-body">
                <p>${post.id}</p>
                <h6 class="post-title">${post.title}</h6>
                <p class="post-body">${post.body}</p>
                <div class="d-flex justify-content-between flex-wrap">
                    <button class="btn btn-primary" onclick="singlePost(${post.id})">View</button>
                    <button class="btn btn-secondary" onclick="updatePost(${post.id})">Update</button>
                    <button class="btn btn-danger" onclick="deletePost(${post.id})">Delete</button>
                </div>
            </div>
        </div>
    </div>
    `
    });
    postHolder.innerHTML = postBox;
}*/