import * as fs from 'fs';
import _ from 'lodash';
import path from 'path';
import { cwd } from 'node:process';

const fileParsing = (firstFilePath, secondFilePath) => {
  const getAbsFirstFilePath = path.resolve(cwd(), firstFilePath);
  console.log(getAbsFirstFilePath)
  const getAbsSecondFilePath = path.resolve(cwd(), secondFilePath);
  const firstFileContent = fs.readFileSync(getAbsFirstFilePath, 'utf-8');
  const secondFileContent = fs.readFileSync(getAbsSecondFilePath, 'utf-8');
  const firstParsedFile = JSON.parse(firstFileContent);
  const secondParsedFile = JSON.parse(secondFileContent);
  return [firstParsedFile, secondParsedFile];
}

const genDiff = (firstFilePath, secondFilePath) => {
  const [firstParsedFile, secondParsedFile] = fileParsing(firstFilePath, secondFilePath)
  const keys1 = Object.keys(firstParsedFile);
  const keys2 = Object.keys(secondParsedFile); 
  let diff = '';
  const unionKeys = _.union(keys1, keys2).sort();
  for (const key of unionKeys) {
    if (firstParsedFile[key] === secondParsedFile[key]) {
      diff = `${diff}\n   ${key}: ${firstParsedFile[key]}`;
    } 
    if (!Object.hasOwn(firstParsedFile, key)) {
      diff = `${diff}\n + ${key}: ${secondParsedFile[key]}`;
    } 
    if (!Object.hasOwn(secondParsedFile, key)) {
      diff = `${diff}\n - ${key}: ${firstParsedFile[key]}`;
    } 
    if (Object.hasOwn(firstParsedFile, key) && Object.hasOwn(secondParsedFile, key) && firstParsedFile[key] !== secondParsedFile[key]) {
      diff = `${diff}\n - ${key}: ${firstParsedFile[key]}\n + ${key}: ${secondParsedFile[key]}`;
    }
  }
  return `{${diff}\n}`;
}

export default genDiff;