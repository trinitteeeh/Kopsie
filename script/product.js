window.addEventListener('DOMContentLoaded', function() {
  // Get the scroll container element
  var container = document.querySelector('.scroll-container');
  
  // Add an event listener to the scroll container
  container.addEventListener('scroll', function() {
    // Check if the user has reached the end of the scroll
    if (container.scrollLeft === (container.scrollWidth - container.offsetWidth)) {
      // Perform any desired actions here
      console.log('End of scroll reached!');
    }
  });
});

fetch('../menu.json')
  .then(response => response.json())
  .then(data => {

    data.forEach(coffee => {
      
    const productCardContainer = createProductCard(coffee, "drink");
    if(productCardContainer !== null){
      const layoutContainer = document.querySelector('.product-display-content');
      layoutContainer.appendChild(productCardContainer);
    }
  });
})


fetch('../menu.json')
  .then(response => response.json())
  .then(data => {

    data.forEach(cookie => {

      const productCardContainer = createProductCard(cookie, "cookie");
      if(productCardContainer !== null){
        const layoutContainer = document.querySelector('.scroll-content');
        layoutContainer.appendChild(productCardContainer);
      }      
  });
})

function showProductDetail(productID) {
    window.location.href = "productdetail.html?id=" + productID;
}

function createProductCard(product, type){
  if(product.type !== type){
    return null; 
  }
  
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
