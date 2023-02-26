const { Scenes, Markup } = require("telegraf");
const { getResult } = require("../utils/checker");
const logger = require("../utils/logger");

const scene = new Scenes.WizardScene(
  "check",
  (ctx) => {
    if(ctx.message.text == '✅ MANTIQ testini tekshirish'){
      const text =
      "✍️ Marhamat, javoblaringizni yuborishingiz mumkin!\n❗️ YO'RIQNOMA:\nJavoblarni kod*javoblar ko'rinishda yuborishingiz kerak!\n\n<i>Misol:</i> <code>mantiq*abcdeabcdeabcdeabcdeabcdeabcde</code>";
      const keyboard = Markup.keyboard(["◀️ Asosiy bo'limga qaytish"]).resize();
      ctx.replyWithHTML(text, keyboard);
      ctx.wizard.next();
    }
    else if(ctx.message.text == '✅ PHP testini tekshirish'){
      const text =
      "✍️ Marhamat, javoblaringizni yuborishingiz mumkin!\n❗️ YO'RIQNOMA:\nJavoblarni kod*javoblar ko'rinishda yuborishingiz kerak!\n\n<i>Misol:</i> <code>php*abcdeabcdeabcdeabcdeabcdeabcde</code>";
      const keyboard = Markup.keyboard(["◀️ Asosiy bo'limga qaytish"]).resize();
      ctx.replyWithHTML(text, keyboard);
      ctx.wizard.next();
    }
    else if(ctx.message.text == '✅ NODE.JS testini tekshirish'){
      const text =
      "✍️ Marhamat, javoblaringizni yuborishingiz mumkin!\n❗️ YO'RIQNOMA:\nJavoblarni kod*javoblar ko'rinishda yuborishingiz kerak!\n\n<i>Misol:</i> <code>nodejs*abcdeabcdeabcdeabcdeabcdeabcde</code>";
      const keyboard = Markup.keyboard(["◀️ Asosiy bo'limga qaytish"]).resize();
      ctx.replyWithHTML(text, keyboard);
      ctx.wizard.next();
    }
    else if(ctx.message.text == '✅ JAVA testini tekshirish'){
      const text =
      "✍️ Marhamat, javoblaringizni yuborishingiz mumkin!\n❗️ YO'RIQNOMA:\nJavoblarni kod*javoblar ko'rinishda yuborishingiz kerak!\n\n<i>Misol:</i> <code>java*abcdeabcdeabcdeabcdeabcdeabcde</code>";
      const keyboard = Markup.keyboard(["◀️ Asosiy bo'limga qaytish"]).resize();
      ctx.replyWithHTML(text, keyboard);
      ctx.wizard.next();
    }
    else if(ctx.message.text == '✅ JAVASCRIPT testini tekshirish'){
      const text =
      "✍️ Marhamat, javoblaringizni yuborishingiz mumkin!\n❗️ YO'RIQNOMA:\nJavoblarni kod*javoblar ko'rinishda yuborishingiz kerak!\n\n<i>Misol:</i> <code>javascript*abcdeabcdeabcdeabcdeabcdeabcde</code>";
      const keyboard = Markup.keyboard(["◀️ Asosiy bo'limga qaytish"]).resize();
      ctx.replyWithHTML(text, keyboard);
      ctx.wizard.next();
    }
    else if(ctx.message.text == '✅ FRONTEND testini tekshirish'){
      const text =
      "✍️ Marhamat, javoblaringizni yuborishingiz mumkin!\n❗️ YO'RIQNOMA:\nJavoblarni kod*javoblar ko'rinishda yuborishingiz kerak!\n\n<i>Misol:</i> <code>frontend*abcdeabcdeabcdeabcdeabcdeabcde</code>";
      const keyboard = Markup.keyboard(["◀️ Asosiy bo'limga qaytish"]).resize();
      ctx.replyWithHTML(text, keyboard);
      ctx.wizard.next();
    }
    else if(ctx.message.text == '✅ ALGORITM testini tekshirish'){
      const text =
      "✍️ Marhamat, javoblaringizni yuborishingiz mumkin!\n❗️ YO'RIQNOMA:\nJavoblarni kod*javoblar ko'rinishda yuborishingiz kerak!\n\n<i>Misol:</i> <code>algoritm*abcdeabcdeabcdeabcdeabcdeabcde</code>";
      const keyboard = Markup.keyboard(["◀️ Asosiy bo'limga qaytish"]).resize();
      ctx.replyWithHTML(text, keyboard);
      ctx.wizard.next();
    }
    else if(ctx.message.text == '✅ IT ENGLISH testini tekshirish'){
      const text =
      "✍️ Marhamat, javoblaringizni yuborishingiz mumkin!\n❗️ YO'RIQNOMA:\nJavoblarni kod*javoblar ko'rinishda yuborishingiz kerak!\n\n<i>Misol:</i> <code>itenglish*abcdeabcdeabcdeabcdeabcdeabcde</code>";
      const keyboard = Markup.keyboard(["◀️ Asosiy bo'limga qaytish"]).resize();
      ctx.replyWithHTML(text, keyboard);
      ctx.wizard.next();
    }
  },
  async (ctx) => {
    const input = getTestFromInput(ctx.message?.text);
    if (!input)
      return ctx.reply(
        "⚠️ Iltimos, javoblaringizni yuqorida ko'rsatilgan shaklda kiritganingizga ishonch komil qiling!"
      );

    try {
      const result = await getResult(
        input.code,
        input.answers,
        ctx.session.user
      );
      const text = `🎊 Testda qatnashganingizdan minnatdormiz!\n\nSizning bu testdagi natijangiz:\n✅ To'g'ri javoblar: <b>${result.correct} ta</b>\n❌ Xato javoblar: <b>${result.incorrect} ta</b>`;
      ctx.replyWithHTML(text);
      ctx.scene.enter("start");
    } catch (error) {
      logger.warn("[database]: Result could not be saved!", {
        message: error.message,
        input,
        student: ctx.session.user,
        user: ctx.from,
      });
      ctx.replyWithHTML(
        "🙁 Sizni javoblaringizni tekshirishda xatolik yuz berdi. Iltimos, yana urinib ko'ring."
      );
    }
  }
);

scene.hears("◀️ Asosiy bo'limga qaytish", (ctx) => ctx.scene.enter("start"));

const codeAndAnswersRegex = /(\D+)\*(.+)/;

function getTestFromInput(input) {
  if (!input) return null;
  const match = input.match(codeAndAnswersRegex);
  if (
    !match ||
    !match[1] ||
    !match[2] ||
    !isNaN(+match[1]) ||
    typeof +match[1] == "string"
  )
    return null;
  return {
    code: match[1],
    answers: match[2],
  };
}
module.exports = scene;
