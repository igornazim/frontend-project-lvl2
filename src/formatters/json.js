const getJsonFormat = (tree) => {
  const result = tree.map((elem) => JSON.stringify(elem));
  return `[${result}]`;
};

export default getJsonFormat;
