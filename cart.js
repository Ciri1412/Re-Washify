// Array to store cart items
let cart = [];

// Function to add item to cart
function addToCart(selectId) {
    const selectElement = document.getElementById(selectId);
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    
    // Get product details
    const itemName = selectedOption.getAttribute('data-name');
    const itemPrice = parseFloat(selectedOption.value); 

    // Check if the item is already in the cart
    const existingItemIndex = cart.findIndex(item => item.name === itemName);

    if (existingItemIndex > -1) {
        // If it exists, increase the quantity
        cart[existingItemIndex].quantity += 1;
    } else {
        // If it's new, add it to the cart with a quantity of 1
        cart.push({
            name: itemName,
            price: itemPrice,
            quantity: 1
        });
    }

    // Update the UI
    renderCart();
}

// Function to display cart items and calculate total
function renderCart() {
    const cartContainer = document.getElementById('cart-items-container');
    const totalPriceElement = document.getElementById('cart-total-price');
    
    // Clear current display
    cartContainer.innerHTML = '';
    
    let total = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p style="color: #777; padding: 1rem 0;">Your cart is empty.</p>';
    } else {
        // Loop through cart array and create HTML
        cart.forEach((item) => {
            // Calculate row total (price * quantity)
            const rowTotal = item.price * item.quantity;
            total += rowTotal;
            
            const itemHTML = `
                <div class="cart-item">
                    <span><strong>${item.quantity}x</strong> ${item.name}</span>
                    <span style="font-weight: bold;">₱${rowTotal.toFixed(2)}</span>
                </div>
            `;
            cartContainer.innerHTML += itemHTML;
        });
    }

    // Update the total price display
    totalPriceElement.innerText = `₱ ${total.toFixed(2)}`;
}

// Checkout Function
function processCheckout() {
    if (cart.length === 0) {
        alert("Your cart is empty. Please add items before checking out.");
        return;
    }
    
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    
    if (paymentMethod === 'cod') {
        alert("Thank you for your order! Your order information will be sent via email.");
        // Clear cart after order
        cart = [];
        renderCart();
    }
}

// --- MODAL POPUP LOGIC ---

// Function to open the image modal
function openModal(imgSrc) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    
    modalImg.src = imgSrc;
    modal.classList.add('show-modal');
}

// Function to close the image modal
function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.remove('show-modal');
}