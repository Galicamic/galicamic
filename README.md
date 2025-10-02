# Anime & Manga Event - Landing Page

Una landing page estática para un evento de anime y manga, diseñada para ser desplegada en GitHub Pages.

## 🚀 Características

- **Diseño Responsive**: Se adapta perfectamente a todos los dispositivos
- **Tema Anime/Manga**: Colores vibrantes y tipografías temáticas
- **Gestión de Carteles**: Sistema para mostrar carteles promocionales (último agregado aparece primero)
- **Sección de Noticias**: Sistema de noticias con categorías y paginación
- **Animaciones Suaves**: Efectos de transición y animaciones CSS
- **Navegación Fluida**: Scroll suave entre secciones
- **GitHub Pages Ready**: Completamente estático, sin dependencias de servidor

## 📁 Estructura del Proyecto

```
galicamic/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # Funcionalidad JavaScript
├── README.md           # Documentación
└── assets/
    └── images/
        ├── carteles/   # Imágenes de carteles promocionales
        ├── favicon.ico # Icono del sitio
        └── og-image.jpg # Imagen para redes sociales
```

## 🎨 Secciones

### 1. Hero Section
- Título principal del evento
- Fecha (configurable)
- Botón call-to-action
- Elementos animados flotantes

### 2. Carteles Promocionales
- Muestra carteles ordenados por fecha (más reciente primero)
- Diseño en grid responsive
- Indicador "¡Nuevo!" para el cartel más reciente
- Efectos hover y animaciones

### 3. Noticias del Evento
- Sistema de noticias con categorías
- Paginación (inicialmente muestra 3, botón "Ver más")
- Fechas formateadas en español
- Noticias destacadas

### 4. Información del Evento
- Tarjetas informativas sobre fecha, ubicación, actividades y entradas
- Iconos descriptivos
- Diseño en grid

### 5. Footer
- Enlaces de navegación
- Redes sociales
- Copyright

## 🔧 Configuración y Uso

### Agregar Nuevos Carteles

Edita el archivo `script.js` en la sección `cartelesData`:

```javascript
const cartelesData = [
    {
        id: 1,
        title: "Título del Cartel",
        description: "Descripción del cartel",
        date: "2025-01-20", // YYYY-MM-DD
        imageUrl: "assets/images/carteles/nombre-imagen.jpg",
        isNew: true // Solo el más reciente debería tener true
    },
    // Agregar más carteles aquí
];
```

### Agregar Nuevas Noticias

Edita el archivo `script.js` en la sección `noticiasData`:

```javascript
const noticiasData = [
    {
        id: 1,
        title: "Título de la Noticia",
        content: "Contenido completo de la noticia...",
        date: "2025-01-15", // YYYY-MM-DD
        category: "Categoría", // Anuncio, Actualización, Concurso, etc.
        featured: true // Si debe destacarse
    },
    // Agregar más noticias aquí
];
```

### Subir Imágenes de Carteles

1. Coloca las imágenes en la carpeta `assets/images/carteles/`
2. Actualiza la ruta en `cartelesData`
3. Recomendado: imágenes en formato JPG/PNG, optimizadas para web

## 🎯 Personalización

### Colores Temáticos
Los colores se definen en `styles.css` en las variables CSS:

```css
:root {
    --primary-color: #ff6b6b;    /* Color principal */
    --secondary-color: #4ecdc4;  /* Color secundario */
    --accent-color: #ffe66d;     /* Color de acento */
    /* ... más colores */
}
```

### Tipografías
- **Títulos**: Orbitron (futurista, ideal para eventos)
- **Texto**: Noto Sans JP (legible, con soporte japonés)

### Información del Evento
Actualiza la información en `index.html`:
- Título del evento
- Fechas
- Ubicación
- Enlaces de redes sociales

## 📱 Responsive Design

El diseño se adapta automáticamente a:
- **Desktop**: Grid completo con todas las características
- **Tablet**: Grid adaptativo, menú colapsable
- **Móvil**: Columna única, navegación hamburguesa

## 🚀 Despliegue en GitHub Pages

1. Sube todos los archivos a tu repositorio de GitHub
2. Ve a Settings > Pages
3. Selecciona la rama main como source
4. Tu sitio estará disponible en `https://tu-usuario.github.io/nombre-repositorio/`

## 🛠️ Desarrollo

### Funciones Útiles para Testing

El script incluye funciones de debugging accesibles desde la consola del navegador:

```javascript
// Ver todos los carteles
animeEventDebug.verCarteles();

// Ver todas las noticias
animeEventDebug.verNoticias();

// Agregar cartel dinámicamente
animeEventDebug.agregarCartel({
    title: "Nuevo Cartel",
    description: "Descripción",
    date: "2025-02-01",
    imageUrl: "ruta/imagen.jpg"
});

// Agregar noticia dinámicamente
animeEventDebug.agregarNoticia({
    title: "Nueva Noticia",
    content: "Contenido...",
    category: "Anuncio",
    featured: true
});
```

### Estructura de Archivos Recomendada para Imágenes

```
assets/images/
├── carteles/
│   ├── cartel-1.jpg
│   ├── cartel-2.jpg
│   └── ...
├── favicon.ico
├── og-image.jpg (para redes sociales)
└── background/ (opcional, para fondos adicionales)
```

## 📋 TODO para Futuras Mejoras

- [ ] Sistema de galería de imágenes con lightbox
- [ ] Contador regresivo para la fecha del evento
- [ ] Integración con Google Maps para ubicación
- [ ] Newsletter signup
- [ ] Modo oscuro/claro
- [ ] Integración con APIs de redes sociales
- [ ] Sistema de comentarios estático (usando GitHub Issues)

## 🤝 Contribución

Para contribuir al proyecto:
1. Fork el repositorio
2. Crea una rama para tu feature
3. Realiza tus cambios
4. Envía un pull request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Puedes usarlo libremente para tus eventos.

---

**¡Perfecto para eventos de anime, manga, cosplay y convenciones otaku!** 🎌✨