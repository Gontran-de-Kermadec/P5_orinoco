// (() => {
//     // Search the product ID in URL
//     let productId = new URL(window.location.href).searchParams.get('id')
  
//     // Fetch product data
//     fetch(`http://localhost:3000/api/teddies/${productId}`)
//       .catch(error => console.log(error))
//       .then(response => response.json())
//       .then(productData => {
//         console.log(productData);  
//         product = productData
//       })
//   })()
//   (function() {
//     let productId = new URL(window.location.href).searchParams.get('id');
//     fetch(`http://localhost:3000/api/teddies/${productId}`)
//       .catch(error => console.log(error))
//       .then(response => response.json())
//       .then(productData => {
//         console.log(productData);  
//         product = productData
//       })    
//   }) ()



//fonction async pour recupérer les données
let getProductData = (async function () {
    //variable productId est la simplement pour recupere l'id dans l'url
    let productId = new URL(window.location.href).searchParams.get('id');
    console.log(productId);
    let response = await fetch(`http://localhost:3000/api/teddies/${productId}`);
    let data = await response.json();
    productInfo(data);
    //console.log(data);
    //store.saveProducts(data);
    onClick(data);
})()
//fonction qui permet l'affichage des données avec le parametre qui est un objet
function productInfo (data) {
    let productImage = document.querySelector('.picture');
    let productName = document.querySelector('.nom');
    let productPrice = document.querySelector('.prix');
    let productDescription = document.querySelector('.description');
    let productColor = document.querySelector('.color');
    let productId = document.querySelector('#panier');
    productImage.src = data.imageUrl;
    productName.innerHTML = data.name;
    productPrice.innerHTML = `${data.price / 100}€`;
    productDescription.innerHTML = data.description;
    //productId.href = `/panier.html?id=${data._id}`;
    data.colors.forEach(color => {
        // console.log(data.colors);
        // console.log(data.colors.length);
        if (data.colors.length === 1) {
            productColor.innerHTML = `
        <select name="color" id="color-select">
            <option value="${data.colors[0]}">${data.colors[0]}</option>
        </select>
        `; 
        } else if (data.colors.length === 2){
            productColor.innerHTML = `
            <select name="color" id="color-select">
                <option value="${data.colors[0]}">${data.colors[0]}</option>
                <option value="${data.colors[1]}">${data.colors[1]}</option>
            </select>
            `; 
        } else if (data.colors.length === 3){
            productColor.innerHTML = `
            <select name="color" id="color-select">
                <option value="${data.colors[0]}">${data.colors[0]}</option>
                <option value="${data.colors[1]}">${data.colors[1]}</option>
                <option value="${data.colors[2]}">${data.colors[2]}</option>
            </select>
            `; 
        } else {
            productColor.innerHTML = `
            <select name="color" id="color-select">
                <option value="${data.colors[0]}">${data.colors[0]}</option>
                <option value="${data.colors[1]}">${data.colors[1]}</option>
                <option value="${data.colors[2]}">${data.colors[2]}</option>
                <option value="${data.colors[3]}">${data.colors[3]}</option>
            </select>
            `; 
        }
    });
}

//function qui affiche un nombre d'avis clients aleatoire
let random = document.querySelector('#random');
function getRandomNumber() {
    return Math.round(Math.random()*100);
  }
random.innerHTML = getRandomNumber();

//function pour attribuer données au local storage
// class Storage {
//     static saveProducts(data) {
//         localStorage.setItem('data', JSON.stringify(data));
//     }
// }
// class Storage {
//     saveProducts(data) {
//         localStorage.setItem('data', JSON.stringify(data));
//     }
// }
// let store = new Storage();
function onClick (data) {
    let addCartButton = document.querySelector(".add-cart");
    addCartButton.addEventListener("click", () => {
        //let cartItems = [];
        // cartItems.push(data);
        // console.log(cartItems);
        // localStorage.setItem('ItemInCart', JSON.stringify(cartItems));
        let itemInCart = JSON.parse(localStorage.getItem('ItemInCart'));
        console.log(itemInCart);
        //store.saveProducts(data);
        if (itemInCart === null) {
            itemInCart = [];
            //cartItems.push(data);
            //localStorage.setItem('ItemInCart', JSON.stringify(cartItems));
            //getItem[data._id] = {
            //     quantity: 1,
            //     ...data
            //   }
            console.log(itemInCart);
        } 
        // else if (itemInCart !== null){
        //     itemInCart;
        //     console.log(getItem);
        //     cartItems.push(data);
        //     localStorage.setItem('ItemInCart', JSON.stringify(cartItems));
        // }
        itemInCart.push(data);
        localStorage.setItem('ItemInCart', JSON.stringify(itemInCart));
    
})}

let array = [1,2,3];
localStorage.setItem('array', JSON.stringify(array));


console.log(window.location);
let redirection = new URL(window.location.href);
console.log(redirection);
