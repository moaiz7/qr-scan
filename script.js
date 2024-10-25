// Load the html5-qrcode library and set up the QR code scanner
window.addEventListener('load', function() {
    const presentStudentsList = document.getElementById('presentStudents');
    const scanningStatus = document.getElementById('scanning-status');

    // Function to add student to the attendance list
    function markAttendance(studentName) {
        let li = document.createElement('li');
        li.textContent = studentName;
        presentStudentsList.appendChild(li);
    }

    // Initialize the QR code reader
    const html5QrCode = new Html5Qrcode("qr-reader");

    // Function to handle QR code scan
    function onScanSuccess(decodedText, decodedResult) {
        scanningStatus.textContent = `QR Code Scanned: ${decodedText}`;
        
        // Mark the student as present
        markAttendance(decodedText);

        // Optionally, stop the scanner after successful scan
        html5QrCode.stop().then((ignore) => {
            scanningStatus.textContent = "QR Code scanning stopped.";
        }).catch((err) => {
            scanningStatus.textContent = `Error stopping scanner: ${err}`;
        });
    }

    // Function to handle scan error
    function onScanError(errorMessage) {
        scanningStatus.textContent = `Error: ${errorMessage}`;
    }

    // Start scanning for QR codes using the webcam
    html5QrCode.start(
        { facingMode: "environment" }, // Use back camera if available
        {
            fps: 10,    // 10 frames per second
            qrbox: 250  // Set scanning box to 250px width
        },
        onScanSuccess,
        onScanError
    ).catch(err => {
        scanningStatus.textContent = `Unable to start scanning: ${err}`;
    });
});
