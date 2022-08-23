import _ from 'lodash';

const stringify = (value, replacer, spacesCount) => {
  const iter = (val, depth) => {
    if (!_.isObject(val)) {
      return String(val);
    }
    const objectToArray = Object.entries(val);
    const result = objectToArray.reduce((acc, elem) => {
      const [key, entrie] = elem;
      return `${acc}\n${replacer.repeat(spacesCount * depth)}${key}: ${iter(entrie, depth + 2)}`;
    }, '');
    return `{${result}\n${replacer.repeat(spacesCount * depth - 4)}}`;
  };
  return iter(value, 4);
};

const getIndent = (replacer, spacesCount) => replacer.repeat(spacesCount);

const stylish = (tree, replacer = ' ', spacesCount = 4) => {
  const iter = (node, depth) => {
    if (!_.isObject(node)) {
      return String(node);
    }
    const result = node.map((elem) => {
      if (elem.type === 'added') {
        return `\n${getIndent(replacer, spacesCount * depth - 2)}+ ${elem.key}: ${stringify(elem.value, replacer, depth + 1)}`;
      }
      if (elem.type === 'deleted') {
        return `\n${getIndent(replacer, spacesCount * depth - 2)}- ${elem.key}: ${stringify(elem.value, replacer, depth + 1)}`;
      }
      if (elem.type === 'changed') {
        return `\n${getIndent(replacer, spacesCount * depth - 2)}- ${elem.key}: ${stringify(elem.value1, replacer, depth + 1)}\n${getIndent(replacer, spacesCount * depth - 2)}+ ${elem.key}: ${stringify(elem.value2, replacer, depth + 1)}`;
      }
      if (elem.type === 'nested') {
        return `\n${getIndent(replacer, spacesCount * depth)}${elem.key}: ${iter(elem.children, depth + 1)}`;
      }
      return `\n${getIndent(replacer, spacesCount * depth)}${elem.key}: ${stringify(elem.value, replacer, depth + 1)}`;
    });
    return `{${result.join('')}\n${getIndent(replacer, spacesCount * depth - 4)}}`;
  };
  return iter(tree, 1);
};

export default stylish;
