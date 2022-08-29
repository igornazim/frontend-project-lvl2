import path from 'path';
import * as fs from 'fs';
import parse from './parsers.js';
import buildTree from './build-tree.js';
import getFormat from './formatters/index.js';

const getAbsolutePath = (filePath) => path.resolve(process.cwd(), filePath);
const getFileContent = (absPath) => fs.readFileSync(absPath, 'utf-8');
const getDataType = (filePath) => path.extname(filePath).slice(1);

const genDiff = (filePath1, filePath2, format = 'stylish') => {
  const getAbsPath1 = getAbsolutePath(filePath1);
  const fileContent1 = getFileContent(getAbsPath1);
  const getAbsPath2 = getAbsolutePath(filePath2);
  const fileContent2 = getFileContent(getAbsPath2);
  const type1 = getDataType(filePath1);
  const type2 = getDataType(filePath2);
  const tree = buildTree(parse(fileContent1, type1), parse(fileContent2, type2));
  const result = getFormat(format, tree);
  return result;
};

export default genDiff;
