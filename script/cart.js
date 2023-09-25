var cartJson = localStorage.getItem("cart");
var cart = JSON.parse(cartJson) || {};
var cartArray = Object.values(cart);

if(cartArray.length > 0){
    console.log(cartArray.length)
    var label = document.getElementById("announcement");
    // label.style.color = red;
    label.style.display = "none";
}else{
    // label.style.display = "flex";
    label.innerText = "There is no Item yet!";
}

cartArray.forEach(function(cartItem) {
    let card;
      
    createCartCard(cartItem)
    .then(function(cartCard) {
        card = cartCard;
        console.log(card);
        
        const layoutContainer = document.querySelector('.cart-display-container');
        layoutContainer.appendChild(card);
    })
    .catch(function(error) {
        console.log(error);
    });
});

var checkoutBtn = document.getElementById("checkout-btn");

checkoutBtn.addEventListener("click", function() {
    paymentPage();
});

function paymentPage(){
    window.location.href = "payment.html";
}



function createCartCard(cartItem) {
return new Promise(function(resolve, reject) {
    fetch('../menu.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(jsonData) {
        var product = jsonData.find(function(item) {
            return item.id === cartItem.id;
        });

        const cartCard = document.createElement('div');
        cartCard.classList.add('cart-card');

        const cartImageContainer = document.createElement('div');
        cartImageContainer.classList.add('cart-image-container');
        cartCard.appendChild(cartImageContainer);

        const cardImage = document.createElement('img');
        cardImage.src = product.image;
        cartImageContainer.appendChild(cardImage);

        const cardDescriptionContainer = document.createElement('div');
        cardDescriptionContainer.classList.add('cart-description-container');
        cartCard.appendChild(cardDescriptionContainer);

        const titleContainer = document.createElement('div');
        titleContainer.classList.add('title-container');
        cardDescriptionContainer.appendChild(titleContainer);

        const title = document.createElement('h2');
        title.innerText = product.title;
        titleContainer.appendChild(title);

        const detailContainer = document.createElement('div');
        detailContainer.classList.add('detail-container');
        cardDescriptionContainer.appendChild(detailContainer);

        const sizeText = document.createElement('h3');
        sizeText.classList.add('size-text');
        sizeText.innerText = "Size";
        detailContainer.appendChild(sizeText);

        const sizeTextDescription = document.createElement('h4');
        sizeTextDescription.classList.add('size-text-description');
        sizeTextDescription.innerText = cartItem.size;
        detailContainer.appendChild(sizeTextDescription);

        const detailTable = document.createElement('div');
        detailTable.classList.add('detail-table');
        detailContainer.appendChild(detailTable);

        const qtyLabel = document.createElement('h3');
        qtyLabel.classList.add('detail-table-header');
        qtyLabel.innerText = "QTY";
        detailTable.appendChild(qtyLabel);

        const priceLabel = document.createElement('h3');
        priceLabel.classList.add('detail-table-header');
        priceLabel.innerText = "Price";
        detailTable.appendChild(priceLabel);

        const qtyData = document.createElement('h4');
        qtyData.classList.add('detail-table-data');
        qtyData.innerText = "x " + cartItem.quantity;
        detailTable.appendChild(qtyData);

        const priceData = document.createElement('h4');
        priceData.classList.add('detail-table-data');
        priceData.innerText = "IDR "+cartItem.quantity * product.price+",00";
        detailTable.appendChild(priceData);

        const selectedCBX = document.createElement('checkbox');
        selectedCBX.setAttribute("id", "selected-cbx");
        cartCard.appendChild(selectedCBX);

        console.log(cartCard)

        // Resolve the promise with the cartCard element
        resolve(cartCard);
    })
    .catch(function(error) {
        reject(error);
    });
});
}

  


