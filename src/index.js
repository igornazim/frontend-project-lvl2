import _ from 'lodash';
import path from 'path';
import * as fs from 'fs';
import getParser from './parsers.js';

const genDiff = (firstFilePath, secondFilePath) => {
  const getAbsFirstFilePath = path.resolve(process.cwd(), firstFilePath);
  const firstFileContent = fs.readFileSync(getAbsFirstFilePath, 'utf-8');
  const getAbsSecondFilePath = path.resolve(process.cwd(), secondFilePath);
  const secondFileContent = fs.readFileSync(getAbsSecondFilePath, 'utf-8');
  const type1 = (path.extname(firstFilePath) === '.json') ? 'json' : 'yml';
  const type2 = (path.extname(secondFilePath) === '.json') ? 'json' : 'yml';
  const firstParsedFile = getParser(firstFileContent, type1);
  const secondParsedFile = getParser(secondFileContent, type2);
  const unionKeys = _.union(Object.keys(firstParsedFile), Object.keys(secondParsedFile)).sort();
  const diff = unionKeys.reduce((acc, key) => {
    const check1 = Object.hasOwn(firstParsedFile, key);
    const check2 = Object.hasOwn(secondParsedFile, key);
    if (firstParsedFile[key] === secondParsedFile[key]) {
      return `${acc}\n    ${key}: ${firstParsedFile[key]}`;
    }
    if (!check1) {
      return `${acc}\n  + ${key}: ${secondParsedFile[key]}`;
    }
    if (!Object.hasOwn(secondParsedFile, key)) {
      return `${acc}\n  - ${key}: ${firstParsedFile[key]}`;
    }
    if (check1 && check2 && firstParsedFile[key] !== secondParsedFile[key]) {
      return `${acc}\n  - ${key}: ${firstParsedFile[key]}\n  + ${key}: ${secondParsedFile[key]}`;
    }
    return acc;
  }, '');
  return `{${diff}\n}`;
};

export default genDiff;
