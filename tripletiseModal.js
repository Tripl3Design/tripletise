
function injectModalHTML() {
    const modalHTML = `
        <div class="modal fade" id="tripletise-modal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-fullscreen p-0 p-md-3 m-0">
                <div class="modal-content bg-white shadow">
                    <div class="modal-body m-0 p-0 overflow-hidden">
                        ${/iPhone|Android/i.test(navigator.userAgent) ? `
                            <div class="position-absolute top-0 start-0">
                                <button type="button" style="color: #000; font-size: 40px;" class="btn btn-link text-decoration-none m-0 p-0 ms-3 mt-3" data-bs-dismiss="modal" aria-label="close">
                                    <i class="bi-chevron-left"></i>
                                </button>
                            </div>
                        ` : `
                            <div class="position-absolute top-0 end-0">
                                <button type="button" style="color: #000; font-size: 40px;" class="btn btn-link text-decoration-none m-0 p-0 me-4 mt-4" data-bs-dismiss="modal" aria-label="close">
                                    <i class="bi-x"></i>
                                </button>
                            </div>
                        `}
                        <iframe id="iframe-src" src="" height="100%" width="100%" title="TripleDesign"
                            allow="camera; accelerometer; gyroscope; xr-spatial-tracking; fullscreen">
                        </iframe>
                    </div>
                </div>
            </div>
        </div>`;

    // Append modal HTML to the body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Check if Bootstrap is already loaded
if (typeof bootstrap === 'undefined') {
    // Dynamically load Bootstrap CSS
    var link = document.createElement('link');
    link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Dynamically load Bootstrap JS
    var script = document.createElement('script');
                  
    script.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js';
    script.integrity = 'sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz';
    script.crossOrigin = 'anonymous';
    script.onload = function() {
        injectModalHTML();
        initializeTripleModal();
    };
    document.body.appendChild(script);
} else {
    // Bootstrap is already loaded, inject modal and initialize immediately
    injectModalHTML();
    initializeTripleModal();
}

// Function to initialize modal functionality
function initializeTripleModal() {
    window.tripletiseModal = function(srcUrl) { // Make function globally accessible
        document.getElementById("iframe-src").src = 'https://' + srcUrl;
        var tripletiseModal = new bootstrap.Modal(document.getElementById('tripletise-modal'), {
            backdrop: false,
            keyboard: false,
            focus: true
        });
        tripletiseModal.show();
    };

    // Auto open modal if URL parameters are provided
    const urlParams = new URLSearchParams(window.location.search);
    const brand = urlParams.get('brand');
    const product = urlParams.get('product');
    const data = urlParams.get('data');
    if (brand != undefined && product != undefined) {
        tripletiseModal(`${brand}-${product}.web.app?data=${data}`);
    }
}
