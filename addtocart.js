document.addEventListener('DOMContentLoaded', function() {
  var addToCartButtons = document.getElementsByClassName('normal');
  if (addToCartButtons.length > 0) {
    for (var i = 0; i < addToCartButtons.length; i++) {
      addToCartButtons[i].addEventListener('click', addToCartClicked);
    }
  }

  function addToCartClicked(event) {
    var button = event.target;
    var productDetails = button.parentElement;
    var productName = productDetails.querySelector('h4').textContent;
    var productPrice = productDetails.querySelector('h2').textContent;
    var productImage = productDetails.parentElement.querySelector('img').getAttribute('src');

    var cartRow = document.createElement('tr');
    cartRow.innerHTML = `
      <td><button class="normal"><i class="far fa-times-circle"></i></button></td>
      <td><img src="${productImage}" alt=""></td>
      <td>${productName}</td>
      <td>${productPrice}</td>
      <td><input type="number" value="1"></td>
      <td>${productPrice}</td>
    `;

    var cartBody = document.querySelector('#cart-body');
    if (cartBody) {
      cartBody.appendChild(cartRow);
      updateCartTotal();
    }
  }

  function updateCartTotal() {
    var cartRows = document.querySelectorAll('#cart-body tr');
    var total = 0;

    cartRows.forEach(function(row) {
      var priceElement = row.querySelector('td:nth-child(4)');
      var quantityElement = row.querySelector('td:nth-child(5) input');

      var price = parseFloat(priceElement.textContent.replace('₱', ''));
      var quantity = parseInt(quantityElement.value);

      total += price * quantity;
    });

    var cartSubtotalElement = document.querySelector('#subtotal table tr:nth-child(1) td:nth-child(2)');
    var cartTotalElement = document.querySelector('#subtotal table tr:nth-child(3) td:nth-child(2)');

    if (cartSubtotalElement && cartTotalElement) {
      cartSubtotalElement.textContent = '₱' + total.toFixed(2);
      cartTotalElement.textContent = '₱' + (total + 75).toFixed(2);
    }
  }
});
