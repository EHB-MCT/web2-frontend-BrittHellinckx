"use strict";
import _, {
    initial
} from 'lodash';

window.onload = function () {
    //Generator page
    if (window.location.pathname == 'http://127.0.0.1:5500/docs/pages/generator.html') {
        //Random photo eventlistener
        document.getElementById('photoBtn').addEventListener('click', e => {
            e.preventDefault();
            let randomNumber = Math.floor(Math.random() * 50);
            randomPhoto(randomNumber);
        })
        //Random colours eventlistener
        document.getElementById('colourBtn').addEventListener('click', e => {
            e.preventDefault();
            let random1 = Math.floor(Math.random() * 0xffffff).toString(16);
            let random2 = Math.floor(Math.random() * 0xffffff).toString(16);
            let random3 = Math.floor(Math.random() * 0xffffff).toString(16);
            let random4 = Math.floor(Math.random() * 0xffffff).toString(16);
            randomColours(random1, random2, random3, random4);
        })
    }
    //Post page
    else if (window.location.pathname == 'http://127.0.0.1:5500/docs/pages/posts.html') {
        loadPosts();
    }
    //Profile page
    else if (window.location.pathname == 'http://127.0.0.1:5500/docs/pages/profile.html') {
        //Subnavigation eventlistener
        document.getElementById('savedBtn').addEventListener('click', e => {
            e.preventDefault();
            saved();
        });
        document.getElementById('artBtn').addEventListener('click', e => {
            e.preventDefault();
            art();
        });
        document.getElementById('postsBtn').addEventListener('click', e => {
            e.preventDefault();
            posts();
        });
        document.getElementById('likedBtn').addEventListener('click', e => {
            e.preventDefault();
            liked();
        });
    }
    //Other profile
    else if (window.location.pathname == 'http://127.0.0.1:5500/docs/pages/otherProfile.html') {
        loadPosts()
    }
}
///////////////////////////////////////////GENERATOR////////////////////////////
//Get a random photo
async function randomPhoto(number) {
    //Fetch photo
    fetch(`https://picsum.photos/id/${number}/info`)
        .then(response => response.json())
        .then(function (data) {
            console.log(data.author, data.download_url)
            //Insert photo
            document.getElementById('genBtn').style.display = "none"
            document.getElementById('colour').style.display = "none"
            document.getElementById('photo').innerHTML = `<h2>Here is your inspiration for your next masterpiece</h2>
                                                        <div>
                                                            <img src="${data.download_url}" alt="random" width="600">
                                                        </div>
                                                        <button id="saveArt">Save</button>`
            //Save eventlistener
            document.getElementById('saveArt').addEventListener('click', e => {
                e.preventDefault();
                savePhoto(data.author, data.download_url);
            });
        });
}
//Get random colours
async function randomColours(c1, c2, c3, c4) {
    console.log(c1, c2, c3, c4)
    //Insert colours
    document.getElementById('genBtn').style.display = "none"
    document.getElementById('photo').style.display = "none"
    document.getElementById('colour').innerHTML = `<h2>Here is your inspiration for your next masterpiece</h2>
                                                    <div>
                                                        <img src="http://www.thecolorapi.com/id?format=svg&hex=${c1}">
                                                        <img src="http://www.thecolorapi.com/id?format=svg&hex=${c2}">
                                                        <img src="http://www.thecolorapi.com/id?format=svg&hex=${c3}">
                                                        <img src="http://www.thecolorapi.com/id?format=svg&hex=${c4}">
                                                    </div>
                                                    <button id="saveArt">Save</button>`
    //Save eventlistener
    document.getElementById('saveArt').addEventListener('click', e => {
        e.preventDefault();
        saveColour(c1, c2, c3, c4);
    });
}
//Save random photo
function savePhoto(author, url) {
    //Collect art
    let art = {
        type: "photo",
        author,
        url
    }
    //Post art
    fetch('https://web2-courseproject-britth.herokuapp.com/artpieces', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(art)
        })
        .then(response => response.json())
        .then(data => {
            console.log('art saved', data);
            setTimeout(window.location.replace("/docs/pages/profile.html"), 7000)
        });
}
//Save random colour
function saveColour(c1, c2, c3, c4) {
    //Collect art
    let art = {
        type: "colour",
        c1,
        c2,
        c3,
        c4
    }
    //Post art
    fetch('https://web2-courseproject-britth.herokuapp.com/artpieces', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(art)
        })
        .then(response => response.json())
        .then(data => {
            console.log('art saved', data);
            setTimeout(window.location.replace("/docs/pages/profile.html"), 7000)
        });
}

/////////////////////////////////////////////POSTS//////////////////////////////
//Get all posts
function loadPosts() {
    //Fetch posts
    fetch('https://web2-courseproject-britth.herokuapp.com/posts')
        .then(response => response.json())
        .then(function (data) {
            let post = document.getElementById('postsBlock')
            let htmlString = ""

            //Display all posts
            data.forEach(post => {
                if (post.type == "photo") {
                    htmlString += `<div class="singlePost">
                                        <img src="${post.url}">
                                    </div>`
                } else if (post.type == "colour") {
                    htmlString += `<div class="singlePost">
                                        <img class="colourPost" src="http://www.thecolorapi.com/id?format=svg&hex=${post.c1}">
                                        <img class="colourPost" src="http://www.thecolorapi.com/id?format=svg&hex=${post.c2}">
                                        <img class="colourPost" src="http://www.thecolorapi.com/id?format=svg&hex=${post.c3}">
                                        <img class="colourPost" src="http://www.thecolorapi.com/id?format=svg&hex=${post.c4}">
                                   </div>`
                }
            })
            post.innerHTML = htmlString
            let singlePost = document.getElementsByClassName('singlePost')
            for (let i = 0; i < singlePost.length; i++) {
                singlePost[i].addEventListener('click', e => {
                    e.preventDefault()
                    loadSinglePost(data[i]._id)
                })
            }
        });
}

//Get one post
function loadSinglePost(id) {
    //Show pop-up box
    let focus = document.getElementById('postFocus')
    focus.style.display = "initial"
    let htmlString = ""

    //Fetch singular post
    fetch(`https://web2-courseproject-britth.herokuapp.com/posts/:?id=${id}`)
        .then(response => response.json())
        .then(function (data) {
            //Photo
            if (data.type == "photo") {
                htmlString += `<div class="singlePost">
                            <button id="back">back</button>
                            <figure class="imgPhoto">
                                <img src="${data.url}">
                                <figcaption><a class="profileLink" href="./otherProfile.html">Maaike & Mike</a></figcaption>
                            </figure>   
                            <div class="postInfo">
                                <p>Type: ${data.type}</p>
                                <p>Author: ${data.author}</p>
                                <button id="${data.liked}">Like</button>
                            </div>
                        </div>`
            }
            //Colour
            else if (data.type == "colour") {
                htmlString += `<div class="singlePost">
                            <button id="back">back</button>
                            <div class="leftColours">
                                <div class="imgColours">
                                    <img src="http://www.thecolorapi.com/id?format=svg&hex=${data.c1}">
                                    <img src="http://www.thecolorapi.com/id?format=svg&hex=${data.c2}">
                                    <img src="http://www.thecolorapi.com/id?format=svg&hex=${data.c3}">
                                    <img src="http://www.thecolorapi.com/id?format=svg&hex=${data.c4}">
                                </div>
                                <p><a class="profileLink" href="./otherProfile.html">Maaike & Mike</a></p>
                            </div>
                            <div class="postInfo">
                                <p>Type: ${data.type}</p>
                                <p>Author: ${data.author}</p>
                                <button id="${data.liked}">Like</button>
                            </div>
                       </div>`
            }
            focus.innerHTML = htmlString

            //Backbutton eventlistener
            document.getElementById('back').addEventListener('click', e => {
                e.preventDefault()
                focus.style.display = "none"
            })
            //Like & unlike eventlistener
            document.getElementById(data.liked).addEventListener('click', e => {
                e.preventDefault()
                like(data)
            })
        })
}

//Like & unlike posts
function like(postData) {
    //Set like(true) or unlike (false)
    let liked = !postData.liked;
    let updateLiked = {
        liked
    }
    //Fetch patch for post
    fetch(`https://web2-courseproject-britth.herokuapp.com/posts/:?id=${postData._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateLiked)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Post likestatus changed', data);
            setTimeout(window.location.reload(), 5000)

        });
}

///////////////////////////////////////////PROFILE//////////////////////////////
let profilePost = document.getElementsByClassName('selectPost')
//Save selected
function saved() {
    //Displaying correct section
    document.getElementById('saved').style.display = "flex";
    document.getElementById('art').style.display = "none";
    document.getElementById('posts').style.display = "none";
    document.getElementById('liked').style.display = "none";

    //Fetching all artpieces
    fetch('https://web2-courseproject-britth.herokuapp.com/artpieces')
        .then(response => response.json())
        .then(function (data) {
            let savedDoc = document.getElementById('saved')
            let htmlString = ""

            //Displaying data
            data.forEach(saved => {
                //Only display data if saved
                if (saved.status == "saved") {
                    if (saved.type == "photo") {
                        htmlString += `<div class="selectPost">
                                            <img id="${saved._id}" src="${saved.url}"> 
                                        </div>`
                    } else if (saved.type == "colour") {
                        htmlString += `<div class="selectPost">
                                            <img id="${saved._id}" class="colourSelect" src="http://www.thecolorapi.com/id?format=svg&hex=${saved.c1}">
                                            <img id="${saved._id}" class="colourSelect" src="http://www.thecolorapi.com/id?format=svg&hex=${saved.c2}">
                                            <img id="${saved._id}" class="colourSelect" src="http://www.thecolorapi.com/id?format=svg&hex=${saved.c3}">
                                            <img id="${saved._id}" class="colourSelect" src="http://www.thecolorapi.com/id?format=svg&hex=${saved.c4}">
                                       </div>`
                    }
                    return;
                }
            })
            savedDoc.innerHTML = htmlString
            for (let i = 0; i < profilePost.length; i++) {
                profilePost[i].addEventListener('click', e => {
                    loadSingleArt(e.target.id)
                })
            }
        });
}
//Art selected
function art() {
    //Displaying correct section
    document.getElementById('art').style.display = "flex";
    document.getElementById('saved').style.display = "none";
    document.getElementById('posts').style.display = "none";
    document.getElementById('liked').style.display = "none";

    //Fetching all artpieces
    fetch('https://web2-courseproject-britth.herokuapp.com/artpieces')
        .then(response => response.json())
        .then(function (data) {
            let artDoc = document.getElementById('art')
            let htmlString = ""

            //Displaying data
            data.forEach(art => {
                //Only display data if created
                if (art.status == "created") {
                    if (art.type == "photo") {
                        htmlString += `<div class="selectPost">
                                            <img id="${art._id}" src="${art.url}"> 
                                        </div>`
                    } else if (art.type == "colour") {
                        htmlString += `<div class="selectPost">
                                            <img id="${art._id}" class="colourSelect" src="http://www.thecolorapi.com/id?format=svg&hex=${art.c1}">
                                            <img id="${art._id}" class="colourSelect" src="http://www.thecolorapi.com/id?format=svg&hex=${art.c2}">
                                            <img id="${art._id}" class="colourSelect" src="http://www.thecolorapi.com/id?format=svg&hex=${art.c3}">
                                            <img id="${art._id}" class="colourSelect" src="http://www.thecolorapi.com/id?format=svg&hex=${art.c4}">
                                       </div>`
                    }
                    return;
                }
            })
            artDoc.innerHTML = htmlString
            for (let i = 0; i < profilePost.length; i++) {
                profilePost[i].addEventListener('click', e => {
                    loadSingleArt(e.target.id)
                })
            }
        });
}
//Posts selected
function posts() {
    //Displaying correct section
    document.getElementById('posts').style.display = "flex";
    document.getElementById('art').style.display = "none";
    document.getElementById('saved').style.display = "none";
    document.getElementById('liked').style.display = "none";

    //Fetching all artpieces
    fetch('https://web2-courseproject-britth.herokuapp.com/artpieces')
        .then(response => response.json())
        .then(function (data) {
            let postDoc = document.getElementById('posts')
            let htmlString = ""

            //Displaying data
            data.forEach(post => {
                //Only display data if posted
                if (post.status == "posted") {
                    if (post.type == "photo") {
                        htmlString += `<div class="selectPost">
                                            <img id="${post._id}" src="${post.url}"> 
                                        </div>`
                    } else if (post.type == "colour") {
                        htmlString += `<div class="selectPost">
                                            <img id="${post._id}" class="colourSelect" src="http://www.thecolorapi.com/id?format=svg&hex=${post.c1}">
                                            <img id="${post._id}" class="colourSelect" src="http://www.thecolorapi.com/id?format=svg&hex=${post.c2}">
                                            <img id="${post._id}" class="colourSelect" src="http://www.thecolorapi.com/id?format=svg&hex=${post.c3}">
                                            <img id="${post._id}" class="colourSelect" src="http://www.thecolorapi.com/id?format=svg&hex=${post.c4}">
                                       </div>`
                    }
                    return;
                }
            })
            postDoc.innerHTML = htmlString
            for (let i = 0; i < profilePost.length; i++) {
                profilePost[i].addEventListener('click', e => {
                    loadSingleArt(e.target.id)
                })
            }
        });
}
//Liked selected
function liked() {
    //Displaying correct section
    document.getElementById('liked').style.display = "flex";
    document.getElementById('art').style.display = "none";
    document.getElementById('posts').style.display = "none";
    document.getElementById('saved').style.display = "none";

    //Fetching all posts
    fetch('https://web2-courseproject-britth.herokuapp.com/posts')
        .then(response => response.json())
        .then(function (data) {
            let likeDoc = document.getElementById('liked')
            let htmlString = ""

            //Displaying data
            data.forEach(like => {
                //Only display data if liked
                if (like.liked) {
                    if (like.type == "photo") {
                        htmlString += `<div class="selectPost">
                                            <img id="${like._id}" src="${like.url}"> 
                                        </div>`
                    } else if (like.type == "colour") {
                        htmlString += `<div class="selectPost">
                                        <img id="${like._id}" class="colourSelect" src="http://www.thecolorapi.com/id?format=svg&hex=${like.c1}">
                                        <img id="${like._id}" class="colourSelect" src="http://www.thecolorapi.com/id?format=svg&hex=${like.c2}">
                                        <img id="${like._id}" class="colourSelect" src="http://www.thecolorapi.com/id?format=svg&hex=${like.c3}">
                                        <img id="${like._id}" class="colourSelect" src="http://www.thecolorapi.com/id?format=svg&hex=${like.c4}">
                                   </div>`
                    }
                    return;
                }
            })
            likeDoc.innerHTML = htmlString
            for (let i = 0; i < profilePost.length; i++) {
                profilePost[i].addEventListener('click', e => {
                    loadSinglePost(e.target.id)
                })
            }
        });
}

//Load a single artpiece
function loadSingleArt(id) {
    //Show pop-up box
    let focus = document.getElementById('postFocus')
    focus.style.display = "initial"
    let htmlString = ""

    //Fetch singular artpiece
    fetch(`https://web2-courseproject-britth.herokuapp.com/artpieces/:?id=${id}`)
        .then(response => response.json())
        .then(function (data) {
            //Photo
            if (data.type == "photo") {
                htmlString += `<div class="singlePost">
                                <button id="back">back</button>
                                <figure class="imgPhoto">
                                    <img src="${data.url}">
                                    <figcaption>Creator</figcaption>
                                </figure>   
                                <div class="postInfo">
                                    <p>Type: ${data.type}</p>
                                    <p>Author: ${data.author}</p>`
                if (data.status == "saved") {
                    htmlString += `<button id="change" value="created">Create</button>
                                    <button id="delete">Delete</button>
                            </div>
                        </div>`
                } else if (data.status == "created") {
                    htmlString += `<button id="change" value="saved">Recreate</button>
                                    <button id="change" value="posted">Post</button>
                                    <button id="delete">Delete</button>
                            </div>
                        </div>`
                } else {
                    htmlString += `<button id="change" value="created">Unpost</button>
                                    <button id="delete">Delete</button>
                            </div>
                        </div>`
                }
            }
            //Colour
            else if (data.type == "colour") {
                htmlString += `<div class="singlePost">
                            <button id="back">back</button>
                            <div class="leftColours">
                                <div class="imgColours">
                                    <img src="http://www.thecolorapi.com/id?format=svg&hex=${data.c1}">
                                    <img src="http://www.thecolorapi.com/id?format=svg&hex=${data.c2}">
                                    <img src="http://www.thecolorapi.com/id?format=svg&hex=${data.c3}">
                                    <img src="http://www.thecolorapi.com/id?format=svg&hex=${data.c4}">
                                </div>
                                <p>Creator</p>
                            </div>
                            <div class="postInfo">
                                <p>Type: ${data.type}</p>
                                <p>Author: ${data.author}</p>`
                if (data.status == "saved") {
                    htmlString += `<button id="change" value="created">Create</button>
                                    <button id="delete">Delete</button>
                                    </div>
                                    </div>`
                } else if (data.status == "created") {
                    htmlString += `<button id="change" value="saved">Recreate</button>
                                    <button id="change" value="posted">Post</button>
                                    <button id="delete">Delete</button>
                                    </div>
                                    </div>`
                } else {
                    htmlString += `<button id="change" value="created">Unpost</button>
                                    <button id="delete">Delete</button>
                                    </div>
                                    </div>`
                }
            }
            focus.innerHTML = htmlString
            //Back button eventlistener
            document.getElementById('back').addEventListener('click', e => {
                e.preventDefault()
                focus.style.display = "none"
            })
            //Delete eventlistener
            document.getElementById('delete').addEventListener('click', e => {
                e.preventDefault()
                deleteArt(data._id);
            })
            //Change eventlistener
            document.getElementById('change').addEventListener('click', e => {
                let changeInto = document.getElementById('change').value
                e.preventDefault()
                changeArt(data._id, changeInto)
            })
        })
}
//Delete an artpiece
function deleteArt(id) {
    //Fetch delete for artpiece
    fetch(`https://web2-courseproject-britth.herokuapp.com/artpieces/:?id=${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            console.log(`Artpiece deleted with id: ${id}`, data);
            setTimeout(window.location.reload(), 7000)
        });
}
//Change an artpiece
function changeArt(id, status) {
    //Set new status
    let art = {
        status
    }
    //Fetch patch for artpiece
    fetch(`https://web2-courseproject-britth.herokuapp.com/artpieces/:?id=${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(art)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Artpiece status changed', data);
            setTimeout(window.location.reload(), 7000)
        });

}