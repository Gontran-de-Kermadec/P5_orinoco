//------------------------Variables de récupération des données dans le localStorage-------------------
let getItemInCart = JSON.parse(localStorage.getItem('ItemInCart'));
let getPrices = JSON.parse(localStorage.getItem('itemPrice'));
let prixTotalItem = JSON.parse(localStorage.getItem('prixTotalItem'));

//------------------------affichage panier---------------------------
let tbody = document.querySelector('.tbody');
let line = document.createElement("tr");

//------------------------------Affichage para panier vide-------------------------------
let panierVide = document.querySelector('.panier-vide');
if(getItemInCart.length > 0) {
    panierVide.style.display = "none";
} else if (getItemInCart.length === 0) {
    panierVide.style.display = "block";
}

//-----------------------------------Affichage du tableau comprenant les produits-----------------------
getItemInCart.forEach(item => {
    let line = document.createElement("tr");
    tbody.appendChild(line);
    line.classList.add("line", "my-3", "shadow-sm");
    line.innerHTML = `
        <td>
            <div class="img_conteneur mx-auto">
                <img src="${item.imageUrl}" alt="Ours en peluche" class="photo">
            </div>
        </td>
        <td class="fs-4">${item.name} - ${item.colorSelected}</td>
        <td class="fs-5"><span class="less">-</span><span class="qty mx-2 px-2 border">${item.quantity}</span><span class="plus">+</span></td>
        <td class="fs-5"><span class="price totprice">${item.price/100}</span>€</td>
        <td class="delete">Supprimer</td>
    `
});

//-----------------------------------------Manipulation quantité------------------------------------
let price = document.querySelectorAll(".price");
let quantite = document.querySelectorAll(".qty");
let prixTotal;
let addItem = document.querySelectorAll(".plus");
let decreaseItem = document.querySelectorAll(".less");
prixTotalItem = [];
let sommetotal;
for(let i = 0; i < quantite.length; i++) {
    let quantiteTot = (parseInt(quantite[i].textContent));
    const prixItemOrigin = parseInt(getPrices[i]);
    let prixItem = parseInt(price[i].textContent);
    let prixTotItem;
    prixTotal = getItemInCart[i].quantity * prixItemOrigin;
    prixTotalItem.splice([i], 1, prixItem);
    localStorage.setItem('prixTotalItem', JSON.stringify(prixTotalItem));
    //Augmente le nombre d'articles
    addItem[i].addEventListener("click", () => {
        quantiteTot = quantiteTot + 1;
        quantite[i].innerHTML = quantiteTot;
        prixTotItem = prixItemOrigin + parseInt(price[i].textContent);
        price[i].innerHTML = prixTotItem;
        getItemInCart[i].price = prixTotItem * 100;  
        getItemInCart[i].quantity = quantiteTot; 
        localStorage.setItem('ItemInCart', JSON.stringify(getItemInCart));
        prixTotalItem.splice([i], 1, prixTotItem);
        localStorage.setItem('prixTotalItem', JSON.stringify(prixTotalItem));
    });
    //Diminue le nombre d'articles
    decreaseItem[i].addEventListener("click", () => {
        quantiteTot = quantiteTot - 1;
        quantite[i].innerHTML = quantiteTot;
        prixTotItem = parseInt(price[i].textContent) - prixItemOrigin;
        price[i].innerHTML = prixTotItem;
        getItemInCart[i].price = prixTotItem * 100;
        getItemInCart[i].quantity = quantiteTot; 
        localStorage.setItem('ItemInCart', JSON.stringify(getItemInCart));
        prixTotalItem.splice([i], 1, prixTotItem);
        localStorage.setItem('prixTotalItem', JSON.stringify(prixTotalItem));
    })
}

//----------------------------------fonction de calcul des differentes sommes---------------------------------
(function sum() {
    for(let j = 0; j < price.length; j++) {
        sommetotal = prixTotalItem.reduce((a, b)=> a + b,0);
        localStorage.setItem('TotalPrice', JSON.stringify(sommetotal));
        let somme = document.querySelector(".prixTotal");
        somme.innerHTML = `Prix total: ${sommetotal}€`;
        addItem[j].addEventListener("click", () => {
            sommetotal = prixTotalItem.reduce((a, b)=> a + b,0);
            localStorage.setItem('TotalPrice', JSON.stringify(sommetotal));
            somme.innerHTML = `Prix total: ${sommetotal}€`;
        })
        decreaseItem[j].addEventListener('click', () => {
            sommetotal = prixTotalItem.reduce((a, b)=> a + b,0);
            localStorage.setItem('TotalPrice', JSON.stringify(sommetotal));
            somme.innerHTML = `Prix total: ${sommetotal}€`;
        })  
    }
})();

//---------------------------------fonction de suppression d'un article-----------------------------------
(function deleteItem() {
    let effacer = document.querySelectorAll(".delete");
    //Suppression lorsque article egale 0
    for(let i = 0; i < quantite.length; i++) {
        decreaseItem[i].addEventListener('click', () => {
            if (getItemInCart[i].quantity === 0) {
                let elementSuppr = getItemInCart.splice([i], 1);
                let priceSuppr = getPrices.splice([i], 1);
                localStorage.setItem('ItemInCart', JSON.stringify(getItemInCart));
                localStorage.setItem('itemPrice', JSON.stringify(getPrices));
                location.reload();
            }
        })   
    }
    //Suppression au clic sur le mot supprimer
    for(let j = 0; j < effacer.length; j++) {
        effacer[j].addEventListener("click", () => {
                console.log(getItemInCart[j]);
                let elementSuppr = getItemInCart.splice([j], 1);
                let priceSuppr = getPrices.splice([j], 1);
                localStorage.setItem('ItemInCart', JSON.stringify(getItemInCart));
                localStorage.setItem('itemPrice', JSON.stringify(getPrices));
                location.reload();
        })
    }
})();

//-------------------------------------Creation tableau produits  et objet contact à envoyer-----------------------------------------
let products = [];
for(let i = 0; i < quantite.length; i++) {
    products.push(getItemInCart[i].productId);
}
class Contact {
    constructor(lastName, firstName, address, city, email) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.address = address;
        this.city = city;
        this.email = email;
    }
}
//---------------------------------------------Validation formulaire--------------------------------------
let submitBtn = document.querySelector("#btn");
let myForm = document.querySelector("#form");
let lastName = document.querySelector("#lastname");
let firstName = document.querySelector("#firstname");
let emailAddress = document.querySelector("#email");
let address = document.querySelector("#address");
let city = document.querySelector("#city");
let errorMessage = document.querySelector(".error");
myForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (checkForm() == true) {
        let contact = new Contact(this.lastname.value,this.firstname.value,this.address.value,this.city.value,this.email.value);
        let commande = {
                products,
                contact,
                };
        console.log(commande);
        sendForm(commande);
    } else {
        e.preventDefault();
    }
})
function checkForm() {
    let regexName = /^[A-Za-z\'\s\.\-\,]+$/;
    let regexEmail = /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/; 
    let regexAddress = /^[A-Za-z\0-9\'\s\.\-\,]+$/;
    let alerte = "";
    if(regexName.test(lastName.value) === false) {
        alerte = "verifier nom";
        lastName.style.backgroundColor = "red";
        errorMessage.innerHTML = 'Nom incorrect';
        
    } else if (regexName.test(firstName.value) === false) {
        alerte = "verifier prenom";
        firstName.style.backgroundColor = "red";
        errorMessage.innerHTML = 'Prénom incorrect';
    }
    if(regexEmail.test(emailAddress.value) === false) {
        alerte = "verifier adresse";
        emailAddress.style.backgroundColor = "red";
        errorMessage.innerHTML = 'Email incorrect';  
    }
    if(regexAddress.test(address.value) === false || regexName.test(city.value) === false) {
        alerte = "verifier vile"; 
    }
    if (alerte === "") {
        console.log("all good");
        return true;
    }
}

//----------------------------------------------Envoi données-----------------------------------------
async function sendForm(commande) {
    try {
        let response = await fetch("http://localhost:3000/api/teddies/order", {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(commande),
        });
        console.log(response);
        if (response.ok) {
            let responseId = await response.json();
            confirmationId(responseId);
            console.log(responseId);
            window.location = "confirmation.html";
        } else {
            console.error('Retour du serveur : ', response.status);
        }
    } catch (e) {
        console.log(e);
    }
}

//------------------------------localStorage des  infos de la confirmation de commande du backend----------
function confirmationId(responseId) {
    let orderId = responseId.orderId;
    localStorage.setItem("orderConfirmationId", orderId);
    localStorage.setItem("orderConfirmation", JSON.stringify(responseId));
}