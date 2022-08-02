import yaml from 'js-yaml';

const getParser = (data, dataType) => {
  if (dataType === '') {
    return JSON.parse(data);
  }
  return yaml.load(data);
};

export default getParser;
