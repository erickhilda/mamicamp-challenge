const removeEmptyProperties = obj => {
  const objCopy = { ...obj };
  Object.keys(objCopy).forEach(key => {
    if ([null, undefined].includes(objCopy[key])) {
      delete objCopy[key];
    }
  });
  return objCopy;
};

export { removeEmptyProperties };
