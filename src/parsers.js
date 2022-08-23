import yaml from 'js-yaml';

const parse = (data, dataType) => {
  if (dataType === 'json') {
    return JSON.parse(data);
  }
  return yaml.load(data);
};

export default parse;
