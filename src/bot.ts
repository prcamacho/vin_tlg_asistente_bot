import { Telegraf } from "telegraf";
import type { Context } from "telegraf";
import { Copy, K, LINKS } from "./flows.js";
import {
  kbRoot,
  kbVipMain,
  kbVipPay,
  kbEncuentros,
  kbEncuentrosReserva,
  kbHomeOnly,
  kbSorteo,
} from "./keyboards.js";

const TOKEN: string = process.env.TELEGRAM_BOT_TOKEN ?? "";
const ADMIN_CHAT_ID: string = process.env.ADMIN_CHAT_ID ?? "";
const MP_VIP_LINK: string = LINKS.MP_VIP;
const MP_SORTEO_LINK: string = LINKS.MP_SORTEO;
const MP_ENC_LINK: string = LINKS.MP_ENC;

if (!TOKEN) throw new Error("Falta TELEGRAM_BOT_TOKEN en .env");

// ====== LIMPIEZA (solo mensajes del bot) ======
const botMsgsByChat = new Map<number, number[]>();

function recordBotMsg(chatId: number, msgId: number) {
  const arr = botMsgsByChat.get(chatId) ?? [];
  arr.push(msgId);
  if (arr.length > 50) arr.splice(0, arr.length - 50);
  botMsgsByChat.set(chatId, arr);
}

async function purgeBotMessages(ctx: Context) {
  const chatId = ctx.chat?.id;
  if (!chatId) return;

  const ids = botMsgsByChat.get(chatId) ?? [];
  if (!ids.length) return;

  while (ids.length) {
    const id = ids.pop()!;
    try {
      await ctx.telegram.deleteMessage(chatId, id);
    } catch {}
  }
  botMsgsByChat.set(chatId, []);
}

async function sendClean(ctx: Context, text: string, reply_markup?: any) {
  await purgeBotMessages(ctx);
  const sent = await ctx.reply(
    text,
    reply_markup ? { reply_markup } : undefined
  );
  // ts-expect-error
  recordBotMsg(sent.chat.id, sent.message_id);
  return sent;
}

// ====== enviar FOTO limpiando antes (URL pública / file_id) ======
async function sendPhotoClean(
  ctx: Context,
  photoUrl: string,
  caption?: string,
  reply_markup?: any
) {
  await purgeBotMessages(ctx);
  const sent = await (ctx as any).replyWithPhoto(photoUrl, {
    ...(caption ? { caption } : {}),
    ...(reply_markup ? { reply_markup } : {}),
  });
  // ts-expect-error
  recordBotMsg(sent.chat.id, sent.message_id);
  return sent;
}

function userHandle(ctx: Context) {
  const u = (ctx.from as any) || {};
  return u.username
    ? `@${u.username}`
    : `${u.first_name || ""} ${u.last_name || ""}`.trim() || `id:${u.id}`;
}

export function createBot() {
  const bot = new Telegraf(TOKEN);

  // /start → limpia y muestra menú raíz
  bot.start(async (ctx) => {
    await sendClean(ctx, Copy.START, kbRoot());
  });

  // Cualquier texto (v1 sin IA) → vuelve al inicio con menú raíz
  bot.on("message", async (ctx) => {
    await sendClean(
      ctx,
      "Elegí una opción corazón, en caso de querer comunicarte conmigo escribí a @Vin_Salta",
      kbRoot()
    );
  });

  // Botones (callback_query)
  bot.on("callback_query", async (ctx) => {
    const data: string = (ctx.callbackQuery as any)?.data || "";
    try {
      await ctx.deleteMessage();
    } catch {}

    switch (data) {
      // ====== Inicio ======
      case K.HOME:
        await ctx.answerCbQuery();
        await sendClean(ctx, Copy.START, kbRoot());
        break;

      // ====== Grupo VIP ======
      case K.VIP:
        await ctx.answerCbQuery();
        await sendClean(ctx, Copy.VIP_INTRO, kbVipMain());
        break;

      case K.VIP_INFO:
        await ctx.answerCbQuery();
        await sendClean(ctx, Copy.VIP_INCLUDES, kbVipMain());
        break;

      case K.VIP_PAY: {
        await ctx.answerCbQuery();

        // Notificación al admin al pedir link
        if (ADMIN_CHAT_ID) {
          const who = userHandle(ctx);
          const u = (ctx.from as any) || {};
          const txt = `💳 Solicita link de pago VIP\nUsuario: ${who} (id:${u.id})`;
          try {
            await ctx.telegram.sendMessage(ADMIN_CHAT_ID, txt);
          } catch {}
        }

        await sendClean(ctx, Copy.VIP_PAY, kbVipPay(MP_VIP_LINK));
        break;
      }

      // ====== Encuentros ======
      case K.ENCUENTROS:
        await ctx.answerCbQuery();
        await sendClean(ctx, Copy.ENCUENTROS_INTRO, kbEncuentros());
        break;

      case K.ENC_PRECIOS:
        await ctx.answerCbQuery();
        await sendPhotoClean(
          ctx,
          "https://pub-e21f3877231140e8a453d3e38605acff.r2.dev/tarifas.png",
          "Tarifas Especiales si reservas mediante este bot:\n40 min → 65 mil\n1h → 75mil\n(Te espero con ganas 💋)",
          kbEncuentros()
        );
        break;

      case K.ENC_RESERVAR:
        await ctx.answerCbQuery();
        // Al tocar "Reservar": cambiamos los botones por "Ver precios" + "Link de pago" + "Inicio"
        await sendClean(
          ctx,
          "Para reservar necesito:\n• Día y franja horaria que te gustaria venir\n• Mi dpto esta en Tres Cerritos\n\nHace click en el link de pago y luego pasame comprobante y la info por privado corazón @Vin_Salta",
          kbEncuentrosReserva(MP_ENC_LINK)
        );
        break;

      // ====== Sorteo (con Link de pago + Inicio) ======
      // ====== Sorteo (con imagen + caption + Link de pago + Inicio) ======
      case K.SORTEO:
        await ctx.answerCbQuery();
        await sendPhotoClean(
          ctx,
          "https://pub-e21f3877231140e8a453d3e38605acff.r2.dev/vin_sorteo.png",
          Copy.SORTEO_INTRO,
          kbSorteo(MP_SORTEO_LINK)
        );
        break;

      // ====== Otros menús (solo Inicio) ======
      case K.VIRTUALES:
        await ctx.answerCbQuery();
        await sendClean(ctx, Copy.VIRTUALES_INTRO, kbHomeOnly());
        break;

      case K.EVENTOS:
        await ctx.answerCbQuery();
        await sendClean(ctx, Copy.EVENTOS_INTRO, kbHomeOnly());
        break;

      default:
        await ctx.answerCbQuery();
    }
  });

  return bot;
}
