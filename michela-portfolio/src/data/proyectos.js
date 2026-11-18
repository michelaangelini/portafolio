/* =====================================================================
   PROYECTOS
   ---------------------------------------------------------------------
   Cada bloque { ... } es un proyecto. Para agregar uno nuevo, copia un
   bloque completo (desde { hasta },), pégalo y cambia los textos.

   CAMPOS
   · slug:          identificador único, sin espacios ni tildes (va en la URL).
   · provisional:   true muestra la etiqueta "Contenido provisional".
                    Cámbialo a false cuando el proyecto tenga contenido real.
   · titulo, cliente, empresa (dónde lo hiciste), anio ('2024' o '').
   · categorias:    una o más de la lista CATEGORIAS (escritas igual).
   · resumen:       una línea para la tarjeta.
   · autoria:       'propio'       → piezas diseñadas/producidas por ti.
                    'colaboracion' → participaste con concepto, brief,
                                     redacción, coordinación o supervisión,
                                     pero el diseño lo hizo otra persona.
   · detalleAutoria: explica en una frase qué hiciste exactamente.
   · creditos:      quién diseñó/produjo (obligatorio si es 'colaboracion').
   · rol:           lista corta de tus tareas.
   · contexto, objetivo, participacion, proceso: textos del caso.
   · resultados:    lista de entregables o resultados VERIFICABLES.
   · portada:       imagen principal  → 'proyectos/mi-slug/portada.jpg'
   · imagenes:      [{ src: 'proyectos/mi-slug/01.jpg', alt: 'Descripción', pie: 'Texto opcional' }]
   · videos:        [{ url: 'https://www.youtube.com/watch?v=XXXX', titulo: '...' }]
                    Acepta YouTube, Vimeo o un .mp4 propio ('proyectos/mi-slug/video.mp4').
   · tono:          color de fondo de las imágenes provisionales (opcional).

   Imágenes: guárdalas en public/proyectos/<slug>/ (formato .webp o .jpg,
   máx. ~2000 px de ancho y ~400 KB cada una).
   ===================================================================== */

export const CATEGORIAS = [
  'Marketing digital',
  'Diseño y contenido gráfico',
  'Producción audiovisual',
  'Redes sociales',
  'Comunicación corporativa',
]

const P = 'Texto provisional — '

export const proyectos = [
  {
    slug: 'campanas-whatsapp-email',
    provisional: true,
    titulo: 'Campañas de WhatsApp y email marketing',
    cliente: 'Movistar Empresas',
    empresa: 'Movistar Empresas',
    anio: '',
    categorias: ['Marketing digital'],
    resumen: 'Campañas B2B para canales digitales: del brief al mensaje final.',
    autoria: 'colaboracion',
    detalleAutoria: 'Conceptualización, brief creativo, redacción de mensajes y coordinación.',
    creditos: 'Diseño gráfico: [nombre del equipo o agencia]',
    rol: ['Conceptualización', 'Brief creativo', 'Copywriting', 'Coordinación'],
    contexto: P + 'describe el escenario: qué necesitaba comunicar la marca, a qué clientes empresa iba dirigido y qué desafío existía.',
    objetivo: P + 'explica en una o dos frases qué buscaba la campaña.',
    participacion: P + 'detalla tu aporte concreto: concepto, brief, redacción, revisión, coordinación con diseño.',
    proceso: P + 'cuenta cómo llegaste a la idea, cómo se trabajó con el equipo y qué decisiones tomaste.',
    resultados: [P + 'agrega entregables (ej: número de piezas o mensajes) o resultados que puedas respaldar.'],
    portada: '',
    imagenes: [{ src: '', alt: '' }, { src: '', alt: '' }, { src: '', alt: '' }],
    videos: [],
    tono: '#E4D7CF',
  },
  {
    slug: 'banners-sitio-web',
    provisional: true,
    titulo: 'Banners para sitios web',
    cliente: 'Movistar Empresas',
    empresa: 'Movistar Empresas',
    anio: '',
    categorias: ['Diseño y contenido gráfico', 'Marketing digital'],
    resumen: 'Piezas para sitios web: concepto, mensaje y revisión de diseño.',
    autoria: 'colaboracion',
    detalleAutoria: 'Conceptualización de las piezas, redacción y revisión de diseños.',
    creditos: 'Diseño gráfico: [nombre del equipo o agencia]',
    rol: ['Conceptualización', 'Redacción', 'Revisión de diseño'],
    contexto: P + 'qué se necesitaba destacar en el sitio y por qué.',
    objetivo: P + 'qué debían lograr los banners.',
    participacion: P + 'tu aporte: brief, mensajes, referencias visuales, revisiones.',
    proceso: P + 'cómo se pasó del brief a las piezas finales.',
    resultados: [P + 'entregables o resultados verificables.'],
    portada: '',
    imagenes: [{ src: '', alt: '' }, { src: '', alt: '' }],
    videos: [],
    tono: '#DCCFD3',
  },
  {
    slug: 'guias-canales-digitales',
    provisional: true,
    titulo: 'Guías y material informativo para canales digitales',
    cliente: 'Movistar Empresas',
    empresa: 'Movistar Empresas',
    anio: '',
    categorias: ['Comunicación corporativa'],
    resumen: 'Material para explicar procesos y canales digitales de forma clara.',
    autoria: 'colaboracion', // ← cámbialo a 'propio' si diseñaste tú las piezas
    detalleAutoria: 'Redacción, estructura de contenidos y coordinación.',
    creditos: 'Diseño: [completa o elimina si el diseño es tuyo]',
    rol: ['Redacción', 'Estructura de contenidos', 'Coordinación'],
    contexto: P + 'para quién era la guía y qué problema resolvía.',
    objetivo: P + 'qué debía entender o hacer el usuario después de leerla.',
    participacion: P + 'qué partes hiciste tú.',
    proceso: P + 'cómo ordenaste la información y validaste el contenido.',
    resultados: [P + 'entregables.'],
    portada: '',
    imagenes: [{ src: '', alt: '' }, { src: '', alt: '' }],
    videos: [],
    tono: '#E6DED2',
  },
  {
    slug: 'cobertura-puntos-prensa',
    provisional: true,
    titulo: 'Cobertura audiovisual de puntos de prensa',
    cliente: '[Cliente]',
    empresa: 'Perceptiva',
    anio: '',
    categorias: ['Producción audiovisual'],
    resumen: 'Grabación y registro de puntos de prensa en terreno.',
    autoria: 'propio',
    detalleAutoria: 'Grabación, registro y edición. Ajusta si alguna parte la hizo otra persona.',
    creditos: '',
    rol: ['Grabación', 'Cobertura en terreno', 'Edición'],
    contexto: P + 'qué evento o anuncio se cubrió y para qué cliente.',
    objetivo: P + 'para qué se usaría el material (prensa, redes, archivo).',
    participacion: P + 'qué hiciste en terreno y en edición.',
    proceso: P + 'cómo planificaste la cobertura y los tiempos de entrega.',
    resultados: [P + 'piezas entregadas (ej: video resumen, fotos, clips para redes).'],
    portada: '',
    imagenes: [{ src: '', alt: '' }, { src: '', alt: '' }],
    videos: [{ url: '', titulo: 'Video provisional' }],
    tono: '#D9D2C7',
  },
  {
    slug: 'registro-eventos',
    provisional: true,
    titulo: 'Registro audiovisual de eventos y videos resumen',
    cliente: '[Cliente]',
    empresa: 'Perceptiva',
    anio: '',
    categorias: ['Producción audiovisual', 'Comunicación corporativa'],
    resumen: 'Registro de actividades corporativas y edición de videos resumen.',
    autoria: 'propio',
    detalleAutoria: 'Registro audiovisual y edición de videos resumen. Ajusta según corresponda.',
    creditos: '',
    rol: ['Registro audiovisual', 'Edición de video'],
    contexto: P + 'qué tipo de actividad o evento corporativo fue.',
    objetivo: P + 'para qué servía el video resumen.',
    participacion: P + 'tu trabajo en grabación y edición.',
    proceso: P + 'cómo seleccionaste momentos clave y armaste el relato.',
    resultados: [P + 'entregables.'],
    portada: '',
    imagenes: [{ src: '', alt: '' }, { src: '', alt: '' }],
    videos: [{ url: '', titulo: 'Video provisional' }],
    tono: '#E0D3C8',
  },
  {
    slug: 'camara-centros-comerciales',
    provisional: true,
    titulo: 'Comunicación para la Cámara de Centros Comerciales',
    cliente: 'Cámara de Centros Comerciales',
    empresa: 'Perceptiva',
    anio: '',
    categorias: ['Comunicación corporativa', 'Redes sociales'],
    resumen: 'Proyectos de comunicación para un cliente gremial.',
    autoria: 'colaboracion', // ← ajusta según tu participación real
    detalleAutoria: 'Describe aquí tu participación exacta en el proyecto.',
    creditos: '[Completa si hubo diseño o producción de terceros]',
    rol: ['[Tu rol]'],
    contexto: P + 'qué necesitaba comunicar la Cámara.',
    objetivo: P + 'objetivo de comunicación.',
    participacion: P + 'tu aporte concreto.',
    proceso: P + 'cómo se desarrolló el trabajo.',
    resultados: [P + 'entregables.'],
    portada: '',
    imagenes: [{ src: '', alt: '' }, { src: '', alt: '' }],
    videos: [],
    tono: '#D6CBC6',
  },
  {
    slug: 'achila-linkedin',
    provisional: true,
    titulo: 'Contenido corporativo de LinkedIn para ACHILA',
    cliente: 'ACHILA',
    empresa: 'Perceptiva',
    anio: '',
    categorias: ['Redes sociales', 'Comunicación corporativa'],
    resumen: 'Contenido corporativo para LinkedIn.',
    autoria: 'propio', // ← ajusta si el diseño lo hizo otra persona
    detalleAutoria: 'Creación y redacción de contenido. Ajusta según corresponda.',
    creditos: '',
    rol: ['Contenido', 'Redacción', 'Planificación'],
    contexto: P + 'situación de la marca en LinkedIn.',
    objetivo: P + 'qué se buscaba con el contenido.',
    participacion: P + 'qué creaste tú.',
    proceso: P + 'cómo definiste temas, tono y formatos.',
    resultados: [P + 'entregables o resultados que puedas respaldar.'],
    portada: '',
    imagenes: [{ src: '', alt: '' }, { src: '', alt: '' }],
    videos: [],
    tono: '#E2D9CE',
  },
]
