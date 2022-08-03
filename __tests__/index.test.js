import * as fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

test('genDiff', () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
  const expectedUnswer = fs.readFileSync(getFixturePath('result_plain.txt'), 'utf-8');
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(expectedUnswer);
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'))).toEqual(expectedUnswer);
});
