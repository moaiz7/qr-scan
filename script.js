window.onload = function() {
    const qrReader = new Html5Qrcode("qr-reader");

    function onScanSuccess(qrCodeMessage) {
        // Handle the scanned code as you like
        console.log("QR Code Scanned: ", qrCodeMessage);

        // Add the student's name or code to the present students list
        const presentStudentsList = document.getElementById("present-students-list");
        const listItem = document.createElement("li");
        listItem.textContent = qrCodeMessage;
        presentStudentsList.appendChild(listItem);
    }

    function onScanFailure(error) {
        // Handle scan failure, maybe show a message or do nothing
        console.warn(`QR Code Scan failed: ${error}`);
    }

    qrReader.start(
        { facingMode: "environment" }, // Use back camera
        {
            fps: 10, // Scans per second
            qrbox: 250 // QR code scanning box size
        },
        onScanSuccess,
        onScanFailure
    ).catch((err) => {
        console.error(`Unable to start scanning: ${err}`);
    });
};
