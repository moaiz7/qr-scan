// Initialize the QR code scanner
function onScanSuccess(decodedText, decodedResult) {
    // Handle on success condition with the decoded text or result.
    console.log(`Code matched = ${decodedText}`, decodedResult);

    // Display the scanned result
    const presentStudentsList = document.getElementById('present-students-list');
    const listItem = document.createElement('li');
    listItem.innerText = decodedText;
    presentStudentsList.appendChild(listItem);
}

function onScanFailure(error) {
    // Handle scan failure, typically better to ignore and keep scanning.
    console.warn(`QR Code scan error = ${error}`);
}

let html5QrCode = new Html5Qrcode("qr-reader");

// Start scanning when the page loads
html5QrCode.start(
    { facingMode: "environment" }, // Use rear camera if available
    {
        fps: 10,    // Frames per second to scan
        qrbox: 250  // Size of the scanning box (in pixels)
    },
    onScanSuccess,
    onScanFailure
).catch((err) => {
    // Start failed, handle it
    console.error(`Unable to start the QR code scanner. Error: ${err}`);
});
