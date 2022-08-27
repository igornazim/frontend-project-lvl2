import yaml from 'js-yaml';

const parse = (data, dataType) => {
  if (dataType === 'json') {
    return JSON.parse(data);
  }
  if (dataType === 'yaml' || dataType === 'yml') {
    return yaml.load(data);
  }
  throw new Error('Unknown data type');
};

export default parse;
