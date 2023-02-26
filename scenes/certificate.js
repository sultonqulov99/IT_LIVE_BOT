const { Scenes, Markup } = require("telegraf");
const { getResultForCertificate } = require("../utils/certificate");
const path = require("path");

const scene = new Scenes.WizardScene(
  "certificate",
  (ctx) => {
    const text =
      "#️⃣ Ishtirok sertifikatini olmoqchi bo'lgan testingizga tegishli bo'lgan kodni kiriting.";
    const keyboard = Markup.keyboard(["◀️ Orqaga"]).resize();
    ctx.reply(text, keyboard);
    ctx.wizard.next();
  },
  async (ctx) => {
    const result = await getResultForCertificate(
      +ctx.message?.text,
      ctx.session.user
    );
    if (!result)
      return ctx.reply(
        "⚠️ Iltimos, to'g'ri kod kiritganingizga va bu testda ishtirok etganingizga ishonch hosil qiling"
      );

    const photoPath = path.resolve(
      __dirname,
      "..",
      "certificates",
      result.certificateFile
    );

    await ctx.replyWithPhoto({ source: photoPath });
    ctx.scene.enter("start");
  }
);

scene.hears("◀️ Orqaga", (ctx) => ctx.scene.enter("start"));

module.exports = scene;
