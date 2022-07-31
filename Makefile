install:
	npm install

install-deps:
	npm ci

gendiff:
	node bin/gendiff.js

test:
	npm test

test-coverage:
	npm test -- --coverage

lint:
	npx eslint .

publish:
	npm publish