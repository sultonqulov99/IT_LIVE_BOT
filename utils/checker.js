const Result = require("../database/models/Result");
const Test = require("../database/models/Test");
const { generateCertificate } = require("./certificate");

const getResult = async (code, answers, student) => {
  const test = await Test.findOne({ code });
  if (!test) throw new Error("Test not found!");
  const isAlreadyParticipated = await isParticipated(test, student);
  if (isAlreadyParticipated)
    throw new Error("Student already participated in this test!");
  const { correct, incorrect } = compareAnswers(answers, test.answers);

  const certificateFile = await generateCertificate(student.name, test.code);

  const result = new Result({
    test: test._id,
    student: student._id,
    course:code,
    correct,
    incorrect,
    certificateFile,
  });
  await result.save();
  return result;
};

async function isParticipated(test, student) {
  const result = await Result.findOne({ test: test._id, student: student._id });
  if (!result) return false;
  return true;
}

function compareAnswers(input, actual) {
  let correct = 0;
  let incorrect = 0;
  for (let index in actual) {
    if (input[index] === actual[index]) {
      correct++;
    } else {
      incorrect++;
    }
  }
  return {
    correct,
    incorrect,
  };
}

module.exports = {
  getResult,
};
