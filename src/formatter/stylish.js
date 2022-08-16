import _ from 'lodash';
import stringify from '../utils.js';

const stylish = (tree, replacer = ' ', spacesCount = 4) => {
  const iter = (node, depth) => {
    if (!_.isObject(node)) {
      return String(node);
    }
    const result = node.reduce((acc, elem) => {
      if (elem.type === 'added' && _.isObject(elem.value)) {
        return `${acc}\n${replacer.repeat(spacesCount + depth)}+ ${elem.key}: ${stringify(elem.value, replacer, spacesCount)}`;
      }
      if (elem.type === 'added' && !_.isObject(elem.value)) {
        return `${acc}\n${replacer.repeat(spacesCount + depth)}+ ${elem.key}: ${elem.value}`;
      }
      if (elem.type === 'deleted' && _.isObject(elem.value)) {
        return `${acc}\n${replacer.repeat(spacesCount + depth)}- ${elem.key}: ${stringify(elem.value, replacer, spacesCount)}`;
      }
      if (elem.type === 'deleted' && !_.isObject(elem.value)) {
        return `${acc}\n${replacer.repeat(spacesCount + depth)}- ${elem.key}: ${elem.value}`;
      }
      if (elem.type === 'unchanged') {
        return `${acc}\n${replacer.repeat(spacesCount + depth + 2)}${elem.key}: ${elem.value}`;
      }
      if (elem.type === 'changed' && _.isObject(elem.value1)) {
        return `${acc}\n${replacer.repeat(spacesCount + depth)}- ${elem.key}: ${stringify(elem.value1, replacer, spacesCount)}\n${replacer.repeat(spacesCount + depth)}+ ${elem.key}: ${elem.value2}`;
      }
      if (elem.type === 'changed' && _.isObject(elem.value2)) {
        return `${acc}\n${replacer.repeat(spacesCount + depth)}- ${elem.key}: ${elem.value1}\n${replacer.repeat(spacesCount + depth)}+ ${elem.key}: ${stringify(elem.value2, replacer, spacesCount)}`;
      }
      if (elem.type === 'changed' && !_.isObject(elem.value1) && !_.isObject(elem.value2)) {
        return `${acc}\n${replacer.repeat(spacesCount + depth)}- ${elem.key}: ${elem.value1}\n${replacer.repeat(spacesCount + depth)}+ ${elem.key}: ${elem.value2}`;
      }
      if (elem.type === 'nested') {
        return `${acc}\n${replacer.repeat(spacesCount + depth)}${elem.key}: ${iter(elem.children, depth + 2)}`;
      }
      return acc;
    }, '');
    return `{${result}\n${replacer.repeat(spacesCount - 4 + depth)}}`;
  };
  return iter(tree, 0);
};

export default stylish;
