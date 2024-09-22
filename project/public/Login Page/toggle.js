// toggle.js

// Toggling between patient and doctor forms without page reload
const patientToggle = document.getElementById('patientToggle');
const doctorToggle = document.getElementById('doctorToggle');

if (patientToggle) {
    patientToggle.addEventListener('click', () => {
        window.location.href = '/project/public/Login Page/Patient/patient.html';
    });
}

if (doctorToggle) {
    doctorToggle.addEventListener('click', () => {
        window.location.href = '/project/public/Login Page/Doctor/doctor.html';
    });
}
