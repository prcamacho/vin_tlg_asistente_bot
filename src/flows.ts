export const Copy = {
  START: `Hola amor, soy Vin Virtual 💋
¿en qué servicio estás interesado? elegí una opción:`,

  VIP_INTRO: `Mi Amor, tenés dos formas de disfrutarme:
• el *Grupo VIP*, donde podes ver todo sin restricciones 💞
• o el *catálogo* con videos individuales para probar algo puntual 🛒

✨ **Tip:** si comprás el acceso VIP desde este bot, **el precio es mejor** 😉`,

  VIP_INCLUDES: `¿Qué hay en el VIP?
• Fotos y Videos privados (sola y con amig@s) 
• Material grabado en eventos especiales
• Prioridad en encuentros y vivos ocasionales
• Cada 2 meses que abonas, un encuentro sin cargo

¿Querés entrar?`,

  VIP_PAY: `Te dejo el link de pago. Cuando abones, esperá unos segundos y vas a ser redirigido al grupo.`,

  ENCUENTROS_INTRO: `Encuentros presenciales (“onda novios”): clima cariñoso, cuidado y todo con protección.`,

  SORTEO_INTRO: `Se sortea un encuentro con Vin de 15 minutos (transmitido en vivo)
  • Valor del número: $5 mil
  • Sorteo: todos los viernes a la noche (23 hs aprox)
  • Siempre hay al menos un ganador, debe/n ser mayor/es de 18 años
  • Debe cobrar su premio el fin de semana que lo gana en mi departamento
  • 
  `,

  VIRTUALES_INTRO: `Experiencia Novia Virtual, incluye:
  • Reacción a fotos y videos que me envíes
  • Sexting
  • Audios y textos por Whatsapp/Telegram explicitos y no explicitos
  • Llamadas de audio
  • Videollamadas (no explicitas)
  • Encuentros presenciales y citas (costo adicional)

  Puedo ser tu compañía virtual y estar cuando me necesites hablar, descargarte o simplemente pasar un buen rato 
  `,

  EVENTOS_INTRO: `Encuentros grupales grabados donde pueden participar 2 o más seguidores
  • Entrada: $30 mil (valor mínimo, puede variar)
  • Duración: 45 mmin. aprox.
  • En mi departamento
  • Todo con protección
  • Se abona seña para reservar ($2 mil no reembolsables)
    Próximo evento: 13 de Diciembre 2025 - Lugar a confirmar
  `,
};

// Links centralizados (podés moverlos a .env si querés)
export const LINKS = {
  CATALOG: process.env.CATALOG_URL ?? "https://t.me/VinSalta_ContentPreview",
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
