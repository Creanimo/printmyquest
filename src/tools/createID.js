const createID = (length = 8) => {
  return [...crypto.getRandomValues(new Uint8Array(length))]
    .map(byte => byte.toString().padStart(2, '0'))
    .join('')
    .slice(0, length);
};

export { createID };
