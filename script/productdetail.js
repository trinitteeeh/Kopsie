fetch('../menu.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(jsonData) {
    var urlParams = new URLSearchParams(window.location.search);
    var productId = urlParams.get('id');

    var product = jsonData.find(function(item) {
      return item.id === productId;
    });

    var productImage = document.getElementById("product-image");
    productImage.src =  product.image;

    document.getElementById("product-title").textContent = product.title;
    document.getElementById("product-price").textContent = "IDR " + product.price +",00";
    document.getElementById("product-description").textContent = product.description;

    var detailBtn = document.getElementById("detail-btn");
    var storageBtn = document.getElementById("storage-btn");
    var addBtn = document.getElementById("add-btn");

    detailBtn.addEventListener("click", function() {
        changeToDetail(product.description);
    });
    storageBtn.addEventListener("click", function() {
        changeToDetail(product.storage);
    });
    addBtn.addEventListener("click", function() {
        addToCart(product.id); //local storage
    });

  })
createRecommendation();


 
function changeToDetail(productDescription){
    document.getElementById("product-description").textContent = productDescription;
}

function changeToStorage(productStorage){
    document.getElementById("product-description").textContent = productStorage;
}

function createRecommendation(){
    var totalRecommendation = 0;
    // var recomendationList = [];

    fetch('../menu.json')
        .then(response => response.json())
        .then(data => {

        data.forEach(menu => {
            const productCardContainer = createProductCard(menu);
            if(productCardContainer !== null){
                const layoutContainer = document.querySelector('.product-display-content');
                layoutContainer.appendChild(productCardContainer);
                totalRecommendation++;
                if(totalRecommendation >= 4){
                    return;
                }
            }
        });
    })
}

function showProductDetail(productID) {
  window.location.href = "productdetail.html?id=" + productID;
}

function createProductCard(product){  
    const productCardContainer = document.createElement('div');
    productCardContainer.classList.add('product-card-container');
  
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    productCardContainer.appendChild(productCard);
  
    const productImageContainer = document.createElement('div');
    productImageContainer.classList.add('product-image-container');
    productCard.appendChild(productImageContainer);
  
    const productImage = document.createElement('img');
    productImage.src = product.image; 
    productImageContainer.appendChild(productImage);
  
  
    // Set the coffee name
    const productTitle = document.createElement('h4');
    productTitle.classList.add('product-title');
    productTitle.textContent = product.title;
    productCard.appendChild(productTitle);
  
    const productDescription = document.createElement('div');
    productDescription.classList.add('product-description');
    productCard.appendChild(productDescription);
  
    // Set the coffee description
    const description = document.createElement('p');
    description.textContent = product.description;
    productDescription.appendChild(description);
  
    const orderBtn = document.createElement('button');
    orderBtn.classList.add('product-order-button');
    orderBtn.textContent = "Order Now";
    productCard.appendChild(orderBtn);
  
    const productID = document.createElement('lable');
    productID.classList.add("product-id");
    productID.textContent = product.id;
    productID.style.visibility = "hidden";
    productCardContainer.appendChild(productID);
  
    productCardContainer.addEventListener("click", function() {
      showProductDetail(product.id);
    });
  
    return productCardContainer;
}

function addToCart(productID){
  var quantity = document.getElementById("quantity-spinner").value;
  var size = document.getElementById("size-dropdown").value;
  var notes = document.getElementById("notes").value;

  var cartItem = {
    "id": productID,
    "quantity": quantity,
    "size": size,
    "notes":notes
  };

  var cart = JSON.parse(localStorage.getItem("cart")) || {};
  cart[cartItem.id] = cartItem;
  var cartJson = JSON.stringify(cart); 
  localStorage.setItem("cart", cartJson);
  window.location.href = "product.html"; 
}



