"use strict";
import _ from 'lodash';

window.onload = function () {
    if (window.location.pathname == '/docs/pages/generator.html') {
        //RANDOM PHOTO
        document.getElementById('photoBtn').addEventListener('click', e => {
            e.preventDefault();
            let randomNumber = Math.floor(Math.random() * 50);
            randomPhoto(randomNumber);
        })

        //RANDOM COLOURS
        document.getElementById('colourBtn').addEventListener('click', e => {
            e.preventDefault();
            let random1 = Math.floor(Math.random() * 0xffffff).toString(16);
            let random2 = Math.floor(Math.random() * 0xffffff).toString(16);
            let random3 = Math.floor(Math.random() * 0xffffff).toString(16);
            let random4 = Math.floor(Math.random() * 0xffffff).toString(16);
            randomColours(random1, random2, random3, random4);
        })
    } else if (window.location.pathname == '/docs/pages/profile.html') {
        //PROFILE SELECTED SUBNAVIGATION
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

//PROFILE SELECTED SUBNAVIGATION
function saved() {
    //Displaying correct section
    document.getElementById('saved').style.display = "initial";
    document.getElementById('art').style.display = "none";
    document.getElementById('posts').style.display = "none";
    document.getElementById('liked').style.display = "none";
}

function art() {
    //Displaying correct section
    document.getElementById('art').style.display = "initial";
    document.getElementById('saved').style.display = "none";
    document.getElementById('posts').style.display = "none";
    document.getElementById('liked').style.display = "none";
}

function posts() {
    //Displaying correct section
    document.getElementById('posts').style.display = "initial";
    document.getElementById('art').style.display = "none";
    document.getElementById('saved').style.display = "none";
    document.getElementById('liked').style.display = "none";
}

function liked() {
    //Displaying correct section
    document.getElementById('liked').style.display = "initial";
    document.getElementById('art').style.display = "none";
    document.getElementById('posts').style.display = "none";
    document.getElementById('saved').style.display = "none";
}