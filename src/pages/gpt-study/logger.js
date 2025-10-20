// small logger utility for gpt-study
const prefix = '[gpt-study]';

const time = () => new Date().toISOString();

const info = (...args) => console.log(`${time()} ${prefix} INFO:`, ...args);
const warn = (...args) => console.warn(`${time()} ${prefix} WARN:`, ...args);
const error = (...args) => console.error(`${time()} ${prefix} ERROR:`, ...args);
const debug = (...args) => console.debug(`${time()} ${prefix} DEBUG:`, ...args);

export default {
  info,
  warn,
  error,
  debug,
};
