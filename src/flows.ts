export const Copy = {
  START: `Hola amor, soy Vin Virtual 💋
¿en qué servicio estás interesado? elegí una opción:`,

  VIP_INTRO: `Mi Amor, tenés dos formas de disfrutarme:
• El *Grupo VIP*, donde podes ver todo sin restricciones 💞
• O el *catálogo* con videos individuales para probar algo puntual 🛒

✨ Tip:  si comprás el acceso VIP desde este bot, el precio es mejor 😉`,

  VIP_INCLUDES: `¿Qué hay en el VIP?
• Fotos y Videos privados (sola y con amig@s) 
• Material grabado en eventos especiales
• Prioridad en encuentros y vivos ocasionales
• Cada 2 meses que abonas, un encuentro sin cargo

¿Querés entrar?`,

  VIP_PAY: `Te dejo el link de pago. Cuando abones, esperá unos segundos y vas a ser redirigido al grupo.`,

  ENCUENTROS_INTRO: `Encuentros presenciales (“onda novios”):
  
  • Incluye besos (solo con buena higiene), caricias, sexo oral y vaginal con protección
  • Sexo Anal solo si mide 10 cm o menos (cargo extra)
  • Grabación y/o transmisión solo con mis dispositivos
  • Servicio higienico, y seguro. En mi dpto tengo preservativos y juguetes.
  • Atención a parejas, ella besos, masturbación y juguetes (sin llegar a sexo oral), el todo con protección
  • Ubicación: Tres Cerritos, Salta Capital
  • NO PIDO ADELANTOS, en caso de querer aprovechar las tarifas especiales del bot o querer un horario especifico, pido seña de $2 mil, de lo contrario atiendo por orden de llegada sin pago previo
  • Atención a domicilio: servicio mínimo: 1 hora, me mandas un uber o me buscas por mi dpto. Fuera de Salta Capital, si o si con transferencia previa por el valor del transporte
  `,

  SORTEO_INTRO: `Se sortea un encuentro conmigo (Vin) de 15 minutos (transmitido en vivo)
  
  • Valor del número: $5 mil
  • Sorteo: todos los viernes a la noche (23 hs aprox)
  • Siempre hay al menos un ganador, debe/n ser mayor/es de 18 años
  • Debe/n cobrar su premio el fin de semana que lo gana/n en mi departamento
  • Si hay más de un ganador, no es necesario que vengan al mismo tiempo
  • Hace clic en el link de pago y una vez abonado, enviame un mensaje con el comprobante y el numero elegido a mi usuario:

  @Vin_Salta

    ¡Mucha suerte corazón!

  `,

  VIRTUALES_INTRO: `Experiencia Novia Virtual, incluye:

  • Reacción a fotos y videos que me envíes
  • Sexting
  • Audios y textos por Whatsapp/Telegram explicitos y no explicitos
  • Llamadas de audio
  • Videollamadas (no explicitas)
  • Encuentros tipo citas o intimos (costo adicional diferencial)
  • Única Tarifa: $450 mil por mes
  
  Puedo ser tu compañía virtual y estar cuando necesites hablar, distraerte o simplemente no estar solo.

  **PD: Si bien el servicio demanda de mi plena atención hacia vos, pido se respeten mis actividades personales y descansos.
  `,

  EVENTOS_INTRO: `Encuentros grupales grabados donde pueden participar 2 o más seguidores

  • Entrada: $30 mil (valor mínimo, puede variar)
  • Duración: 45 min. aprox.
  • En mi departamento
  • Todo con protección
  • Se abona seña para reservar ($2 mil no reembolsables)

    Próximo evento: 13 de Diciembre 2025
  `,
};

// Links centralizados desde .env
export const LINKS = {
  CATALOG: process.env.CATALOG_URL ?? "https://t.me/VinSalta_ContentPreview",
  MP_VIP: process.env.MP_VIP_LINK ?? "",
  MP_SORTEO: process.env.MP_SORTEO_LINK ?? "",
  MP_ENC: process.env.MP_ENC_LINK ?? "",
};

export const K = {
  ROOT: "root",

  // Menús principales
  VIP: "vip",
  ENCUENTROS: "encuentros",
  SORTEO: "sorteo",
  VIRTUALES: "virtuales",
  EVENTOS: "eventos",

  // Submenús VIP
  VIP_INFO: "vip:info",
  VIP_PAY: "vip:pay",

  // Submenús Encuentros
  ENC_PRECIOS: "enc:precios",
  ENC_RESERVAR: "enc:reservar",

  // Navegación (solo Inicio)
  HOME: "home:root",
} as const;
