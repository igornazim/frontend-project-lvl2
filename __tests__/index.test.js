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

test('stylish', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish')).toEqual(expectedUnswerStylish);
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'stylish')).toEqual(expectedUnswerStylish);
});

test('plain', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain')).toEqual(expectedUnswerPlain);
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'plain')).toEqual(expectedUnswerPlain);
});

test('json', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json')).toEqual(expectedUnswerJson);
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'json')).toEqual(expectedUnswerJson);
});
