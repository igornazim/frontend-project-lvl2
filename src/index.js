import * as fs from 'fs';
import _ from 'lodash';
import path from 'path';

const fileParsing = (firstFilePath, secondFilePath) => {
  const getAbsFirstFilePath = path.resolve(process.cwd(), firstFilePath);
  const getAbsSecondFilePath = path.resolve(process.cwd(), secondFilePath);
  const firstFileContent = fs.readFileSync(getAbsFirstFilePath, 'utf-8');
  const secondFileContent = fs.readFileSync(getAbsSecondFilePath, 'utf-8');
  const firstParsedFile = JSON.parse(firstFileContent);
  const secondParsedFile = JSON.parse(secondFileContent);
  return [firstParsedFile, secondParsedFile];
};
const genDiff = (firstFilePath, secondFilePath) => {
  const [firstParsedFile, secondParsedFile] = fileParsing(firstFilePath, secondFilePath);
  const keys1 = Object.keys(firstParsedFile);
  const keys2 = Object.keys(secondParsedFile);
  const unionKeys = _.union(keys1, keys2).sort();
  const diff = unionKeys.reduce((acc, key) => {
    if (firstParsedFile[key] === secondParsedFile[key]) {
      return `${acc}\n   ${key}: ${firstParsedFile[key]}`;
    }
    if (!Object.hasOwn(firstParsedFile, key)) {
      return `${acc}\n + ${key}: ${secondParsedFile[key]}`;
    }
    if (!Object.hasOwn(secondParsedFile, key)) {
      return `${acc}\n - ${key}: ${firstParsedFile[key]}`;
    }
    if (Object.hasOwn(firstParsedFile, key) && Object.hasOwn(secondParsedFile, key) && firstParsedFile[key] !== secondParsedFile[key]) {
      return `${acc}\n - ${key}: ${firstParsedFile[key]}\n + ${key}: ${secondParsedFile[key]}`;
    }
    return acc;
  }, '');
  return `{${diff}\n}`;
};

export default genDiff;
