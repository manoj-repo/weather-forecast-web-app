console.log('This is the Client side Javascript loaded');


const weatherform = document.querySelector('form');
const search = document.querySelector('input');

const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherform.addEventListener('submit', (e)=>{
    e.preventDefault();
    const inputLocation = search.value;

    messageOne.textContent = 'Loading Content please wait';
    messageTwo.textContent = '';

    
    fetch('/weather?address='+inputLocation).then((response)=>{
        response.json().then((data)=>{
            if(data.error)
            {
                messageOne.textContent = data.error;
            }
            else
            {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            };
            
            // console.log(data.location);
            // console.log(data.forecast)
        })
})

})