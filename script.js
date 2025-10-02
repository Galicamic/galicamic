// Datos de carteles promocionales - ACTUALIZAR AQUÍ PARA AGREGAR NUEVOS CARTELES
const cartelesData = [
    {
        id: 1,
        title: "Galicamic con Kawa-Chan, la rana cosplayer!!",
        description: "El primer cartel oficial del evento.",
        date: "2025-09-28",
        imageUrl: "assets/images/carteles/galicamic_salon_manga.webp",
        isNew: true
    },
    // Agregar más carteles aquí - siempre se mostrará el más reciente arriba
    // {
    //     id: 2,
    //     title: "Segundo Cartel",
    //     description: "Descripción del segundo cartel.",
    //     date: "2025-01-20",
    //     imageUrl: "assets/images/carteles/cartel-2.jpg",
    //     isNew: true
    // }
];

// Datos de noticias - ACTUALIZAR AQUÍ PARA AGREGAR NUEVAS NOTICIAS
const noticiasData = [
    {
        id: 1,
        title: "¡Anunciamos nuestro primer evento de Anime y Manga!",
        content: "Estamos emocionados de anunciar oficialmente nuestro primer evento dedicado al mundo del anime y manga. Será una experiencia tradicional que reunirá a toda la comunidad otaku en un solo lugar.",
        date: "2025-09-26",
        category: "Anuncio",
        featured: true
    },
    // {
    //     id: 2,
    //     title: "Preparativos en marcha",
    //     content: "El equipo organizador está trabajando arduamente para crear la mejor experiencia posible. Pronto anunciaremos más detalles sobre la fecha, ubicación y actividades.",
    //     date: "2025-01-12",
    //     category: "Actualización",
    //     featured: false
    // },
    // {
    //     id: 3,
    //     title: "Convocatoria para cosplayers",
    //     content: "¡Atención cosplayers! Estamos preparando un concurso especial con premios increíbles. Mantente atento a las próximas actualizaciones para conocer todos los detalles.",
    //     date: "2025-01-14",
    //     category: "Concurso",
    //     featured: false
    // }
    // Agregar más noticias aquí
];

// Variables de control
let noticiasVisibles = 3;
const noticiasPorPagina = 3;

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Cargar carteles
    cargarCarteles();
    
    // Cargar noticias
    cargarNoticias();
    
    // Configurar navegación
    setupNavigation();
    
    // Configurar botones
    setupButtons();
    
    // Configurar animaciones
    setupAnimations();
    
    // Inicializar Kawa-Chan
    initializeKawaChan();
}

// === GESTIÓN DE CARTELES ===
let currentSlide = 0;
let totalSlides = 0;
let slideInterval;

function cargarCarteles() {
    const container = document.getElementById('cartelesContainer');
    
    if (!container) return;
    
    // Ordenar carteles por fecha (más reciente primero)
    const cartelesOrdenados = [...cartelesData].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    totalSlides = cartelesOrdenados.length;
    container.innerHTML = '';
    
    cartelesOrdenados.forEach((cartel, index) => {
        const cartelElement = createCartelElement(cartel, index);
        container.appendChild(cartelElement);
    });
    
    // Inicializar carrusel
    initCarousel();
    
    // Animar entrada de carteles
    animateElements('.cartel-card');
}

function createCartelElement(cartel, index) {
    const div = document.createElement('div');
    div.className = 'cartel-card fade-in';
    div.style.animationDelay = `${index * 0.1}s`;
    
    div.innerHTML = `
        ${cartel.isNew ? '<div class="cartel-new">¡Nuevo!</div>' : ''}
        <div class="cartel-image" id="cartel-image-${cartel.id}">
            <img src="${cartel.imageUrl}" alt="${cartel.title}" 
                 onload="handleImageLoad(this, ${cartel.id})" 
                 onerror="handleImageError(this)">
        </div>
        <div class="cartel-content">
            <h3 class="cartel-title">${cartel.title}</h3>
            <p class="cartel-date">${formatDate(cartel.date)}</p>
            <p class="cartel-description">${cartel.description}</p>
        </div>
    `;
    
    return div;
}

// === CARRUSEL FUNCTIONALITY ===
function initCarousel() {
    if (totalSlides === 0) return;
    
    const carousel = document.querySelector('.carousel-container');
    const indicators = document.querySelector('.carousel-indicators');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    
    if (!carousel || !indicators || !prevBtn || !nextBtn) return;
    
    // Crear indicadores
    indicators.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
        const indicator = document.createElement('button');
        indicator.className = `carousel-indicator ${i === 0 ? 'active' : ''}`;
        indicator.addEventListener('click', () => {
            stopAutoPlay();
            goToSlide(i);
        });
        indicators.appendChild(indicator);
    }
    
    // Event listeners para botones
    prevBtn.addEventListener('click', () => {
        stopAutoPlay();
        prevSlide();
    });
    nextBtn.addEventListener('click', () => {
        stopAutoPlay();
        nextSlide();
    });
    
    // Pausar auto-play al hover
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
    
    // Touch/swipe support
    let startX = 0;
    let endX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    carousel.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const threshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }
    
    // Inicializar vista
    updateCarousel();
    
    // Auto-play (opcional)
    startAutoPlay();
}

function prevSlide() {
    currentSlide = currentSlide > 0 ? currentSlide - 1 : totalSlides - 1;
    updateCarousel();
}

function nextSlide() {
    currentSlide = currentSlide < totalSlides - 1 ? currentSlide + 1 : 0;
    updateCarousel();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

function updateCarousel() {
    const container = document.getElementById('cartelesContainer');
    const indicators = document.querySelectorAll('.carousel-indicator');
    
    if (!container) return;
    
    // Calcular el ancho total del carrusel basado en el número de slides
    const totalWidth = totalSlides * 100;
    container.style.width = `${totalWidth}%`;
    
    // Cada cartel debe ocupar una fracción del total
    const cards = container.querySelectorAll('.cartel-card');
    cards.forEach(card => {
        card.style.width = `${100 / totalSlides}%`;
    });
    
    // Actualizar posición del carrusel
    const translateX = -currentSlide * (100 / totalSlides);
    container.style.transform = `translateX(${translateX}%)`;
    
    // Actualizar indicadores
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
    
    // Reiniciar auto-play
    restartAutoPlay();
}

function startAutoPlay() {
    slideInterval = setInterval(nextSlide, 4000); // Cambiar cada 4 segundos
}

function stopAutoPlay() {
    if (slideInterval) {
        clearInterval(slideInterval);
    }
}

function restartAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
}

// Manejar carga de imagen y detectar orientación
function handleImageLoad(img, cartelId) {
    const container = document.getElementById(`cartel-image-${cartelId}`);
    if (!container) return;
    
    // Detectar si la imagen es vertical (altura > anchura)
    if (img.naturalHeight > img.naturalWidth) {
        // Es vertical - ajustar contenedor
        const aspectRatio = img.naturalHeight / img.naturalWidth;
        
        if (aspectRatio > 1.4) { // Muy vertical
            container.classList.add('vertical');
            container.style.maxHeight = '500px';
        } else { // Ligeramente vertical
            container.style.height = 'auto';
            container.style.minHeight = '250px';
        }
    } else {
        // Es horizontal o cuadrada
        container.style.height = '250px';
    }
    
    // Aplicar efectos visuales
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
    setTimeout(() => {
        img.style.opacity = '1';
    }, 50);
}

// Manejar error de carga de imagen
function handleImageError(img) {
    const container = img.parentElement;
    container.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 250px; color: white;">
            <div style="font-size: 3rem; margin-bottom: 1rem;">🎨</div>
            <div style="font-size: 1rem; opacity: 0.8;">Cartel próximamente</div>
        </div>
    `;
}

// === GESTIÓN DE NOTICIAS ===
function cargarNoticias() {
    const container = document.getElementById('noticiasContainer');
    
    if (!container) return;
    
    // Ordenar noticias por fecha (más reciente primero)
    const noticiasOrdenadas = [...noticiasData].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    container.innerHTML = '';
    
    // Mostrar solo las noticias visibles
    const noticiasAMostrar = noticiasOrdenadas.slice(0, noticiasVisibles);
    
    noticiasAMostrar.forEach((noticia, index) => {
        const noticiaElement = createNoticiaElement(noticia, index);
        container.appendChild(noticiaElement);
    });
    
    // Mostrar/ocultar botón "Ver más"
    updateLoadMoreButton(noticiasOrdenadas.length);
    
    // Animar entrada de noticias
    animateElements('.noticia-card');
}

function createNoticiaElement(noticia, index) {
    const div = document.createElement('div');
    div.className = `noticia-card slide-in-left ${noticia.featured ? 'featured' : ''}`;
    div.style.animationDelay = `${index * 0.1}s`;
    
    div.innerHTML = `
        <div class="noticia-header">
            <h3 class="noticia-title">${noticia.title}</h3>
            <span class="noticia-date">${formatDate(noticia.date)}</span>
        </div>
        <div class="noticia-content">
            <p>${noticia.content}</p>
            <span class="noticia-category">${noticia.category}</span>
        </div>
    `;
    
    return div;
}

function updateLoadMoreButton(totalNoticias) {
    const loadMoreBtn = document.getElementById('loadMoreNews');
    
    if (!loadMoreBtn) return;
    
    if (noticiasVisibles >= totalNoticias) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
        loadMoreBtn.textContent = `Ver más noticias (${totalNoticias - noticiasVisibles} restantes)`;
    }
}

function cargarMasNoticias() {
    noticiasVisibles += noticiasPorPagina;
    cargarNoticias();
}

// === UTILIDADES ===
function formatDate(dateString) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        timeZone: 'UTC'
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
}

function animateElements(selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.5s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// === NAVEGACIÓN ===
function setupNavigation() {
    // Navegación suave
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Menú móvil
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Cerrar menú al hacer click en un enlace
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Efecto de scroll en header
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    });
}

// === CONFIGURACIÓN DE BOTONES ===
function setupButtons() {
    // Botón CTA del hero
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            // Scroll a la sección de noticias
            const noticiasSection = document.getElementById('noticias');
            if (noticiasSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = noticiasSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Botón "Ver más noticias"
    const loadMoreBtn = document.getElementById('loadMoreNews');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', cargarMasNoticias);
    }
}

// === ANIMACIONES ===
function setupAnimations() {
    // Observador de intersección para animaciones al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observar elementos que deben animarse
    const elementsToAnimate = document.querySelectorAll('.info-card, .section-title');
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

// === FUNCIONES PARA ACTUALIZAR CONTENIDO ===

// Función para agregar un nuevo cartel (usar desde la consola del navegador o en futuras actualizaciones)
function agregarCartel(cartel) {
    // Agregar al principio del array para que aparezca primero
    cartelesData.unshift({
        id: Date.now(), // ID único basado en timestamp
        ...cartel,
        isNew: true
    });
    
    // Marcar otros carteles como no nuevos
    cartelesData.forEach((c, index) => {
        if (index > 0) c.isNew = false;
    });
    
    // Recargar carteles
    cargarCarteles();
    
    console.log('Nuevo cartel agregado:', cartel);
}

// Función para agregar una nueva noticia
function agregarNoticia(noticia) {
    noticiasData.unshift({
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        ...noticia
    });
    
    // Recargar noticias
    cargarNoticias();
    
    console.log('Nueva noticia agregada:', noticia);
}

// === EJEMPLOS DE USO (para la consola del navegador) ===
/*
// Para agregar un nuevo cartel:
agregarCartel({
    title: "Nuevo Cartel Promocional",
    description: "Descripción del nuevo cartel",
    date: "2025-01-20",
    imageUrl: "assets/images/carteles/cartel-nuevo.jpg"
});

// Para agregar una nueva noticia:
agregarNoticia({
    title: "Nueva actualización importante",
    content: "Contenido de la noticia...",
    category: "Anuncio",
    featured: true
});
*/

// === KAWA-CHAN - RANA COSPLAYER INTERACTIVA ===

// Variables para Kawa-Chan
let currentCostume = 0;
let kawaChanVisible = false;
const costumes = ['naruto', 'goku', 'pikachu', 'totoro'];

function initializeKawaChan() {
    setupKawaChanScroll();
    setupKawaChanInteractions();
    setupMouseTracking();
}

// Configurar cambio de disfraces con scroll
function setupKawaChanScroll() {
    const kawaChan = document.getElementById('kawaChan');
    const disfraz = document.getElementById('disfraz');
    
    if (!kawaChan || !disfraz) return;
    
    // Observer para detectar cuando Kawa-Chan es visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            kawaChanVisible = entry.isIntersecting;
            if (kawaChanVisible) {
                startCostumeRotation();
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(kawaChan);
    
    // Cambiar disfraz basado en scroll
    let lastScrollY = window.scrollY;
    let scrollTimeout;
    
    window.addEventListener('scroll', () => {
        if (!kawaChanVisible) return;
        
        const currentScrollY = window.scrollY;
        const scrollDelta = Math.abs(currentScrollY - lastScrollY);
        
        // Cambiar disfraz cada 100px de scroll
        if (scrollDelta > 100) {
            changeCostume();
            lastScrollY = currentScrollY;
        }
        
        // Auto-cambio si no hay scroll por 3 segundos
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            if (kawaChanVisible) {
                changeCostume();
            }
        }, 3000);
    });
}

// Cambiar disfraz de Kawa-Chan
function changeCostume() {
    const disfraz = document.getElementById('disfraz');
    if (!disfraz) return;
    
    // Remover clase active de todos los disfraces
    const allCostumes = disfraz.querySelectorAll('div');
    allCostumes.forEach(costume => costume.classList.remove('active'));
    
    // Avanzar al siguiente disfraz
    currentCostume = (currentCostume + 1) % costumes.length;
    
    // Activar nuevo disfraz con animación
    const newCostume = disfraz.querySelector(`.costume-${costumes[currentCostume]}`);
    if (newCostume) {
        newCostume.classList.add('active');
        
        // Efecto de brillo al cambiar
        addSparkleEffect();
        
        // Sonido de cambio (comentado para no molestar)
        // playChangeSound();
    }
    
    console.log(`¡Kawa-Chan se disfrazó de ${costumes[currentCostume]}!`);
}

// Iniciar rotación automática de disfraces
function startCostumeRotation() {
    // Activar primer disfraz
    const disfraz = document.getElementById('disfraz');
    if (disfraz) {
        const firstCostume = disfraz.querySelector('.costume-naruto');
        if (firstCostume) {
            firstCostume.classList.add('active');
        }
    }
}

// Configurar interacciones de hover y click
function setupKawaChanInteractions() {
    const kawaChan = document.getElementById('kawaChan');
    if (!kawaChan) return;
    
    // Efecto de click
    kawaChan.addEventListener('click', () => {
        // Cambiar disfraz manualmente
        changeCostume();
        
        // Animación de salto
        kawaChan.style.animation = 'none';
        kawaChan.style.transform = 'translateY(-30px) scale(1.2) rotate(10deg)';
        
        setTimeout(() => {
            kawaChan.style.animation = 'kawaFloat 4s ease-in-out infinite';
            kawaChan.style.transform = '';
        }, 300);
        
        // Mensaje de interacción
        // Mensaje eliminado - solo tooltip encima de la cabeza
    });
    
    // Efectos de hover mejorados
    kawaChan.addEventListener('mouseenter', () => {
        document.body.style.cursor = 'pointer';
    });
    
    kawaChan.addEventListener('mouseleave', () => {
        document.body.style.cursor = 'default';
    });
}

// Seguimiento del mouse para que los ojos sigan el cursor
function setupMouseTracking() {
    const kawaChan = document.getElementById('kawaChan');
    if (!kawaChan) return;
    
    document.addEventListener('mousemove', (e) => {
        if (!kawaChanVisible) return;
        
        const rect = kawaChan.getBoundingClientRect();
        const kawaCenterX = rect.left + rect.width / 2;
        const kawaCenterY = rect.top + rect.height / 2;
        
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        // Calcular ángulo hacia el mouse
        const angle = Math.atan2(mouseY - kawaCenterY, mouseX - kawaCenterX);
        
        // Mover pupilas
        const pupilas = kawaChan.querySelectorAll('.pupila');
        pupilas.forEach(pupila => {
            const moveX = Math.cos(angle) * 5;
            const moveY = Math.sin(angle) * 3;
            pupila.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
        });
    });
}

// Agregar efecto de brillos al cambiar disfraz
function addSparkleEffect() {
    const kawaChan = document.getElementById('kawaChan');
    if (!kawaChan) return;
    
    // Crear partículas de brillo
    for (let i = 0; i < 6; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'absolute';
        sparkle.style.fontSize = '1rem';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '20';
        sparkle.style.left = Math.random() * 200 + 'px';
        sparkle.style.top = Math.random() * 180 + 'px';
        sparkle.style.animation = 'sparkle 1s ease-out forwards';
        
        kawaChan.appendChild(sparkle);
        
        // Remover después de la animación
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 1000);
    }
}

// Mostrar mensaje de interacción
function showInteractionMessage(message) {
    let messageDiv = document.getElementById('kawaMessage');
    
    if (!messageDiv) {
        messageDiv = document.createElement('div');
        messageDiv.id = 'kawaMessage';
        messageDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255, 255, 255, 0.95);
            padding: 15px 25px;
            border-radius: 25px;
            font-weight: bold;
            color: #d32f2f;
            z-index: 1000;
            box-shadow: 0 8px 25px rgba(0,0,0,0.2);
            animation: bounceIn 0.3s ease-out;
            pointer-events: none;
        `;
        document.body.appendChild(messageDiv);
    }
    
    messageDiv.textContent = message;
    messageDiv.style.opacity = '1';
}

// Ocultar mensaje de interacción
function hideInteractionMessage() {
    const messageDiv = document.getElementById('kawaMessage');
    if (messageDiv) {
        messageDiv.style.opacity = '0';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 300);
    }
}

// Funciones de utilidad para debugging
window.animeEventDebug = {
    verCarteles: () => console.table(cartelesData),
    verNoticias: () => console.table(noticiasData),
    agregarCartel: agregarCartel,
    agregarNoticia: agregarNoticia,
    recargarTodo: initializeApp,
    // Funciones de Kawa-Chan
    cambiarDisfraz: changeCostume,
    verDisfraces: () => console.log('Disfraces:', costumes),
    disfrazActual: () => console.log('Disfraz actual:', costumes[currentCostume])
};