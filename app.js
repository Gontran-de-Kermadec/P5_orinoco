let img = document.querySelectorAll('.img');
let nom = document.querySelectorAll('.nom');
let prix = document.querySelectorAll('.prix');
let description = document.querySelectorAll('.description');
let lien = document.querySelectorAll('.lien');
//----------------------------fonction asynchrone afin de recuperer les données du serveur---------------
async function getTeddiesData() {
    try {
        //let response = await fetch('http://localhost:3000/api/teddies');
        let response = await fetch('https://oc-orinoco-p5.herokuapp.com/api/teddies');
        let data = await response.json();
        displayTeddiesData(data);
    } catch (error) {
        console.log(error);
    }
   
}
getTeddiesData();
//-----------------------------fonction pour afficher les données des peluches---------------------------
function displayTeddiesData(data) {
    for(let i = 0; i < data.length; i++) {
        img[i].src= data[i].imageUrl;
        nom[i].innerHTML = data[i].name;
        prix[i].innerHTML = `${data[i].price / 100}€`;
        description[i].innerHTML = data[i].description;
        lien[i].href= `produits.html?id=${data[i]._id}`;    
    }
}

//----------------------------------affichage panier-------------------------------
if(JSON.parse(localStorage.getItem('counter')) !== null) {
    document.querySelector('.count').innerHTML = JSON.parse(localStorage.getItem('counter'));
}

