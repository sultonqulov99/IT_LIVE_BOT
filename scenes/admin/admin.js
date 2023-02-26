const { Scenes, Markup } = require("telegraf");

const scene = new Scenes.BaseScene("admin");

scene.enter((ctx) => {
  const text = "👨‍💻 Hurmatli admin, admin paneliga xush kelibsiz!";
  const keyboard = Markup.keyboard([
    "➕ Yangi test qo'shish",
    "◀️ Admin paneldan chiqish",
  ]);
  ctx.reply(text, keyboard);
});

scene.hears("➕ Yangi test qo'shish", (ctx) =>
  ctx.scene.enter("admin:addTest")
);

scene.hears("◀️ Admin paneldan chiqish", (ctx) => ctx.scene.enter("start"));

module.exports = scene;
