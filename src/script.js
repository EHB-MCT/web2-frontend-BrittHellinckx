//npx webpack watch : auto push script to main
//https://web2-courseproject-britth.herokuapp.com/

"use strict";
import _ from 'lodash';

window.onload = function () {
    //Generator page
    if (window.location.pathname == '/docs/pages/generator.html') {
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
    else if (window.location.pathname == '/docs/pages/posts.html') {
        loadPosts();
    }
    //Profile page
    else if (window.location.pathname == '/docs/pages/profile.html') {
        //Number of saved/ art/ posts/ liked

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
}
////////////////////GENERATOR/////////////////////////////
//RANDOM PHOTO
async function randomPhoto(number) {
    fetch(`https://picsum.photos/id/${number}/info`)
        .then(response => response.json())
        .then(function (data) {
            document.getElementById('genBtn').style.display = "none"
            document.getElementById('colour').style.display = "none"
            document.getElementById('photo').innerHTML = `<h2>Here is your inspiration for your next masterpiece</h2>
                                                        <div>
                                                            <img src="${data.download_url}" alt="random" width="600">
                                                        </div>
                                                        <button id="save">Save</button>`
        })
}
//RANDOM COLOURS
async function randomColours(c1, c2, c3, c4) {
    document.getElementById('genBtn').style.display = "none"
    document.getElementById('photo').style.display = "none"
    document.getElementById('colour').innerHTML = `<h2>Here is your inspiration for your next masterpiece</h2>
                                                    <div>
                                                        <img src="http://www.thecolorapi.com/id?format=svg&hex=${c1}">
                                                        <img src="http://www.thecolorapi.com/id?format=svg&hex=${c2}">
                                                        <img src="http://www.thecolorapi.com/id?format=svg&hex=${c3}">
                                                        <img src="http://www.thecolorapi.com/id?format=svg&hex=${c4}">
                                                    </div>
                                                    <button id="save">Save</button>`
}

///////////////////////POSTS//////////////////////////////
function loadPosts() {
    fetch('https://web2-courseproject-britth.herokuapp.com/posts')
        .then(response => response.json())
        .then(function (data) {
            let post = document.getElementById('postsBlock')
            let htmlString = ""

            //Displaying all data
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
        });
}

//////////////////////PROFILE/////////////////////////////
//PROFILE SELECTED SUBNAVIGATION
function saved() {
    //Displaying correct section
    document.getElementById('saved').style.display = "flex";
    document.getElementById('art').style.display = "none";
    document.getElementById('posts').style.display = "none";
    document.getElementById('liked').style.display = "none";

    //Fetching all saved
    fetch('https://web2-courseproject-britth.herokuapp.com/artpieces')
        .then(response => response.json())
        .then(function (data) {
            let savedDoc = document.getElementById('saved')
            let htmlString = ""

            //Displaying all data
            data.forEach(saved => {
                if (saved.status == "saved") {
                    if (saved.type == "photo") {
                        htmlString += `<div class="selectPost">
                                            <img  src="${saved.url}"> 
                                        </div>`
                    } else if (saved.type == "colour") {
                        htmlString += `<div class="selectPost">
                                            <img class="colourSelect" src="http://www.thecolorapi.com/id?format=svg&hex=${saved.c1}">
                                            <img class="colourSelect" src="http://www.thecolorapi.com/id?format=svg&hex=${saved.c2}">
                                            <img class="colourSelect" src="http://www.thecolorapi.com/id?format=svg&hex=${saved.c3}">
                                            <img class="colourSelect" src="http://www.thecolorapi.com/id?format=svg&hex=${saved.c4}">
                                       </div>`
                    }
                    return;
                }
            })
            savedDoc.innerHTML = htmlString
        });
}

function art() {
    //Displaying correct section
    document.getElementById('art').style.display = "flex";
    document.getElementById('saved').style.display = "none";
    document.getElementById('posts').style.display = "none";
    document.getElementById('liked').style.display = "none";

    //Fetching all saved
    fetch('https://web2-courseproject-britth.herokuapp.com/artpieces')
        .then(response => response.json())
        .then(function (data) {
            let artDoc = document.getElementById('art')
            let htmlString = ""

            //Displaying all data
            data.forEach(art => {
                if (art.status == "created") {
                    if (art.type == "photo") {
                        htmlString += `<div class="selectPost">
                                            <img  src="${art.url}"> 
                                        </div>`
                    } else if (art.type == "colour") {
                        htmlString += `<div class="selectPost">
                                            <img class="colourSelect" src="http://www.thecolorapi.com/id?format=svg&hex=${art.c1}">
                                            <img class="colourSelect" src="http://www.thecolorapi.com/id?format=svg&hex=${art.c2}">
                                            <img class="colourSelect" src="http://www.thecolorapi.com/id?format=svg&hex=${art.c3}">
                                            <img class="colourSelect" src="http://www.thecolorapi.com/id?format=svg&hex=${art.c4}">
                                       </div>`
                    }
                    return;
                }
            })
            artDoc.innerHTML = htmlString
        });
}

function posts() {
    //Displaying correct section
    document.getElementById('posts').style.display = "flex";
    document.getElementById('art').style.display = "none";
    document.getElementById('saved').style.display = "none";
    document.getElementById('liked').style.display = "none";

    //Fetching all saved
    fetch('https://web2-courseproject-britth.herokuapp.com/artpieces')
        .then(response => response.json())
        .then(function (data) {
            let postDoc = document.getElementById('posts')
            let htmlString = ""

            //Displaying all data
            data.forEach(post => {
                if (post.status == "posted") {
                    if (post.type == "photo") {
                        htmlString += `<div class="selectPost">
                                            <img  src="${post.url}"> 
                                        </div>`
                    } else if (post.type == "colour") {
                        htmlString += `<div class="selectPost">
                                            <img class="colourSelect" src="http://www.thecolorapi.com/id?format=svg&hex=${post.c1}">
                                            <img class="colourSelect" src="http://www.thecolorapi.com/id?format=svg&hex=${post.c2}">
                                            <img class="colourSelect" src="http://www.thecolorapi.com/id?format=svg&hex=${post.c3}">
                                            <img class="colourSelect" src="http://www.thecolorapi.com/id?format=svg&hex=${post.c4}">
                                       </div>`
                    }
                    return;
                }
            })
            postDoc.innerHTML = htmlString
        });
}

function liked() {
    //Displaying correct section
    document.getElementById('liked').style.display = "flex";
    document.getElementById('art').style.display = "none";
    document.getElementById('posts').style.display = "none";
    document.getElementById('saved').style.display = "none";

    fetch('https://web2-courseproject-britth.herokuapp.com/posts')
        .then(response => response.json())
        .then(function (data) {
            let likeDoc = document.getElementById('liked')
            let htmlString = ""

            //Displaying all data
            data.forEach(like => {
                if (like.liked) {
                    if (like.type == "photo") {
                        htmlString += `<div class="selectPost">
                                            <img  src="${like.url}"> 
                                        </div>`
                    } else if (like.type == "colour") {
                        htmlString += `<div class="selectPost">
                                        <img class="colourSelect" src="http://www.thecolorapi.com/id?format=svg&hex=${like.c1}">
                                        <img class="colourSelect" src="http://www.thecolorapi.com/id?format=svg&hex=${like.c2}">
                                        <img class="colourSelect" src="http://www.thecolorapi.com/id?format=svg&hex=${like.c3}">
                                        <img class="colourSelect" src="http://www.thecolorapi.com/id?format=svg&hex=${like.c4}">
                                   </div>`
                    }
                    return;
                }
            })
            likeDoc.innerHTML = htmlString
        });
}