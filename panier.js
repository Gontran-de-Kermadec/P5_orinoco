
let getItemInCart = JSON.parse(localStorage.getItem('ItemInCart'));
console.log(getItemInCart.length);
let getPrices = JSON.parse(localStorage.getItem('itemPrice'));
console.log(getPrices);
let prixTotalItem = JSON.parse(localStorage.getItem('prixTotalItem'));
console.log(prixTotalItem);
//console.log(JSON.parse(window.localStorage.getItem('sampleList')));
    //affichage panier
let tbody = document.querySelector('.tbody');
let line = document.createElement("tr");

////////////////////Si panier vide/////////////////////////////////
let panierVide = document.querySelector('.panier-vide');
if(getItemInCart.length > 0) {
    panierVide.style.display = "none";
} else if (getItemInCart.length === 0) {
    panierVide.style.display = "block";
}


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
//manipulation quantité
let price = document.querySelectorAll(".price");
let quantite = document.querySelectorAll(".qty");
let prixTotal;
let addItem = document.querySelectorAll(".plus");
let decreaseItem = document.querySelectorAll(".less");
prixTotalItem = [];
let sommetotal
for(let i = 0; i < quantite.length; i++) {
    let quantiteTot = (parseInt(quantite[i].textContent));
    //const prixItemOrigin = parseInt(price[i].textContent);
    const prixItemOrigin = parseInt(getPrices[i]);
    let prixItem = parseInt(price[i].textContent);
    let prixTotItem;
    prixTotal = getItemInCart[i].quantity * prixItemOrigin;
    console.log(prixTotal);
    prixTotalItem.splice([i], 1, prixItem);
    localStorage.setItem('prixTotalItem', JSON.stringify(prixTotalItem));
    //augmente le nombre d'article
    addItem[i].addEventListener("click", () => {
        quantiteTot = quantiteTot + 1;
        quantite[i].innerHTML = quantiteTot;
        prixTotItem = prixItemOrigin + parseInt(price[i].textContent);
        console.log(prixItemOrigin);
        console.log(prixTotItem);
        price[i].innerHTML = prixTotItem;
        getItemInCart[i].price = prixTotItem * 100;  
        getItemInCart[i].quantity = quantiteTot; 
        localStorage.setItem('ItemInCart', JSON.stringify(getItemInCart));
        //prixTotalItem.push(prixTotItem);
        prixTotalItem.splice([i], 1, prixTotItem);
        localStorage.setItem('prixTotalItem', JSON.stringify(prixTotalItem));
        // sommetotal = prixTotalItem.reduce((a, b)=> a + b,0);
        // // prixTotal = prixTotal + prixItemOrigin;
        // // console.log(prixTotal);
        // tbody.appendChild(line)
        // line.innerHTML = `
        // <td>prix total: </td>
        // <td>${prixTotal}€</td>
        // `;
    })
    //diminue le nombre d'article
    decreaseItem[i].addEventListener("click", () => {
        quantiteTot = quantiteTot - 1;
        quantite[i].innerHTML = quantiteTot;
        prixTotItem = parseInt(price[i].textContent) - prixItemOrigin;
        //console.log(prixTotItem);
        price[i].innerHTML = prixTotItem;
        getItemInCart[i].price = prixTotItem * 100;
        getItemInCart[i].quantity = quantiteTot; 
        localStorage.setItem('ItemInCart', JSON.stringify(getItemInCart));
        prixTotalItem.splice([i], 1, prixTotItem);
        localStorage.setItem('prixTotalItem', JSON.stringify(prixTotalItem));
    })
}
for(let j = 0; j < price.length; j++) {
    sommetotal = prixTotalItem.reduce((a, b)=> a + b,0);
    localStorage.setItem('TotalPrice', JSON.stringify(sommetotal));
    let somme = document.querySelector(".prixTotal");
    somme.innerHTML = `Prix total: ${sommetotal}€`;
    addItem[j].addEventListener("click", () => {
        sommetotal = prixTotalItem.reduce((a, b)=> a + b,0);
        console.log(sommetotal);
        localStorage.setItem('TotalPrice', JSON.stringify(sommetotal));
        somme.innerHTML = `Prix total: ${sommetotal}€`;
    })
    decreaseItem[j].addEventListener('click', () => {
        sommetotal = prixTotalItem.reduce((a, b)=> a + b,0);
        console.log(sommetotal);
        localStorage.setItem('TotalPrice', JSON.stringify(sommetotal));
        somme.innerHTML = `Prix total: ${sommetotal}€`;
    })
    
    
}


// boucle de suppression d'un article
let effacer = document.querySelectorAll(".delete");
for(let i = 0; i < quantite.length; i++) {
    //if()
    decreaseItem[i].addEventListener('click', (e) => {
        if (getItemInCart[i].quantity === 0) {
            let elementSuppr = getItemInCart.splice([i], 1);
            let priceSuppr = getPrices.splice([i], 1);
            localStorage.setItem('ItemInCart', JSON.stringify(getItemInCart));
            localStorage.setItem('itemPrice', JSON.stringify(getPrices));
            location.reload();
        }
    })
    
}

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
/////////////////////////------------------tableau produits------------------////////////////////
let products = [];
for(let i = 0; i < quantite.length; i++) {
    products.push(getItemInCart[i].productId);
}
console.log(products);


class Contact {
    constructor(lastName, firstName, address, city, email) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.address = address;
        this.city = city;
        this.email = email;
    }
}
// let contact = {
//     firstName : "test",
//     lastName : "test",
//     address : "test",
//     city : "test",
//     email : "test@test.com",
// };
//console.log(JSON.stringify(contact));
// let commande = {
//     products,
//     contact
// };
// console.log(commande);
// let envoyer = JSON.stringify(commande);
// console.log(envoyer);
/////////////////////////////----------------Validation formulaire-----------------------------////////////

document.forms.form.addEventListener('submit', (e) => {
    e.preventDefault();
    let regexName = /^[A-Za-z\'\s\.\-\,]+$/;
    let regexAddress = /^[A-Za-z\0-9\'\s\.\-\,]+$/;
    let regexEmail = /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/;
    
    let inputs = this;
    let contact = new Contact(inputs.lastname.value,inputs.firstname.value,inputs.address.value,inputs.city.value,inputs.email.value);
    console.log(contact);
    if (regexName.test(inputs.lastname.value) === false || regexName.test(inputs.firstname.value) === false) {
        console.log("remplissez les noms");
    } else if (regexEmail.test(inputs.email.value) === false) {
        console.log("remplissez l'email correctement");
    } else if (regexAddress.test(inputs.address.value) === false || regexAddress.test(inputs.city.value) === false) {
        console.log("remplissez l'adresse correct");
    }
    let commande = {
    products,
    contact
    };
    postForm(commande);
})
// let formulaire = document.querySelector("#form"); 
// let bouton = document.querySelector("#btn");
// formulaire.addEventListener('submit', function(e) {
//     //console.log(regexName.test(familyName.value));
//     console.log("hello");
//     // if (regexName.test(familyName.value) === false) {
//     //     console.log(familyName.value);
//     //     familyName.style.backgroundColor = 'red';
//     // }
// });
// bouton.addEventListener('click', function(e) {
//     console.log(familyName.textContent);
//     console.log(regexName.test(familyName.textContent));
//     console.log("hello");
//     // if (regexName.test(familyName.value) === false) {
//     //     console.log(familyName.value);
//     //     familyName.style.backgroundColor = 'red';
//     // }
// });

// let inputName = document.querySelectorAll(".inputname");
// let inputAddress = document.querySelectorAll(".inputaddress");
// let propre = document.querySelector("#propre");
// let bien = document.querySelector("#bien");

// let regexName = /^[A-Za-z\'\s\.\-\,]+$/;
// let regexAddress = /^[A-Za-z\0-9\'\s\.\-\,]+$/;
// for(let i = 0; i<inputName.length; i++) {
//     inputName[i].addEventListener('focusout', function() {
//         if (regexName.test(inputName[i].value) === false || inputName[i].value === "") {
//             inputName[i].style.backgroundColor = 'red';
//             console.log(inputName[i].value);
//         } 
//         // else if (regexName.test(allInputs[i].value)) {
//         //     propre.innerHTML = "Propre";
//         //     bien.innerHTML = "Bien";
//         // }
    
//     });
// }

    // for(let i = 0; i<inputAddress.length; i++) {
    //     inputAddress[i].addEventListener('focusout', function() {
    //         if (regexAddress.test(inputAddress[i].value) === false || inputAddress[i].value === "") {
    //             inputAddress[i].style.backgroundColor = 'red';
    //             console.log(inputAddress[i].value);
    //         } else {
    //             return 10;
    //         }
    //         // else if (regexName.test(allInputs[i].value)) {
    //         //     propre.innerHTML = "Propre";
    //         //     bien.innerHTML = "Bien";
    //         // }
    //     });
    // }


// let emailInput = document.querySelector("#email");
// let genial = document.querySelector("#genial");
// let regexEmail = /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/;
// emailInput.addEventListener('focusout', function() {
//     console.log(emailInput.value); 
//     if (regexEmail.test(emailInput.value) === false || emailInput.value === "") {
//         emailInput.style.backgroundColor = 'red';
//         console.log('email invalide');
//     } else {
//         console.log('parfait');
//         genial.innerHTML = "Génial";
//     }
// });
// console.log(familyName.value);
// console.log(regexName.test(familyName.value));

///////////////////---------------Envoi données---------------------/////////////////
async function postForm(commande) {
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
            window.location.href = "confirmation.html";
        } else {
            console.error('Retour du serveur : ', response.status);
        }
    } catch (e) {
        console.log(e);
    }
}


function confirmationId (responseId) {
    let orderId = responseId.orderId;
    console.log(orderId);
    localStorage.setItem("orderConfirmationId", orderId);
    localStorage.setItem("orderConfirmation", JSON.stringify(responseId));
}
//postForm(commande);