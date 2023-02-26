require("dotenv").config();

const config = {
  isProduction: process.env.NODE_ENV === "production",
  token: process.env.BOT_TOKEN,
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
  sessionType: process.env.SESSION_TYPE,
  database: process.env.DATABASE_URI,
  channels: (process.env.CHANNELS || "").split(",").map((id) => +id),
  admins: (process.env.ADMINS || "").split(",").map((id) => +id),
  dropPendingUpdates: process.env.DROP_PENDING_UPDATES || false,
};

module.exports = config;
