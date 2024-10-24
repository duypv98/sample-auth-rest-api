const { ParseEnv } = require("./env");
/**
 * 
 * @param {{
 *  maxAge?: number;
 * }} args
 */
function getCookieOptions(args = {}) {
  const { maxAge = null } = args;
  const cookieOptions = { httpOnly: true, maxAge };
  if (ParseEnv.bool('COOKIE_SECURED_ENDPOINT')) cookieOptions.secure = true;
  if (process.env.COOKIE_SAME_SITE) cookieOptions.sameSite = process.env.COOKIE_SAME_SITE;
  if (process.env.COOKIE_DOMAIN) cookieOptions.domain = process.env.COOKIE_DOMAIN;
  return cookieOptions;
}

module.exports = {
  getCookieOptions
}