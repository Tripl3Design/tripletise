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
            body.modal-open {
                overflow: hidden;
            }
            .modal {
                position: fixed;
                z-index: 9999;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                overflow: hidden; /* Prevent scrolling */
                background-color: rgba(0, 0, 0, 0.7);
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
                flex-grow: 1;
                position: relative;
            }
        </style>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function adjustModalMargins() {
    const modalContent = document.querySelector('.modal-content');
    const chevronLeft = document.getElementById('chevron-left');
    const closeBtn = document.querySelector('.close-btn');

    if (window.innerHeight > window.innerWidth) {
        modalContent.style.margin = '0';
        modalContent.style.width = '100%';
        modalContent.style.height = '100%';
        chevronLeft.style.display = 'block';
        closeBtn.style.display = 'none';
    } else {
        modalContent.style.margin = '20px';
        modalContent.style.width = 'calc(100% - 40px)';
        modalContent.style.height = 'calc(100% - 40px)';
        chevronLeft.style.display = 'none';
        closeBtn.style.display = 'block';
    }
}

// PostMessage function to send data to iframe
function sendMessageToIframe(srcUrl) {
    const iframe = document.getElementById("iframe-src");
    iframe.src = `https://${srcUrl}`;

    // Construct message object (you can add more parameters as needed)
    const message = {
        brand: new URLSearchParams(window.location.search).get('brand'),
        product: new URLSearchParams(window.location.search).get('product'),
        data: new URLSearchParams(window.location.search).get('data')
    };

    // Wait for iframe to load before sending the message
    iframe.onload = () => {
        iframe.contentWindow.postMessage(message, `https://${srcUrl}`);
    };
}

function initializeTripleModal() {
    window.tripletiseModal = function (srcUrl) {
        const modal = document.getElementById("tripletise-modal");
        modal.style.display = "block";
        document.body.classList.add('modal-open');
        adjustModalMargins();

        sendMessageToIframe(srcUrl);

        // Close button functionality
        document.querySelector('.close-btn').onclick = () => {
            modal.style.display = "none";
            document.body.classList.remove('modal-open');
        };

        // Close modal when clicking outside the content
        window.onclick = (event) => {
            if (event.target === modal) {
                modal.style.display = "none";
                document.body.classList.remove('modal-open');
            }
        };

        // Chevron close
        document.getElementById('chevron-left').onclick = () => {
            modal.style.display = "none";
            document.body.classList.remove('modal-open');
        };
    };

    // Automatically open modal if URL parameters are present
    const urlParams = new URLSearchParams(window.location.search);
    const brand = urlParams.get('brand');
    const product = urlParams.get('product');
    const id = urlParams.get('id');
    const fsid = urlParams.get('fsid');
    const data = urlParams.get('data');

    if (brand && product) {
        let modalUrl = `${brand}-${product}.web.app`;  // Base URL for the iframe

        // Prioritize fsid over data and id, then check for id or data
        if (fsid) {
            modalUrl += `?fsid=${fsid}`;
        } else if (id) {
            modalUrl += `?id=${id}`;
        } else if (data) {
            modalUrl += `?data=${data}`;
        }

        // Open the modal with the constructed URL
        tripletiseModal(modalUrl);
    }
}

// Initialize modal and listen for resize events
if (!document.getElementById("tripletise-modal")) {
    injectModalHTML();
    initializeTripleModal();
    window.addEventListener('resize', adjustModalMargins);
}
