fetch("http://localhost:3000/api/teddies")
    .then(res => res.json())
    .then(data => console.log(data))    
//{
//         res.json()
//         console.log(res);
//     })
//     .then(data => {
//         console.log(data)
//     })
// async function attente () {
//     let response = await fetch('http://localhost:3000/api/teddies');
//     let data = await response.json();
// }
// attente();
// console.log(data);