import _ from 'lodash';

const stringify = (data) => {
  if (_.isObject(data)) {
    return '[complex value]';
  }
  if (_.isString(data)) {
    return `'${data}'`;
  }
  if (_.isNumber(data)) {
    return data;
  }
  if (data === null) {
    return `${null}`;
  }
  if (data === true || data === false) {
    return `${data}`;
  }
  return '';
};

const plain = (tree) => {
  const iter = (node, path) => {
    if (!_.isObject(node)) {
      return String(node);
    }
    const result = node.flatMap((elem) => {
      if (elem.type === 'added') {
        return `Property ${path}${elem.key}' was added with value: ${stringify(elem.value)}`;
      }
      if (elem.type === 'deleted') {
        return `Property ${path}${elem.key}' was removed`;
      }
      if (elem.type === 'changed') {
        return `Property ${path}${elem.key}' was updated. From ${stringify(elem.value1)} to ${stringify(elem.value2)}`;
      }
      if (elem.type === 'nested') {
        return (iter(elem.children, `${path}${elem.key}.`));
      }
      return [];
    });
    return result.join('\n');
  };
  return iter(tree, "'");
};

export default plain;
