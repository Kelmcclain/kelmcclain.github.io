
htmlSkill();
cssSkill() ;
jsSkill();
flutterSkill();
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

    }, 8)
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

    }, 8)
}

function jsSkill() {
    let number = document.getElementById("js-number");
    console.log(number)
    let counter = 0;

    setInterval(() => {

        if (counter === 50) {
            clearInterval();
        } else {
            counter += 1;
            number.innerHTML = counter + "%"
        }

    }, 8)
}


function flutterSkill() {
    let number = document.getElementById("flutter-number");
    console.log(number)
    let counter = 0;

    setInterval(() => {

        if (counter === 35) {
            clearInterval();
        } else {
            counter += 1;
            number.innerHTML = counter + "%"
        }

    }, 8)
}