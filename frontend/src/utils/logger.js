// src/utils/logger.js
const isDev = process.env.NODE_ENV === 'development';

export const logger = {
  info: (msg, data = '') => isDev && console.log(`%c[INFO]: ${msg}`, 'color: #00adef', data),
  success: (msg, data = '') => isDev && console.log(`%c[SUCCESS]: ${msg}`, 'color: #00ff00', data),
  error: (msg, error = '') => isDev && console.error(`[ERROR]: ${msg}`, error),
};