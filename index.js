const parroquias = [
  { nombre: "El Sagrario", url: "descubrir.html", modal: "El Sagrario" },
  { nombre: "Sucre", url: "descubrir.html", modal: "Sucre" },
  { nombre: "El Valle", url: "descubrir.html", modal: "El Valle" },
  { nombre: "San Sebastián", url: "descubrir.html", modal: "San Sebastián" },
  { nombre: "Punzara", url: "descubrir.html", modal: "Punzara" },
  { nombre: "Carigan", url: "descubrir.html", modal: "Carigan" },
  { nombre: "Chantaco", url: "descubrir.html", modal: "Chantaco" },
  { nombre: "Chuquiribamba", url: "descubrir.html", modal: "Chuquiribamba" },
  { nombre: "El Cisne", url: "descubrir.html", modal: "El Cisne" },
  { nombre: "Gualel", url: "descubrir.html", modal: "Gualel" },
  { nombre: "Jimbilla", url: "descubrir.html", modal: "Jimbilla" },
  { nombre: "Malacatos", url: "descubrir.html", modal: "Malacatos" },
  { nombre: "Quinara", url: "descubrir.html", modal: "Quinara" },
  { nombre: "San Lucas", url: "descubrir.html", modal: "San Lucas" },
  { nombre: "San Pedro de Vilcabamba", url: "descubrir.html", modal: "San Pedro de Vilcabamba" },
  { nombre: "Santiago", url: "descubrir.html", modal: "Santiago" },
  { nombre: "Taquil", url: "descubrir.html", modal: "Taquil" },
  { nombre: "Vilcabamba", url: "descubrir.html", modal: "Vilcabamba" },
  { nombre: "Yangana", url: "descubrir.html", modal: "Yangana" }
];

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('buscador');
  const lista = document.getElementById('listaparroquias');
  if (input && lista) {
    const ocultarLista = () => lista.classList.add('hidden');
    const mostrarLista = () => lista.classList.remove('hidden');

    const mostrarResultados = (resultados) => {
      lista.innerHTML = '';
      if (resultados.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'No se encontraron lugares.';
        lista.appendChild(li);
        return;
      }
      resultados.forEach(({ nombre, url, modal }) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.textContent = nombre;
        // Agrega el parámetro ?parroquia=Nombre
        a.href = `${url}?parroquia=${encodeURIComponent(modal)}`;
        a.style.textDecoration = 'none';
        a.style.color = 'inherit';
        li.appendChild(a);
        lista.appendChild(li);
      });
    };

    input.addEventListener('input', () => {
      const texto = input.value.trim().toLowerCase();
      if (texto === '') {
        ocultarLista();
        lista.innerHTML = '';
        return;
      }
      const resultados = parroquias.filter(p =>
        p.nombre.toLowerCase().includes(texto)
      );
      mostrarResultados(resultados);
      mostrarLista();
    });

    input.addEventListener('focus', () => {
      if (input.value.trim() !== '') mostrarLista();
    });

    document.addEventListener('click', (e) => {
      if (!input.contains(e.target) && !lista.contains(e.target)) {
        ocultarLista();
      }
    });
  }
});


let slideIndex = 0;
const slides = document.querySelectorAll('.carrusel-slide');
const nextBtn = document.getElementById('nextCarrusel');
const prevBtn = document.getElementById('prevCarrusel');

function showSlide(n) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === n);
  });
}
function nextSlide() {
  slideIndex = (slideIndex + 1) % slides.length;
  showSlide(slideIndex);
}
function prevSlide() {
  slideIndex = (slideIndex - 1 + slides.length) % slides.length;
  showSlide(slideIndex);
}
if (nextBtn && prevBtn) {
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);
}
setInterval(nextSlide, 5000);

function revealOnScroll() {
  document.querySelectorAll('.fade-scroll').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      el.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('DOMContentLoaded', revealOnScroll);


document.addEventListener("DOMContentLoaded", function () {
  actualizarEstadoBoton();
});
function actualizarEstadoBoton() {
  const permiso = Notification.permission;
  const texto = document.getElementById("textoNotificacion");
  const icono = document.getElementById("iconoNotificacion");
  if (permiso === "granted") {
    texto.textContent = "Bloquear notificaciones";
    icono.textContent = "notifications_active";
  } else {
    texto.textContent = "Activar notificaciones";
    icono.textContent = "notification_important";
  }
}
function gestionarNotificaciones() {
  const permiso = Notification.permission;
  if (permiso === "default") {

    Notification.requestPermission().then(function (permisoNuevo) {
      if (permisoNuevo === "granted") {
        new Notification("Notificaciones activadas", {
          body: "Recibirás alertas importantes del sitio.",
          icon: "https://cdn-icons-png.flaticon.com/512/1827/1827392.png"
        });
      }
      actualizarEstadoBoton();
    });
  } else if (permiso === "granted") {
    alert("No es posible desactivar las notificaciones desde aquí. Por favor, hazlo desde la configuración del navegador.");
  } else if (permiso === "denied") {
    alert("Has bloqueado las notificaciones. Para volver a activarlas, cambia los permisos en tu navegador.");
  }
}