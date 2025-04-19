document.getElementById('formLogin').addEventListener('submit', function(e) {
    e.preventDefault();
  
    // Aquí podrías validar el usuario con base de datos o un JSON (según cómo lo tengas).
    // Simulación:
    const email = document.getElementById('correo').value;
    const password = document.getElementById('clave').value;
  
    if (email && password) {
      // Simular login correcto
      localStorage.setItem('usuarioLogueado', JSON.stringify({ email }));
      alert('Inicio de sesión exitoso');
      window.location.href = 'index.html'; // volver al home
    } else {
      alert('Por favor, completa todos los campos');
    }
  });
  function iniciarSesion() {
    const usuario = document.getElementById('usuario').value;
    const clave = document.getElementById('clave').value;
  
    if (usuario && clave) {
      localStorage.setItem('usuarioLogueado', JSON.stringify({ usuario }));
      alert('Inicio de sesión exitoso!');
      window.location.href = 'index.html';
    } else {
      alert('Por favor ingresa usuario y contraseña');
    }
  }
  // Función para registrar un nuevo usuario
function registrarse() {
    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const telefono = document.getElementById('telefono').value;
    const direccion = document.getElementById('direccion').value;
    const usuario = document.getElementById('usuario').value;
    const clave = document.getElementById('clave').value;
  
    if (nombre && correo && telefono && direccion && usuario && clave) {
      // Crear un objeto con los datos del nuevo usuario
      const nuevoUsuario = {
        nombre,
        correo,
        telefono,
        direccion,
        usuario,
        clave,
      };
  
      // Guardar los datos del usuario en el LocalStorage (puedes usar una base de datos si lo prefieres)
      localStorage.setItem('usuarioRegistrado', JSON.stringify(nuevoUsuario));
  
      // Notificar al usuario y redirigirlo al login
      alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
      window.location.href = 'login.html'; // Redirige a la página de login
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }
  
  // Función para iniciar sesión
  function iniciarSesion() {
    const usuario = document.getElementById('usuario').value;
    const clave = document.getElementById('clave').value;
  
    const usuarioRegistrado = JSON.parse(localStorage.getItem('usuarioRegistrado'));
  
    if (usuario && clave && usuarioRegistrado && usuarioRegistrado.usuario === usuario && usuarioRegistrado.clave === clave) {
      // Guardar la sesión del usuario logueado
      localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioRegistrado));
      alert('Inicio de sesión exitoso!');
      window.location.href = 'index.html';
    } else {
      alert('Usuario o contraseña incorrectos.');
    }
  }
  