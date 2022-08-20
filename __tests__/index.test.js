import * as fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

test('stylish', () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
  const expectedUnswer = fs.readFileSync(getFixturePath('result.txt'), 'utf-8');
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish')).toEqual(expectedUnswer);
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'stylish')).toEqual(expectedUnswer);
});

test('plain', () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
  const expectedUnswer = fs.readFileSync(getFixturePath('result-plain.txt'), 'utf-8');
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain')).toEqual(expectedUnswer);
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'plain')).toEqual(expectedUnswer);
});

test('json', () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
  const expectedUnswer = fs.readFileSync(getFixturePath('result-json.txt'), 'utf-8');
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json')).toEqual(expectedUnswer);
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'json')).toEqual(expectedUnswer);
});
