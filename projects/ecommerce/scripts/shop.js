const cart = JSON.parse(localStorage.getItem('cart')) || []
const shopProducts = document.querySelector('.js-shop-products')

const productsHTML = products.map((product) => {
    const {id, image, name, rating, priceCents, brand } = product
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
shopProducts.innerHTML = productsHTML

