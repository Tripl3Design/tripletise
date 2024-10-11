function injectModalHTML() {
    const modalHTML = `
        <div id="tripletise-modal" class="modal" style="display: none;">
            <div class="modal-content">
                <div class="modal-body">
                    <span class="close-btn" style="cursor: pointer; position: absolute; top: 20px; right: 20px; color: black;">
                        <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#000">
                            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                        </svg>
                    </span>
                    <span id="chevron-left" style="cursor: pointer; position: absolute; top: 15px; left: 15px; color: black; display: none;">
                        <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#000">
                            <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/>
                        </svg>
                    </span>
                    <iframe id="iframe-src" src="" height="100%" width="100%" title="TripleDesign" allow="camera; accelerometer; gyroscope; xr-spatial-tracking; fullscreen"></iframe>
                </div>
            </div>
        </div>
        <style>
            /* Prevent body scrolling when modal is open */
            body.modal-open {
                overflow: hidden; /* Prevent scrolling */
            }

            .modal {
                position: fixed;
                z-index: 9999; /* High z-index to overlay other elements */
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                overflow: hidden; /* Prevent scrolling */
                background-color: rgba(0, 0, 0, 0.7); /* Semi-transparent background */
            }
            .modal-content {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: white;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                margin: 0; /* Default no margin */
                border-radius: 0; /* No rounded corners */
            }
            .modal-body {
                flex-grow: 1; /* Allow the body to fill available space */
                margin: 0;
                padding: 0;
                position: relative; /* Position relative for close button */
            }
        </style>
    `;

    // Append modal HTML to the body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Function to adjust modal margins and chevron visibility based on screen dimensions
function adjustModalMargins() {
    const modalContent = document.querySelector('.modal-content');
    const chevronLeft = document.getElementById('chevron-left');
    const closeBtn = document.querySelector('.close-btn');

    if (window.innerHeight > window.innerWidth) {
        // Screen is taller than it is wide (no margin, show chevron)
        modalContent.style.margin = '0';
        modalContent.style.width = '100%';  // Ensure it takes full width
        modalContent.style.height = '100%'; // Ensure it takes full height
        chevronLeft.style.display = 'block'; // Show chevron
        closeBtn.style.display = 'none'; // Hide close button
    } else {
        // Screen is wider than it is tall (apply margin, hide chevron)
        modalContent.style.margin = '20px'; // Margin around modal
        modalContent.style.width = 'calc(100% - 40px)'; // Adjust width for margins
        modalContent.style.height = 'calc(100% - 40px)'; // Adjust height for margins
        chevronLeft.style.display = 'none'; // Hide chevron
        closeBtn.style.display = 'block'; // Show close button
    }
}

// Initialize modal functionality
function initializeTripleModal() {
    window.tripletiseModal = function(srcUrl) {
        const modal = document.getElementById("tripletise-modal");
        document.getElementById("iframe-src").src = 'https://' + srcUrl;

        modal.style.display = "block";
        document.body.classList.add('modal-open'); // Prevent body scroll
        adjustModalMargins(); // Adjust margins based on screen size

        // Close the modal when the close button is clicked
        document.querySelector('.close-btn').onclick = function() {
            modal.style.display = "none";
            document.body.classList.remove('modal-open'); // Re-enable body scroll
        };

        // Close the modal when clicking outside of the modal content
        window.onclick = function(event) {
            if (event.target === modal) {
                modal.style.display = "none";
                document.body.classList.remove('modal-open'); // Re-enable body scroll
            }
        };

        // Close modal when chevron is clicked
        document.getElementById('chevron-left').onclick = function() {
            modal.style.display = "none";
            document.body.classList.remove('modal-open'); // Re-enable body scroll
        };
    };

    // Auto open modal if URL parameters are provided
    const urlParamsTripleTise = new URLSearchParams(window.location.search);
    const brand = urlParamsTripleTise.get('brand');
    const product = urlParamsTripleTise.get('product');
    const data = urlParamsTripleTise.get('data');
    if (brand !== null && product !== null) {
        tripletiseModal(`${brand}-${product}.web.app?data=${data}`);
    }
}

// Check if modal is already loaded
if (!document.getElementById("tripletise-modal")) {
    injectModalHTML();
    initializeTripleModal();
}

// Listen for window resize events to adjust modal margins dynamically
window.addEventListener('resize', adjustModalMargins);