"use strict";

import _ from 'lodash';

//USE RIGHT BUTTONS
window.onload = function () {
    document.getElementById('photoBtn').addEventListener('click', e => {
        e.preventDefault();
        let randomNumber = Math.floor(Math.random() * 50);
        fetching(randomNumber);
    })
    document.getElementById('colourBtn').addEventListener('click', e => {
        e.preventDefault();
        let random1 = Math.floor(Math.random() * 0xffffff).toString(16);
        let random2 = Math.floor(Math.random() * 0xffffff).toString(16);
        let random3 = Math.floor(Math.random() * 0xffffff).toString(16);
        let random4 = Math.floor(Math.random() * 0xffffff).toString(16);
        fetching2(random1, random2, random3, random4);
    })
}

async function fetching(number) {
    console.log(number);
    fetch(`https://picsum.photos/id/${number}/info`)
        .then(response => response.json())
        .then(function (data) {
            console.log(data)

            document.getElementById('genBtn').style.display = "none"
            document.getElementById('colour').style.display = "none"
            document.getElementById('photo').innerHTML = `<h2>Here is your inspiration for your next masterpiece</h2>
                                                        <div>
                                                            <img src="${data.download_url}" alt="random" width="600">
                                                        </div>
                                                        <button id="save">Save</button>`
        })
}
async function fetching2(c1, c2, c3, c4) {
    console.log(c1, c2, c3, c4)

    document.getElementById('genBtn').style.display = "none"
    document.getElementById('photo').style.display = "none"
    document.getElementById('colour').innerHTML = `<h2>Here is your inspiration for your next masterpiece</h2>
                                                    <div>
                                                        <img src="http://www.thecolorapi.com/id?format=svg&hex=${c1}">
                                                        <img src="http://www.thecolorapi.com/id?format=svg&hex=${c2}">
                                                        <img src="http://www.thecolorapi.com/id?format=svg&hex=${c3}">
                                                        <img src="http://www.thecolorapi.com/id?format=svg&hex=${c4}">
                                                    </div>
                                                    <button id="Save">Save</button>`
}