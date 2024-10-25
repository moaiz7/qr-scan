function onScanSuccess(decodedText, decodedResult) {
  // Handle the scanned result here
  document.getElementById('qr-reader-results').innerText = `Scanned: ${decodedText}`;
}

function onScanFailure(error) {
  // Handle scan failure
  console.warn(`QR code scan failed: ${error}`);
}

// Initialize the QR code scanner
let qrCodeScanner = new Html5Qrcode("qr-reader");
qrCodeScanner.start(
  { facingMode: "environment" }, // Use the back camera
  {
    fps: 10, // Frames per second
    qrbox: { width: 250, height: 250 } // Scanner box size
  },
  onScanSuccess,
  onScanFailure
);
