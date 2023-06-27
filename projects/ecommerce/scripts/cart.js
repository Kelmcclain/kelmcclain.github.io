const cart = JSON.parse(localStorage.getItem('cart')) || []
   


const featuredProducts = document.querySelector('.js-featured-products')
const featuredProductsHTML = products.slice(0, 4).map((product) => {
    const { id, image, name, rating, priceCents, brand } = product
    return `
        <div class="product js-product-${id}">
        <img src=${image} alt="" onclick="window.location.href='sproduct.html'">
        <div class="description">
            <span>${brand}</span>
            <h5>${name}</h5>
            <div class="star-rating">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
            </div>
            <h4>Ksh ${priceCents}</h4>
        </div>
        <i class="fal fa-shopping-cart cart js-add-to-cart" data-product-id="${product.id}"></i>
        </div> 
        `

}).join("");
featuredProducts.innerHTML = featuredProductsHTML

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
            renderCart() 
        });
    });

// Function to render the cart
renderCart()
function renderCart() {
    let cartHTML = []
    let cartAmount =0;
    let shipping= 0;
    let totalAmount=0;

    cart.forEach((cartItem) => {
        const matchingProduct = products.find((product) => product.id === cartItem.productId)
        if (matchingProduct) {
            const { id, name, image, priceCents } = matchingProduct;
            const { quantity } = cartItem;
            const subtotal = priceCents * quantity;
            cartAmount += subtotal
            let itemHTML = `
          <tr>
            <td><i class="far fa-times-circle remove-cart-item" data-cart-product-id=${id}></i></td>
            <td><img src="${image}" alt=""></td>
            <td>${name}</td>
            <td>${priceCents}</td>
            <td><input type="number" value="${quantity}" class="js-cart-quantity-${id}"></td>
            <td  class="js-product-subtotal">${subtotal}</td>
          </tr>
        `
            cartHTML += itemHTML
        }
       
    });
    if (cartAmount < 2000){
        shipping = 300
        totalAmount = cartAmount+shipping
        console.log(cartAmount)
        document.querySelector('#shipping').innerHTML = `Ksh ${shipping}`;

    } else{
        shipping =0
        totalAmount = cartAmount+shipping
        console.log(shipping)
        document.querySelector('#shipping').innerHTML = 'Free';

    }
    
    document.querySelector('.cart-table-items').innerHTML = cartHTML;
    document.querySelector('#cartAmount').innerHTML = `Ksh ${cartAmount}`;
    document.querySelector('#totalAmount').innerHTML = `Ksh ${totalAmount}`;


}

// Function to remove an item from the cart
function removeCartItem(productId) {
    const index = cart.findIndex((item) => item.productId === productId);
    if (index !== -1) {
        cart.splice(index, 1);
    }
}

document.querySelector('.cart-table-items').addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-cart-item')) {
        const productId = event.target.dataset.cartProductId;
        removeCartItem(productId);
        renderCart();
        localStorage.setItem('cart', JSON.stringify(cart));
    }
});

// Function to update the quantity of an item in the cart
function updateCartItemQuantity(productId, quantity) {
    const item = cart.find((item) => item.productId === productId);
    if (item) {
        item.quantity = quantity;
    }
}

document.querySelector('.cart-table-items').addEventListener('change', (event) => {
    if (event.target.tagName === 'INPUT') {
        const inputField = event.target;
        const productId = inputField.classList[0].replace('js-cart-quantity-', '');
        const quantity = parseInt(inputField.value);
        updateCartItemQuantity(productId, quantity);
        renderCart();
        updateCartCount();
        localStorage.setItem('cart', JSON.stringify(cart));
    }
});













