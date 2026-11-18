# Guía del portafolio · Michela Angelini

Sitio hecho con **React + Vite + Tailwind CSS + Motion (Framer Motion)**.
No necesitas saber programar para mantenerlo: todo el contenido vive en **dos archivos de datos**.

---

## 0. Mapa rápido: ¿qué edito y dónde?

| Quiero cambiar…                                   | Archivo                                   |
|---------------------------------------------------|-------------------------------------------|
| Presentación, Sobre mí, Experiencia, IA, Contacto | `src/data/sitio.js`                        |
| Proyectos (agregar, quitar, editar)               | `src/data/proyectos.js`                    |
| Correo, LinkedIn y CV                             | `src/data/sitio.js` → bloque `contacto`    |
| Tu CV en PDF                                      | `public/cv/Michela-Angelini-CV.pdf`        |
| Tu foto                                           | `public/img/` + `sobreMi.foto` en sitio.js |
| Imágenes de proyectos                             | `public/proyectos/<slug>/`                 |
| Título de Google y vista previa al compartir      | `index.html` (arriba, comentado)           |

**Tres reglas de oro al editar:**
1. Cambia solo el texto **entre comillas** `'...'`.
2. No borres las **comas** del final de cada línea.
3. Si un texto lleva un apóstrofo, usa comillas dobles: `"l'atelier"`.

> Tip: en los títulos, una palabra entre `*asteriscos*` aparece en cursiva burdeo.

---

## 1. Publicarlo gratis (sin instalar nada) — recomendado

Esta ruta usa **GitHub** (guarda los archivos) + **Vercel** (publica el sitio). Cada vez que edites un archivo en GitHub, el sitio se actualiza solo en ~1 minuto.

1. Crea una cuenta en **github.com**.
2. Arriba a la derecha: **+ → New repository**. Nombre: `portafolio`. Deja *Public*. Clic en **Create repository**.
3. En la página del repositorio vacío, clic en **uploading an existing file**.
4. Descomprime el `.zip` del portafolio en tu computador, abre la carpeta y **arrastra todo su contenido** (las carpetas `src`, `public` y todos los archivos sueltos) a la ventana de GitHub. Clic en **Commit changes**.
5. Entra a **vercel.com** → *Sign up* → **Continue with GitHub**.
6. Clic en **Add New… → Project**, elige `portafolio` y presiona **Deploy**. Vercel detecta Vite solo; no cambies nada.
7. En ~1 minuto tendrás tu URL pública, por ejemplo `portafolio-michela.vercel.app`.
   - Para cambiarla: en Vercel, **Settings → Domains → Edit** y escribe algo como `michela-angelini.vercel.app`.

**Último paso de SEO:** en GitHub abre `index.html`, toca el lápiz ✏️ y reemplaza `TU-SITIO.vercel.app` por tu URL (aparece 2 veces). Así LinkedIn y WhatsApp mostrarán la imagen de vista previa.

### Alternativa: Netlify
En **netlify.com** → *Add new site → Import an existing project → GitHub* → elige el repositorio. La configuración ya viene en `netlify.toml`; solo presiona **Deploy**.

---

## 2. Editar textos y enlaces (desde GitHub)

1. En tu repositorio entra a `src/data/sitio.js`.
2. Toca el lápiz ✏️ (*Edit this file*).
3. Cambia lo que necesites. Lo primero:
   ```js
   contacto: {
     email: 'tu-correo@ejemplo.com',                 // ← tu correo
     linkedin: 'https://www.linkedin.com/in/tu-perfil', // ← tu LinkedIn
     cv: 'cv/Michela-Angelini-CV.pdf',
   },
   ```
4. Clic en **Commit changes**. Vercel republica solo.

Los campos `cargo` y `periodo` de cada experiencia están vacíos a propósito: complétalos y aparecerán; si los dejas vacíos, no se muestran.

---

## 3. Agregar tus proyectos e imágenes

### a) Sube las imágenes
1. En GitHub entra a `public/proyectos/`.
2. **Add file → Upload files**. Para crear la carpeta del proyecto, escribe en el nombre algo como `campanas-whatsapp-email/portada.jpg`… o más simple: sube los archivos directamente a `public/proyectos/` con nombres claros (`whatsapp-portada.jpg`, `whatsapp-01.jpg`).
3. **Antes de subir, optimízalas:** usa **squoosh.app** o **tinypng.com**, formato `.webp` o `.jpg`, máximo ~2000 px de ancho y ~400 KB.

### b) Edita el proyecto en `src/data/proyectos.js`
```js
{
  slug: 'campanas-whatsapp-email',   // sin espacios ni tildes
  provisional: false,                // ← false cuando ya sea contenido real
  titulo: 'Campaña de adopción de canales digitales',
  cliente: 'Movistar Empresas',
  empresa: 'Movistar Empresas',
  anio: '2025',
  categorias: ['Marketing digital'],
  resumen: 'Una línea que aparece al pasar el mouse.',
  autoria: 'colaboracion',           // 'propio' o 'colaboracion'
  detalleAutoria: 'Concepto, brief, copy y coordinación con diseño.',
  creditos: 'Diseño gráfico: Equipo X',
  rol: ['Concepto', 'Brief', 'Copywriting'],
  contexto: '...', objetivo: '...', participacion: '...', proceso: '...',
  resultados: ['12 piezas para WhatsApp y email', '...'],
  portada: 'proyectos/whatsapp-portada.jpg',
  imagenes: [
    { src: 'proyectos/whatsapp-01.jpg', alt: 'Pieza de WhatsApp', pie: 'Mensaje de lanzamiento' },
  ],
  videos: [
    { url: 'https://www.youtube.com/watch?v=XXXXXXXXXXX', titulo: 'Video resumen' },
  ],
},
```
- **Rutas sin barra inicial:** `proyectos/archivo.jpg` (no `/proyectos/...`).
- **Videos:** pega el enlace normal de YouTube o Vimeo. También sirve un `.mp4` propio (`proyectos/video.mp4`), pero pesa más: mejor súbelo a YouTube como *No listado*.
- **Autoría (importante):**
  - `'propio'` → etiqueta **Diseño propio**: piezas que diseñaste o produjiste tú.
  - `'colaboracion'` → etiqueta **Dirección y coordinación**: participaste con concepto, brief, redacción, coordinación o supervisión, y el diseño lo hizo otra persona. Completa `creditos`.
- Para **agregar** un proyecto, copia un bloque completo `{ ... },` y pégalo debajo. Para **quitarlo**, bórralo completo.
- Si un proyecto aparece en *Experiencia → Proyectos relacionados*, su `slug` está en la lista `proyectos` de esa experiencia en `sitio.js`.

Cuando todo sea real, cambia `mostrarAvisosProvisionales: false` en `sitio.js`.

---

## 4. Ver el sitio en tu computador (opcional)

Solo si quieres probar cambios antes de publicarlos.
1. Instala **Node.js** (versión LTS) desde nodejs.org.
2. Abre una terminal dentro de la carpeta del proyecto y ejecuta:
   ```bash
   npm install
   npm run dev
   ```
3. Abre la dirección que aparece (normalmente `http://localhost:5173`). Cada cambio guardado se ve al instante.
4. `npm run build` genera la versión final en la carpeta `dist/`.

---

## 5. Qué hay en el sitio (y cómo se comporta)

- **Animaciones protagonistas:** revelado letra por letra de tu nombre, tarjetas de proyecto que reaccionan al cursor, y scroll narrativo (la frase destacada se ilumina palabra por palabra).
- **Discretas:** barra de progreso, cinta en movimiento, parallax suave en imágenes, botones magnéticos, subrayados animados, cursor personalizado y transición de cortina al abrir o cerrar un proyecto.
- **Accesibilidad:** si el dispositivo tiene activado "reducir movimiento", las animaciones se desactivan solas. En celulares y tablets no hay cursor personalizado, parallax con mouse ni efecto magnético. Se puede navegar con teclado; el visualizador de imágenes se cierra con `Esc` y avanza con las flechas.
- **Rendimiento:** animaciones solo con `transform` y `opacity`, imágenes con carga diferida y videos que se cargan recién al presionar ▶.
- **Enlaces a proyectos:** cada proyecto tiene su propio enlace (`tusitio.vercel.app/#proyecto-slug`) para compartirlo directamente.

## 6. Estructura de archivos

```
src/
  data/sitio.js          ← textos y enlaces
  data/proyectos.js      ← proyectos
  components/            ← diseño y animaciones (no necesitas tocarlo)
  index.css              ← colores y tipografías (bloque @theme)
public/
  cv/  img/  proyectos/  ← tus archivos
  og-image.png           ← imagen al compartir el enlace (1200×630)
index.html               ← SEO y metadatos
```

Para cambiar los colores, edita los valores `--color-...` al inicio de `src/index.css`.
