let img = document.querySelectorAll('.img');
let nom = document.querySelectorAll('.nom');
let prix = document.querySelectorAll('.prix');
let description = document.querySelectorAll('.description');
async function getTeddiesData() {
    let response = await fetch('http://localhost:3000/api/teddies');
    let data = await response.json();
    for(let i = 0; i < data.length; i++) {
        console.log(data[i].name);
        img[i].src= data[i].imageUrl;
        nom[i].innerHTML = data[i].name;
        prix[i].innerHTML = data[i].price + "JPY";
        description[i].innerHTML = data[i].description;
    }
}
getTeddiesData();