import * as fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const expectedUnswerStylish = fs.readFileSync(getFixturePath('result-stylish.txt'), 'utf-8');
const expectedUnswerPlain = fs.readFileSync(getFixturePath('result-plain.txt'), 'utf-8');
const expectedUnswerJson = fs.readFileSync(getFixturePath('result-json.txt'), 'utf-8');

test.each([
  'json',
  'yml',
])('genDiff %s', (format) => {
  expect(genDiff(getFixturePath(`file1.${format}`), getFixturePath(`file2.${format}`), 'stylish')).toEqual(expectedUnswerStylish);
  expect(genDiff(getFixturePath(`file1.${format}`), getFixturePath(`file2.${format}`), 'plain')).toEqual(expectedUnswerPlain);
  expect(genDiff(getFixturePath(`file1.${format}`), getFixturePath(`file2.${format}`), 'json')).toEqual(expectedUnswerJson);
});
