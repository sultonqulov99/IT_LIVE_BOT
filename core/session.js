const config = require("../utils/config");

const RedisSession = require("telegraf-session-redis");
const { session: memorySession } = require("telegraf");

const session =
  config.sessionType === "redis"
    ? new RedisSession({
        store: {
          host: config.redis?.host || "127.0.0.1",
          port: config.redis?.port || 6379,
        },
      })
    : memorySession();

module.exports = session;
