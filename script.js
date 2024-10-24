window.addEventListener('load', function() {
    const presentStudentsList = document.getElementById('presentStudents');
    const scanningStatus = document.getElementById('scanning-status');

    function markAttendance(studentName) {
        let li = document.createElement('li');
        li.textContent = studentName;
        presentStudentsList.appendChild(li);
    }

    // QR code scanner initialization
    const html5QrCode = new Html5Qrcode("qr-reader");

    function onScanSuccess(decodedText) {
        console.log("Scan success:", decodedText);
        scanningStatus.textContent = `QR Code Scanned: ${decodedText}`;
        markAttendance(decodedText);
        html5QrCode.stop().catch((err) => {
            console.log("Error stopping scanner: ", err);
        });
    }

    function onScanError(errorMessage) {
        console.log("Scan error:", errorMessage);
        scanningStatus.textContent = `Scanning Error: ${errorMessage}`;
    }

    // Start QR code scanning with camera
    html5QrCode.start({ facingMode: "environment" }, {
        fps: 10,
        qrbox: 250
    }).then(() => {
        console.log("QR Code scanner started");
        scanningStatus.textContent = "Camera is ready. Waiting for QR Code...";
    }).catch(err => {
        scanningStatus.textContent = `Unable to start scanning: ${err}`;
        console.log("Camera start error: ", err);
    });
});
