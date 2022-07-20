#!/usr/bin/env node

import {Command} from 'commander';
const program = new Command();

program
  .description(`Compares two configuration files and shows a difference.`)
  .version('2.12.2');

program.parse();