if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    // Hide cart and terms on load.
    document.getElementsByClassName('cart')[0].style.display = 'none'
    document.getElementsByClassName('terms')[0].style.display = 'none'

    // Show products, hide cart.
    var showProductsBtn = document.getElementsByClassName('show-products')[0]
    showProductsBtn.addEventListener('click', function() {
        store = document.getElementsByClassName('store')[0]
        cart = document.getElementsByClassName('cart')[0]
        terms = document.getElementsByClassName('terms')[0]
        if (store.style.display != 'block') {
            store.style.display = 'block'
        }
        if (cart.style.display != 'none') {
            cart.style.display = 'none'
        }
        if (terms.style.display != 'none') {
            terms.style.display = 'none'
        }
    })

    // Show cart, hide products.
    var showCartBtn = document.getElementsByClassName('show-cart')[0]
    showCartBtn.addEventListener('click', function() {
        store = document.getElementsByClassName('store')[0]
        cart = document.getElementsByClassName('cart')[0]
        terms = document.getElementsByClassName('terms')[0]
        if (cart.style.display != 'block') {
            cart.style.display = 'block'
        }
        if (store.style.display != 'none') {
            store.style.display = 'none'
        }
        if (terms.style.display != 'none') {
            terms.style.display = 'none'
        }
    })

    // Show terms, hide 
    var showTermsBtn = document.getElementsByClassName('show-terms')[0]
    showTermsBtn.addEventListener('click', function() {
        store = document.getElementsByClassName('store')[0]
        cart = document.getElementsByClassName('cart')[0]
        terms = document.getElementsByClassName('terms')[0]
        if (terms.style.display != 'block') {
            terms.style.display = 'block'
        }
        if (store.style.display != 'none') {
            store.style.display = 'none'
        }
        if (cart.style.display != 'none') {
            cart.style.display = 'none'
        }
    })

    var removeCartItemButtons = document.getElementsByClassName('remove-item')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('quantity')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('add-item')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('place-order')[0].addEventListener('click', purchaseClicked)
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('item-title')[0].innerText
    var price = shopItem.getElementsByClassName('item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    var tbodyRef = document.getElementById('cart').getElementsByTagName('tbody')[0]
    
    //cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            console.log("YEET")
            alert('This item is already added to the cart')
            return
        }
    }

    var cartRow = tbodyRef.insertRow();

    //var cartRow = document.createElement('tr')
    cartRow.classList.add('cart-item')

    var cartRowContents = `
        <tr class="cart-item">
            <td>
                <h1 class="cart-item-title">${title}</h1>
                <img class="item-image" src="${imageSrc}">
                <!--<p>You can tune a guitar, but you can't tuna fish</p>-->
            </td>
            <td class="cart-item-price">${price}</td>
            <td><input class="quantity" type="number" value="1"></td>
            <td class="remove-item"><i class="fa-solid fa-trash"></i></td>
        </tr>
        `

    cartRow.innerHTML = cartRowContents
    //cartItems.append(cartRow)
    cartRow.getElementsByClassName('remove-item')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('quantity')[0].addEventListener('change', quantityChanged)
}

function purchaseClicked() {
    alert('Thank you for your purchase!')
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function updateCartTotal() {
    console.log("Calling updateCartTotal")
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-item')
    var subtotal = 0
    var total = 0
    var failed = false
    // Total price of all elements currently in cart.
    try{
        for (var i=0; i<cartRows.length; i++){
            var cartRow = cartRows[i]

            var priceElement = cartRow.getElementsByClassName('cart-item-price')[0]
            console.log("price elemtn: ",priceElement)
            var price = parseFloat(priceElement.textContent.replace('$', ''))

            var quantityElement = cartRow.getElementsByClassName('quantity')[0]
            var quantity = quantityElement.value

            subtotal = subtotal + (price * quantity)
            subtotal = Math.round(subtotal * 100) / 100
            console.log("subtotal",subtotal)
        }
        total = total + subtotal + 1999
        total = Math.round(total * 100) / 100
        console.log("total",total)
    }catch (error) {
        total = 0
        console.log(error)
        failed = true
    }
    
    // Update total price on page.
    if (!failed) {
        document.getElementsByClassName('cart-subtotal')[0].textContent = '$' + subtotal
        document.getElementsByClassName('cart-total-price')[0].textContent = '$' + total
        document.getElementsByClassName('agree-price')[0].textContent = '$' + total
    }else{
        document.getElementsByClassName('cart-total-price')[0].textContent = 'ERROR'
    }
}