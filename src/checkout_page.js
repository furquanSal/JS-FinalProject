var itemsinCartcount = document.getElementById("itemsinCart");
var itemsInCart = localStorage.getItem('quantity');
console.log(itemsInCart);
var productId = localStorage.getItem('productDetails');
var oneProduct = localStorage.getItem('oneProductCount');
itemsinCartcount.innerHTML = itemsInCart

var productItems = JSON.parse(localStorage.getItem("productItems") || "[]");
console.log(oneProduct);
var totalcost = 0;
for (var i = 0; i < productItems.length; i++) {
  cartItem = document.getElementById("card_container");
  var card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = (`
                                <img class="checkoutImg" src=`+ productItems[i].preview + `>
                                <div class="contents">
                                <h4>`+ productItems[i].name + `</h4>
                                <p>x5</p>
                                <p>Amount:Rs `+ productItems[i].price * oneProduct + `<p>
                                 `)
  $("#card_container").append(card);
  totalcost += Number(productItems[i].price * oneProduct);
}

$("#total_price").html(totalcost);

$("#plceordrBtn").click(function (e) {
  var itemInmyCart = {
    product: productItems,
    totalAmount: totalcost
  }
  console.log(itemsInCart)
  if (itemsInCart > 0) {
    $.get("https://jsonplaceholder.typicode.com/todos", itemInmyCart, function () {
      alert('Your order is Successfully Placed');
      localStorage.setItem('productItems', []);

      location.assign("order_confirm.html");
      itemsInCart = 0;
      localStorage.setItem('quantity', itemsInCart);

    });
  } else {
    alert("Cart is Empty");
    window.location.reload();
    itemsInCart = 0;
    localStorage.setItem('quantity', itemsInCart);
  }
});




