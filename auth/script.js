// ==========================================
// 1. CAMBIO DE SECCIONES (Registro/Login)
// ==========================================
const linkToLogin = document.getElementById('already-have-account');
const linkToRegister = document.getElementById('not-have-account');
const sectionRegister = document.getElementById('form-register');
const sectionLogin = document.getElementById('form-login');

linkToRegister.addEventListener('click', (e) => {
    e.preventDefault();
    sectionLogin.classList.add('hidden');
    sectionRegister.classList.remove('hidden');
});

linkToLogin.addEventListener('click', (e) => {
    e.preventDefault();
    sectionRegister.classList.add('hidden');
    sectionLogin.classList.remove('hidden');
});


// ==========================================
// 2. SISTEMA DE REGISTRO (Base de datos local con el sistema de almacenamiento local del navegador, en pocas palabras, un "localStorage")
// ==========================================
document.getElementById('register-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const prefijoCorreo = document.querySelector('#form-register #email').value.trim();
    const selectDominio = document.querySelector('#form-register #domain');
    const dominio = selectDominio.options[selectDominio.selectedIndex].text;
    const password = document.querySelector('#form-register #password').value;
    const confirmPassword = document.querySelector('#form-register #confirm-password').value;

    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden. Inténtalo de nuevo.");
        return;
    }

    if (prefijoCorreo === "") {
        alert("Por favor, ingresa tu correo.");
        return;
    }

    const correoCompleto = prefijoCorreo + dominio;
    localStorage.setItem(correoCompleto, password);

    alert("¡Cuenta creada con éxito! Ya puedes iniciar sesión.");
    document.getElementById('register-form').reset();
    sectionRegister.classList.add('hidden');
    sectionLogin.classList.remove('hidden');
});


// ==========================================
// 3. SISTEMA DE VERIFICACIÓN DE LOGIN (Valida cuentas)
// ==========================================
document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const inputIngresado = document.querySelector('#form-login #email').value.trim();
    const passwordIngresado = document.querySelector('#form-login #password').value;
    const selectDominio = document.querySelector('#form-login #domain');
    const dominio = selectDominio.options[selectDominio.selectedIndex].text;

    // CASO 1: Acceso rápido del Admin
    if (inputIngresado === 'Admin' && passwordIngresado === '12345') {
        window.location.href = '../Dashboard/index.html';
        return;
    }

    // CASO 2: Acceso de Estudiantes con Correo completo (@alumnos.sip.cl)
    const correoCompleto = inputIngresado + dominio;
    const passwordGuardada = localStorage.getItem(correoCompleto);

    if (passwordGuardada) {
        if (passwordGuardada === passwordIngresado) {
            window.location.href = '../landing/index.html';
        } else {
            alert("Contraseña incorrecta.");
            document.querySelector('#form-login #password').value = '';
        }
    } else {
        alert("No existe una cuenta registrada con este correo. ¡Ve a '¿No tienes una cuenta?' para registrarte!");
    }
});