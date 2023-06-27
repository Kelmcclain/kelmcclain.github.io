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
for (let i = 0; i < products.length; i++) {
    products[i].onclick = function () {
        window.location.href = "sproduct.html";
    };
}

// Cart Functionality
// const cart = JSON.parse(localStorage.getItem('cart')) || []

updateCartCount()
function updateCartCount (){
    let cartQuantity = 0;
cart.forEach((item) => {
    cartQuantity += item.quantity;

    document.querySelector('.js-cart-quantity')
    .innerHTML = cartQuantity
})
}

    
document.querySelectorAll('.js-add-to-cart')
    .forEach((button) => {
        button.addEventListener('click', () => {
            const { dataset: { productId } } = button;
            let quantity = 1

            let matchingItem;
            cart.forEach((item) => {
                if (productId === item.productId) {
                    matchingItem = item;
                }
            });

            if (matchingItem) {
                matchingItem.quantity += 1;
            } else {
                cart.push({ productId, quantity });
            }

            let cartQuantity = 0;
            cart.forEach((item) => {
                cartQuantity += item.quantity;

            })
            document.querySelector('.js-cart-quantity')
                .innerHTML = cartQuantity
            localStorage.setItem('cart', JSON.stringify(cart));
        
        });


    });
