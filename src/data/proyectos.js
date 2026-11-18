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
   · bajada:        frase corta en cursiva bajo el título (opcional).
   · resumen:       una línea para la tarjeta.
   · autoria:       'propio'       → piezas diseñadas/producidas por ti.
                    'colaboracion' → participaste con concepto, brief,
                                     redacción, coordinación o supervisión,
                                     pero el diseño lo hizo otra persona.
   · detalleAutoria: explica en una frase qué hiciste exactamente.
   · creditos:      quién diseñó/produjo (obligatorio si es 'colaboracion').
   · nota:          aviso de derechos (opcional). Ej: 'Pieza de [Marca], mostrada
                    con fines de portafolio. Todos los derechos pertenecen a la marca.'
   · rol:           lista corta de tus tareas.
   · contexto, objetivo, participacion, proceso: textos del caso.
   · resultados:    lista de entregables o resultados VERIFICABLES.
   · portada:       imagen principal  → 'proyectos/mi-slug/portada.jpg'
   · imagenes:      [{ src: 'proyectos/mi-slug/01.jpg', alt: 'Descripción', pie: 'Texto opcional' }]
                    Agrega formato: 'cuadrado' a piezas cuadradas (se muestran de a dos)
                    o formato: 'banner' a banners horizontales (ancho completo).
   · videos:        [{ url: 'https://www.youtube.com/watch?v=XXXX', titulo: '...' }]
                    Para un .mp4 propio puedes agregar poster: 'proyectos/imagen.webp'
                    y formato: 'cuadrado' (o 'vertical') si no es horizontal.
                    Acepta YouTube, Vimeo o un .mp4 propio ('proyectos/mi-slug/video.mp4').
   · tono:          color de fondo de las imágenes provisionales (opcional).
   · ajustePortada: 'contain' muestra la portada completa sin recortar
                    (útil para piezas cuadradas o verticales); fondoPortada
                    es el color que rellena los costados.

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
    slug: 'asistente-virtual-whatsapp',
    provisional: false,
    titulo: 'Masificación de canales digitales B2B por WhatsApp',
    bajada: 'Diseño de piezas para campañas de WhatsApp', // frase corta bajo el título
    cliente: 'Movistar Empresas',
    empresa: 'Movistar Empresas',
    anio: '2026', // ← confirma el año
    categorias: ['Marketing digital', 'Diseño y contenido gráfico'],
    resumen: 'Campañas de WhatsApp para que clientes empresa adopten las funcionalidades de sus canales digitales.',
    autoria: 'propio',
    detalleAutoria: 'Diseño y elaboración de las piezas de la campaña.',
    creditos: '',
    nota: 'Piezas de Movistar Empresas, mostradas con fines de portafolio. Todos los derechos pertenecen a la marca.',
    rol: ['Diseño gráfico', 'Elaboración de piezas', 'Campañas WhatsApp'],
    contexto:
      'Los canales digitales B2B permiten que los clientes empresa resuelvan sus gestiones por autoatención, pero muchas de sus funcionalidades aún no son conocidas ni usadas. El desafío: comunicarlas de forma simple, directa y en un canal que los clientes ya usan todos los días.',
    objetivo:
      'Masificar el uso de las funcionalidades de los canales digitales B2B, mostrando en cada campaña una gestión concreta que el cliente puede resolver por su cuenta.',
    participacion:
      'Diseñé y elaboré cada una de las piezas: a partir de la funcionalidad a comunicar, desarrollé la composición visual y el mensaje para que se entendiera de un vistazo en la pantalla del celular.',
    proceso: '', // ← opcional: cómo trabajaste (herramientas, ideas, decisiones de diseño)
    resultados: [
      'Serie de piezas enviadas a clientes empresa a través de WhatsApp.',
      'Cada pieza comunica una funcionalidad concreta: desde la gestión general de servicios hasta soluciones puntuales, como el reseteo de red o el bloqueo de llamadas SPAM 809.',
    ],
    portada: 'proyectos/asistente-virtual-whatsapp.webp',
    ajustePortada: 'contain', // muestra la pieza completa, sin recortarla
    fondoPortada: '#0A2E8C',
    imagenes: [
      { src: 'proyectos/asistente-virtual-whatsapp.webp', alt: 'Pieza: gestiona tus servicios desde WhatsApp', pie: 'Presentación del Asistente Virtual: gestiones disponibles desde WhatsApp.', formato: 'cuadrado' },
      { src: 'proyectos/reseteo-red-whatsapp.webp', alt: 'Pieza: reseteo de red con el Asistente Virtual', pie: 'Funcionalidad puntual: reseteo de red ante intermitencia de la señal móvil.', formato: 'cuadrado' },
      { src: 'proyectos/bloqueo-spam-809-whatsapp.webp', alt: 'Pieza: bloqueo de llamadas 809 desde el Asistente Virtual', pie: 'Funcionalidad puntual: bloqueo de llamadas SPAM 809 desde el menú del Asistente Virtual.', formato: 'cuadrado' },
    ],
    videos: [],
    tono: '#E4D7CF',
  },
  {
    slug: 'video-tutorial-sucursal-virtual',
    provisional: false,
    titulo: 'Video tutorial: cómo ingresar a la Sucursal Virtual Empresas',
    bajada: 'Del formato estático al tutorial en video', // frase corta bajo el título
    cliente: 'Movistar Empresas',
    empresa: 'Movistar Empresas',
    anio: '2026', // ← confirma el año
    categorias: ['Producción audiovisual', 'Marketing digital'],
    resumen: 'De la pieza estática al video: un tutorial simple para que los clientes ingresen bien a la Sucursal Virtual.',
    autoria: 'propio',
    detalleAutoria: 'Idea, estrategia y realización completa del video, de principio a fin.',
    creditos: '',
    nota: 'Pieza de Movistar Empresas, mostrada con fines de portafolio. Todos los derechos pertenecen a la marca.',
    rol: ['Estrategia', 'Idea', 'Guion', 'Edición de video'],
    contexto:
      'Los clientes empresa no estaban ingresando correctamente a la Sucursal Virtual. Las campañas estáticas podían decirles que entraran, pero no mostrarles cómo hacerlo.',
    objetivo:
      'Enseñar de forma simple y visual el paso a paso para ingresar a la Sucursal Virtual Empresas, y cambiar el estilo de las campañas para captar mejor la atención.',
    participacion:
      'La estrategia fue mía: propuse pasar de las piezas estáticas a un video tutorial corto que mostrara el recorrido real. Lo hice completo yo, desde la idea hasta el video final.',
    proceso:
      'Detecté el problema de ingreso → propuse cambiar el formato → definí los pasos clave (entrar al sitio, ir a "Mi Movistar Empresas", ingresar RUT y contraseña) → armé el recorrido con textos guía en cada paso, en formato cuadrado y de pocos segundos.',
    resultados: [
      'Video tutorial de 14 segundos que muestra el ingreso completo en tres pasos.',
      'Nuevo formato audiovisual dentro de las campañas de masificación, más allá de las piezas estáticas.',
    ],
    portada: 'proyectos/video-tutorial-sve-poster.webp',
    ajustePortada: 'contain',
    fondoPortada: '#DCEDFB',
    imagenes: [],
    videos: [
      { url: 'proyectos/video-tutorial-sve.mp4', titulo: 'Tutorial: ingreso a la Sucursal Virtual Empresas', poster: 'proyectos/video-tutorial-sve-poster.webp', formato: 'cuadrado' },
    ],
    tono: '#DCE6F2',
  },
  {
    slug: 'banners-sitio-web',
    provisional: false,
    titulo: 'Banners para la Sucursal Virtual Empresas',
    bajada: 'Diseño de banners para el sitio privado de clientes', // frase corta bajo el título
    cliente: 'Movistar Empresas',
    empresa: 'Movistar Empresas',
    anio: '2026', // ← confirma el año
    categorias: ['Diseño y contenido gráfico', 'Marketing digital'],
    resumen: 'Banners para el sitio privado de clientes empresa, cada uno enfocado en una funcionalidad digital.',
    autoria: 'propio',
    detalleAutoria: 'Diseño y elaboración de los banners.',
    creditos: '',
    nota: 'Piezas de Movistar Empresas, mostradas con fines de portafolio. Todos los derechos pertenecen a la marca.',
    rol: ['Diseño gráfico', 'Banners web', 'Elaboración de piezas'],
    contexto:
      'La Sucursal Virtual Empresas es el sitio donde los clientes empresa gestionan sus servicios. Muchas funcionalidades nuevas o poco conocidas necesitaban visibilidad justo donde el cliente ya está navegando.',
    objetivo:
      'Dar a conocer funcionalidades concretas del sitio y de otros canales digitales, con un mensaje breve y una llamada a la acción clara en cada banner.',
    participacion:
      'Diseñé y elaboré cada banner: una funcionalidad por pieza, con jerarquía clara entre título, beneficio y llamada a la acción, adaptada al formato horizontal del sitio.',
    proceso: '', // ← opcional: cómo trabajaste (herramientas, ideas, decisiones de diseño)
    resultados: [
      'Serie de banners publicados en el sitio privado de la Sucursal Virtual Empresas.',
      'Cada banner destaca una funcionalidad: Asistente Virtual por WhatsApp, gestión de tickets técnicos, perfiles y accesos por usuario, y bloqueo de llamadas 809.',
    ],
    portada: 'proyectos/banners-portada.webp',
    ajustePortada: 'contain',
    fondoPortada: '#E9E2D7',
    imagenes: [
      { src: 'proyectos/banner-asistente-virtual.webp', alt: 'Banner: Asistente Virtual Empresas por WhatsApp', pie: 'Asistente Virtual Empresas: gestiones por WhatsApp, con código QR de acceso directo.', formato: 'banner' },
      { src: 'proyectos/banner-tickets-tecnicos.webp', alt: 'Banner: gestiona tus tickets técnicos en línea', pie: 'Seguimiento de tickets técnicos de servicios fijos y privados en un solo lugar.', formato: 'banner' },
      { src: 'proyectos/banner-perfiles-accesos.webp', alt: 'Banner: asigna perfiles y accesos para cada usuario', pie: 'Perfiles y accesos por usuario desde la Sucursal Virtual Empresas.', formato: 'banner' },
      { src: 'proyectos/banner-bloqueo-809.webp', alt: 'Banner: bloquea llamadas 809 en tus líneas', pie: 'Bloqueo de llamadas 809 desde la Sucursal Virtual Empresas.', formato: 'banner' },
    ],
    videos: [],
    tono: '#DCCFD3',
  },
  {
    slug: 'campanas-whatsapp-agencia',
    provisional: false,
    titulo: 'Campañas de WhatsApp con agencia',
    bajada: 'Idea, dirección visual y coordinación con agencia', // frase corta bajo el título
    cliente: 'Movistar Empresas',
    empresa: 'Movistar Empresas',
    anio: '2026', // ← confirma el año (o pon un rango, ej: '2025 — 2026')
    categorias: ['Marketing digital'],
    resumen: 'Campañas de masificación por WhatsApp: yo propongo la idea y el diseño de referencia; la agencia produce la pieza final.',
    autoria: 'colaboracion',
    detalleAutoria: 'Idea y concepto de cada campaña, propuesta visual de referencia, brief, coordinación con la agencia y revisión de las piezas.',
    creditos: 'Diseño final: agencia de marketing', // ← puedes agregar el nombre de la agencia
    nota: 'Piezas de Movistar Empresas, mostradas con fines de portafolio. Todos los derechos pertenecen a la marca.',
    rol: ['Idea y concepto', 'Dirección visual', 'Brief creativo', 'Coordinación con agencia', 'Revisión de diseño'],
    contexto:
      'Para masificar los canales digitales B2B, cada mes se comunican funcionalidades concretas a clientes empresa por WhatsApp: pagar facturas, bloquear una SIM, consultar líneas o gestionar servicios 100% online. Muchas de estas piezas se producen con la agencia de marketing.',
    objetivo:
      'Que cada campaña comunique una sola acción, fácil de entender en segundos y en la pantalla del celular, e invite al cliente a resolverla por su cuenta en la Sucursal Virtual, el Asistente Virtual o la App.',
    participacion:
      'Las ideas son mías: defino qué comunicar, el concepto y el mensaje, y armo una propuesta visual de referencia que la agencia toma como base. Luego elaboro el brief, coordino la producción y reviso las piezas hasta su versión final.',
    proceso:
      'Idea y mensaje → propuesta visual de referencia → brief a la agencia → diseño de la agencia → revisión y ajustes → envío por WhatsApp.',
    resultados: [
      'Serie de campañas enviadas a clientes empresa por WhatsApp.',
      'Funcionalidades comunicadas: pago de facturas en la App, reactivación digital, facturación y pagos por WhatsApp, bloqueo de SIM, consulta de líneas móviles y campaña de pagos.',
    ],
    portada: 'proyectos/wsp-agencia-portada.webp',
    ajustePortada: 'contain',
    fondoPortada: '#E9E2D7',
    imagenes: [
      { src: 'proyectos/wsp-app-pago-facturas.webp', alt: 'Pieza: paga tus facturas desde la App Movistar Empresas', pie: 'Lanzamiento: pago de facturas desde la App Movistar Empresas.', formato: 'cuadrado' },
      { src: 'proyectos/wsp-reactivacion-digital.webp', alt: 'Pieza: conéctate al mundo digital de Movistar Empresas', pie: 'Reactivación digital: gestión 100% online por Sucursal Virtual y Asistente Virtual.', formato: 'cuadrado' },
      { src: 'proyectos/wsp-facturacion-pagos.webp', alt: 'Pieza: tus facturas y pagos, más fácil por WhatsApp', pie: 'Facturación y pagos por WhatsApp, explicado en dos pasos.', formato: 'cuadrado' },
      { src: 'proyectos/wsp-bloqueo-sim.webp', alt: 'Pieza: bloqueo y desbloqueo de SIM Card', pie: 'Bloqueo y desbloqueo de SIM Card desde la Sucursal Virtual.', formato: 'cuadrado' },
      { src: 'proyectos/wsp-consulta-lineas.webp', alt: 'Pieza: consulta la información de tus líneas móviles', pie: 'Consulta de líneas, consumo y deuda de equipo en la Sucursal Virtual.', formato: 'cuadrado' },
      { src: 'proyectos/wsp-campana-pagos.webp', alt: 'Pieza: sigue disfrutando tus servicios sin interrupciones', pie: 'Campaña de pagos: servicios sin interrupciones pagando desde la Sucursal Virtual.', formato: 'cuadrado' },
    ],
    videos: [],
    tono: '#E2D9CE',
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
