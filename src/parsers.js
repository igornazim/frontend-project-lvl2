import yaml from 'js-yaml';

const getParser = (data, dataType) => {
  if (dataType === 'json') {
    return JSON.parse(data);
  }
  return yaml.load(data);
};

export default getParser;
