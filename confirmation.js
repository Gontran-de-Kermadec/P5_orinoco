localStorage.getItem('TotalPrice');
localStorage.getItem('orderConfirmationId');
localStorage.getItem('orderConfirmation');

console.log(JSON.parse(localStorage.getItem('TotalPrice')));
let totalPrice = JSON.parse(localStorage.getItem('TotalPrice'));
let orderConfirmation = JSON.parse(localStorage.getItem('orderConfirmation'));
console.log(orderConfirmation.contact.lastName);
let orderId = localStorage.getItem('orderConfirmationId');

let mainBody = document.querySelector('.mainBody');
let customerName = document.querySelector('.name');
customerName.innerHTML = `${orderConfirmation.contact.lastName}`;
mainBody.innerHTML = `
<p class="text-center fs-3 fw-light">Montant de la commande : ${totalPrice}€</p>
<p class="text-center fs-3 fw-light">Référence de la commande : ${orderId}</p>
`;


document.querySelector('button').addEventListener('click', (e) => {
    localStorage.clear();
    window.location = "index.html";
})
