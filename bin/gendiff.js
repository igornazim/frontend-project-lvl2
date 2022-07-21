#!/usr/bin/env node

import {Command} from 'commander';
const program = new Command();

program
  .version('2.12.2')
  .description('Usage: gendiff [options] <filepath1> <filepath2>')
  .description(`Compares two configuration files and shows a difference.`)
  .argument('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format')

program.parse();