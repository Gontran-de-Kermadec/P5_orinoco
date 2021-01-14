// (async function () {
//     try {
//         let response = await fetch("http://localhost:3000/api/teddies/order") 
//         console.log(response);
//         if (response.ok) {
//             let responseId = await response.json();
//             console.log(responseId);
//             //window.location.href = "confirmation.html/";
//         } else {
//             console.error('Retour du serveur : ', response.status);
//         }
//     } catch (e) {
//         console.log(e);
//     }
// }) ();

localStorage.getItem('TotalPrice');
localStorage.getItem('orderConfirmationId');
localStorage.getItem('orderConfirmation');

console.log(JSON.parse(localStorage.getItem('TotalPrice')));
let totalPrice = JSON.parse(localStorage.getItem('TotalPrice'));
let orderConfirmation = JSON.parse(localStorage.getItem('orderConfirmation'));
console.log(orderConfirmation.contact.lastName);
let orderId = localStorage.getItem('orderConfirmationId');

let mainBody = document.querySelector('.test');
let customerName = document.querySelector('.name');
customerName.innerHTML = `${orderConfirmation.contact.lastName}`;
mainBody.innerHTML = `
<p class="text-center fs-4 fw-light">Montant de la commande : ${totalPrice}€</p>
<p class="text-center fs-4 fw-light">Référence de la commande : ${orderId}</p>
`;


document.querySelector('button').addEventListener('click', (e) => {
    localStorage.clear();
    window.location = "index.html";
})
