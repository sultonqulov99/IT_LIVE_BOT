const { Scenes, Markup } = require("telegraf");
const Test = require("../../database/models/Test");
const { saveCertificateTemplate } = require("../../utils/certificate");
const logger = require("../../utils/logger");

const scene = new Scenes.WizardScene(
  "admin:addTest",
  (ctx) => {
    const text =
      "#️⃣ Yangi test uchun kodni yuboring.\n\n<i>Misol</i>: <code>1111</code>";
    const keyboard = Markup.keyboard(["◀️ Admin panelga qaytish"]).resize();
    ctx.replyWithHTML(text, keyboard);
    ctx.wizard.next();
  },
  (ctx) => {
    const code = +ctx.message?.text;
    if (!code || isNaN(code) || typeof code !== "number")
      return ctx.reply(
        "⚠️ Iltimos, kodni to'g'ri shaklda (son) yuborganizga ishonch hosil qiling!"
      );
    ctx.wizard.state.code = code;

    const text =
      "✔️ Barcha test javoblarini ketma-ket tarzda oraliq masofasiz yuboring!\n\n<i>Misol:</i> <code>abcdeabcdeabcdeabcdeabcdeabcde</code>";
    ctx.replyWithHTML(text);
    ctx.wizard.next();
  },
  (ctx) => {
    const answers = ctx.message?.text;
    if (!answers)
      return ctx.reply(
        "⚠️ Iltimos, javoblarni to'g'ri shaklda yuborganizga ishonch hosil qiling!"
      );
    ctx.wizard.state.answers = answers;

    const text =
      "🖼 Sertifikat template'ni file ko'rinishda yuboring! (Barcha sertifikatlar bir xil o'lchamlarda ishlanishi kerak)";
    ctx.reply(text);
    ctx.wizard.next();
  },
  async (ctx) => {
    const file = ctx.message?.document;
    if (!file)
      return ctx.reply(
        "⚠️ Iltimos, to'g'ri sertifikatni file ko'rinishda yuboring!"
      );

    const test = new Test(ctx.wizard.state);
    try {
      await saveCertificateTemplate(file, test.code);
      await test.save();
      ctx.reply("✅ Yangi test muvaffaqiyatli qo'shildi va tayyor!");
      ctx.scene.enter("admin");
    } catch (error) {
      logger.error("[database]: New test could not be saved!", {
        message: error.message,
        test,
        user: ctx.from,
      });
      ctx.replyWithHTML(
        "🙁 Testni qo'shishda xatolik yuz berdi. Iltimos, yana urinib ko'ring."
      );
    }
  }
);

scene.hears("◀️ Admin panelga qaytish", (ctx) => ctx.scene.enter("admin"));

module.exports = scene;
