        function injectModalHTML() {
            const modalHTML = `
                <div id="tripletise-modal" class="tripletise-modal" style="display: none;">
                    <div class="tripletise-modal-content">
                        <div class="tripletise-modal-body">
                            <span class="tripletise-close-btn" style="cursor: pointer; position: absolute; top: 20px; right: 20px; color: black;">
                                <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#000">
                                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                                </svg>
                            </span>
                            <span id="tripletise-chevron-left" style="cursor: pointer; position: absolute; top: 15px; left: 15px; color: black; display: none;">
                                <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#000">
                                    <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/>
                                </svg>
                            </span>
                            <iframe id="tripletise-iframe-src" src="" height="100%" width="100%" title="TripleDesign" allow="camera; accelerometer; gyroscope; xr-spatial-tracking; fullscreen"></iframe>
                        </div>
                    </div>
                </div>
                <style>
                    body.tripletise-modal-open {
                        overflow: hidden;
                    }
                    .tripletise-modal {
                        position: fixed;
                        z-index: 9999;
                        left: 0;
                        top: 0;
                        width: 100%;
                        height: 100%;
                        overflow: hidden; /* Prevent scrolling */
                        background-color: rgba(0, 0, 0, 0.7);
                        margin: 0;
                    }
                    .tripletise-modal-content {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-color: white;
                        overflow: hidden;
                        display: flex;
                        flex-direction: column;
                        margin: 0;
                        border-radius: 0;
                    }
                    .tripletise-modal-body {
                        flex-grow: 1;
                        position: relative;
                        padding: 0;
                    }
                </style>
            `;
            document.body.insertAdjacentHTML('beforeend', modalHTML);
        }
    
        function adjustModalMargins() {
            const modalContent = document.querySelector('.tripletise-modal-content');
            const chevronLeft = document.getElementById('tripletise-chevron-left');
            const closeBtn = document.querySelector('.tripletise-close-btn');
    
            // Adjust margins based on screen orientation
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
    
function tripletiseModal(srcUrl) {
    const urlParts = srcUrl.split('?');
    const baseUrl = urlParts[0];
    const queryParams = new URLSearchParams(urlParts[1] || '');
    const newTabParam = queryParams.get('newtab');

    console.log("newTabParam:", newTabParam); // Debugging
    console.log("Orientation check:", window.innerWidth > window.innerHeight);

    // Check if we need to open in a new tab
    if (newTabParam !== null && window.innerWidth > window.innerHeight) {
        // Construct the full URL with all the query parameters
        const fullUrl = `https://${baseUrl}?${queryParams.toString()}`;
        console.log("Opening in new tab:", fullUrl); // Debugging
        window.open(fullUrl, '_blank');  // Open the link in a new tab with all query params
        return;  // Stop further execution, no modal will be opened
    }

    // Ensure the modal exists in the DOM
    const modal = document.getElementById("tripletise-modal");
    if (!modal) {
        console.error("Modal element with ID 'tripletise-modal' does not exist.");
        return;
    }

    const iframe = document.getElementById("tripletise-iframe-src");
    if (!iframe) {
        console.error("Iframe element with ID 'tripletise-iframe-src' does not exist.");
        return;
    }

    // Open the modal
    if (modal.style.display === "block") {
        return; // Modal is already open
    }

    modal.style.display = "block";
    document.body.classList.add('tripletise-modal-open');
    adjustModalMargins();

    iframe.src = `https://${baseUrl}?${queryParams.toString()}`;

    document.querySelector('.tripletise-close-btn').onclick = () => closeModal();
    window.onclick = (event) => {
        if (event.target === modal) {
            closeModal();
        }
    };
    document.getElementById('tripletise-chevron-left').onclick = () => closeModal();

    function closeModal() {
        modal.style.display = "none";
        document.body.classList.remove('tripletise-modal-open');
        window.onclick = null; // Clean up the event listener
    }
}
    
        function initializeTripleModal() {
            const urlParams = new URLSearchParams(window.location.search);
            const brand = urlParams.get('brand');
            const product = urlParams.get('product');
            const id = urlParams.get('id');
            const fsid = urlParams.get('fsid');
            const data = urlParams.get('data');
    
            if (brand && product) {
                let modalUrl = `${brand}-${product}.web.app`;  // Base URL for the iframe
    
                // Prioritize fsid over data and id
                if (fsid) {
                    modalUrl += `?fsid=${fsid}`;
                } else if (id) {
                    modalUrl += `?id=${id}`;
                } else if (data) {
                    modalUrl += `?data=${data}`;
                }
    
                tripletiseModal(modalUrl);
            }
        }
    
        if (!document.getElementById("tripletise-modal")) {
            injectModalHTML();
            initializeTripleModal();
            window.addEventListener('resize', adjustModalMargins);
        }
