const { Markup } = require("telegraf");
const bot = require("../core/bot");
const config = require("../utils/config");
const logger = require("../utils/logger");

module.exports = async (ctx, next) => {
  let { channels } = config;
  let notJoined = [];
  for (let channel of channels) {
    try {
      const joined = await isJoined(channel, ctx.from.id);
      if (!joined) {
        notJoined.push(channel);
      }
    } catch (error) {
      logger.warn("[subscribtion]: User subscribtion couldn't be verified!", {
        channel,
        user: ctx.from,
        message: error.message,
      });
      notJoined.push(channel);
    }
  }
  if (notJoined.length === 0) return next();
  let text = `⚠️ Hurmatli foydalanuvchi. Botdan to'liq foydalanish uchun quyidagi kanallarga a'zo bo'lishingiz kerak!`;
  const buttons = [];
  for (let channel of notJoined) {
    try {
      const chat = await bot.telegram.getChat(channel);
      text += `\n✖️ <b>${chat.title}</b>`;
      const chatLink = getChatLink(chat.username);
      buttons.push([Markup.button.url(chat.title, chatLink)]);
    } catch (error) {
      logger.warn("[subscribtion]: Couldn't get chat info!", {
        channel,
        user: ctx.from,
        message: error.message,
      });
    }
  }
  buttons.push([Markup.button.callback("✅ A'zo bo'ldim", "subscribed")]);
  ctx.replyWithHTML(text, Markup.inlineKeyboard(buttons));
};

const memberStatuses = ["member", "administrator", "creator"];

function isMember(chatMember) {
  if (chatMember.status === "restricted" && chatMember.is_member) return true;
  return memberStatuses.includes(chatMember.status);
}

async function isJoined(chatId, userId) {
  const chatMember = await bot.telegram.getChatMember(chatId, userId);
  return isMember(chatMember);
}

function getChatLink(username) {
  return `https://t.me/${username}`;
}
