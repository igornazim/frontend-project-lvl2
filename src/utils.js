const stringify = (value, replacer, spacesCount) => {
  const iter = (val, depth) => {
    if (typeof val !== 'object' || val === null) {
      return String(val);
    }
    const objectToArray = Object.entries(val);
    const result = objectToArray.reduce((acc, elem) => {
      const [key, entrie] = elem;
      return `${acc}\n${replacer.repeat(spacesCount + 4 + depth)}${key}: ${iter(entrie, depth + 2)}`;
    }, '');
    return `{${result}\n${replacer.repeat(spacesCount + depth)}}`;
  };
  return iter(value, 0);
};

export default stringify;
