$(document).ready(function () {
  $('.slider').slick({
    infinite: true,
    dots: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: false,
  });

  // Variable to store the product list
  var productList = [];

  // Function to load and display products
  function loadProducts() {
    var z = new XMLHttpRequest();
    z.open("GET", "https://5d76bf96515d1a0014085cf9.mockapi.io/product", true);
    z.send();
    z.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        productList = JSON.parse(this.responseText);
        displayProducts(productList);
      }
    }
  }

  // Function to display products
  function displayProducts(products) {
    var cloth_section = document.getElementById('clothing');
    var Acces_section = document.getElementById('Accessories');
    cloth_section.innerHTML = '';
    Acces_section.innerHTML = '';

    for (var i = 0; i < products.length; i++) {
      var card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `<a href="product_details.html?productId=${products[i].id}">
                          <img src="${products[i].preview}" alt="${products[i].name}">
                          <div class="text_section">
                            <h2 id="heading">${products[i].name}</h2>
                            <p id="brand">${products[i].brand}</p>
                            <p id="price">Rs ${products[i].price}</p>
                          </div>
                        </a>`;

      if (products[i].isAccessory === true) {
        Acces_section.appendChild(card);
      } else {
        cloth_section.appendChild(card);
      }
    }
  }

  // Load and display products on page load
  loadProducts();

  // Add event listener to the search input to trigger search as the user types
  document.getElementById("searchbox").addEventListener("input", performSearch);

  // Function to perform product search
  function performSearch() {
    var searchInput = document.getElementById("searchbox").value.toLowerCase();
    var matchingProducts = productList.filter(function (product) {
      return product.name.toLowerCase().includes(searchInput);
    });

    displayProducts(matchingProducts);
  }
});
