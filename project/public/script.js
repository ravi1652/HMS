const emailBtn = document.getElementById('emailBtn');
const phoneBtn = document.getElementById('phoneBtn');
const emailLogin = document.getElementById('emailLogin');
const phoneLogin = document.getElementById('phoneLogin');
const loginTitle = document.getElementById('loginTitle');

emailBtn.addEventListener('click', function() {
    emailLogin.style.display = 'block';
    phoneLogin.style.display = 'none';
    emailBtn.classList.add('active');
    phoneBtn.classList.remove('active');
});

phoneBtn.addEventListener('click', function() {
    emailLogin.style.display = 'none';
    phoneLogin.style.display = 'block';
    phoneBtn.classList.add('active');
    emailBtn.classList.remove('active');
});

function setLoginType(type) {
    loginTitle.textContent = type === 'patient' ? 'PATIENT LOGIN' : 'DOCTOR LOGIN';
}
function setLoginType(type) {
    loginTitle.textContent = type === 'doctor' ? 'DOCTOR LOGIN' : 'PATIENT LOGIN';
}

// Call this function to set the type of login when the page loads
 // or 

