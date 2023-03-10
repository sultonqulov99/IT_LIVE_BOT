const { Scenes, Markup } = require("telegraf");
const { getCurrentTimeStamp } = require("../utils/date");

const scene = new Scenes.BaseScene("start");

scene.enter((ctx) => {
  const text = `š Quyidagilardan birini tanlang`;
  const keyboard = Markup.keyboard([
    ["ā MANTIQ testini tekshirish"],
    ["ā PHP testini tekshirish"],
    ["ā NODE.JS testini tekshirish"],
    ["ā JAVA testini tekshirish"],
    ["ā JAVASCRIPT testini tekshirish"],
    ["ā FRONTEND testini tekshirish"],
    ["ā ALGORITM testini tekshirish"],
    ["ā IT ENGLISH testini tekshirish"],
    [
      // "š Informatika sertifikati",
      "š¤ Mening ma'lumotlarim",
    ],
  ]).resize();
  ctx.reply(text, keyboard);
});

scene.hears("ā MANTIQ testini tekshirish", (ctx) =>
  ctx.scene.enter("check")
);
scene.hears("ā PHP testini tekshirish", (ctx) =>
  ctx.scene.enter("check")
);
scene.hears("ā NODE.JS testini tekshirish", (ctx) =>
  ctx.scene.enter("check")
);
scene.hears("ā JAVA testini tekshirish", (ctx) =>
  ctx.scene.enter("check")
);
scene.hears("ā JAVASCRIPT testini tekshirish", (ctx) =>
  ctx.scene.enter("check")
);
scene.hears("ā FRONTEND testini tekshirish", (ctx) =>
  ctx.scene.enter("check")
);
scene.hears("ā ALGORITM testini tekshirish", (ctx) =>
  ctx.scene.enter("check")
);
scene.hears("ā IT ENGLISH testini tekshirish", (ctx) =>
  ctx.scene.enter("check")
);

// scene.hears("š Informatika sertifikati", (ctx) => ctx.scene.enter("certificate"));

scene.hears("š¤ Mening ma'lumotlarim", (ctx) => {
  const { user } = ctx.session;
  const timestamp = getCurrentTimeStamp();
  const text = `<b>Sizning ma'lumotlaringiz</b>\nRol: <i>O'quvchi</i>\n\nš¤ Ism, Familiya: <i>${user.name}</i>\nš Tuman: <i>${user.district}</i>\nš« Maktab: <i>${user.school}</i>\n\nMa'lumot aktualligi: <code>${timestamp}</code>`;
  ctx.replyWithHTML(text);
});

module.exports = scene;
