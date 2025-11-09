/*
on click call the dog api to fetch a dog photo
- then get the breed of the dog from the image URL since the api doesn't contain 
a breed index

-- this link help: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace

take the output and turn it into an html tag  then fetch the next API for "dog advice and combine"



*/


let button = document.querySelector('#btn');
let output = document.querySelector('#output');

button.addEventListener('click', getDogAndAdvice);

function getDogAndAdvice() {
output.innerText = "Fetching a random dog photo...";

let dogAPI = 'https://dog.ceo/api/breeds/image/random?';
let adviceAPI = 'https://api.adviceslip.com/advice';
let breed = '';

// 🐕 Fetch a random dog photo
fetch(dogAPI)
.then(res => res.json())
.then(dogData => {
    console.log(dogData);
    let dogImage = dogData.message;

    // Extract breed from the URL
    let parts = dogImage.split('/');
    let breedPath = parts[parts.length - 2];
    breed = breedPath.replace(/-/g, ' ');

    output.innerHTML = `<h3>🐾 Here's a ${breed}!</h3>
    <img src="${dogImage}" alt="${breed}">
    <p>Getting some advice for your ${breed}...</p>`;

    // 💭 Fetch random advice next
    return fetch(adviceAPI);
})
.then(res => res.json())
.then(adviceData => {
    console.log(adviceData);
    let advice = adviceData.slip.advice;

    output.innerHTML += `<h3>💭 Advice for your ${breed}:</h3>
    <p><i>"${advice}"</i></p>`;
});
}