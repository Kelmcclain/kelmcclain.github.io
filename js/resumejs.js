
htmlSkill();
cssSkill() ;
function htmlSkill() {
    let number = document.getElementById("html-number");
    console.log(number)
    let counter = 0;

    setInterval(() => {

        if (counter === 85) {
            clearInterval();
        } else {
            counter += 1;
            number.innerHTML = counter + "%"
        }

    }, 10)
}

function cssSkill() {
    let number = document.getElementById("css-number");
    console.log(number)
    let counter = 0;

    setInterval(() => {

        if (counter === 65) {
            clearInterval();
        } else {
            counter += 1;
            number.innerHTML = counter + "%"
        }

    }, 10)
}