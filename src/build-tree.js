import _ from 'lodash';

const buildTree = (file1, file2) => {
  const keys = _.sortBy(_.union(Object.keys(file1), Object.keys(file2)));
  return keys.map((key) => {
    const hasKeysObject1 = Object.hasOwn(file1, key);
    const hasKeysObject2 = Object.hasOwn(file2, key);
    const isValueEqual = file1[key] === file2[key];
    const isObject1 = _.isObject(file1[key]);
    const isObject2 = _.isObject(file2[key]);
    if (hasKeysObject1 === hasKeysObject2 && isObject1 && isObject2) {
      return { key, type: 'nested', children: buildTree(file1[key], file2[key]) };
    }
    if (hasKeysObject1 === hasKeysObject2 && !isValueEqual) {
      return {
        key, type: 'changed', value1: file1[key], value2: file2[key],
      };
    }
    if (!hasKeysObject1) {
      return { key, type: 'added', value: file2[key] };
    }
    if (!hasKeysObject2) {
      return { key, type: 'deleted', value: file1[key] };
    }
    return { key, type: 'unchanged', value: file1[key] };
  });
};

export default buildTree;
