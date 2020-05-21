const objectPropertiesCounter = obj => {
  if (typeof obj === "object") {
    return Object.keys(obj).length;
  }
  return 0;
};

export { objectPropertiesCounter };
