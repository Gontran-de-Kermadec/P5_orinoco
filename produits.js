let productId = new URL(window.location.href).searchParams.get('id');


//fonction async pour recupérer les données
let getProductData = (async function () {
    //variable productId est la simplement pour recupere l'id dans l'url
    //let productId = new URL(window.location.href).searchParams.get('id');
    console.log(productId);
    let response = await fetch(`http://localhost:3000/api/teddies/${productId}`);
    let data = await response.json();
    productInfo(data);
    //console.log(data);
    //store.saveProducts(data);
    onClick(data);
    let colorSelected = document.querySelector('#colorSelect').value;
    let imageUrl = data.imageUrl;
    let name = data.name;
    let price = data.price;
    alreadyAdded(data);

    // let nouveau = new ProduitChoisi(colorSelected, imageUrl, name, price, productId);
    // console.log(nouveau);
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
        <select name="color" id="colorSelect">
            <option value="${data.colors[0]}">${data.colors[0]}</option>
        </select>
        `; 
        } else if (data.colors.length === 2){
            productColor.innerHTML = `
            <select name="color" id="colorSelect">
                <option value="${data.colors[0]}">${data.colors[0]}</option>
                <option value="${data.colors[1]}">${data.colors[1]}</option>
            </select>
            `; 
        } else if (data.colors.length === 3){
            productColor.innerHTML = `
            <select name="color" id="colorSelect">
                <option value="${data.colors[0]}">${data.colors[0]}</option>
                <option value="${data.colors[1]}">${data.colors[1]}</option>
                <option value="${data.colors[2]}">${data.colors[2]}</option>
            </select>
            `; 
        } else {
            productColor.innerHTML = `
            <select name="color" id="colorSelect">
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






 //////////prtie pour .......
 
function onClick (data) {
    let itemInCart = JSON.parse(localStorage.getItem('ItemInCart'));
    let addCartButton = document.querySelector(".add-cart");
    //let colorSelected = document.querySelector('#colorSelect').value;
    //console.log(colorSelected);
    //let choixCouleur = document.querySelector('#colorSelect');
    //console.log(choixCouleur.value);
    let imageUrl = data.imageUrl;
    let name = data.name;
    let price = data.price;
    // console.log(couleurExist);
    // if (itemInCart !== null) {
    //     let btnPanier = document.querySelector('.btn-panier');
    //     btnPanier.style.display = "block";
    //     let choixCouleur = document.querySelector('#colorSelect');
    //     let productExist = (itemInCart.find(nom => nom.name === data.name && nom.colorSelected === choixCouleur.value));
    //     if (productExist) {
    //         addCartButton.disabled = true;
    //     } else {
    //         addCartButton.disabled = false;
    //     }
    //     choixCouleur.addEventListener('change', (evnmt) => {
    //         console.log(evnmt.target.value);
    //         if ((itemInCart.find(nom => nom.name === data.name && nom.colorSelected === evnmt.target.value))) {
    //             console.log('produit existant');
    //             addCartButton.disabled = true;
    //         } else {
    //             addCartButton.disabled = false; 
    //         }
    //     });
    // } 
   
   
    addCartButton.addEventListener("click", (e) => {
        let colorSelected = document.querySelector('#colorSelect').value;
        console.log(itemInCart);
        let itemPrice = JSON.parse(localStorage.getItem('itemPrice'));
        if (itemInCart === null) {
            itemInCart = [];
            itemPrice = [];
            let btnPanier = document.querySelector('.btn-panier');
            btnPanier.style.display = "inline-block";
        } 
        // if ((itemInCart.find(nom => nom.name === data.name && nom.colorSelected === colorSelected))) {
        //     console.log('produit existant');
            
        //     //addCartButton.disabled = true;
        //     //e.preventDefault();
        // }
        // if ((itemInCart.find(nom => nom.name === data.name && nom.colorSelected === colorSelected)) === false) {
        //     addCartButton.disabled = false;
        // }
     
        let nouveau = new ProduitChoisi(colorSelected, imageUrl, name, price, productId, 1);
        itemInCart.push(nouveau);
        localStorage.setItem('ItemInCart', JSON.stringify(itemInCart));
        addCartButton.disabled = true;
        if (itemInCart !== null) {
            console.log(itemInCart);
            let btnPanier = document.querySelector('.btn-panier');
            btnPanier.style.display = "block";
            let choixCouleur = document.querySelector('#colorSelect');
            let productExist = (itemInCart.find(nom => nom.name === data.name && nom.colorSelected === choixCouleur.value));
            if (productExist) {
                addCartButton.disabled = true;
            } else {
                addCartButton.disabled = false;
            }
            choixCouleur.addEventListener('change', (evnmt) => {
                console.log(evnmt.target.value);
                if ((itemInCart.find(nom => nom.name === data.name && nom.colorSelected === evnmt.target.value))) {
                    console.log('produit existant');
                    addCartButton.disabled = true;
                } else {
                    addCartButton.disabled = false; 
                }
            });
        } 
        // if (itemInCart !== null) {
        //     if (itemInCart.colorSelected === )
        //     for (let j = 0; j < itemInCart.length; j++) {
        //         console.log(itemInCart[j].colorSelected);
        //         if (itemInCart[i].colorSelected === )
        //     }
        // }
        let getPrice = data.price / 100;
        console.log(getPrice);
        itemPrice.push(getPrice);
        localStorage.setItem('itemPrice', JSON.stringify(itemPrice));
        //console.log(getPrice);
    
})}


////////////fonction pour verifier si article deja present dans itemInCart////////////////
function alreadyAdded (data) {
    let alreadyAdded = JSON.parse(localStorage.getItem('ItemInCart'));
    let addCartButton = document.querySelector(".add-cart");
if (alreadyAdded !== null) {
    console.log(alreadyAdded);
    let btnPanier = document.querySelector('.btn-panier');
    btnPanier.style.display = "block";
    let choixCouleur = document.querySelector('#colorSelect');
    let productExist = (alreadyAdded.find(nom => nom.name === data.name && nom.colorSelected === choixCouleur.value));
    if (productExist) {
        addCartButton.disabled = true;
    } else {
        addCartButton.disabled = false;
    }
    choixCouleur.addEventListener('change', (evnmt) => {
        console.log(evnmt.target.value);
        if ((alreadyAdded.find(nom => nom.name === data.name && nom.colorSelected === evnmt.target.value))) {
            console.log('produit existant');
            addCartButton.disabled = true;
        } else {
            addCartButton.disabled = false; 
        }
    });
} 
}
    


console.log(window.location);
let redirection = new URL(window.location.href);
console.log(redirection);

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