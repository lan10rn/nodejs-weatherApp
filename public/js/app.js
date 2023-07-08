console.log('This is client side javascript');

//fetch data from this url and then run the below function
// fetch('https://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     })
// })


//for now just fetch for boston 

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const message1 = document.querySelector('#msg-1')
const message2 = document.querySelector('#msg-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    message1.textContent = 'Loading ... ';
    const location = search.value;
    console.log(location);
    // console.log('Its Working');
    //http://localhost:3000
    fetch('/weather?address=' + location).then((response) => {
        // console.log(response);
        response.json().then((data) => {
            // console.log(data);
            if (data.error) {
                message1.textContent = data.error
            }
            else {
                message1.textContent = 'The location is : ' + data.location;
                message2.textContent = data.forecast;
            }
        })
    })
})


