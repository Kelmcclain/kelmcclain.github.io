let number = document.getElementById("number");
console.log(number)
let counter = 0;

setInterval(() => {

    if(counter=== 85) {
        clearInterval();
    } else {
        counter += 1;
    number.innerHTML = counter + "%"
    }
    
}, 7)