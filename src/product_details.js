var productData = () => {
  var queryParams = location.search;
  var productId = queryParams.substring(queryParams.lastIndexOf('=') + 1);

  var x = new XMLHttpRequest()
  x.open("GET", "https://5d76bf96515d1a0014085cf9.mockapi.io/product/" + productId, true)
  x.send();
  x.onreadystatechange = function () {

    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText)
      console.log(data)


      var div1 = document.getElementById('demo');
      var detail = document.createElement('div')
      div1.appendChild(detail);
      detail.className = "detail_div1";

      var img_tag1 = document.createElement('img')
      img_tag1.className = "preview_style"
      img_tag1.src = data.preview;
      detail.appendChild(img_tag1)
      console.log(detail)


      var detail2 = document.createElement('div')
      detail2.className = "detail_div2";
      div1.appendChild(detail2);

      detail2.innerHTML = `<h2 id="heading">${data.name}</h2>
  <p id="brand">${data.brand}</p>
  <span id="price">Price: Rs <span id="rupi">${data.price}</span></span>
  <p id="description">Description</p>
  <p id="description_detail">${data.description}</p>
  <p id="product">Product Preview</p>`

      var div_tag = document.createElement('div')
      div_tag.className = "pic_style";
      detail2.append(div_tag)
      for (var i = 0; i <= data.photos.length; i++) {
        var img_tag = document.createElement('img');
        img_tag.className = "img_style"
        img_tag.src = data.photos[i];
        div_tag.append(img_tag)

        var img_tag2 = document.getElementsByClassName('img_style')
        // var k=1;
        for (var j = 0; j < img_tag2.length; j++) {
          img_tag2[j].setAttribute("id", "img")

        }

        var m = document.getElementsByClassName('img_style')
        for (var k = 0; k < m.length; k++) {
          if (k == 0) {
            m[k].classList.add("active");

          }
          m[k].onclick = function () {
            // img_tag.style=this.style.border="2px solid greeen";
            img_tag1.src = this.src;
            if (img_tag1.src == "undefined") {
              var d = document.getElementById('img')
              img_tag1.style.display = none;
            }
            var y = document.getElementsByClassName("active");
            if (y.length != 0) {
              y[0].className = "";
            }
            this.className = " active";

          }
        }
      }

      var x = document.getElementById('btn');

      detail2.append(x)
      var myCartCount = localStorage.getItem('quantity');

      var itemsInCart = 0;
      var totalPrice;
      $("#btn").on("click", function () {

        myCartCount++;
        itemsInCart++;

        var oneProductCount;
        miniCart.innerText = myCartCount;
        var productDetails = localStorage.setItem('productDetails', +productId);
        localStorage.setItem('quantity', +myCartCount);
        localStorage.setItem("oneProductCount", itemsInCart);
        var total = localStorage.getItem("oneProductCount");

        var productItems;
        productItems = JSON.parse(localStorage.getItem("productItems") || "[]");
        console.log(productItems.length);
        (function () {
          if (productItems.length < 1) {
            productItems.push(data)
            localStorage.setItem("productItems", JSON.stringify(productItems));
          } else {
            dupFlag = 0;
            for (var i = 0; i < productItems.length; i++) {
              console.log(data.id, productItems[i].id);

              if (parseInt(productItems[i].id) == parseInt(data.id)) {
                dupFlag = 1;
                console.log("flag")
                break;
              }
            }
          }
          if (dupFlag == 0) {
            ("push data")
            productItems.push(data)
            localStorage.setItem("productItems", JSON.stringify(productItems));
          }

          productItems = JSON.parse(localStorage.getItem("productItems") || "[]");

        })();

      });

    }
  }
}
productData()
