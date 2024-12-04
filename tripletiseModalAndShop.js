(function() {
    const sidebarHtml = `
    <div id="sidebar" class="sidebar">
        <div class="sidebar-content">
            <!-- Titelbalk met "Winkelwagen" en chevron-sluitknop -->
            <div class="sidebar-header">
                <h2>Winkelwagen</h2>
                <button id="close-sidebar" class="close-button">
                    <span>&#8250;</span>
                </button>
            </div>

            <!-- Winkelwagenitems lijst -->
            <div id="cart-items">
                <!-- Winkelwagen inhoud wordt hier dynamisch toegevoegd -->
            </div>

            <!-- NAW-gegevens formulier (verborgen bij start) -->
            <div id="checkout-form" style="display: none;">
                <h3>Aflevergegevens</h3>
                <label>Naam:</label>
                <input type="text" id="name" required>
                <label>Adres:</label>
                <input type="text" id="address" required>
                <label>Woonplaats:</label>
                <input type="text" id="city" required>
                <button id="place-order-button">Bestellen en betalen</button>
            </div>

            <!-- Actieknoppen -->
            <div class="sidebar-actions">
                <button id="continue-shopping">Verder winkelen</button>
                <button id="checkout-button">Ik ga bestellen</button>
            </div>
        </div>
    </div>
    `;

    // Voeg de HTML aan de body van de klantpagina toe
    document.body.insertAdjacentHTML('beforeend', sidebarHtml);

    let cartItems = [];
    const deliveryFee = 50;

    function showSidebar() {
        const sidebar = document.getElementById('sidebar');
        sidebar.style.display = 'block';
        setTimeout(() => {
            sidebar.style.right = '0px';
        }, 10);
    }

    function closeSidebar() {
        const sidebar = document.getElementById('sidebar');
        sidebar.style.right = '-800px';
        setTimeout(() => {
            sidebar.style.display = 'none';
        }, 300);
    }

    document.getElementById('close-sidebar').addEventListener('click', closeSidebar);
    document.getElementById('continue-shopping').addEventListener('click', closeSidebar);

    // Toon het checkout-formulier
    document.getElementById('checkout-button').addEventListener('click', () => {
        document.getElementById('cart-items').style.display = 'none';
        document.getElementById('checkout-form').style.display = 'block';
        document.getElementById('checkout-button').style.display = 'none';
    });

    // NAW-gegevens invullen en doorgaan naar betaling met Mollie
    document.getElementById('place-order-button').addEventListener('click', () => {
        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const city = document.getElementById('city').value;

        if (!name || !address || !city) {
            alert("Vul alstublieft alle velden in.");
            return;
        }

        const totalPrice = cartItems.reduce((total, item) => total + item.price, 0) + deliveryFee;
        console.log("Betaling starten met Mollie voor totaalbedrag:", totalPrice);

        connectMollie(totalPrice, "Winkelwagen Aankoop", { name, address, city });
    });

    function updateCart() {
        const cartItemsContainer = document.getElementById('cart-items');
        cartItemsContainer.innerHTML = '';

        let cartTotal = 0; // To calculate total items price

        cartItems.forEach((item, index) => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');

            const imageUrl = item.imageUrl || 'path/to/default-image.jpg';

            cartItemElement.innerHTML = `
                <img src="${imageUrl}" alt="${item.name}" />
                <span class="product-name">${item.name}</span>
                <span class="product-price">€ ${item.price.toFixed(2).replace('.', ',')}</span>
                <button class="delete-item-button" style="border: none; background: transparent;" data-index="${index}">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                    </svg>
                </button>
            `;

            cartItemsContainer.appendChild(cartItemElement);
            cartTotal += item.price; // Accumulate the total price of items
        });

        // Display delivery fee and total
        const cartSummaryElement = document.createElement('div');
        cartSummaryElement.classList.add('cart-summary');
        const totalWithDelivery = cartTotal + deliveryFee;

        cartSummaryElement.innerHTML = `
            <div class="summary-item">
                <span>Bezorgkosten:</span>
                <span>€ ${deliveryFee.toFixed(2).replace('.', ',')}</span>
            </div>
            <div class="summary-item">
                <strong>Totaal:</strong>
                <strong>€${totalWithDelivery.toFixed(2).replace('.', ',')}</strong>
            </div>
        `;

        cartItemsContainer.appendChild(cartSummaryElement);

        // Add event listeners to the delete buttons
        document.querySelectorAll('.delete-item-button').forEach(button => {
            button.addEventListener('click', deleteCartItem);
        });
    }

    function deleteCartItem(event) {
        const itemIndex = event.target.getAttribute('data-index');
        cartItems.splice(itemIndex, 1);
        updateCart();
    }

    function connectMollie(amount, description) {
        fetch("https://us-central1-vanwoerdenwonen-tripletise.cloudfunctions.net/mollieAuthRedirect", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ amount: amount, description: description })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Received data:", data);
            const paymentUrl = data.paymentUrl;

            if (paymentUrl) {
                window.location.href = paymentUrl;
            } else {
                console.error("No payment URL returned.");
            }
        })
        .catch(error => {
            console.error("Er ging iets mis:", error);
        });
    }

    window.addEventListener('message', (event) => {
        if (event.data.action === 'addToCart') {
            const product = event.data.product;
            cartItems.push(product);
            updateCart();
        }
        if (event.data.action === 'showSidebar') {
            showSidebar();
        }
        if (event.data.action === 'showCheckoutButton') {
            showCheckoutButton();
        }
    });

    document.getElementById('checkout-button').addEventListener('click', () => {
        const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
        console.log("Betaling starten met Mollie voor totaalbedrag:", totalPrice);

        connectMollie(totalPrice, "Winkelwagen Aankoop");
    });

    updateCart();
})();
