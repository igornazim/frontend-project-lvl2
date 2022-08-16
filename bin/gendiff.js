#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../src/index.js';

const program = new Command();

program
  .version('2.12.2')
  .description('Usage: gendiff [options] <filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2) => console.log(genDiff(filepath1, filepath2, program.opts().format)));

program.parse();
