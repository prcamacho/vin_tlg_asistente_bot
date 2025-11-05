import { Telegraf } from "telegraf";
import type { Context } from "telegraf";
import { Copy, K } from "./flows.js";
import {
  kbRoot,
  kbVipMain,
  kbVipPay,
  kbEncuentros,
  kbHomeOnly,
} from "./keyboards.js";

const TOKEN: string = process.env.TELEGRAM_BOT_TOKEN ?? "";
const ADMIN_CHAT_ID: string = process.env.ADMIN_CHAT_ID ?? "";
const MP_VIP_LINK: string = process.env.MP_VIP_LINK ?? "";

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
    await sendClean(ctx, "elegí una opción:", kbRoot());
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
        // Texto renovado: VIP + catálogo + mejor precio por bot
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
          "orientativo de valores:\n30 min → 15k\n45 min → 45k\n1h → 90k\n(se reserva con seña)",
          kbEncuentros()
        );
        break;

      case K.ENC_RESERVAR:
        await ctx.answerCbQuery();
        await sendClean(
          ctx,
          "para reservar necesito:\n• día y franja horaria\n• zona / barrio\n\nsi querés, te paso alias/MP para la seña.",
          kbEncuentros()
        );
        break;

      // ====== Otros menús (solo Inicio) ======
      case K.SORTEO:
        await ctx.answerCbQuery();
        await sendClean(ctx, Copy.SORTEO_INTRO, kbHomeOnly());
        break;

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
