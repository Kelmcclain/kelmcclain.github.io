// Script for navigation bar
const bar = document.getElementById('bar');
const close = document.getElementById('close');


const nav = document.getElementById('navbar');
if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}



const singleProductsNav = document.getElementsByClassName("product");
for (let i = 0; i < singleProductsNav.length; i++) {
    products[i].onclick = function () {
        window.location.href = "sproduct.html";
    };
}

// Cart Functionality
updateCartCount()
function updateCartCount() {
    let cartQuantity = 0;
    cart.forEach((item) => {
        cartQuantity += item.quantity;
    })
    document.querySelector('.js-cart-quantity')
        .innerHTML = cartQuantity
    if (cartQuantity === 0) {
        document.querySelector('.js-cart-quantity')
            .innerHTML = ''
    }
}


