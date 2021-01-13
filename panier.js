// let getProductData = (async function () {
//     let productId = new URL(window.location.href).searchParams.get('id');
//     console.log(productId);
//     let response = await fetch(`http://localhost:3000/api/teddies/${productId}`);
//     let data = await response.json();
//     //productInfo(data);
//     console.log(data);
// })()


// // Manage click on button 'add to cart'
// document.getElementById('addToCart').addEventListener('click', (e) => {
//     e.preventDefault()
  
//     // Get current shopping cart
//     let shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'))
  
//     // Manage empty or bad localStorage
//     if ( shoppingCart === null || typeof shoppingCart !== "object" ) shoppingCart = {}
  
//     // If product is already in cart
//     if ( shoppingCart[product._id] ) {
//       // Increase quantity
//       shoppingCart[product._id].quantity++
//     } else {
//       // Add product
//       shoppingCart[product._id] = {
//         quantity: 1,
//         ...product
//       }
//     }
  
//     // Save new shopping cart
//     localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart))
  
    // Redirect to shopping cart page
    //window.location.href = `${window.location.origin}/cart.html?lastAddedProductId=${product._id}`
//console.log(window.location);
// let objetpanier = localStorage.getItem('ItemInCart');
// console.log(JSON.stringify(objetpanier));
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
tbody.appendChild(line);
    // for(let i = 0; i < getItemInCart.length; i++) {
    //     console.log(getItemInCart[i].name);
    //     tbody.innerHTML = `
    //     <tr>
    //         <td>
    //             <div class="img_conteneur">
    //                 <img src="${getItemInCart[i].imageUrl}" alt="Ours en peluche" class="picture">
    //             </div>
    //         </td>
    //         <td>${getItemInCart[i].name}</td>
    //         <td>${getItemInCart[i].price/100}€</td>
    //     </tr>
    // `
    // }
getItemInCart.forEach(item => {
    let line = document.createElement("tr");
    tbody.appendChild(line);
    line.classList.add("line");
    line.innerHTML = `
        <td>
            <div class="img_conteneur">
                <img src="${item.imageUrl}" alt="Ours en peluche" class="picture">
            </div>
        </td>
        <td>${item.name} - ${item.colorSelected}</td>
        <td><span class="less">-</span><span class="qty">${item.quantity}</span><span class="plus">+</span></td>
        <td><span class="price totprice">${item.price/100}</span>€</td>
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
    //let prixTotal =  prixTotal + price[i].textContent;
    
    // console.log(price[i].textContent + prixTotal);
    //console.log(prixTotItem);
    // prixTotal = prixTotal + parseInt(price[i].textContent);
    // console.log(parseInt(price[i].textContent));
}

//creation prix total
//let getAllLines = document.querySelectorAll('.line');

for(let j = 0; j < price.length; j++) {
    sommetotal = prixTotalItem.reduce((a, b)=> a + b,0);
    localStorage.setItem('TotalPrice', JSON.stringify(sommetotal));
    tbody.appendChild(line);
        line.innerHTML = `
        <td>prix total: </td>
        <td>${sommetotal}€</td>
        `;
    //console.log(price[j].textContent);
    addItem[j].addEventListener("click", () => {
        sommetotal = prixTotalItem.reduce((a, b)=> a + b,0);
        console.log(sommetotal);
        localStorage.setItem('TotalPrice', JSON.stringify(sommetotal));
        tbody.appendChild(line)
        line.innerHTML = `
        <td>prix total: </td>
        <td>${sommetotal}€</td>
        `;
    })
    decreaseItem[j].addEventListener('click', () => {
        sommetotal = prixTotalItem.reduce((a, b)=> a + b,0);
        console.log(sommetotal);
        localStorage.setItem('TotalPrice', JSON.stringify(sommetotal));
        tbody.appendChild(line)
        line.innerHTML = `
        <td>prix total: </td>
        <td>${sommetotal}€</td>
        `;
    })
    
    
}

// window.addEventListener('localDataStorage', () => {
//     // Lorsque le stockage local change, vider la liste sur
//     // la console.
//     console.log(prixTotalItem);
//   });
// let sommeTotal = 0;
// prixTotalItem.forEach((prix) => {
//     sommeTotal += panier.price / 100;
// });
//     sommetotal = prixTotalItem.reduce((a, b)=> a + b,0);
//     console.log(sommetotal);
// tbody.appendChild(line)
//     line.innerHTML = `
//     <td>prix total: </td>
//     <td>${sommetotal}€</td>
//     `;
//function totalPrice () {
//     let totPrice = document.querySelectorAll(".totprice");
//     //console.log(totPrice);
//     let prixTotal = 0;
//     for(let i = 0; i < totPrice.length; i++) { 
//         console.log(totPrice[i].textContent);
//         prixTotal = prixTotal + parseInt(totPrice[i].textContent);
//         console.log(prixTotal); 
//     }
// //}

// tbody.appendChild(line)
// line.innerHTML = `
//     <td>prix total: </td>
//     <td>${prixTotal}€</td>
// `;
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
        // if (getItemInCart[i].quantity === 1) {
        //     console.log(e.cancelable);
        //     decreaseItem[i].removeEventListener('click', decreaseItem[i], true);
        //     // e.preventDefault();
        //     // e.stopPropagation();
        //     // e.stopImmediatePropagation();
        // }
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
    // function alreadyAdded (getItemInCart) {
    //     getItemInCart
    // }
    // console.log(Object.values(getItemInCart[0]));
    // let objet = Object.values(getItemInCart[0]);
    // if (objet[0]) {
    //     console.log(objet[0]);
    // }
    // getItemInCart.splice(3, 1);
    // console.log(getItemInCart);
/////////////////////////------------------tableau produits------------------////////////////////
let products = [];
for(let i = 0; i < quantite.length; i++) {
    products.push(getItemInCart[i].productId);
}
console.log(products);

//pr(getItemInCart);
let contact = {
    firstName : "test",
    lastName : "test",
    address : "test",
    city : "test",
    email : "test@test.com",
};
console.log(JSON.stringify(contact));
let commande = {
    products,
    contact
};
// console.log(commande);
// let envoyer = JSON.stringify(commande);
// console.log(envoyer);
///////////////////////////////----------------Validation formulaire-----------------------------////////////


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
let familyName = document.querySelector("#name");
let allInputs = document.querySelectorAll(".input");
let propre = document.querySelector("#propre");
let bien = document.querySelector("#bien");

console.log(allInputs);
let regexName = /^[A-Za-z\'\s\.\-\,]+$/;
for(let i = 0; i<allInputs.length; i++) {
    allInputs[i].addEventListener('focusout', function() {
        if (regexName.test(allInputs[i].value) === false || allInputs[i].value === "") {
            allInputs[i].style.backgroundColor = 'red';
            console.log(allInputs[i].value);
        } 
        // else if (regexName.test(allInputs[i].value)) {
        //     propre.innerHTML = "Propre";
        //     bien.innerHTML = "Bien";
        // }
    
    });
}
let emailInput = document.querySelector("#email");
let genial = document.querySelector("#genial");
let regexEmail = /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/;
emailInput.addEventListener('focusout', function() {
    console.log(emailInput.value); 
    if (regexEmail.test(emailInput.value) === false || emailInput.value === "") {
        emailInput.style.backgroundColor = 'red';
        console.log('email invalide');
    } else {
        console.log('parfait');
        genial.innerHTML = "Génial";
    }
});
// console.log(familyName.value);
// console.log(regexName.test(familyName.value));

    




//let emailReg = new RegExp(/^([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/i);

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
            //window.location.href = "confirmation.html";
        } else {
            console.error('Retour du serveur : ', response.status);
        }
    } catch (e) {
        console.log(e);
    }
}
postForm(commande);

function confirmationId (responseId) {
    let orderId = responseId.orderId;
    console.log(orderId);
    localStorage.setItem("orderConfirmationId", orderId);
}


// async function getTeddiesData() {
//     let response = await fetch('http://localhost:3000/api/teddies');
//     let data = await response.json();
//     console.log(data);
// }
// getTeddiesData();



/////////////-----------lien pour page confirm
// lien.href= `/corfirmation.html?id=${data[i]._id}`;
// lien.href= `/corfirmation.html?order_id=${data[i]._id}`;