import { K, LINKS } from "./flows.js";
import type { InlineKeyboardMarkup } from "telegraf/types";

export function kbRoot(): InlineKeyboardMarkup {
  return {
    inline_keyboard: [
      [
        { text: "🔞 Grupo VIP", callback_data: K.VIP },
        { text: "👩‍❤️‍💋‍👨 Encuentros", callback_data: K.ENCUENTROS },
      ],
      [{ text: "🎟️ Sorteo Semanal", callback_data: K.SORTEO }],
      [{ text: "📲 Servicios Virtuales", callback_data: K.VIRTUALES }],
      [{ text: "✨ Eventos Especiales", callback_data: K.EVENTOS }],
    ],
  };
}

export function kbVipMain(): InlineKeyboardMarkup {
  return {
    inline_keyboard: [
      // 🛒 Botón directo al canal catálogo para videos individuales
      [{ text: "🛒 Ver catálogo", url: LINKS.CATALOG }],
      // Opciones del VIP
      [{ text: "ℹ️ Qué hay en el VIP", callback_data: K.VIP_INFO }],
      [{ text: "💳 Quiero entrar", callback_data: K.VIP_PAY }],
      // Solo Inicio
      [{ text: "🏠 Inicio", callback_data: K.HOME }],
    ],
  };
}

export function kbVipPay(mpUrl?: string): InlineKeyboardMarkup {
  const url = mpUrl ?? "";
  return {
    inline_keyboard: [
      [{ text: "💳 Link de pago", url }],
      [{ text: "🏠 Inicio", callback_data: K.HOME }],
    ],
  };
}

export function kbEncuentros(): InlineKeyboardMarkup {
  // Teclado base de Encuentros (antes de "Reservar")
  return {
    inline_keyboard: [
      [
        { text: "🕒 Ver precios", callback_data: K.ENC_PRECIOS },
        { text: "📅 Reservar", callback_data: K.ENC_RESERVAR },
      ],
      [{ text: "🏠 Inicio", callback_data: K.HOME }],
    ],
  };
}

// Teclado para CUANDO el usuario toca "Reservar":
// Muestra "Ver precios" + "Link de pago" + "Inicio"
export function kbEncuentrosReserva(payUrl?: string): InlineKeyboardMarkup {
  const url = payUrl ?? "";
  return {
    inline_keyboard: [
      [
        { text: "🕒 Ver precios", callback_data: K.ENC_PRECIOS },
        { text: "💳 Link de pago", url },
      ],
      [{ text: "🏠 Inicio", callback_data: K.HOME }],
    ],
  };
}

// Submenús simples (Sorteo/Virtuales/Eventos) → solo Inicio
export function kbHomeOnly(): InlineKeyboardMarkup {
  return { inline_keyboard: [[{ text: "🏠 Inicio", callback_data: K.HOME }]] };
}

// Teclado para Sorteo con Link de pago + Inicio
export function kbSorteo(payUrl?: string): InlineKeyboardMarkup {
  const url = payUrl ?? "";
  return {
    inline_keyboard: [
      [{ text: "💳 Link de pago", url }],
      [{ text: "🏠 Inicio", callback_data: K.HOME }],
    ],
  };
}
