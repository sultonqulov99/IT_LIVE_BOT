const { Scenes, Markup } = require("telegraf");
const { getCurrentTimeStamp } = require("../utils/date");

const scene = new Scenes.BaseScene("start");

scene.enter((ctx) => {
  const text = `👇 Quyidagilardan birini tanlang`;
  const keyboard = Markup.keyboard([
    ["✅ MANTIQ testini tekshirish"],
    ["✅ PHP testini tekshirish"],
    ["✅ NODE.JS testini tekshirish"],
    ["✅ JAVA testini tekshirish"],
    ["✅ JAVASCRIPT testini tekshirish"],
    ["✅ FRONTEND testini tekshirish"],
    ["✅ ALGORITM testini tekshirish"],
    ["✅ IT ENGLISH testini tekshirish"],
    [
      // "🎗 Informatika sertifikati",
      "👤 Mening ma'lumotlarim",
    ],
  ]).resize();
  ctx.reply(text, keyboard);
});

scene.hears("✅ MANTIQ testini tekshirish", (ctx) =>
  ctx.scene.enter("check")
);
scene.hears("✅ PHP testini tekshirish", (ctx) =>
  ctx.scene.enter("check")
);
scene.hears("✅ NODE.JS testini tekshirish", (ctx) =>
  ctx.scene.enter("check")
);
scene.hears("✅ JAVA testini tekshirish", (ctx) =>
  ctx.scene.enter("check")
);
scene.hears("✅ JAVASCRIPT testini tekshirish", (ctx) =>
  ctx.scene.enter("check")
);
scene.hears("✅ FRONTEND testini tekshirish", (ctx) =>
  ctx.scene.enter("check")
);
scene.hears("✅ ALGORITM testini tekshirish", (ctx) =>
  ctx.scene.enter("check")
);
scene.hears("✅ IT ENGLISH testini tekshirish", (ctx) =>
  ctx.scene.enter("check")
);

// scene.hears("🎗 Informatika sertifikati", (ctx) => ctx.scene.enter("certificate"));

scene.hears("👤 Mening ma'lumotlarim", (ctx) => {
  const { user } = ctx.session;
  const timestamp = getCurrentTimeStamp();
  const text = `<b>Sizning ma'lumotlaringiz</b>\nRol: <i>O'quvchi</i>\n\n👤 Ism, Familiya: <i>${user.name}</i>\n🏘 Tuman: <i>${user.district}</i>\n🏫 Maktab: <i>${user.school}</i>\n\nMa'lumot aktualligi: <code>${timestamp}</code>`;
  ctx.replyWithHTML(text);
});

module.exports = scene;
