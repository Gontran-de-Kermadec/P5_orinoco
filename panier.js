let getProductData = (async function () {
    let productId = new URL(window.location.href).searchParams.get('id');
    console.log(productId);
    let response = await fetch(`http://localhost:3000/api/teddies/${productId}`);
    let data = await response.json();
    //productInfo(data);
    console.log(data);
})()


// sessionStorage.setItem("couleur", "bleu");