const { Student } = require("../database/models");

module.exports = async (ctx, next) => {
  if (ctx.session.user) return next();
  const user = await Student.findOne({ telegramId: ctx.from.id });
  if (user) {
    ctx.session.user = user;
    return next();
  }
  return ctx.scene.enter("register");
};
