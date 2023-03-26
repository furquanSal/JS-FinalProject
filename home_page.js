
$(document).ready(function(){
  $('.slider').slick({
    infinite: true,
    dots: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: false,
  });
var z=new XMLHttpRequest();
z.open("GET","https://5d76bf96515d1a0014085cf9.mockapi.io/product",true)
z.send()
z.onreadystatechange=function(){
    
    if (this.readyState == 4 && this.status == 200) {

        //  console.log(this.responseText)
         var productList = JSON.parse(this.responseText)
         console.log(productList)
         
         
    
         var cloth_section=document.getElementById('clothing');
         var Acces_section=document.getElementById('Accessories');
         for(var i=0; i<productList.length;i++){
 var card=document.createElement("div");
 card.classList.add("card")
//  var anger=document.createElement('a');
//     anger.href="pdp.html?productId="+product.id;
    // card.append(anger)

 card.innerHTML=`<a href=product_details.html?productId=${productList[i].id}><img src=${productList[i].preview} alt=${productList[i].name}></a>
 <div class="text_section">
 <h2 id="heading">${productList[i].name}</h2>
 <p id="brand">${productList[i].brand}</p>
 <p id="price">Rs ${productList[i].price}</p>
 </div>`
//  var text =document.getElementsByClassName('text_section')
//  card.append(anger,text)
 if(productList[i].isAccessory===true){
     Acces_section.append(card)
    }else{
        cloth_section.append(card)
 }
} 
}
}


}) 