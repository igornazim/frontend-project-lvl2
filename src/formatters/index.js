import stylish from './stylish.js';
import plain from './plain.js';
import getJsonFormat from './json.js';

const getFormat = (format, data) => {
  switch (format) {
    case 'stylish':
      return stylish(data);
    case 'plain':
      return plain(data);
    case 'json':
      return getJsonFormat(data);
    default:
      throw new Error('Unknown style format');
  }
};

export default getFormat;
