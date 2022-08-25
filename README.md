
# Gendiff

### Hexlet tests and linter status:
[![Actions Status](https://github.com/igornazim/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/igornazim/frontend-project-lvl2/actions)

[![Node CI](https://github.com/igornazim/frontend-project-lvl2/actions/workflows/nodejs.yml/badge.svg)](https://github.com/igornazim/frontend-project-lvl2/actions/workflows/nodejs.yml)

[![Maintainability](https://api.codeclimate.com/v1/badges/d739126dfd8e1dc84ae1/maintainability)](https://codeclimate.com/github/igornazim/frontend-project-lvl2/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/d739126dfd8e1dc84ae1/test_coverage)](https://codeclimate.com/github/igornazim/frontend-project-lvl2/test_coverage)

This package includes CLI app which compares two configuration files and shows a difference

## Setup
``make install``

## Run tests
``make test``

## Usage
To see the help, use the h option.
``blockquote gendiff -h``

The application supports three output formats:
- indented tree format
- plain format
- json format

``gendiff __fixtures__/file1.json __fixtures__/file2.json``
[![asciicast](https://asciinema.org/a/T14Cdb4Ndcgyl7jpeP3DNW2aX.svg)](https://asciinema.org/a/T14Cdb4Ndcgyl7jpeP3DNW2aX)

``gendiff -f plain __fixtures__/file1.yml __fixtures__/file2.yml``
[![asciicast](https://asciinema.org/a/1NXXOkdl7KKfRkAqm4iyMkJiQ.svg)](https://asciinema.org/a/1NXXOkdl7KKfRkAqm4iyMkJiQ)

``gendiff -f json __fixtures__/file1.yml __fixtures__/file2.yml``
[![asciicast](https://asciinema.org/a/rAxn2GNbd5T3BKZHvuEzT8TDs.svg)](https://asciinema.org/a/rAxn2GNbd5T3BKZHvuEzT8TDs)