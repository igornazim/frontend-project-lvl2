import _ from 'lodash';
import path from 'path';
import * as fs from 'fs';
import runParser from './parsers.js';

const genDiff = (firstFilePath, secondFilePath) => {
  const getAbsFirstFilePath = path.resolve(process.cwd(), firstFilePath);
  const firstFileContent = fs.readFileSync(getAbsFirstFilePath, 'utf-8');
  const getAbsSecondFilePath = path.resolve(process.cwd(), secondFilePath);
  const secondFileContent = fs.readFileSync(getAbsSecondFilePath, 'utf-8');
  const extName1 = path.extname(firstFilePath);
  const extName2 = path.extname(secondFilePath);
  const type1 = (extName1 === '.json') ? 'json' : 'yml';
  const type2 = (extName2 === '.json') ? 'json' : 'yml';
  const firstParsedFile = runParser(firstFileContent, type1);
  const secondParsedFile = runParser(secondFileContent, type2);
  const keys1 = Object.keys(firstParsedFile);
  const keys2 = Object.keys(secondParsedFile);
  const unionKeys = _.union(keys1, keys2).sort();
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
