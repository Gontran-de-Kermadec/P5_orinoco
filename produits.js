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
    let productId = new URL(window.location.href).searchParams.get('id');
    let response = await fetch(`http://localhost:3000/api/teddies/${productId}`);
    let data = await response.json();
    productInfo(data);
    console.log(data);
})()
//fonction qui permet l'affichage des données avec le parametre qui est un objet
function productInfo (data) {
    let productImage = document.querySelector('.img');
    let productName = document.querySelector('.nom');
    let productPrice = document.querySelector('.prix');
    let productDescription = document.querySelector('.description');
    let productColor = document.querySelector('.color');
    productImage.src = data.imageUrl;
    productName.innerHTML = data.name;
    productPrice.innerHTML = `${data.price / 100}€`;
    productDescription.innerHTML = data.description;
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

