const ParseEnv = {
  bool(key) {
    const value = process.env[key];
    if (value == "true" || value == "false") return value === "true";
    return undefined;
  },
  num(key, defaultValue) {
    const value = process.env[key];
    if (!value) return defaultValue;
    if (isNaN(+value)) return +value;
    return defaultValue;
  }
}

module.exports = {
  ParseEnv
}