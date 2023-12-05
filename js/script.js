if (document.querySelector(".gallery__item")) {

	const container = document.querySelector(".container");

	const galleryItem = document.querySelectorAll(".gallery__item");

	const cleaner = () => {

		galleryItem.forEach((gallery) => {

			gallery.classList.remove("--active");

		});

	};

	galleryItem.forEach((gallery, i) => {

		gallery.addEventListener("click", () => {

			cleaner();

			gallery.classList.add("--active");

			if (i === 0) {

				container.style.backgroundColor = "#0033004d";

			}

			if (i === 1) {

				container.style.backgroundColor = "#4c28824d";

			}

			if (i === 2) {

				container.style.backgroundColor = "#A5967E4d";

			}

			if (i === 3) {

				container.style.backgroundColor = "#77C06C4d";

			}

			if (i === 4) {

				container.style.backgroundColor = "#3599CB4d";

			}

		});

	});

}

//SLIDER TELEFONOS MOVILES//

$(document).ready(function () {
    function toggleSlider() {
      var windowWidth = $(window).width();
      var sliderMobile = $('.slider-mobile');
  
      if (windowWidth <= 767) {
        sliderMobile.show();
  
        if (!sliderMobile.hasClass('slick-initialized')) {
          // Configura el slider solo si no se ha inicializado
          sliderMobile.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            autoplay: true,
            autoplaySpeed: 1500,
            mobileFirst: true,
            responsive: [
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                }
              }
            ]
          });
        }
      } else {
        sliderMobile.hide();
        // Si el slider se ha inicializado, destrúyelo para evitar conflictos con la verificación de pantalla
        if (sliderMobile.hasClass('slick-initialized')) {
          sliderMobile.slick('unslick');
        }
      }
    }
  
    // Llama a la función al cargar la página y al redimensionar la ventana
    toggleSlider();
    $(window).on('resize', toggleSlider);
  });
  


// CARROUSEL OFERTAS

document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector(".carousel");
    const images = carousel.querySelectorAll("img");
    const totalImages = images.length;
    let currentIndex = 0;
    let progressInterval;

    function showImage(index) {
        for (let i = 0; i < totalImages; i++) {
            images[i].style.display = "none";
        }
        images[index].style.display = "block";
        currentIndex = index;
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % totalImages;
        showImage(currentIndex);
        resetProgress();
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        showImage(currentIndex);
        resetProgress();
    }

    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const progressBar = document.getElementById("progress-bar");

    prevBtn.addEventListener("click", function () {
        prevImage();
    });

    nextBtn.addEventListener("click", function () {
        nextImage();
    });

    function startProgress() {
        progressBar.style.transition = "none";
        progressBar.style.width = "0%";
        progressBar.offsetWidth; // Truco para reiniciar la animación
        progressBar.style.transition = "width 3s linear";
        progressBar.style.width = "100%";
    }

    function resetProgress() {
        clearInterval(progressInterval);
        progressBar.style.width = "0%";
        startProgress();
    }

    setInterval(nextImage, 5000);
    showImage(currentIndex);
    startProgress();
});

function nuevo() {
    window.location.href='producto_nuevo.html'
}

function checkEnter(event) {
    if (event.key === "Enter") {
        admin();
    }
}


function admin () {
    pass = document.getElementById("pass").value;
    if (pass !== null) {
        // Tomar decisiones basadas en el valor ingresado
        if (pass == "admin123") {
          alert("Contraseña correcta");
          window.location.href = 'admin.html';
        } else {
          alert("Contraseña incorrecta.");
          window.location.href = 'index.html'
        }
      } else {
        // El usuario presionó Cancelar en el prompt
        alert("Operación cancelada, no ingresaste ninguna clave.");
        window.location.href = 'index.html'
      }
    }

  

// validacion formulario //
function validarFormulario() {
    // Limpiar mensajes de error anteriores
    document.getElementById('errorMessages').innerHTML = '';

    // Obtener valores de los campos
    nombre = document.getElementById('nombre').value
    email = document.getElementById('email').value
    asunto = document.getElementById('asunto').value
    mensaje = document.getElementById('mensaje').value

    // Validar nombre
    if (nombre === '' || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(nombre) || /^\s/.test(nombre)) {
        mostrarError('El nombre es obligatorio y debe contener solo letras.');
        return;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '' || !emailRegex.test(email)) {
        mostrarError('Ingrese un correo electrónico válido.');
        return;
    }

    // Validar asunto (en este caso, no hay restricciones)
    if (asunto === '') {
        mostrarError('El asunto es obligatorio.');
        return;
    }

    // Validar mensaje (en este caso, no hay restricciones)
    if (mensaje === '') {
        mostrarError('El mensaje es obligatorio.');
        return;
    }

    // Si llegamos aquí, el formulario es válido. Puedes enviar los datos.
   document.getElementById('nombre').value=""
   document.getElementById('email').value=""
   document.getElementById('asunto').value=""
   document.getElementById('mensaje').value=""
    alert('Formulario enviado con éxito.');
    //
    //

}

function mostrarError(message) {
    const errorMessageContainer = document.getElementById('errorMessages');
    const errorMessage = document.createElement('p');
    errorMessage.textContent = message;
    errorMessageContainer.appendChild(errorMessage);
}




// API REST

document.addEventListener("DOMContentLoaded", async () => {
    const apiUrl = 'https://damiancrue.pythonanywhere.com/productos';

    const productList = document.getElementById('product-list');

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('No se pudo obtener la información de la API');
        }
        const products = await response.json();

        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product';
            productDiv.innerHTML = `
            <div style="${product.stock < 1 ? 'filter: grayscale(100%)' : ''}">
            <img src="${product.imagen}" alt="${product.nombre}" class="product-image">
            <h2 class="product-title">${product.nombre}</h2>
            </div>
            <p class="product-description">${product.descripcion}</p>
            <p class="product-price">Price: $${product.precio}</p>
            <p class="product-descript" style="${product.stock < 1 ? 'color: red;' : ''}">
                ${product.stock > 0 ? 'EN STOCK' : 'SIN STOCK'}
            </p>
    `;
            productList.appendChild(productDiv);
        });
    } catch (error) {
        console.error('Error al cargar productos:', error);
    }
});

// logica mostrar mas//

document.addEventListener('DOMContentLoaded', function () {
    const showMoreButton = document.getElementById('showMoreButton');
    const modal = document.getElementById('myModal');
    const closeModal = document.getElementById('closeModal');

    showMoreButton.addEventListener('click', function () {
        modal.style.display = 'block';
    });

    closeModal.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});





     


