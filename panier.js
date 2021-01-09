// let getProductData = (async function () {
//     let productId = new URL(window.location.href).searchParams.get('id');
//     console.log(productId);
//     let response = await fetch(`http://localhost:3000/api/teddies/${productId}`);
//     let data = await response.json();
//     //productInfo(data);
//     console.log(data);
// })()


// // sessionStorage.setItem("couleur", "bleu");


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
    console.log(window.location);
    let getItemInCart = JSON.parse(localStorage.getItem('ItemInCart'));
    console.log(getItemInCart[0].name);


    //affichage panier
    let tbody = document.querySelector('.tbody');
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
        console.log(item);
        let line = document.createElement("tr");
        tbody.appendChild(line);
        //line.innerHTML = 'voila';
        line.innerHTML = `
            <td>
                <div class="img_conteneur">
                    <img src="${item.imageUrl}" alt="Ours en peluche" class="picture">
                </div>
            </td>
            <td>${item.name} - ${item.colorSelected}</td>
            <td>${item.price/100}€</td>
        `
    });
