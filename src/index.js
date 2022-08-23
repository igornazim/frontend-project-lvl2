import path from 'path';
import * as fs from 'fs';
import parse from './parsers.js';
import getTree from './ast.js';
import getFormat from './formatters/index.js';

const genDiff = (filePath1, filePath2, format = 'stylish') => {
  const getAbsPath1 = path.resolve(process.cwd(), filePath1);
  const fileContent1 = fs.readFileSync(getAbsPath1, 'utf-8');
  const getAbsPath2 = path.resolve(process.cwd(), filePath2);
  const fileContent2 = fs.readFileSync(getAbsPath2, 'utf-8');
  const type1 = (path.extname(filePath1) === '.json') ? 'json' : 'yml';
  const type2 = (path.extname(filePath2) === '.json') ? 'json' : 'yml';
  const tree = getTree(parse(fileContent1, type1), parse(fileContent2, type2));
  const result = getFormat(format, tree);
  return result;
};

export default genDiff;
