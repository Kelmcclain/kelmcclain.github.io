const clickedProduct = JSON.parse(localStorage.getItem('productId'))

const matchingProduct = products.find((product) => product.id === clickedProduct)
if (matchingProduct) {
    const { id, name, image, priceCents, description,brand } = matchingProduct;
    const singleProduct = `
    <div class="single-pro-image">
            <img src="${image}" width="100%" id="MainImg" alt="">
            <div class="small-img-group">
                <div class="small-img-col">
                    <img src="${image}" width="100%" class="small-img" alt="">
                </div>
                <div class="small-img-col">
                    <img src="${image}" width="100%" class="small-img" alt="">
                </div>
                <div class="small-img-col">
                    <img src="${image}" width="100%" class="small-img" alt="">
                </div>
                <div class="small-img-col">
                    <img src="${image}" width="100%" class="small-img" alt="">
                </div>

            </div>
        </div>
        <div class="single-pro-details">
            <h6>${brand}</h6>
            <h4>${name}</h4>
            <h2>KSH ${priceCents}</h2>
            <select>
                <option>Select size</option>
                <option>XL</option>
                <option>XXL</option>
                <option>Small</option>
                <option>Large</option>
            </select>
            <input type="number" value="1" class="js-prod-quantity">
            <button class="normal js-add-to-cart">Add To Cart</button>
            <h4>Product Details</h4>
            <span>${description}</span>
        </div>`
    prodetails.innerHTML = singleProduct;

}

document.querySelector('.js-add-to-cart').addEventListener('click', () => {
    quantity = Number(document.querySelector('.js-prod-quantity').value)
    const productId = clickedProduct;
    let matchingItem;
    cart.forEach((item) => {
        if (productId === item.productId) {
            matchingItem = item;
        }
    });
    if (matchingItem) {
        matchingItem.quantity += quantity;
    } else {
        cart.push({ productId, quantity });
    }

    let cartQuantity=0;
    cart.forEach((item) => {
        cartQuantity += item.quantity;

    })
    document.querySelector('.js-cart-quantity')
        .innerHTML = cartQuantity
    localStorage.setItem('cart', JSON.stringify(cart));
});