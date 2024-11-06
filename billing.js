document.addEventListener("DOMContentLoaded", function () {
  const billingCartItems = document.getElementById("billing-cart-items");
  const billingTotalPrice = document.getElementById("billing-total-price");

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = cart.reduce((sum, item) => sum + item.price, 0);

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.title} - $${item.price.toFixed(2)}`;
    // const removeButton = document.createElement('button');
    // removeButton.textContent = 'Remove';
    // removeButton.onclick = () => removeFromBillingCart(index);
    // li.appendChild(removeButton);
    billingCartItems.appendChild(li);
  });

  billingTotalPrice.textContent = `Total: $${total.toFixed(2)}`;
});

document.getElementById("redirectButton").onclick = function () {
  window.location.href = "image.png";
};

function removeFromBillingCart(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  total -= cart[index].price;
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}
