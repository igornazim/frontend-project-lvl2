import _ from 'lodash';

const stringify = (value, replacer, spacesCount) => {
  const iter = (val, depth) => {
    if (!_.isObject(val)) {
      return String(val);
    }
    const objectToArray = Object.entries(val);
    const result = objectToArray.reduce((acc, elem) => {
      const [key, entrie] = elem;
      return `${acc}\n${replacer.repeat(spacesCount * depth)}${key}: ${iter(entrie, depth + 1)}`;
    }, '');
    return `{${result}\n${replacer.repeat(spacesCount * (depth - 1))}}`;
  };
  return iter(value, 2);
};

const stylish = (tree, replacer = ' ', spacesCount = 4) => {
  const iter = (node, depth) => {
    if (!_.isObject(node)) {
      return String(node);
    }
    const result = node.reduce((acc, elem) => {
      if (elem.type === 'added') {
        return `${acc}\n${replacer.repeat(spacesCount * depth - 2)}+ ${elem.key}: ${stringify(elem.value, replacer, spacesCount)}`;
      }
      if (elem.type === 'deleted') {
        return `${acc}\n${replacer.repeat(spacesCount * depth - 2)}- ${elem.key}: ${stringify(elem.value, replacer, spacesCount)}`;
      }
      if (elem.type === 'unchanged') {
        return `${acc}\n${replacer.repeat(spacesCount * depth)}${elem.key}: ${stringify(elem.value, replacer, spacesCount)}`;
      }
      if (elem.type === 'changed') {
        return `${acc}\n${replacer.repeat(spacesCount * depth - 2)}- ${elem.key}: ${stringify(elem.value1, replacer, spacesCount)}\n${replacer.repeat(spacesCount * depth - 2)}+ ${elem.key}: ${stringify(elem.value2, replacer, spacesCount)}`;
      }
      if (elem.type === 'nested') {
        return `${acc}\n${replacer.repeat(spacesCount * depth)}${elem.key}: ${iter(elem.children, depth + 1)}`;
      }
      return acc;
    }, '');
    return `{${result}\n${replacer.repeat(spacesCount * depth - 4)}}`;
  };
  return iter(tree, 1);
};

export default stylish;
