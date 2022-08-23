import _ from 'lodash';

const indent = (depth, spacesCount = 4) => ' '.repeat(Math.max(depth * spacesCount - 2, 0));

const stringify = (value, spacesCount) => {
  const iter = (val, depth) => {
    if (!_.isObject(val)) {
      return String(val);
    }
    const objectToArray = Object.entries(val);
    const result = objectToArray.reduce((acc, elem) => {
      const [key, entrie] = elem;
      return `${acc}\n${indent(depth * spacesCount)}  ${key}: ${iter(entrie, depth + 1)}`;
    }, '');
    return `{${result}\n${indent(depth * spacesCount - 2)}}`;
  };
  return iter(value, 1);
};

const stylish = (tree) => {
  const iter = (node, depth) => {
    if (!_.isObject(node)) {
      return String(node);
    }
    const result = node.map((elem) => {
      if (elem.type === 'added') {
        return `\n${indent(depth)}+ ${elem.key}: ${stringify(elem.value, depth + 1)}`;
      }
      if (elem.type === 'deleted') {
        return `\n${indent(depth)}- ${elem.key}: ${stringify(elem.value, depth + 1)}`;
      }
      if (elem.type === 'changed') {
        return `\n${indent(depth)}- ${elem.key}: ${stringify(elem.value1, depth + 1)}\n${indent(depth)}+ ${elem.key}: ${stringify(elem.value2, depth + 1)}`;
      }
      if (elem.type === 'nested') {
        return `\n${indent(depth)}  ${elem.key}: ${iter(elem.children, depth + 1)}`;
      }
      return `\n${indent(depth)}  ${elem.key}: ${stringify(elem.value, depth + 1)}`;
    });
    return `{${result.join('')}\n${indent(depth)}}`;
  };
  return iter(tree, 1);
};

export default stylish;
