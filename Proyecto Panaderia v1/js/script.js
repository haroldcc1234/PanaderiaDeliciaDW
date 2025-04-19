document.addEventListener("DOMContentLoaded", function () {
  const botones = document.querySelectorAll('.tabs button');
  const items = document.querySelectorAll('.gallery .item');

  botones.forEach(boton => {
    boton.addEventListener('click', () => {
      const categoria = boton.dataset.categoria.toLowerCase();

      botones.forEach(b => b.classList.remove('active'));
      boton.classList.add('active');

      items.forEach(item => {
        if (categoria === 'todos' || item.classList.contains(categoria)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
});

const carrito = [];

// Función para agregar un producto al carrito
function agregarProductoDesdeModal() {
  const select = document.getElementById('productoAdicional');
  const valor = select.value;
  if (!valor) return;

  const [nombre, precio] = valor.split('|');
  agregarAlCarrito(nombre, parseFloat(precio));
}

// Función para agregar al carrito
function agregarAlCarrito(nombre, precio) {
  const existente = carrito.find(p => p.nombre === nombre);
  if (existente) {
    existente.cantidad++;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }
  actualizarCarrito();
}

// Actualiza la tabla del carrito y el total
function actualizarCarrito() {
  const tabla = document.getElementById('tabla-carrito');
  const total = document.getElementById('total-carrito');
  tabla.innerHTML = '';
  let suma = 0;

  carrito.forEach((item, index) => {
    const subtotal = item.precio * item.cantidad;
    suma += subtotal;

    tabla.innerHTML += `
        <tr>
          <td>${item.nombre}</td>
          <td>S/${item.precio.toFixed(2)}</td>
          <td>${item.cantidad}</td>
          <td>S/${subtotal.toFixed(2)}</td>
          <td><button class="btn btn-danger btn-sm" onclick="eliminarDelCarrito(${index})">Eliminar</button></td>
        </tr>
      `;
  });

  total.textContent = `S/ ${suma.toFixed(2)}`;
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

// Función para vaciar el carrito
function vaciarCarrito() {
  carrito.length = 0;
  actualizarCarrito();
}

// Función para confirmar la compra
function confirmarCompra() {
  const usuario = JSON.parse(localStorage.getItem('usuarioLogueado'));

  if (!usuario) {
    alert('⚠️ Debes iniciar sesión o registrarte para finalizar la compra.');
    window.location.href = 'login.html';
    return;
  }

  alert('✅ Compra finalizada con éxito. ¡Gracias por tu pedido!');

  // Vaciar el carrito después de la compra
  vaciarCarrito();

  // Cerrar el modal automáticamente
  const modal = bootstrap.Modal.getInstance(document.getElementById('carritoModal'));
  modal.hide(); // Cierra el modal

  // También puedes resetear el formulario si lo necesitas
  document.getElementById('formulario-cliente').reset();
}

// Evento para agregar producto adicional al carrito
document.getElementById('agregarProductoBtn').addEventListener('click', agregarProductoDesdeModal);

// Mostrar el formulario de tarjeta si se selecciona tarjeta de crédito/débito
function mostrarFormularioTarjeta() {
  const metodoPago = document.getElementById('metodoPago').value;
  const formularioTarjeta = document.getElementById('formulario-tarjeta');
  if (metodoPago === 'tarjeta') {
    formularioTarjeta.style.display = 'block';
  } else {
    formularioTarjeta.style.display = 'none';
  }
}

// Inicializar eventos para cada producto
const botonesAgregar = document.querySelectorAll('.button-agregar');
botonesAgregar.forEach(boton => {
  boton.addEventListener('click', function () {
    const nombre = boton.getAttribute('data-nombre');
    const precio = boton.getAttribute('data-precio');
    agregarAlCarrito(nombre, parseFloat(precio));
  });
});

// Función para alternar entre modo oscuro y claro
function toggleModoOscuro() {
  const body = document.body;
  const btn = document.getElementById('modoOscuroBtn');
  
  // Alternar clase 'modo-oscuro' en el body
  body.classList.toggle('modo-oscuro');
  
  // Cambiar el icono del botón dependiendo del estado
  if (body.classList.contains('modo-oscuro')) {
    btn.innerHTML = '🌞';  // Modo claro
  } else {
    btn.innerHTML = '🌙';  // Modo oscuro
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const usuario = JSON.parse(localStorage.getItem('usuarioLogueado'));
  if (usuario) {
    document.getElementById('usuarioInfo').textContent = `Hola, ${usuario.email}`;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const usuario = JSON.parse(localStorage.getItem('usuarioLogueado'));

  if (usuario) {
    document.querySelector('.btn-outline-primary').style.display = 'none';
    document.querySelector('.btn-outline-success').style.display = 'none';
    document.getElementById('saludoUsuario').textContent = `Hola, ${usuario.usuario}`;

    const cerrarBtn = document.createElement('button');
    cerrarBtn.textContent = 'Cerrar sesión';
    cerrarBtn.className = 'btn btn-danger ms-2';
    cerrarBtn.onclick = cerrarSesion;
    document.querySelector('.d-flex.gap-2').appendChild(cerrarBtn);
  }
});

function cerrarSesion() {
  localStorage.removeItem('usuarioLogueado');
  alert('👋 Sesión cerrada');
  window.location.reload();
}

// Verificar login antes de finalizar compra
function confirmarCompra() {
  const usuario = JSON.parse(localStorage.getItem('usuarioLogueado'));
  if (!usuario) {
    alert('⚠️ Debes iniciar sesión o registrarte para finalizar la compra.');
    window.location.href = 'login.html';
    return;
  }

  alert('✅ Compra finalizada con éxito. ¡Gracias por tu pedido!');
  // Aquí puedes agregar lógica para vaciar carrito
  vaciarCarrito(); // Vacía el carrito si lo deseas
  // También puedes cerrar el modal, si usas Bootstrap 5
  const modal = bootstrap.Modal.getInstance(document.getElementById('carritoModal'));
  modal.hide(); // Cierra el modal
}
