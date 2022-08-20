import _ from 'lodash';
import path from 'path';
import * as fs from 'fs';
import getParser from './parsers.js';
import stylish from './formatters/stylish.js';
import plain from './formatters/plain.js';
import getJsonFormat from './formatters/json.js';

const getFormat = (format) => {
  switch (format) {
    case 'stylish':
      return stylish;
    case 'plain':
      return plain;
    case 'json':
      return getJsonFormat;
    default:
      throw new Error('Unknown style format');
  }
};

const getTree = (firstParsedFile, secondParsedFile) => {
  const keys = _.sortBy(_.union(Object.keys(firstParsedFile), Object.keys(secondParsedFile)));
  return keys.map((key) => {
    const hasKeysObject1 = Object.hasOwn(firstParsedFile, key);
    const hasKeysObject2 = Object.hasOwn(secondParsedFile, key);
    const isValueEqual = firstParsedFile[key] === secondParsedFile[key];
    const isObject1 = _.isObject(firstParsedFile[key]);
    const isObject2 = _.isObject(secondParsedFile[key]);
    if (hasKeysObject1 === hasKeysObject2 && isObject1 && isObject2) {
      return { key, type: 'nested', children: getTree(firstParsedFile[key], secondParsedFile[key]) };
    }
    if (hasKeysObject1 === hasKeysObject2 && !isValueEqual) {
      return {
        key, type: 'changed', value1: firstParsedFile[key], value2: secondParsedFile[key],
      };
    }
    if (!hasKeysObject1 && hasKeysObject2) {
      return { key, type: 'added', value: secondParsedFile[key] };
    }
    if (hasKeysObject1 && !hasKeysObject2) {
      return { key, type: 'deleted', value: firstParsedFile[key] };
    }
    return { key, type: 'unchanged', value: firstParsedFile[key] };
  });
};

const genDiff = (firstFilePath, secondFilePath, format = 'stylish') => {
  const getAbsFirstFilePath = path.resolve(process.cwd(), firstFilePath);
  const firstFileContent = fs.readFileSync(getAbsFirstFilePath, 'utf-8');
  const getAbsSecondFilePath = path.resolve(process.cwd(), secondFilePath);
  const secondFileContent = fs.readFileSync(getAbsSecondFilePath, 'utf-8');
  const type1 = (path.extname(firstFilePath) === '.json') ? 'json' : 'yml';
  const type2 = (path.extname(secondFilePath) === '.json') ? 'json' : 'yml';
  const tree = getTree(getParser(firstFileContent, type1), getParser(secondFileContent, type2));
  const formater = getFormat(format);
  const result = formater(tree);
  return result;
};

export default genDiff;
