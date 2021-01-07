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
    window.location.href = `${window.location.origin}/cart.html?lastAddedProductId=${product._id}`