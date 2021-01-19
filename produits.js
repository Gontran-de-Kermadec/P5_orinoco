let productId = new URL(window.location.href).searchParams.get('id');

class ProduitChoisi {
    constructor(colorSelected, imageUrl, name, price, productId, quantity) {
        this.colorSelected = colorSelected;
        this.imageUrl = imageUrl;
        this.name = name;
        this.price = price;
        this.productId = productId;
        this.quantity = quantity;
    }
}

//--------------------------fonction async anonyme pour recupérer les données-----------------------
(async function() {
    let response = await fetch(`http://localhost:3000/api/teddies/${productId}`);
    let data = await response.json();
    productInfo(data);
    onClick(data);
    alreadyAdded(data);
})()

//----------------------------fonction qui permet l'affichage des données----------------------------
function productInfo(data) {
    let productImage = document.querySelector('.picture');
    let productName = document.querySelector('.nom');
    let productPrice = document.querySelector('.prix');
    let productDescription = document.querySelector('.description');
    let productColor = document.querySelector('#colorSelect');
    productImage.src = data.imageUrl;
    productName.innerHTML = data.name;
    productPrice.innerHTML = `${data.price / 100}€`;
    productDescription.innerHTML = data.description;
    data.colors.forEach(color => {
        let options = document.createElement("option");
        productColor.appendChild(options);
        options.setAttribute("value", `${color}`);
        options.innerHTML = `${color}`;
    });
}

//---------------------------fonction qui affiche un nombre d'avis clients aleatoire--------------------
let random = document.querySelector('#random');
function getRandomNumber() {
    return Math.round(Math.random()*100);
}
random.innerHTML = getRandomNumber();


//---------------------fonction qui verifie si le produit existe deja et agit sur le bouton----------
function checkColor(itemInCart, theName) {
    let btnPanier = document.querySelector('.btn-panier');
    let addCartButton = document.querySelector(".add-cart");
    btnPanier.style.display = "block";
    let choixCouleur = document.querySelector('#colorSelect');
    let productExist = (itemInCart.find(nom => nom.name === theName && nom.colorSelected === choixCouleur.value));
    if (productExist) {
        addCartButton.disabled = true;
    } else {
        addCartButton.disabled = false;
    }
}

//----------------------fonction qui ecoute le changement de couleur et agit sur le bouton---------
function colorChange(itemInCart, theName) {
    let choixCouleur = document.querySelector('#colorSelect');
    let addCartButton = document.querySelector(".add-cart");
    choixCouleur.addEventListener('change', (e) => {
        if ((itemInCart.find(nom => nom.name === theName && nom.colorSelected === e.target.value))) {
            addCartButton.disabled = true;
        } else {
            addCartButton.disabled = false; 
        }
    });
}

 //----------------------------fonction qui permet d'ajouter un produit au panier au clic sur le bouton--
 function onClick(data) {
    let itemInCart = JSON.parse(localStorage.getItem('ItemInCart'));
    let addCartButton = document.querySelector(".add-cart");
    let imageUrl = data.imageUrl;
    let name = data.name;
    let price = data.price;
    let btnPanier = document.querySelector('.btn-panier');
    addCartButton.addEventListener("click", () => {
        let colorSelected = document.querySelector('#colorSelect').value;
        let itemPrice = JSON.parse(localStorage.getItem('itemPrice'));
        if (itemInCart === null) {
            itemInCart = [];
            itemPrice = [];
            btnPanier.style.display = "block";
        } 
        let nouveau = new ProduitChoisi(colorSelected, imageUrl, name, price, productId, 1);
        itemInCart.push(nouveau);
        localStorage.setItem('ItemInCart', JSON.stringify(itemInCart));
        let getPrice = data.price / 100;
        itemPrice.push(getPrice);
        localStorage.setItem('itemPrice', JSON.stringify(itemPrice));
        addCartButton.disabled = true;
        if (itemInCart !== null) {
            checkColor(itemInCart, name);
            colorChange(itemInCart, name);
        } 
    })
}

//-------------fonction pour verifier et agir sur l'etat des boutons de la page hors du clic------------------------
function alreadyAdded (data) {
    let alreadyAdded = JSON.parse(localStorage.getItem('ItemInCart'));
    let btnPanier = document.querySelector('.btn-panier');
    if (alreadyAdded.length > 0) {
        checkColor(alreadyAdded, data.name);
        colorChange(alreadyAdded, data.name);
    } else {
        btnPanier.style.display = "none";
    }
}
