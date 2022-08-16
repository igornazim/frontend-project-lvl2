import _ from 'lodash';
import path from 'path';
import * as fs from 'fs';
import getParser from './parsers.js';
import stylish from './formatter/stylish.js';

const getTree = (firstParsedFile, secondParsedFile) => {
  const keys = _.union(Object.keys(firstParsedFile), Object.keys(secondParsedFile)).sort();
  const diff = keys.map((key) => {
    const acc = {};
    const hasObject1 = Object.hasOwn(firstParsedFile, key);
    const hasObject2 = Object.hasOwn(secondParsedFile, key);
    const isValueEqual = firstParsedFile[key] === secondParsedFile[key];
    const isObject1 = _.isObject(firstParsedFile[key]);
    const isObject2 = _.isObject(secondParsedFile[key]);
    if (hasObject1 === hasObject2 && isObject1 && isObject2) {
      acc.key = key;
      acc.type = 'nested';
      acc.children = getTree(firstParsedFile[key], secondParsedFile[key]);
    }
    if (hasObject1 === hasObject2 && isValueEqual) {
      acc.key = key;
      acc.type = 'unchanged';
      acc.value = firstParsedFile[key];
    }
    if (hasObject1 === hasObject2 && !isValueEqual && !isObject1 && !isObject2) {
      acc.key = key;
      acc.type = 'changed';
      acc.value1 = firstParsedFile[key];
      acc.value2 = secondParsedFile[key];
    }
    if (hasObject1 === hasObject2 && (isObject1 || isObject2) && (acc.type !== 'nested')) {
      acc.key = key;
      acc.type = 'changed';
      acc.value1 = firstParsedFile[key];
      acc.value2 = secondParsedFile[key];
    }
    if (!hasObject1 && hasObject2) {
      acc.key = key;
      acc.type = 'added';
      acc.value = secondParsedFile[key];
    }
    if (hasObject1 && !hasObject2) {
      acc.key = key;
      acc.type = 'deleted';
      acc.value = firstParsedFile[key];
    }
    return acc;
  });
  return diff;
};

const genDiff = (firstFilePath, secondFilePath, format = stylish) => {
  const getAbsFirstFilePath = path.resolve(process.cwd(), firstFilePath);
  const firstFileContent = fs.readFileSync(getAbsFirstFilePath, 'utf-8');
  const getAbsSecondFilePath = path.resolve(process.cwd(), secondFilePath);
  const secondFileContent = fs.readFileSync(getAbsSecondFilePath, 'utf-8');
  const type1 = (path.extname(firstFilePath) === '.json') ? 'json' : 'yml';
  const type2 = (path.extname(secondFilePath) === '.json') ? 'json' : 'yml';
  const tree = getTree(getParser(firstFileContent, type1), getParser(secondFileContent, type2));
  const formater = (format === 'stylish') ? stylish : stylish;
  const result = formater(tree);
  return result;
};

export default genDiff;
