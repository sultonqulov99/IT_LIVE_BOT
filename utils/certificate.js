const Result = require("../database/models/Result");
const Test = require("../database/models/Test");
const crypto = require("crypto");
const path = require("path");
const Jimp = require("jimp");
const logger = require("./logger");
const bot = require("../core/bot");
const download = require("download");
const mime = require("mime-types");

const getResultForCertificate = async (code, student) => {
  if (!code || isNaN(code) || typeof code !== "number") return null;

  const test = await Test.findOne({ code });
  if (!test) return null;

  const result = await Result.findOne({ test: test._id, student: student._id });
  if (!result) return null;
  return result;
};

const generateCertificate = async (name, code) => {
  const templatePath = path.resolve(
    __dirname,
    "..",
    "templates",
    String(code) + ".jpeg"
  );
  try {
    const loadedImage = await Jimp.read(templatePath);
    const font = await Jimp.loadFont(Jimp.FONT_SANS_128_BLACK);
    const imageWithText = await loadedImage.print(
      font,
      getCenterCoordinates(name, font),
      1030,
      name
    );

    const filename = crypto.randomUUID() + "." + imageWithText.getExtension();
    const filePath = path.resolve(__dirname, "..", "certificates", filename);
    await imageWithText.writeAsync(filePath);
    return filename;
  } catch (error) {
    logger.error("[certificate]: Couldn't generate certificate", {
      message: error.message,
      details: { name, code },
    });
    return null;
  }
};

function getCenterCoordinates(text, font, width = 3508) {
  const textWidth = Jimp.measureText(font, text);
  const offset = (width - textWidth) / 2;
  return offset;
}

async function saveCertificateTemplate(file, code) {
  const fileLink = await bot.telegram.getFileLink(file.file_id);
  const filePath = path.resolve(
    __dirname,
    "..",
    "templates"
  );
  const fileExtension = mime.extension(file.mime_type);
  const filename = code + "." + fileExtension;
  await download(fileLink, filePath, { filename });
  return true;
}

module.exports = {
  getResultForCertificate,
  generateCertificate,
  saveCertificateTemplate,
};
