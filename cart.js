// cart.js

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
  } else {
    ready();
  }
  
  function ready() {
    var removeCartItemButtons = document.getElementsByClassName('normal');
    console.log(removeCartItemButtons);
  
    for (var i = 0; i < removeCartItemButtons.length; i++) {
      var button = removeCartItemButtons[i];
      button.addEventListener('click', removeCartItem);
    }
  
    var quantityInputs = document.querySelectorAll('#cart-body input[type="number"]');
    for (var j = 0; j < quantityInputs.length; j++) {
      var input = quantityInputs[j];
      input.addEventListener('change', updateQuantity);
    }
  }
  
  function removeCartItem(event) {
    var buttonClicked = event.target;
    var row = buttonClicked.closest('tr');
    row.remove();
    updateTotal();
  }
  
  var removeCartItemButtons = document.getElementsByClassName('normal');
  console.log(removeCartItemButtons);
  
  for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    button.addEventListener('click', function(event) {
      var buttonClicked = event.target;
      var row = buttonClicked.closest('tr');
      row.remove();
  
      // Update the total
      updateTotal();
    });
  }
  
  function updateTotal() {
    var cartRows = document.querySelectorAll('#cart-body tr');
    var subtotal = 0;
  
    for (var i = 0; i < cartRows.length; i++) {
      var row = cartRows[i];
      var priceElement = row.querySelector('td:nth-child(4)');
      var quantityElement = row.querySelector('td:nth-child(5) input');
      var price = parseFloat(priceElement.textContent.replace(/₱/g, ''));
      var quantity = quantityElement.value;
      var rowSubtotal = price * quantity;
      subtotal += rowSubtotal;
    }
  
    var shippingFee = subtotal > 0 ? (subtotal > 1000 ? 0 : 75) : 0;
    var total = subtotal + shippingFee;
  
    var subtotalElement = document.querySelector('#subtotal tr:first-child td:last-child');
    var shippingElement = document.querySelector('#subtotal tr:nth-child(2) td:last-child');
    var totalElement = document.querySelector('#subtotal tr:last-child td:last-child strong');
  
    subtotalElement.textContent = '₱' + subtotal.toFixed(2);
    shippingElement.textContent = '₱' + shippingFee.toFixed(2);
    totalElement.textContent = '₱' + total.toFixed(2);
  }
  
  function updateQuantity(event) {
    var input = event.target;
    var row = input.closest('tr');
    updateSubtotal(row);
    updateTotal();
  }
  
  function updateSubtotal(row) {
    var priceElement = row.querySelector('td:nth-child(4)');
    var quantityElement = row.querySelector('td:nth-child(5) input');
    var subtotalElement = row.querySelector('td:nth-child(6)');
  
    var price = parseFloat(priceElement.textContent.replace(/₱/g, ''));
    var quantity = quantityElement.value;
    var subtotal = price * quantity;
  
    subtotalElement.textContent = '₱' + subtotal.toFixed(2);
  }
  
  // Call ready initially to set up event listeners
  ready();


  