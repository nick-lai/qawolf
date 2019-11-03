import dotenv from "dotenv";

const dotEnvPath = process.env.QAW_DOTENV_PATH;
dotenv.config(dotEnvPath ? { path: dotEnvPath } : {});

const testUrl = process.env.QAW_TEST_URL || "http://localhost:5000/";

const parseBool = (value: string | undefined) => {
  return !!value && value !== "false";
};

const parseNumber = (value: string | undefined, defaultValue: number = 0) => {
  if (typeof value === "undefined") return defaultValue;

  return parseFloat(value);
};

export const CONFIG = {
  chromeExecutablePath: process.env.QAW_CHROME_EXECUTABLE_PATH,
  chromeOffsetX: parseNumber(process.env.QAW_CHROME_OFFSET_X, 0),
  chromeOffsetY: parseNumber(process.env.QAW_CHROME_OFFSET_Y, 125),
  dataAttribute: process.env.QAW_DATA_ATTRIBUTE || null,
  debug: parseBool(process.env.QAW_DEBUG),
  development: parseBool(process.env.QAW_DEVELOPMENT),
  display: process.env.DISPLAY || ":1.0",
  docker: parseBool(process.env.QAW_DOCKER),
  domPath: process.env.QAW_DOM_PATH,
  findTimeoutMs: parseNumber(process.env.QAW_FIND_TIMEOUT_MS, 30000),
  headless: parseBool(process.env.QAW_HEADLESS),
  logLevel: process.env.QAW_LOG_LEVEL,
  logPath: process.env.QAW_LOG_PATH,
  serial: parseBool(process.env.QAW_SERIAL),
  // slow down each step by 2s to make it watchable
  // this also gives sites time to setup their handlers
  sleepMs: parseNumber(process.env.QAW_SLEEP_MS, 2000),
  testUrl,
  videoPath: process.env.QAW_VIDEO_PATH
};
