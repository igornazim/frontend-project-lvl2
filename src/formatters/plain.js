import _ from 'lodash';

const stringify = (data, dataType) => {
  const iter = (node, type) => {
    if (!_.isObject(node) && type === 'added') {
      return `was added with value: ${node.value}`;
    }
    if (_.isObject(node) && type === 'added') {
      return 'was added with value: [complex value]';
    }
    if (!_.isObject(node) && type === 'changed') {
      return `${node.value}`;
    }
    if (_.isObject(node) && type === 'changed') {
      return '[complex value]';
    }
    if (type === 'deleted') {
      return 'was removed';
    }
    if (type === 'unchanged') {
      return '';
    }
    return node.reduce((acc, elem) => `${acc}.${elem.key}${iter(elem, elem.type)}`, '');
  };
  return iter(data, dataType);
};

const plain = (tree) => {
  const result = tree.reduce((acc, elem) => {
    if (elem.type === 'added') {
      return `Property ${elem.key} ${stringify(elem.value, elem.type)}`;
    }
    if (elem.type === 'deleted') {
      return `Property ${elem.key} was removed`;
    }
    if (elem.type === 'changed') {
      return `Property ${elem.key} was updated. From ${stringify(elem.value1, elem.type)} to ${stringify(elem.value2, elem.type)}`;
    }
    if (elem.type === 'nested') {
      return `Property ${elem.key}${stringify(elem.children, elem.type)}`;
    }
    if (elem.type === 'unchanged') {
      return '';
    }
    return acc;
  }, '');
  return result;
};

export default plain;
