const { Scenes, Markup } = require("telegraf");
const { Student } = require("../database/models");
const { districts } = require("../utils/constants");
const logger = require("../utils/logger");

const scene = new Scenes.WizardScene(
  "register",
  (ctx) => {
    const text =
      "❗️ Iltimos, ism familiyangizni kiriting.\n\n<i>Misol:</i> <code>Polonchiyev Pistonchi</code>";
    ctx.replyWithHTML(text, { reply_markup: { remove_keyboard: true } });
    ctx.wizard.next();
  },
  (ctx) => {
    const name = ctx.message?.text;
    if (!name)
      return ctx.replyWithHTML(
        "❗️ Iltimos, nomingizni to'g'ri yuborganingizga ishonch hosil qiling!"
      );
    ctx.wizard.state.name = name;

    const text =
      "❗️ Endi tahsil oladigan maktabingizni yuboring YOKI bitirganman.\n\n<i>Misol:</i> <code>8-maktab</code>";
    ctx.replyWithHTML(text, { reply_markup: { remove_keyboard: true } });
    ctx.wizard.next();
  },
  (ctx) => {
    const school = ctx.message?.text;
    if (!school)
      return ctx.replyWithHTML(
        "❗️ Iltimos, maktabingiz nomini to'g'ri yuborganingizga ishonch hosil qiling!"
      );
    ctx.wizard.state.school = school;
    const text = "❗️ Endi tegishli tumanni tanlang.";
    const buttons = districts.map((district) => district.name);
    const keyboard = Markup.keyboard(buttons, { columns: 2 });
    ctx.reply(text, keyboard);
    ctx.wizard.next();
    // const text =
    //   "❗️ Endi tahsil oladigan sinfingizni yuboring.\n\n<i>Misol:</i> <code>9-sinf</code>";
    // ctx.replyWithHTML(text, { reply_markup: { remove_keyboard: true } });
    ctx.wizard.next();
  },
  (ctx) => {
  //   const group = ctx.message?.text;
  //   if (!group)
  //     return ctx.replyWithHTML(
  //       "❗️ Iltimos, sinfingizni to'g'ri yuborganingizga ishonch hosil qiling!"
  //     );
  //   ctx.wizard.state.group = group;

    // const text = "❗️ Endi tegishli tumanni tanlang.";
    // const buttons = districts.map((district) => district.name);
    // const keyboard = Markup.keyboard(buttons, { columns: 2 });
    // ctx.reply(text, keyboard);
    // ctx.wizard.next();
  },
  async (ctx) => {
    const district = districts.find((d) => d.name === ctx.message?.text);
    if (!district)
      return ctx.replyWithHTML(
        "❗️ Iltimos, tumaningizni to'g'ri yuborganingizga ishonch hosil qiling!"
      );
    ctx.wizard.state.district = district.name;

    ctx.wizard.state.telegramId = ctx.from.id;
    const student = new Student(ctx.wizard.state);
    try {
      await student.save();
      ctx.session.user = student;
      ctx.replyWithHTML(
        "🥳 Sizni ro'yhatdan muvaffaqiyatli o'tganingiz bilan qutlayman! Botni ishlatishda davom etishingiz mumkin"
      );
    } catch (error) {
      logger.warn("[database]: New student could not be saved!", {
        message: error.message,
        student,
        user: ctx.from,
      });
      ctx.replyWithHTML(
        "🙁 Sizni ro'yhatga olishda xatolik yuz berdi. Iltimos, yana urinib ko'ring."
      );
    }

    ctx.scene.enter("start");
  }
);

module.exports = scene;
