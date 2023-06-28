const cart = JSON.parse(localStorage.getItem('cart')) || []
const featuredProducts = document.querySelector('.js-featured-products')
const featuredProductsHTML = products.slice(0, 4).map((product) => {
    const { id, image, name, rating, priceCents, brand } = product
    return `
        <div class="product js-product-${id}">
        <img src=${image} alt="" class="js-product-image" data-product-id="${product.id}">
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


function fetchAndLoadFiles() {
    // Fetch the HTML single sproduct file
    const fileUrl = 'sproduct.html';
    window.location.href = fileUrl;
}

// Add event listener to the button
const productCards = document.querySelectorAll('.js-product-image');
productCards.forEach((card) => {
    card.addEventListener('click', () => {
        const { dataset: { productId } } = card;
        localStorage.setItem('productId', JSON.stringify(productId));
        fetchAndLoadFiles()
       
    });
})


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
