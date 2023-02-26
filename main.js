const bot = require("./core/bot");
const session = require("./core/session");
const auth = require("./middlewares/auth");
const isAdmin = require("./middlewares/isAdmin");
const onlyPrivate = require("./middlewares/onlyPrivate");
const subscribtion = require("./middlewares/subscribtion");
const stage = require("./scenes");
const config = require("./utils/config");
const logger = require("./utils/logger");

require("./database");

bot.use(onlyPrivate);

bot.action("subscribed", async (ctx, next) => {
  await ctx.deleteMessage();
  subscribtion(ctx, next);
});
bot.use(subscribtion);

bot.use(session);
bot.use(stage.middleware());
bot.use(auth);

bot.start((ctx) => ctx.scene.enter("start"));

bot.command("admin", isAdmin, (ctx) => ctx.scene.enter("admin"));

bot.catch((err, ctx) => {
  logger.error("[bot]: Bot error caught", {
    message: err.message,
    user: ctx.from,
  });
});

process.on("uncaughtException", (error) => {
  logger.error("[exception]: Exception caught", {
    message: error.message,
  });
});
process.on("unhandledRejection", (error) => {
  logger.error("[exception]: Exception caught", {
    message: error.message,
  });
});     
   
bot.launch({
  dropPendingUpdates: config.dropPendingUpdates,
});
logger.info(`Bot started!`);
